import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SIZE = 1024
const PALETTE = ['#e8502e', '#f2a33c', '#7a1e14', '#fdf0dc']

function drawKolam(ctx, [primary, secondary, deep, cream]) {
  const c = SIZE / 2
  ctx.clearRect(0, 0, SIZE, SIZE)
  ctx.translate(c, c)

  const segment = (fn, count) => {
    for (let i = 0; i < count; i += 1) {
      ctx.save()
      ctx.rotate((i / count) * Math.PI * 2)
      fn(i)
      ctx.restore()
    }
  }

  ctx.fillStyle = primary
  segment(() => {
    ctx.beginPath()
    ctx.arc(448, 0, 9, 0, Math.PI * 2)
    ctx.fill()
  }, 24)

  segment(() => {
    ctx.beginPath()
    ctx.moveTo(0, -258)
    ctx.quadraticCurveTo(80, -336, 0, -414)
    ctx.quadraticCurveTo(-80, -336, 0, -258)
    ctx.fillStyle = primary
    ctx.fill()
    ctx.strokeStyle = cream
    ctx.lineWidth = 3
    ctx.stroke()
  }, 16)

  segment(() => {
    ctx.rotate(Math.PI / 16)
    ctx.beginPath()
    ctx.moveTo(0, -270)
    ctx.quadraticCurveTo(54, -330, 0, -384)
    ctx.quadraticCurveTo(-54, -330, 0, -270)
    ctx.fillStyle = secondary
    ctx.fill()
    ctx.strokeStyle = 'rgba(26, 15, 8, 0.18)'
    ctx.lineWidth = 2
    ctx.stroke()
  }, 16)

  ctx.strokeStyle = deep
  ctx.lineWidth = 7
  ctx.beginPath()
  ctx.arc(0, 0, 250, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = cream
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(0, 0, 242, 0, Math.PI * 2)
  ctx.stroke()

  segment(() => {
    ctx.beginPath()
    ctx.moveTo(0, -116)
    ctx.quadraticCurveTo(60, -182, 0, -238)
    ctx.quadraticCurveTo(-60, -182, 0, -116)
    ctx.fillStyle = secondary
    ctx.fill()
    ctx.strokeStyle = primary
    ctx.lineWidth = 3
    ctx.stroke()
  }, 8)

  ctx.fillStyle = deep
  segment(() => {
    ctx.beginPath()
    ctx.arc(168, 0, 7, 0, Math.PI * 2)
    ctx.fill()
  }, 12)

  ctx.fillStyle = primary
  ctx.beginPath()
  ctx.arc(0, 0, 62, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = cream
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(0, 0, 78, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = deep
  ctx.beginPath()
  ctx.arc(0, 0, 26, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = cream
  ctx.beginPath()
  ctx.arc(0, 0, 10, 0, Math.PI * 2)
  ctx.fill()
}

function useKolamTexture(colors) {
  const key = colors.join('|')
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = SIZE
    canvas.height = SIZE
    drawKolam(canvas.getContext('2d'), colors)
    const texture = new THREE.CanvasTexture(canvas)
    texture.anisotropy = 4
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}

function KolamPlane({ colors, opacity, size, speed }) {
  const ref = useRef()
  const texture = useKolamTexture(colors)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime() * speed
    ref.current.rotation.z = t * 0.08
    ref.current.rotation.x = Math.sin(t * 0.13) * 0.07
    ref.current.rotation.y = Math.cos(t * 0.11) * 0.06
  })

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default function Kolam({ opacity = 0.5, size = 6, speed = 1, colors = PALETTE, dpr = [1, 1.5] }) {
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <KolamPlane colors={colors} opacity={opacity} size={size} speed={speed} />
    </Canvas>
  )
}
