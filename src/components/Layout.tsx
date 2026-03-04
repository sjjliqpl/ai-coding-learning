import { type ReactNode, useEffect } from 'react'
import Sidebar from './Sidebar'
import type { SidebarConfig } from './Sidebar'

interface Props {
  sidebar: SidebarConfig
  children: ReactNode
  className?: string
}

export default function Layout({ sidebar, children, className }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Sidebar config={sidebar} />
      <main className={`main ${className || ''}`}>
        {children}
      </main>
    </>
  )
}
