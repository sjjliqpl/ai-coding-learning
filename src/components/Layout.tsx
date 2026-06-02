import { type ReactNode, useEffect } from 'react'
import Sidebar from './Sidebar'
import type { SidebarConfig } from './Sidebar'
import { useLang } from '../i18n/LanguageContext'

interface Props {
  sidebar: SidebarConfig
  children: ReactNode
  className?: string
}

export default function Layout({ sidebar, children, className }: Props) {
  const { lang, toggleLang } = useLang()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Sidebar config={sidebar} />
      <div className="lang-switcher">
        <button
          className={`lang-btn ${lang === 'zh' ? 'lang-active' : ''}`}
          onClick={lang === 'zh' ? undefined : toggleLang}
        >
          中
        </button>
        <span className="lang-divider">/</span>
        <button
          className={`lang-btn ${lang === 'en' ? 'lang-active' : ''}`}
          onClick={lang === 'en' ? undefined : toggleLang}
        >
          EN
        </button>
      </div>
      <main className={`main ${className || ''}`}>
        {children}
      </main>
    </>
  )
}
