// components/homepage/UI.tsx
import { useEffect } from 'react'
import { PHOTO_ENVS, UI_MODES, useConfiguratorStore, PhotoEnvType } from '@/store/store'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const PosesBox = () => {
    const curEnv = useConfiguratorStore((state) => state.env);
    const setEnv = useConfiguratorStore((state) => state.setEnv);
    return (
        <div className="pointer-events-auto md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20  backdrop-blur-sm drop-shadow-md flex p-6 gap-3 overflow-x-auto noscrollbar">
            {(Object.keys(PHOTO_ENVS) as PhotoEnvType[]).map((env, index) => (
                <button
                    key={index}
                    className={`transition-colors duration-200 font-medium flex-shrink-0 border-b ${curEnv === PHOTO_ENVS[env]
                        ? "text-white shadow-purple-100 border-b-white"
                        : "text-gray-200 hover:text-gray-100 border-b-transparent"
                        }
       `}
                    onClick={() => setEnv(PHOTO_ENVS[env])}
                >
                    {env}
                </button>
            ))}
        </div>
    );
};

const AssetsBox = () => {
    const {
        properties,
        currentProperty,
        setCurrentProperty,
        changeAsset,
        customization,
    } = useConfiguratorStore()

    return (
        <div className="md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20  backdrop-blur-sm drop-shadow-md flex flex-col py-6 gap-3 overflow-hidden ">
            <div className="flex items-center gap-8 pointer-events-auto overflow-x-auto pb-4 mx-3">
                {properties?.map((property) => (
                    <button
                        key={property.id}
                        onClick={() => setCurrentProperty(property)}
                        className={`transition-colors duration-200 font-medium flex-shrink-0 border-b-2 px-2 py-1 ${currentProperty?.id === property.id
                            ? "text-blue-600 border-blue-600"
                            : "text-gray-600 hover:text-gray-800 border-transparent"
                            }`}
                    >
                        {property.name}
                    </button>
                ))}
            </div>
            <div className="flex gap-2 overflow-x-auto noscrollbar px-6">
                {currentProperty?.assets?.map((asset) => (
                    <button
                        key={asset.id}
                        onClick={() => changeAsset(currentProperty.name, asset)}
                        className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300
                                bg-gradient-to-tr
                                ${customization[currentProperty.name]?.asset?.id === asset.id
                                ? "border-white from-white/20 to-white/30"
                                : "from-black/70 to-black/20 border-black"
                            }`}
                    >
                        {asset.thumbnail && (
                            <div className="relative w-full h-full">
                                <Image
                                    src={asset.thumbnail}
                                    alt={asset.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-200"
                                    sizes="(max-width: 640px) 25vw, (max-width: 768px) 16.67vw, 12.5vw"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                    <span className="text-white text-sm text-center px-2">
                                        {asset.name}
                                    </span>
                                </div>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

const RandomizeButton = () => {
    const randomize = useConfiguratorStore((state) => state.randomize);
    return (
        <button
            className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
            onClick={randomize}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                />
            </svg>
        </button>
    );
};

const ScreenshotButton = () => {
    const screenshot = useConfiguratorStore((state) => state.screenshot);
    return (
        <button
            className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
            onClick={screenshot}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
            </svg>
        </button>
    );
};

const DownloadButton = () => {
    const download = useConfiguratorStore((state) => state.download);
    return (
        <button
            className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
            onClick={download}
        >
            Download
        </button>
    );
};

const CATEGORIES = [
    { id: 'tree', name: 'Christmas Tree' }
]

const CategorySelector = () => {
    const {
        fetchProperties, category, setCategory } = useConfiguratorStore()

    const currentProperty = CATEGORIES.find(c => c.id === category) || CATEGORIES[0]

    useEffect(() => {
        fetchProperties()
    }, [fetchProperties])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <span className="text-white font-medium">{currentProperty.name}</span>
                <ChevronDown className="h-4 w-4 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
                {CATEGORIES.map((prop) => (
                    <DropdownMenuItem
                        key={prop.id}
                        onClick={() => setCategory(prop.id)}
                        className="cursor-pointer"
                    >
                        {prop.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const UI = () => {
    const {
        currentProperty,
        customization,
        mode,
        setMode,
        loading
    } = useConfiguratorStore()
    return (
        <main className="pointer-events-none fixed z-10 inset-0 select-none mt-8">
            <div
                className={`absolute inset-0 bg-black z-10 pointer-events-none flex items-center justify-center transition-opacity  duration-1000 ${loading ? "opacity-100" : "opacity-0"
                    }`}
            >
                <img
                    src="/images/playground.png"
                    className="w-80 animate-pulse"
                />
            </div>
            <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
                <div className="flex justify-between items-center p-10">
                    <div className="pointer-events-auto">
                        <CategorySelector />
                    </div>
                    <div className="flex items-cente gap-2">
                        <RandomizeButton />
                        <ScreenshotButton />
                        <DownloadButton />
                    </div>
                </div>
                <div className="md:px-10 flex flex-col">
                    {mode === UI_MODES.CUSTOMIZE && (
                        <>
                            {currentProperty?.customization_palettes &&
                                customization[currentProperty.name] && <ColorPicker />}
                            <AssetsBox />
                        </>
                    )}
                    {mode === UI_MODES.PHOTO && <PosesBox />}
                    <div className="flex justify-stretch">
                        <button
                            className={`flex-1 pointer-events-auto  p-4 text-white transition-colors duration-200 font-medium
                ${mode === UI_MODES.CUSTOMIZE
                                    ? "bg-indigo-500/90"
                                    : "bg-indigo-500/30 hover:bg-indigo-500/50"
                                }
              `}
                            onClick={() => setMode(UI_MODES.CUSTOMIZE)}
                        >
                            Customize avatar
                        </button>
                        <div className="w-px bg-white/30"></div>
                        <button
                            className={`flex-1 pointer-events-auto p-4 text-white transition-colors duration-200 font-medium
                ${mode === UI_MODES.PHOTO
                                    ? "bg-indigo-500/90"
                                    : "bg-indigo-500/30 hover:bg-indigo-500/50"
                                }
                `}
                            onClick={() => setMode(UI_MODES.PHOTO)}
                        >
                            Photo booth
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

const ColorPicker = () => {
    const { updateColor, currentProperty, customization } = useConfiguratorStore()
    const handleColorChange = (color: string) => {
        updateColor(color)
    }
    if (!currentProperty?.name || !customization[currentProperty.name]?.asset) return null

    return (
        <div className="pointer-events-auto relative flex gap-2 max-w-full overflow-x-auto backdrop-blur-sm py-2 drop-shadow-md">
            {currentProperty.customization_palettes?.colors.map((color, index) => (
                <button
                    key={`${index}-${color}`}
                    className={`w-10 h-10 p-1.5 drop-shadow-md bg-black/20 shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2
             ${customization[currentProperty.name].color === color
                            ? "border-white"
                            : "border-transparent"
                        }
          `}
                    onClick={() => handleColorChange(color)}
                >
                    <div
                        className="w-full h-full rounded-md"
                        style={{ backgroundColor: color }}
                    />
                </button>
            ))}
        </div>
    )
};
