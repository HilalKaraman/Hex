'use client'

import { useEffect, useState, useCallback } from 'react'

interface KeyState {
    forward: boolean
    backward: boolean
    left: boolean
    right: boolean
}

export function useKeyboardControls() {
    const [keys, setKeys] = useState<KeyState>({
        forward: false,
        backward: false,
        left: false,
        right: false
    })

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        switch (e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                setKeys(prev => ({ ...prev, forward: true }))
                break
            case 's':
            case 'arrowdown':
                setKeys(prev => ({ ...prev, backward: true }))
                break
            case 'a':
            case 'arrowleft':
                setKeys(prev => ({ ...prev, left: true }))
                break
            case 'd':
            case 'arrowright':
                setKeys(prev => ({ ...prev, right: true }))
                break
        }
    }, [])

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        switch (e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                setKeys(prev => ({ ...prev, forward: false }))
                break
            case 's':
            case 'arrowdown':
                setKeys(prev => ({ ...prev, backward: false }))
                break
            case 'a':
            case 'arrowleft':
                setKeys(prev => ({ ...prev, left: false }))
                break
            case 'd':
            case 'arrowright':
                setKeys(prev => ({ ...prev, right: false }))
                break
        }
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    return keys
}
