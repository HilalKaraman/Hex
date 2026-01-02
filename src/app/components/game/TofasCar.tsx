'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TofasCarProps {
    position: [number, number, number]
    rotation: number
    color?: string
}

export function TofasCar({ position, rotation, color = '#C41E3A' }: TofasCarProps) {
    const carRef = useRef<THREE.Group>(null!)

    useFrame(() => {
        if (carRef.current) {
            carRef.current.position.set(position[0], position[1], position[2])
            carRef.current.rotation.y = rotation
        }
    })

    return (
        <group ref={carRef} position={position} rotation={[0, rotation, 0]}>
            {/* Main Body - Lower Part */}
            <mesh position={[0, 0.25, 0]} castShadow>
                <boxGeometry args={[1.8, 0.4, 4]} />
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Main Body - Upper Cabin */}
            <mesh position={[0, 0.65, -0.2]} castShadow>
                <boxGeometry args={[1.6, 0.5, 2.2]} />
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Front Hood - Sloped */}
            <mesh position={[0, 0.35, 1.3]} rotation={[-0.3, 0, 0]} castShadow>
                <boxGeometry args={[1.7, 0.15, 1.2]} />
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Trunk */}
            <mesh position={[0, 0.35, -1.5]} rotation={[0.2, 0, 0]} castShadow>
                <boxGeometry args={[1.7, 0.15, 0.8]} />
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Front Windshield */}
            <mesh position={[0, 0.7, 0.7]} rotation={[-0.5, 0, 0]}>
                <boxGeometry args={[1.5, 0.02, 0.8]} />
                <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
            </mesh>

            {/* Rear Windshield */}
            <mesh position={[0, 0.7, -1.1]} rotation={[0.4, 0, 0]}>
                <boxGeometry args={[1.5, 0.02, 0.6]} />
                <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
            </mesh>

            {/* Side Windows - Left */}
            <mesh position={[-0.81, 0.65, -0.2]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.4, 0.02, 1.8]} />
                <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} transparent opacity={0.6} />
            </mesh>

            {/* Side Windows - Right */}
            <mesh position={[0.81, 0.65, -0.2]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.4, 0.02, 1.8]} />
                <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} transparent opacity={0.6} />
            </mesh>

            {/* Wheels */}
            {/* Front Left */}
            <group position={[-0.9, 0.15, 1.2]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.22, 8]} />
                    <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.3} />
                </mesh>
            </group>

            {/* Front Right */}
            <group position={[0.9, 0.15, 1.2]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.22, 8]} />
                    <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.3} />
                </mesh>
            </group>

            {/* Rear Left */}
            <group position={[-0.9, 0.15, -1.2]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.22, 8]} />
                    <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.3} />
                </mesh>
            </group>

            {/* Rear Right */}
            <group position={[0.9, 0.15, -1.2]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.22, 8]} />
                    <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.3} />
                </mesh>
            </group>

            {/* Headlights */}
            <mesh position={[-0.6, 0.3, 1.95]}>
                <boxGeometry args={[0.3, 0.15, 0.1]} />
                <meshStandardMaterial color="#ffffcc" emissive="#ffff00" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.6, 0.3, 1.95]}>
                <boxGeometry args={[0.3, 0.15, 0.1]} />
                <meshStandardMaterial color="#ffffcc" emissive="#ffff00" emissiveIntensity={0.5} />
            </mesh>

            {/* Taillights */}
            <mesh position={[-0.6, 0.3, -1.95]}>
                <boxGeometry args={[0.3, 0.15, 0.1]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0.6, 0.3, -1.95]}>
                <boxGeometry args={[0.3, 0.15, 0.1]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
            </mesh>

            {/* Front Grille */}
            <mesh position={[0, 0.25, 1.95]}>
                <boxGeometry args={[0.8, 0.2, 0.05]} />
                <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* License Plate */}
            <mesh position={[0, 0.15, 1.96]}>
                <boxGeometry args={[0.5, 0.12, 0.02]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
        </group>
    )
}
