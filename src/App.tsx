import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdvancedPage from './pages/AdvancedPage'
import McpPage from './pages/McpPage'
import SkillsPage from './pages/SkillsPage'
import TerminalPage from './pages/TerminalPage'
import MarkdownPage from './pages/MarkdownPage'
import GitPage from './pages/GitPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/advanced" element={<AdvancedPage />} />
      <Route path="/mcp" element={<McpPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/terminal" element={<TerminalPage />} />
      <Route path="/markdown" element={<MarkdownPage />} />
      <Route path="/git" element={<GitPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
