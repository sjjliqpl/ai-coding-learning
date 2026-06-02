import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

export interface NavItem {
  id: string
  label: string
  labelEn?: string
  path?: string
}

export interface NavGroup {
  title: string
  titleEn?: string
  items: NavItem[]
}

export interface SidebarConfig {
  brandText: string
  brandTextEn?: string
  brandGradient: string
  activeClass: string
  groups: NavGroup[]
  backTo?: { label: string; labelEn?: string; path: string }
}

interface Props {
  config: SidebarConfig
}

export default function Sidebar({ config }: Props) {
  const [activeId, setActiveId] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useLang()

  const handleScroll = useCallback(() => {
    const sections = config.groups.flatMap(g => g.items).map(i => document.getElementById(i.id))
    let current = ''
    for (const section of sections) {
      if (section && section.getBoundingClientRect().top <= 120) {
        current = section.id
      }
    }
    setActiveId(current)
  }, [config])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside className="sidebar">
      <span
        className={`brand ${config.brandGradient}`}
        onClick={() => navigate('/')}
      >
        {config.brandGradient === 'terminal-brand' ? (
          <>{'>'} {lang === 'en' && config.brandTextEn ? config.brandTextEn : config.brandText} <span>_</span></>
        ) : (lang === 'en' && config.brandTextEn ? config.brandTextEn : config.brandText)}
      </span>

      {config.groups.map((group, gi) => (
        <div className="menu-group" key={gi}>
          <div className="menu-title">{lang === 'en' && group.titleEn ? group.titleEn : group.title}</div>
          <ul className="menu-list">
            {group.items.map(item => (
              <li className="menu-item" key={item.id}>
                <span
                  className={`menu-link ${activeId === item.id ? config.activeClass : ''}`}
                  data-nav={item.path ? 'true' : undefined}
                  onClick={() => item.path ? navigate(item.path) : scrollTo(item.id)}
                >
                  {lang === 'en' && item.labelEn ? item.labelEn : item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {config.backTo && location.pathname !== '/' && (
        <div className="back-btn" onClick={() => navigate(config.backTo!.path)}>
          ← {lang === 'en' && config.backTo!.labelEn ? config.backTo!.labelEn : config.backTo!.label}
        </div>
      )}
    </aside>
  )
}
