'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { translations } from '../translations'

type Language = 'en' | 'tr'

interface LanguageContextType {
    lang: Language
    t: typeof translations.en
    toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>('tr')

    const toggleLanguage = () => {
        setLang(prev => prev === 'en' ? 'tr' : 'en')
    }

    const value = {
        lang,
        t: translations[lang],
        toggleLanguage
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
