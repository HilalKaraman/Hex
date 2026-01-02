'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Hexagon({ ...props }) {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.2
        meshRef.current.rotation.y += delta * 0.3
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
            <mesh ref={meshRef} {...props}>
                <cylinderGeometry args={[2, 2, 1, 6]} />
                <meshPhysicalMaterial
                    color="#000000"
                    emissive="#6d28d9"
                    emissiveIntensity={0.5}
                    roughness={0}
                    metalness={1}
                    clearcoat={1}
                    transparent={true}
                    opacity={0.8}
                />
            </mesh>
            {/* Wireframe overlay for tech look */}
            <mesh ref={meshRef} {...props} scale={[1.01, 1.01, 1.01]}>
                <cylinderGeometry args={[2, 2, 1, 6]} />
                <meshBasicMaterial color="#a78bfa" wireframe={true} transparent opacity={0.3} />
            </mesh>
        </Float>
    )
}

export default function Hero3D() {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '400px', pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
                <Hexagon position={[2, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]} />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
