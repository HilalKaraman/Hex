'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'
import { Joystick } from 'react-joystick-component'
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'

import { TofasCar } from '../components/game/TofasCar'
import { GameMap, destinations } from '../components/game/GameMap'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { useLanguage } from '../components/LanguageContext'
import Link from 'next/link'

// Joystick Data Type
type JoystickData = {
    x: number
    y: number
}

// Car Controller Component
function CarController({
    onDestinationReached,
    joystickRef
}: {
    onDestinationReached: (page: string) => void
    joystickRef: React.MutableRefObject<JoystickData>
}) {
    const keys = useKeyboardControls()
    const [position, setPosition] = useState<[number, number, number]>([0, 0, 5])
    const [rotation, setRotation] = useState(0)
    const velocityRef = useRef(0)

    // Camera access
    const { camera } = useThree()

    const SPEED = 0.15
    const ROTATION_SPEED = 0.04
    const FRICTION = 0.95
    const MAX_SPEED = 0.4

    useFrame(() => {
        const joy = joystickRef.current

        // Handle rotation (Keyboard + Joystick)
        // Keyboard: Left (+), Right (-)
        // Joystick: Left (-x), Right (+x) -> We need to invert Joystick X to match rotation direction
        let turnFactor = 0
        if (keys.left) turnFactor += 1
        if (keys.right) turnFactor -= 1

        // Joystick X: -1 (left) to 1 (right)
        // We want left to limit to +1 rotation diff -> -(-1) = +1
        // We want right to limit to -1 rotation diff -> -(1) = -1
        if (joy.x !== 0) turnFactor -= joy.x

        if (turnFactor !== 0) {
            setRotation(prev => prev + turnFactor * ROTATION_SPEED)
        }

        // Handle acceleration (Keyboard + Joystick)
        let accelFactor = 0
        if (keys.forward) accelFactor += 1
        if (keys.backward) accelFactor -= 1

        // Joystick Y: -1 (bottom) to 1 (top)
        if (joy.y !== 0) accelFactor += joy.y

        if (accelFactor > 0) {
            velocityRef.current = Math.min(velocityRef.current + SPEED * Math.abs(accelFactor) * 0.1, MAX_SPEED)
        } else if (accelFactor < 0) {
            velocityRef.current = Math.max(velocityRef.current - SPEED * Math.abs(accelFactor) * 0.1, -MAX_SPEED * 0.5)
        } else {
            velocityRef.current *= FRICTION
        }

        // Apply velocity
        if (Math.abs(velocityRef.current) > 0.001) {
            setPosition(prev => {
                // Fixed movement logic: Car faces +Z, so forward means increasing Z (with cos)
                // User's verified direction:
                const newX = prev[0] + Math.sin(rotation) * velocityRef.current
                const newZ = prev[2] + Math.cos(rotation) * velocityRef.current

                // Boundary check (approx 50x50 map)
                const clampedX = Math.max(-26, Math.min(26, newX))
                const clampedZ = Math.max(-26, Math.min(26, newZ))

                return [clampedX, prev[1], clampedZ]
            })
        }

        // Camera Follow Logic (Isometric view)
        const offset = new THREE.Vector3(20, 20, 20)
        const targetPos = new THREE.Vector3(position[0], 0, position[2]).add(offset)

        // Smoothly move camera
        camera.position.lerp(targetPos, 0.1)
        camera.lookAt(position[0], 0, position[2])

        // Check destination collision
        destinations.forEach(dest => {
            const dx = position[0] - dest.position[0]
            const dz = position[2] - dest.position[2]
            const distance = Math.sqrt(dx * dx + dz * dz)

            if (distance < 3.5) {
                onDestinationReached(dest.targetPage)
            }
        })
    })

    return <TofasCar position={position} rotation={rotation} color="#C41E3A" />
}

// Loading Component
function LoadingScreen() {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFCFC',
            color: '#43394C',
            fontSize: '1.5rem',
            fontFamily: 'sans-serif'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px', animation: 'bounce 1s infinite' }}>🚗</div>
                <div>Yükleniyor...</div>
            </div>
        </div>
    )
}

