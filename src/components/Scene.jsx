import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const COLORS = {
  cyan: '#22d3ee',
  violet: '#8b7bff',
  fuchsia: '#ff5ce1',
  blue: '#60a5fa',
  white: '#f3f5ff',
}

function fibonacciSphere(count, radius) {
  const points = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2
    const radiusAtY = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * radiusAtY * radius,
        y * radius,
        Math.sin(theta) * radiusAtY * radius,
      ),
    )
  }
  return points
}

function makePositions(count, spread) {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i += 3) {
    arr[i] = (Math.random() - 0.5) * spread
    arr[i + 1] = (Math.random() - 0.5) * spread * 0.7
    arr[i + 2] = (Math.random() - 0.5) * spread
  }
  return arr
}

function useWindowPointer() {
  const ref = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      ref.current.x = (e.clientX / window.innerWidth) * 2 - 1
      ref.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return ref
}

function NetworkSphere({ pointerRef }) {
  const linesRef = useRef()
  const pointsRef = useRef()

  const { linePositions, pointPositions } = useMemo(() => {
    const radius = 3.05
    const nodes = fibonacciSphere(230, radius)
    const pairs = []
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        if (nodes[i].distanceTo(nodes[j]) < 1.08) {
          pairs.push(nodes[i], nodes[j])
        }
      }
    }
    const linePos = new Float32Array(pairs.length * 3)
    pairs.forEach((p, i) => {
      linePos[i * 3] = p.x
      linePos[i * 3 + 1] = p.y
      linePos[i * 3 + 2] = p.z
    })
    const ptPos = new Float32Array(nodes.length * 3)
    nodes.forEach((p, i) => {
      ptPos[i * 3] = p.x
      ptPos[i * 3 + 1] = p.y
      ptPos[i * 3 + 2] = p.z
    })
    return { linePositions: linePos, pointPositions: ptPos }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const { x, y } = pointerRef.current
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.04 + x * 0.45
      linesRef.current.rotation.x = Math.sin(t * 0.09) * 0.12 + y * 0.32
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.04 + x * 0.45
      pointsRef.current.rotation.x = Math.sin(t * 0.09) * 0.12 + y * 0.32
    }
  })

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={COLORS.violet}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={COLORS.cyan}
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

function Core({ pointerRef }) {
  const wire = useRef()
  const glow = useRef()
  const ball = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const { x, y } = pointerRef.current
    const tx = x * 0.75
    const ty = y * 0.5

    if (wire.current) {
      wire.current.position.x += (tx - wire.current.position.x) * 0.05
      wire.current.position.y += (ty - wire.current.position.y) * 0.05
      wire.current.rotation.x += 0.003
      wire.current.rotation.y += 0.0045
      wire.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.05)
    }
    if (glow.current) {
      glow.current.position.x += (tx - glow.current.position.x) * 0.05
      glow.current.position.y += (ty - glow.current.position.y) * 0.05
      glow.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.1)
    }
    if (ball.current) {
      ball.current.position.x += (tx - ball.current.position.x) * 0.05
      ball.current.position.y += (ty - ball.current.position.y) * 0.05
    }
  })

  return (
    <group>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={COLORS.violet} wireframe transparent opacity={0.6} />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color={COLORS.fuchsia}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ball}>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshBasicMaterial color={COLORS.white} />
      </mesh>
    </group>
  )
}

