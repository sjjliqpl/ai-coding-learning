import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Language = 'zh' | 'en'

interface LanguageContextType {
  lang: Language
  toggleLang: () => void
  setLang: (lang: Language) => void
  t: (zh: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang')
    return (saved === 'en' || saved === 'zh') ? saved : 'zh'
  })

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'zh' ? 'en' : 'zh'
      localStorage.setItem('lang', next)
      return next
    })
  }, [])

  const setLangAndSave = useCallback((l: Language) => {
    localStorage.setItem('lang', l)
    setLang(l)
  }, [])

  const t = useCallback((zh: string, en: string) => lang === 'zh' ? zh : en, [lang])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang: setLangAndSave, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
