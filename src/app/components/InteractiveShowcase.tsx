'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { useLanguage } from './LanguageContext'

function DiamondRing(props: any) {
    const groupRef = useRef<THREE.Group>(null!)

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15
        }
    })

    return (
        <group ref={groupRef} {...props}>
            {/* Gold Ring Band */}
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                <torusGeometry args={[1, 0.12, 32, 100]} />
                <meshStandardMaterial
                    color="#D4AF37"
                    roughness={0.15}
                    metalness={0.95}
                    envMapIntensity={2}
                />
            </mesh>

            {/* Diamond Setting Base (Prong) */}
            <mesh position={[0, 0.95, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.08, 0.35, 6]} />
                <meshStandardMaterial
                    color="#D4AF37"
                    roughness={0.15}
                    metalness={0.95}
                />
            </mesh>

            {/* WHITE DIAMOND - Main Gem */}
            <mesh position={[0, 1.25, 0]} castShadow>
                <octahedronGeometry args={[0.5, 2]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0}
                    metalness={0}
                    transmission={0.95}
                    thickness={0.5}
                    ior={2.42}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    reflectivity={1}
                    envMapIntensity={3}
                />
            </mesh>

            {/* Diamond Sparkle Highlights */}
            <pointLight position={[0, 1.5, 0]} intensity={0.5} color="#ffffff" distance={2} />
        </group>
    )
}

export default function InteractiveShowcase() {
    const { t } = useLanguage()

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '350px', background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)', borderRadius: '24px' }}>
            {/* Badge */}
            <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.75rem', color: 'white', fontWeight: 500, pointerEvents: 'none' }}>
                {t.hero.interactive?.badge || '🖱️ Döndürmeyi Dene'}
            </div>

            <Canvas
                dpr={[1, 2]}
                shadows
                gl={{ antialias: true, powerPreference: "high-performance" }}
                camera={{ position: [0, 2, 5], fov: 40 }}
            >
                {/* Showroom Lighting */}
                <ambientLight intensity={0.4} />

                {/* Key Light - Main spotlight from top-right */}
                <spotLight
                    position={[5, 8, 5]}
                    angle={0.5}
                    penumbra={1}
                    intensity={3}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                    color="#ffffff"
                />

                {/* Fill Light - Softer light from left */}
                <spotLight
                    position={[-5, 5, 3]}
                    angle={0.6}
                    penumbra={1}
                    intensity={1.5}
                    color="#e0e7ff"
                />

                {/* Rim/Back Light */}
                <pointLight position={[0, 5, -5]} intensity={1} color="#a78bfa" />

                {/* Environment for reflections */}
                <Environment preset="studio" />

                {/* Controls */}
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.8}
                    enableZoom={true}
                    enablePan={false}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={3}
                    maxDistance={8}
                />

                {/* Diamond Ring */}
                <group position={[0, 0.5, 0]}>
                    <DiamondRing rotation={[0.1, 0, 0]} />
                </group>

                {/* Floor Shadow */}
                <ContactShadows
                    position={[0, -0.5, 0]}
                    opacity={0.6}
                    scale={8}
                    blur={2}
                    far={4}
                    color="#000000"
                />

                {/* Showroom Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                    <circleGeometry args={[4, 64]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        roughness={0.3}
                        metalness={0.5}
                    />
                </mesh>
            </Canvas>
        </div>
    )
}
