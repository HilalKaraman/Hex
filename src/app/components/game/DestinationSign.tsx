'use client'

import { Text } from '@react-three/drei'

interface DestinationSignProps {
    position: [number, number, number]
    label: string
    targetPage: string
    rotation?: number
    color?: string
}

export function DestinationSign({
    position,
    label,
    targetPage,
    rotation = 0,
    color = '#FFF5E6'
}: DestinationSignProps) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {/* Pole - Cream color */}
            <mesh position={[0, 1.2, 0]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 2.4, 8]} />
                <meshStandardMaterial color="#E8DDD0" metalness={0.3} roughness={0.6} />
            </mesh>

            {/* Sign Board - Cream/White */}
            <mesh position={[0, 2.6, 0]} castShadow>
                <boxGeometry args={[3.2, 1.0, 0.1]} />
                <meshStandardMaterial color="#FFF5E6" roughness={0.4} />
            </mesh>

            {/* Sign Border - White */}
            <mesh position={[0, 2.6, 0.06]}>
                <boxGeometry args={[3.3, 1.1, 0.02]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>

            {/* Text - Front */}
            <Text
                position={[0, 2.6, 0.12]}
                fontSize={0.5}
                color="#333333"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
            >
                {label}
            </Text>

            {/* Text - Back (Rotated 180 degrees) */}
            <Text
                position={[0, 2.6, -0.12]}
                rotation={[0, Math.PI, 0]}
                fontSize={0.5}
                color="#333333"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
            >
                {label}
            </Text>

            {/* Arrow pointing down to destination */}
            <mesh position={[0, 1.7, 0]} rotation={[0, 0, Math.PI]}>
                <coneGeometry args={[0.15, 0.3, 3]} />
                <meshStandardMaterial color="#FF8C42" />
            </mesh>

            {/* Destination Zone Marker (invisible trigger) */}
            <mesh position={[0, 0.01, 0]} visible={false}>
                <cylinderGeometry args={[2, 2, 0.1, 16]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Glowing ground marker - Orange */}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.5, 2, 32]} />
                <meshStandardMaterial
                    color="#FF8C42"
                    emissive="#FF8C42"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.5}
                    side={2}
                />
            </mesh>
        </group>
    )
}