function PulseRings() {
  const rings = useRef([])
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    rings.current.forEach((mesh, i) => {
      if (!mesh) return
      const period = 3.2 + i * 1.1
      const p = (t % period) / period
      mesh.scale.setScalar(0.4 + p * 3.6)
      mesh.material.opacity = (1 - p) * 0.45
      mesh.rotation.z = t * 0.06
    })
  })
  return (
    <group rotation={[Math.PI / 2.1, 0, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (rings.current[i] = el)}>
          <ringGeometry args={[0.98, 1.02, 96]} />
          <meshBasicMaterial
            color={COLORS.cyan}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

function FloatingGeometry({ position, rotation, color, children, depth = 0.6, speed = 1, floatIntensity = 1 }) {
  const ref = useRef()
  const base = useMemo(() => new THREE.Vector3(...position), [position])

  useFrame((state, delta) => {
    if (!ref.current) return
    const { x, y } = state.pointer
    ref.current.rotation.x += delta * 0.3 * speed
    ref.current.rotation.y += delta * 0.42 * speed
    ref.current.rotation.z += delta * 0.12 * speed
    const tx = base.x + x * depth
    const ty = base.y + y * depth * 0.8
    ref.current.position.x += (tx - ref.current.position.x) * 0.045
    ref.current.position.y += (ty - ref.current.position.y) * 0.045
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={floatIntensity}>
      <mesh ref={ref} position={position} rotation={rotation}>
        {children}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
          roughness={0.22}
          metalness={0.75}
        />
      </mesh>
    </Float>
  )
}

function FloatingShapes() {
  return (
    <group>
      <FloatingGeometry position={[-3.7, 1.6, -1.8]} rotation={[0.4, 0.2, 0]} color={COLORS.cyan} depth={1} speed={1.3}>
        <torusGeometry args={[0.55, 0.15, 24, 48]} />
      </FloatingGeometry>
      <FloatingGeometry position={[3.8, 2, -1.4]} rotation={[0.2, 0.6, 0]} color={COLORS.fuchsia} depth={1.15} speed={1.1}>
        <icosahedronGeometry args={[0.5, 0]} />
      </FloatingGeometry>
      <FloatingGeometry position={[3.1, -2.1, -2.8]} rotation={[0.8, 0.4, 0.2]} color={COLORS.violet} depth={0.9} speed={0.9}>
        <octahedronGeometry args={[0.55, 0]} />
      </FloatingGeometry>
      <FloatingGeometry position={[-3.5, -2, -2.4]} rotation={[0.3, 1, 0.5]} color={COLORS.blue} depth={1.25} speed={1.4} floatIntensity={1.6}>
        <tetrahedronGeometry args={[0.6, 0]} />
      </FloatingGeometry>
      <FloatingGeometry position={[0.7, 2.7, -4]} rotation={[0.5, 0.5, 0]} color={COLORS.white} depth={0.55} speed={0.7} floatIntensity={0.8}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
      </FloatingGeometry>
      <FloatingGeometry position={[-1.5, 2.9, -3.8]} rotation={[0, 0.4, 0.6]} color={COLORS.cyan} depth={0.7} speed={1.2} floatIntensity={1.4}>
        <torusKnotGeometry args={[0.34, 0.1, 64, 16]} />
      </FloatingGeometry>
    </group>
  )
}

function CursorLight({ pointerRef }) {
  const ref = useRef()
  useFrame(() => {
    if (!ref.current) return
    const { x, y } = pointerRef.current
    ref.current.position.x += (x * 5.2 - ref.current.position.x) * 0.09
    ref.current.position.y += (y * 3.2 - ref.current.position.y) * 0.09
  })
  return (
    <pointLight ref={ref} position={[0, 0, 2.6]} intensity={2.4} decay={0} distance={9} color={COLORS.fuchsia} />
  )
}

function CursorTrail({ pointerRef, count = 42 }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const positions = useMemo(() => {
    const pts = []
    for (let i = 0; i < count; i += 1) pts.push(new THREE.Vector3(0, 0, 6))
    return pts
  }, [count])

  useFrame(() => {
    const { x, y } = pointerRef.current
    const head = positions[0]
    head.x += (x * 3.6 - head.x) * 0.42
    head.y += (y * 2.2 - head.y) * 0.42
    head.z = 0.55
    for (let i = 1; i < count; i += 1) {
      const cur = positions[i]
      const prev = positions[i - 1]
      cur.x += (prev.x - cur.x) * 0.3
      cur.y += (prev.y - cur.y) * 0.3
      cur.z += (prev.z - cur.z) * 0.3
    }
    if (!mesh.current) return
    for (let i = 0; i < count; i += 1) {
      const scale = 1 - i / count
      dummy.position.copy(positions[i])
      dummy.scale.setScalar(0.1 + scale * 0.42)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={COLORS.cyan}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  )
}

function StarField() {
  const positions = useMemo(() => makePositions(1500, 64), [])
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={COLORS.blue}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  )
}

function Rig({ pointerRef }) {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    const { x, y } = pointerRef.current
    group.current.rotation.y += (x * 0.22 - group.current.rotation.y) * 0.05
    group.current.rotation.x += (y * 0.13 - group.current.rotation.x) * 0.05
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.45) * 0.12
  })
  return (
    <group ref={group}>
      <NetworkSphere pointerRef={pointerRef} />
      <Core pointerRef={pointerRef} />
      <PulseRings />
      <FloatingShapes />
      <CursorTrail pointerRef={pointerRef} />
    </group>
  )
}

export default function Scene() {
  const pointerRef = useWindowPointer()
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} />
      <pointLight position={[-6, -2, 4]} intensity={1.4} decay={0} color={COLORS.cyan} />
      <pointLight position={[6, 3, -4]} intensity={1.4} decay={0} color={COLORS.violet} />
      <CursorLight pointerRef={pointerRef} />
      <StarField />
      <Rig pointerRef={pointerRef} />
    </Canvas>
  )
}
