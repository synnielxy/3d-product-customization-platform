import { Avatar } from "./Avatar"
import dynamic from 'next/dynamic'
import { Suspense, useRef, useEffect } from 'react'
import { GLTFExporter } from "three-stdlib";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import {
    Environment,
    Float,
    Gltf,
    SoftShadows,
    useProgress,
} from "@react-three/drei";
import { UI_MODES, useConfiguratorStore } from "@/store/store";

const Tree = dynamic(() => import('@/components/canvas/models/Tree').then((mod) => mod.Tree), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
    ssr: false,
    loading: () => (
        <div className='flex h-96 w-full flex-col items-center justify-center'>
            <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
            </svg>
        </div>
    ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export const Experience = () => {
    const { mode, env } = useConfiguratorStore()
    const group = useRef(); 
    const setDownload = useConfiguratorStore((state) => state.setDownload);

    useEffect(() => {
        function download() {
            const exporter = new GLTFExporter();
            exporter.parse(
                group.current,
                function (result) {
                    save(
                        new Blob([result], { type: "application/octet-stream" }),
                        `avatar_${new Date().toISOString()}.glb`
                    );
                },
                function (error) {
                    console.error(error);
                },
                { binary: true }
            );
        }

        const link = document.createElement("a");
        link.style.display = "none";
        document.body.appendChild(link); // Firefox workaround, see #6594

        function save(blob, filename) {
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        }
        setDownload(download);
    }, []);

    return (

        <View loading={false} className='h-screen w-full'>

            <Suspense fallback={null}>
                {/* <Logo route='/blob' scale={0.6} position={[0, 0, 0]} />*/}
                <Common env={env} />
                {/* <Avatar /> */}
                <group ref={group} >
                <Tree />
                {mode === UI_MODES.PHOTO && env == 'warm' && <Gltf
                    position-y={-0.38}
                    src="/models/christmas scene.glb"
                    castShadow
                    receiveShadow
                    />}
                    {mode === UI_MODES.PHOTO && env == 'cool' && <Gltf
                        position-y={-0.38}
                        src="/models/cool scene.glb"
                        castShadow
                        receiveShadow
                    />}
                </group>
                
            </Suspense>
            <EffectComposer>
                <Bloom mipmapBlur luminanceThreshold={1.2} intensity={1.2} />
            </EffectComposer>
        </View>
    )
}   