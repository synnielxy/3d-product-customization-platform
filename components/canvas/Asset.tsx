import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useConfiguratorStore } from "@/store/store";
import { GLTF } from "three-stdlib";
import * as THREE from 'three';

type AssetProps = {
    url: string;
    categoryName: string;
};

export const Asset = ({ url, categoryName }: AssetProps) => {
    const { scene } = useGLTF(url) as GLTF;
    const customization = useConfiguratorStore((state) => state.customization);
    

    useEffect(() => {
        const assetColor = customization[categoryName].color;
        if (assetColor === '') return;

        scene.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).name?.includes("Color_")) {
                    const material = mesh.material as THREE.MeshStandardMaterial;
                    material.color = new THREE.Color(assetColor);
                }
            }
        });
    }, [customization, scene]);

    const attachedItems = useMemo(() => {
        const items: { geometry: THREE.BufferGeometry; material: THREE.Material }[] = [];
        scene.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                items.push({
                    geometry: mesh.geometry,
                    material: mesh.material instanceof Array ? mesh.material[0] : mesh.material,
                });
            }
        });
        return items;
    }, [scene]);

    return (
        <group>
            {attachedItems.map((item, index) => (
                <mesh
                    key={index}
                    geometry={item.geometry}
                    material={item.material}
                    castShadow
                    receiveShadow
                />
            ))}
        </group>
    );
};
