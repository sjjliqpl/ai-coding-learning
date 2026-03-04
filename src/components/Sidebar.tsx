import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export interface NavItem {
  id: string
  label: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface SidebarConfig {
  brandText: string
  brandGradient: string
  activeClass: string
  groups: NavGroup[]
  backTo?: { label: string; path: string }
}

interface Props {
  config: SidebarConfig
}

export default function Sidebar({ config }: Props) {
  const [activeId, setActiveId] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

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
          <>{'>'} {config.brandText} <span>_</span></>
        ) : config.brandText}
      </span>

      {config.groups.map((group, gi) => (
        <div className="menu-group" key={gi}>
          <div className="menu-title">{group.title}</div>
          <ul className="menu-list">
            {group.items.map(item => (
              <li className="menu-item" key={item.id}>
                <span
                  className={`menu-link ${activeId === item.id ? config.activeClass : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {config.backTo && location.pathname !== '/' && (
        <div className="back-btn" onClick={() => navigate(config.backTo!.path)}>
          ← {config.backTo.label}
        </div>
      )}
    </aside>
  )
}
