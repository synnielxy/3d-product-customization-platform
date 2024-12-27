'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
const DEFAULT_CAMERA_POSITION = [-1, 1, 10];
const Layout = ({ children }) => {
  const ref = useRef()

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
        overflow: 'auto',
        touchAction: 'auto',
      }}
    >
      {children}
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
        camera={{
          position: DEFAULT_CAMERA_POSITION,
          fov: 45,
        }}
        gl={{
          preserveDrawingBuffer: true,
        }}
        shadows
      />
    </div>
  )
}

export { Layout }
