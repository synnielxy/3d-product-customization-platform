'use client'

import dynamic from 'next/dynamic'
import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import {
  Environment,
  SoftShadows,
} from "@react-three/drei";
import { Three } from '@/utils/helpers/components/Three'
import { CameraManager } from './CameraManager'
const ViewImpl = dynamic(() => import('@react-three/drei').then((mod) => mod.View), { ssr: false })

export const Common = ({ env }: { env?: string | null }) => {
  return (
    <Suspense fallback={null}>
      <color attach='background' args={[env === 'warm' ? "#1f1a15" : "#130f30"]} />
      <fog attach="fog" args={[env === 'warm' ? "#1f1a15" : "#130f30", 10, 40]} />

      <Environment preset={env === 'warm' ? "sunset" : "city"} environmentIntensity={env === 'warm' ? 0.4 : 0.3} />

      <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.5}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={env === 'warm' ? "#2a1f1a" : "#333"} roughness={0.85} />
      </mesh>

      <SoftShadows size={52} samples={16} focus={0.5} />

      {env === 'warm' ? (
        // 温暖的圣诞节氛围灯光
        <>
          {/* 主光源 - 暖色调 */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.8}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
            color="#ffd4a4"
          />
          {/* 补光 - 柔和的暖色调 */}
          <directionalLight position={[-5, 5, 5]} intensity={0.6} color="#ffe0b3" />
          {/* 装饰光源 - 圣诞红色和金色 */}
          <directionalLight position={[3, 3, -5]} intensity={4} color="#ff4d4d" />
          <directionalLight
            position={[-3, 3, -5]}
            intensity={5}
            color="#ffb347"
          />
        </>
      ) : (
        // 默认灯光
        <>
          {/* Key Light */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={2.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
          />
          {/* Fill Light */}
          <directionalLight position={[-5, 5, 5]} intensity={0.7} />
          {/* Back Lights */}
          <directionalLight position={[3, 3, -5]} intensity={6} color={"#ff3b3b"} />
          <directionalLight
            position={[-3, 3, -5]}
            intensity={8}
            color={"#3cb1ff"}
          />
        </>
      )}
    </Suspense>
  )
}

interface ViewProps {
  children?: React.ReactNode
  loading?: boolean
  [key: string]: any
}

const View = forwardRef<HTMLDivElement, ViewProps>(({ children, loading, ...props }, ref) => {
  const localRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          <CameraManager loading={loading} />
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
