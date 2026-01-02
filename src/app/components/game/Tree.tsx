'use client'

import * as THREE from 'three'

interface TreeProps {
    position: [number, number, number]
    scale?: number
    variant?: 'pine' | 'round'
}

export function Tree({ position, scale = 1, variant = 'pine' }: TreeProps) {
    return (
        <group position={position} scale={scale}>
            {/* Trunk */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
                <meshStandardMaterial color="#5D4037" roughness={0.9} />
            </mesh>

            {variant === 'pine' ? (
                <>
                    {/* Pine Foliage - 3 layers */}
                    <mesh position={[0, 1.2, 0]} castShadow>
                        <coneGeometry args={[0.8, 1.2, 8]} />
                        <meshStandardMaterial color="#2E7D32" roughness={0.8} />
                    </mesh>
                    <mesh position={[0, 1.8, 0]} castShadow>
                        <coneGeometry args={[0.6, 1, 8]} />
                        <meshStandardMaterial color="#388E3C" roughness={0.8} />
                    </mesh>
                    <mesh position={[0, 2.3, 0]} castShadow>
                        <coneGeometry args={[0.4, 0.8, 8]} />
                        <meshStandardMaterial color="#43A047" roughness={0.8} />
                    </mesh>
                </>
            ) : (
                /* Round Tree Foliage */
                <mesh position={[0, 1.5, 0]} castShadow>
                    <sphereGeometry args={[0.8, 16, 16]} />
                    <meshStandardMaterial color="#4CAF50" roughness={0.8} />
                </mesh>
            )}
        </group>
    )
}
