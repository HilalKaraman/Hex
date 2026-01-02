'use client'

import { Tree } from './Tree'
import { DestinationSign } from './DestinationSign'

interface Destination {
    position: [number, number, number]
    label: string
    labelTr: string
    targetPage: string
    rotation: number
    color: string
}

const destinations: Destination[] = [
    { position: [0, 0, -25], label: 'Services', labelTr: 'Hizmetler', targetPage: '/services', rotation: 0, color: '#FFF5E6' },
    { position: [25, 0, 0], label: 'Projects', labelTr: 'Projeler', targetPage: '/projects', rotation: -Math.PI / 2, color: '#FFF5E6' },
    { position: [-25, 0, 0], label: 'About', labelTr: 'Hakkımızda', targetPage: '/about', rotation: Math.PI / 2, color: '#FFF5E6' },
    { position: [0, 0, 25], label: 'Contact', labelTr: 'İletişim', targetPage: '/contact', rotation: Math.PI, color: '#FFF5E6' },
]

// Tree positions around the map
const treePositions: { pos: [number, number, number], scale: number, variant: 'pine' | 'round' }[] = [
    // Left side trees
    { pos: [-18, 0, -15], scale: 1.2, variant: 'pine' },
    { pos: [-20, 0, -8], scale: 0.9, variant: 'round' },
    { pos: [-18, 0, 0], scale: 1.1, variant: 'pine' },
    { pos: [-20, 0, 8], scale: 1, variant: 'round' },
    { pos: [-18, 0, 15], scale: 1.3, variant: 'pine' },

    // Right side trees
    { pos: [18, 0, -15], scale: 1.1, variant: 'round' },
    { pos: [20, 0, -8], scale: 1.2, variant: 'pine' },
    { pos: [18, 0, 0], scale: 0.9, variant: 'pine' },
    { pos: [20, 0, 8], scale: 1.1, variant: 'round' },
    { pos: [18, 0, 15], scale: 1, variant: 'pine' },

    // Top trees
    { pos: [-10, 0, -20], scale: 1.2, variant: 'pine' },
    { pos: [0, 0, -18], scale: 0.8, variant: 'round' },
    { pos: [10, 0, -20], scale: 1.1, variant: 'pine' },

    // Bottom trees
    { pos: [-10, 0, 20], scale: 1, variant: 'round' },
    { pos: [10, 0, 20], scale: 1.2, variant: 'pine' },

    // Corner decorations
    { pos: [-22, 0, -22], scale: 1.4, variant: 'pine' },
    { pos: [22, 0, -22], scale: 1.3, variant: 'pine' },
    { pos: [-22, 0, 22], scale: 1.2, variant: 'pine' },
    { pos: [22, 0, 22], scale: 1.5, variant: 'pine' },
]

interface GameMapProps {
    language: 'en' | 'tr'
}

export function GameMap({ language }: GameMapProps) {
    return (
        <group>
            {/* Ground - Light cream background */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[60, 60]} />
                <meshStandardMaterial color="#FFF8F0" roughness={0.9} />
            </mesh>

            {/* Main Roads - Cross Pattern - ORANGE */}
            {/* Vertical Road (North-South) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
                <planeGeometry args={[6, 50]} />
                <meshStandardMaterial color="#FF8C42" roughness={0.6} />
            </mesh>

            {/* Horizontal Road (East-West) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
                <planeGeometry args={[50, 6]} />
                <meshStandardMaterial color="#FF8C42" roughness={0.6} />
            </mesh>

            {/* Road Lines - Center */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -10]}>
                <planeGeometry args={[0.2, 15]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 10]}>
                <planeGeometry args={[0.2, 15]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-10, 0.02, 0]}>
                <planeGeometry args={[15, 0.2]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0.02, 0]}>
                <planeGeometry args={[15, 0.2]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Center Circle (Roundabout) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <ringGeometry args={[2, 2.5, 32]} />
                <meshStandardMaterial color="#FF6B35" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
                <circleGeometry args={[2, 32]} />
                <meshStandardMaterial color="#FFF5E6" roughness={0.8} />
            </mesh>

            {/* Start Position Marker */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
                <ringGeometry args={[1, 1.3, 32]} />
                <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={0.3} />
            </mesh>

            {/* Destination Signs */}
            {destinations.map((dest, i) => (
                <DestinationSign
                    key={i}
                    position={dest.position}
                    label={language === 'tr' ? dest.labelTr : dest.label}
                    targetPage={dest.targetPage}
                    rotation={dest.rotation}
                    color={dest.color}
                />
            ))}

            {/* Trees */}
            {treePositions.map((tree, i) => (
                <Tree
                    key={i}
                    position={tree.pos}
                    scale={tree.scale}
                    variant={tree.variant}
                />
            ))}

            {/* Boundary Walls - Orange borders */}
            {/* North Wall */}
            <mesh position={[0, 0.3, -28]} castShadow>
                <boxGeometry args={[56, 0.6, 1]} />
                <meshStandardMaterial color="#FF6B35" roughness={0.7} />
            </mesh>
            {/* South Wall */}
            <mesh position={[0, 0.3, 28]} castShadow>
                <boxGeometry args={[56, 0.6, 1]} />
                <meshStandardMaterial color="#FF6B35" roughness={0.7} />
            </mesh>
            {/* East Wall */}
            <mesh position={[28, 0.3, 0]} castShadow>
                <boxGeometry args={[1, 0.6, 56]} />
                <meshStandardMaterial color="#FF6B35" roughness={0.7} />
            </mesh>
            {/* West Wall */}
            <mesh position={[-28, 0.3, 0]} castShadow>
                <boxGeometry args={[1, 0.6, 56]} />
                <meshStandardMaterial color="#FF6B35" roughness={0.7} />
            </mesh>
        </group>
    )
}

export { destinations }