export default function ExplorePage() {
    const router = useRouter()
    const { t, lang } = useLanguage()
    const [reachedDestination, setReachedDestination] = useState<string | null>(null)
    const [showInstructions, setShowInstructions] = useState(true)

    // Joystick state ref
    const joystickRef = useRef<JoystickData>({ x: 0, y: 0 })

    const handleJoystickMove = (event: IJoystickUpdateEvent) => {
        joystickRef.current = {
            x: event.x ?? 0,
            y: event.y ?? 0
        }
    }

    const handleJoystickStop = () => {
        joystickRef.current = { x: 0, y: 0 }
    }

    const handleDestinationReached = (page: string) => {
        if (!reachedDestination) {
            setReachedDestination(page)
        }
    }

    const confirmNavigation = () => {
        if (reachedDestination) {
            router.push(reachedDestination)
        }
    }

    const cancelNavigation = () => {
        setReachedDestination(null)
    }

    // Hide instructions after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowInstructions(false), 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#FFFCFC', position: 'relative' }}>
            {/* Back Button */}
            <Link href="/" style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 100,
                background: 'rgba(255,140,66,0.9)',
                backdropFilter: 'blur(10px)',
                padding: '12px 20px',
                borderRadius: '12px',
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                fontWeight: 500,
                border: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(255,140,66,0.3)'
            }}>
                ← {lang === 'tr' ? 'Ana Sayfa' : 'Home'}
            </Link>

            {/* Instructions */}
            {showInstructions && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 100,
                    background: 'rgba(255, 107, 53, 0.95)',
                    backdropFilter: 'blur(10px)',
                    padding: '16px 32px',
                    borderRadius: '16px',
                    color: 'white',
                    textAlign: 'center',
                    animation: 'fadeIn 0.5s ease',
                    boxShadow: '0 4px 12px rgba(255,107,53,0.3)',
                    minWidth: '300px'
                }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>
                        {lang === 'tr' ? '🎮 Araba Kontrolü' : '🎮 Car Controls'}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        {lang === 'tr'
                            ? 'Sürmek için Joystick veya Klavye kullanın'
                            : 'Use Joystick or Keyboard to drive'}
                    </div>
                </div>
            )}

            {/* Joystick for Mobile/Touch - Replaces WASD keys */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '40px',
                zIndex: 100,
            }}>
                <Joystick
                    size={100}
                    sticky={false}
                    baseColor="rgba(255, 107, 53, 0.3)"
                    stickColor="#FF8C42"
                    move={handleJoystickMove}
                    stop={handleJoystickStop}
                />
            </div>

            {/* Destination Reached Modal */}
            {reachedDestination && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 200
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '40px',
                        textAlign: 'center',
                        maxWidth: '400px',
                        animation: 'scaleIn 0.3s ease',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#1a1a2e' }}>
                            {lang === 'tr' ? 'Hedefe Ulaştınız!' : 'Destination Reached!'}
                        </h2>
                        <p style={{ color: '#666', marginBottom: '24px' }}>
                            {lang === 'tr'
                                ? `${reachedDestination.replace('/', '').charAt(0).toUpperCase() + reachedDestination.slice(2)} sayfasına gitmek ister misiniz?`
                                : `Would you like to go to the ${reachedDestination.replace('/', '')} page?`}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                onClick={cancelNavigation}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    border: '1px solid #ddd',
                                    background: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}
                            >
                                {lang === 'tr' ? 'Devam Et' : 'Keep Driving'}
                            </button>
                            <button
                                onClick={confirmNavigation}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: '#FF8C42',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 600
                                }}
                            >
                                {lang === 'tr' ? 'Git' : 'Go'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 3D Canvas */}
            <Suspense fallback={<LoadingScreen />}>
                <Canvas shadows dpr={[1, 2]}>
                    <OrthographicCamera
                        makeDefault
                        position={[20, 20, 20]} // Initial position
                        zoom={12} // Adjusted to 12 as requested earlier for wider view
                        near={-50}
                        far={200}
                        onUpdate={c => c.lookAt(0, 0, 0)}
                    />

                    {/* Lighting - Brighter */}
                    <ambientLight intensity={0.7} />
                    <directionalLight
                        position={[10, 20, 10]}
                        intensity={1.5}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                        shadow-camera-left={-50}
                        shadow-camera-right={50}
                        shadow-camera-top={50}
                        shadow-camera-bottom={-50}
                    />
                    <hemisphereLight args={['#fff', '#333', 0.6]} />

                    {/* Game Elements */}
                    <GameMap language={lang as 'en' | 'tr'} />
                    <CarController
                        onDestinationReached={handleDestinationReached}
                        joystickRef={joystickRef}
                    />
                </Canvas>
            </Suspense>

            {/* CSS Animations */}
            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </div>
    )
}
