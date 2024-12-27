"use client"
import { create } from 'zustand'
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'
import { randInt } from "three/src/math/MathUtils.js";

type Property = Database['public']['Tables']['my_properties']['Row']
type Asset = Database['public']['Tables']['my_assets']['Row']
type PropertyWithAssets = Property & {
  assets?: Asset[]
  customization_palettes?: {
    colors: string[]
  }
  default_asset?: string
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const PHOTO_ENVS = {
  Warm: 'warm',
  Cool: 'cool',
} as const;

export type PhotoEnvType = keyof typeof PHOTO_ENVS;

export const UI_MODES = {
  PHOTO: "photo",
  CUSTOMIZE: "customize",
};

interface Customization {
  [key: string]: {
    asset?: Asset | null
    color?: string
  }
}

interface ConfiguratorStore {
  category: string
  setCategory: (category: string) => void
  loading: boolean
  mode: typeof UI_MODES[keyof typeof UI_MODES]
  setMode: (mode: typeof UI_MODES[keyof typeof UI_MODES]) => void
  properties: PropertyWithAssets[]
  fetchProperties: () => Promise<void>
  currentProperty: PropertyWithAssets | null
  setCurrentProperty: (category: PropertyWithAssets) => void

  assets: Asset[]
  customization: Customization
  changeAsset: (category: string, asset: Asset | null) => void

  env: string
  setEnv: (env: string) => void

  download: () => void
  setDownload: (download: () => void) => void
  screenshot: () => void
  setScreenshot: (screenshot: () => void) => void
  updateColor: (color: string) => void
  randomize: () => void
}

export const useConfiguratorStore = create<ConfiguratorStore>((set, get) => ({
  category: 'tree',
  setCategory: (category: string) => set({ category }),
  loading: true,
  mode: UI_MODES.CUSTOMIZE,
  setMode: (mode: typeof UI_MODES[keyof typeof UI_MODES]) => {
    set({ mode });
  },
  properties: [],
  fetchProperties: async () => {
    try {
      console.log('fetchProperties-------')
      set({ loading: true })
      const category = get().category;

      // 首先获取属性
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('my_properties')
        .select(`
          *,
          customization_palettes(*)
        `)
        .eq('category', category)
        .order('created_at')

      if (propertiesError) throw propertiesError

      const properties = (propertiesData || []) as PropertyWithAssets[]

      // 如果有属性，则获取相关的资产
      let assets: Asset[] = []
      if (properties.length > 0) {
        const propertyIds = properties.map(prop => prop.id)
        const { data: assetsData, error: assetsError } = await supabase
          .from('my_assets')
          .select('*')
          .in('property_id', propertyIds)
          .order('created_at', { ascending: false })

        if (assetsError) throw assetsError
        assets = assetsData || []
      }

      // 将资产分配给对应的属性
      properties.forEach((property) => {
        property.assets = assets.filter((asset) => asset?.property_id === property.id)
      })

      const customization: Customization = {}
      properties.forEach((property) => {
        customization[property.name] = {
          asset: property.assets?.[0] || null,
          color: property.customization_palettes?.colors?.[0] || ""
        }
      })

      set({
        properties,
        currentProperty: properties[0] || null,
        assets,
        customization,
        loading: false,
      })

      console.log('category', category)
      console.log('properties', properties)
      console.log('assets', assets)
      console.log('customization', customization)
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      set({ loading: false })
    }
  },
  currentProperty: null,
  setCurrentProperty: (property: PropertyWithAssets) => set({ currentProperty: property }),
  assets: [],
  customization: {},
  changeAsset: (category: string, asset: Asset | null) => {
    set((state: ConfiguratorStore) => ({
      customization: {
        ...state.customization,
        [category]: {
          ...state.customization[category],
          asset,
        },
      },
    }));
  },
  env: 'warm',
  setEnv: (env: string) => set({ env }),
  download: () => { },
  setDownload: (downloadFn: () => void) => set({ download: downloadFn }),
  screenshot: () => { },
  setScreenshot: (screenshotFn: () => void) => set({ screenshot: screenshotFn }),
  updateColor: (color: string) => {
    const currentProperty = get().currentProperty;
    if (!currentProperty) return;

    set((state: ConfiguratorStore) => ({
      customization: {
        ...state.customization,
        [currentProperty.name]: {
          ...state.customization[currentProperty.name],
          color,
        },
      },
    }));


    console.log('color', color)
  },
  randomize: () => {
    const customization: Customization = {};
    const properties = get().properties;

    properties.forEach((property: PropertyWithAssets) => {
      if (!property.assets?.length) return;

      const randomAsset = property.assets[randInt(0, property.assets.length - 1)];
      const randomColor = property.customization_palettes?.colors?.[
        randInt(0, (property.customization_palettes.colors.length || 1) - 1)
      ] || "";

      customization[property.name] = {
        asset: randomAsset,
        color: randomColor,
      };
    });

    set({ customization });
  }
}));

// useConfiguratorStore.getState().fetchCategories();