import { useState, useEffect, useRef, useCallback } from 'react'
import { useLang } from '../i18n/LanguageContext'
import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/terminal.css'

const SETUP_SCRIPT = `#!/bin/bash

set -e

echo "🚀 开始终端升级之旅..."

# 1. 检查并安装 Homebrew (macOS 包管理器)
if ! command -v brew &> /dev/null; then
  echo "🍺 正在安装 Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  echo "✅ Homebrew 已安装。"
fi

# 2. 安装 Oh My Zsh
if [ ! -d "$HOME/.oh-my-zsh" ]; then
  echo "🌈 正在安装 Oh My Zsh..."
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
else
  echo "✅ Oh My Zsh 已存在。"
fi

# 定义路径
ZSH_CUSTOM=\${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}

# 3. 下载 Powerlevel10k 主题
echo "🎨 下载 Powerlevel10k..."
[ ! -d "$ZSH_CUSTOM/themes/powerlevel10k" ] && \\
  git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k

# 4. 下载插件 (Autosuggestions & Syntax Highlighting)
echo "🔌 下载效率插件..."
[ ! -d "$ZSH_CUSTOM/plugins/zsh-autosuggestions" ] && \\
  git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions

[ ! -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ] && \\
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting

# 5. 修改 .zshrc 配置文件
echo "⚙️ 正在写入配置到 .zshrc..."

# 设置主题
sed -i '' 's/ZSH_THEME="robbyrussell"/ZSH_THEME="powerlevel10k\\/powerlevel10k"/g' ~/.zshrc

# 设置插件
sed -i '' 's/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/g' ~/.zshrc

echo "-----------------------------------------------"
echo "✨ 全部安装完成！"
echo "👉 请执行: source ~/.zshrc"
echo "👉 注意：建议手动安装 Nerd Fonts 字体（如 'MesloLGS NF'）以完美显示图标。"
echo "-----------------------------------------------"
`

const sidebarConfig: SidebarConfig = {
  brandText: 'Terminal Mastery',
  brandTextEn: 'Terminal Mastery',
  brandGradient: 'terminal-brand',
  activeClass: 'active-green',
  groups: [
    {
      title: '入门基础',
      titleEn: 'Getting Started',
      items: [
        { id: 'hero', label: '🚀 快速开始', labelEn: '🚀 Quick Start' },
        { id: 'why', label: '💡 为什么学终端', labelEn: '💡 Why Learn Terminal' },
        { id: 'path', label: '🗺️ 学习路线', labelEn: '🗺️ Learning Path' },
      ],
    },
    {
      title: '核心技能',
      titleEn: 'Core Skills',
      items: [
        { id: 'start', label: '⌨️ 开始学习', labelEn: '⌨️ Start Learning' },
        { id: 'commands', label: '⌨️ 核心命令', labelEn: '⌨️ Core Commands' },
        { id: 'macos', label: '🍎 macOS 专属', labelEn: '🍎 macOS Specific' },
        { id: 'setup', label: '⚡ 一键环境部署', labelEn: '⚡ One-Click Setup' },
        { id: 'advanced', label: '🔧 进阶技巧', labelEn: '🔧 Advanced Skills' },
      ],
    },
    {
      title: 'AI 工具集成',
      titleEn: 'AI Tool Integration',
      items: [
        { id: 'ai', label: '🤖 终端 × AI', labelEn: '🤖 Terminal × AI' },
        { id: 'cheatsheet', label: '📋 速查手册', labelEn: '📋 Cheatsheet' },
      ],
    },
  ],
  backTo: { label: '返回首页', labelEn: 'Back to Home', path: '/' },
}

function TerminalWindow({ title, children, bodyStyle }: { title: string; children: React.ReactNode; bodyStyle?: React.CSSProperties }) {
  return (
    <div className="terminal">
      <div className="term-header">
        <div className="term-dots">
          <div className="dot dot-r" />
          <div className="dot dot-y" />
          <div className="dot dot-g" />
        </div>
        <div className="term-title">{title}</div>
      </div>
      <div className="term-body" style={bodyStyle}>{children}</div>
    </div>
  )
}

function CmdCard({ title, name, desc, children }: { title: string; name: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="cmd-card">
      <div className="cmd-card-header">
        <div className="cmd-dots">
          <div className="cmd-dot dot-r" />
          <div className="cmd-dot dot-y" />
          <div className="cmd-dot dot-g" />
        </div>
        <div className="cmd-title">{title}</div>
      </div>
      <div className="cmd-body">
        <div className="cmd-name">{name}</div>
        <div className="cmd-desc">{desc}</div>
        <div className="cmd-examples">{children}</div>
      </div>
    </div>
  )
}

export default function TerminalPage() {
  const { t } = useLang()
  const [scrollPct, setScrollPct] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [copiedScript, setCopiedScript] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const handleCopyScript = useCallback(() => {
    navigator.clipboard.writeText(SETUP_SCRIPT).then(() => {
      setCopiedScript(true)
      setTimeout(() => setCopiedScript(false), 2000)
    }).catch(() => {
      // fallback: do nothing if clipboard access is denied
    })
  }, [])

  const handleDownloadScript = useCallback(() => {
    const blob = new Blob([SETUP_SCRIPT], { type: 'text/x-sh' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'setup-terminal.sh'
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }, [])

  // Scroll progress
  const handleScroll = useCallback(() => {
    const s = document.documentElement
    const pct = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100
    setScrollPct(pct)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Typing animation
  useEffect(() => {
    const cmds = [t('学习终端基础...', 'Learning Terminal Basics...'), 'brew install node', 'gh copilot suggest', 'cd ~/mastery/', t('echo "你做到了！" ', 'echo "You did it!" ')]
    let ci = 0
    let len = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    function type() {
      const cur = cmds[ci]
      if (!deleting) {
        setTypedText(cur.slice(0, len + 1))
        len++
        if (len === cur.length) {
          timer = setTimeout(() => { deleting = true }, 1800)
          setTimeout(() => type(), 1900)
          return
        }
      } else {
        setTypedText(cur.slice(0, len - 1))
        len--
        if (len === 0) {
          deleting = false
          ci = (ci + 1) % cmds.length
          timer = setTimeout(type, 400)
          return
        }
      }
      timer = setTimeout(type, deleting ? 55 : 85)
    }

    timer = setTimeout(type, 1200)
    return () => clearTimeout(timer)
  }, [])

  // Fade-in observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.terminal-page .fade-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="terminal-page" ref={mainRef}>
      <div className="scroll-progress">
        <div className="scroll-bar" style={{ width: `${scrollPct}%` }} />
      </div>

      <Layout sidebar={sidebarConfig}>
        {/* HERO */}
        <section id="hero">
          <div>
            <div className="hero-badge">{t('专为 macOS 用户设计', 'Designed for macOS Users')}</div>
            <h1 className="hero-title">
              {t('掌握终端', 'Master the Terminal')}<br />
              <span className="line-green">{t('解锁 AI 工具', 'Unlock AI Tools')}</span><br />
              <span className="line-dim">{t('的全部潜力', 'Full Potential')}</span>
            </h1>
            <p className="hero-desc">
              {t('面向零基础用户的完整终端指南。从打开第一个终端窗口，到熟练使用 GitHub Copilot、Claude 等 AI 工具，一步步建立你的命令行掌控力。', 'A complete terminal guide for beginners. From opening your first terminal window to mastering GitHub Copilot, Claude, and other AI tools, build your command-line proficiency step by step.')}
            </p>
            <div className="hero-actions">
              <span className="btn-primary" onClick={() => scrollTo('start')}>{t('▶ 立即开始学习', '▶ Start Learning')}</span>
              <span className="btn-ghost" onClick={() => scrollTo('cheatsheet')}>{t('📋 查看速查表', '📋 View Cheatsheet')}</span>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">5</div>
                <div className="hero-stat-label">{t('学习阶段', 'Learning Stages')}</div>
              </div>
              <div>
                <div className="hero-stat-num">60+</div>
                <div className="hero-stat-label">{t('核心命令', 'Core Commands')}</div>
              </div>
              <div>
                <div className="hero-stat-num">0</div>
                <div className="hero-stat-label">{t('前置要求', 'Prerequisites')}</div>
              </div>
            </div>
          </div>
          <div>
            <TerminalWindow title={t('zsh — 终端学习者的旅程', 'zsh — A Terminal Learner\'s Journey')}>
              <div className="term-line">
                <span className="term-prompt">❯</span>
                <span className="term-cmd">whoami</span>
              </div>
              <div className="term-output">{t('终端新手 → 终端高手', 'Terminal Newbie → Terminal Pro')}</div>
              <br />
              <div className="term-line">
                <span className="term-prompt">❯</span>
                <span className="term-cmd">ls <span className="term-path">~/skills/</span></span>
              </div>
              <div className="term-output">
                <span className="term-success">{t('基础导航', 'Basic Navigation')}</span>&nbsp;&nbsp;<span className="term-success">{t('文件操作', 'File Operations')}</span>&nbsp;&nbsp;<span className="term-success">{t('文本处理', 'Text Processing')}</span><br />
                <span className="term-highlight">{t('Shell脚本', 'Shell Scripts')}</span>&nbsp;&nbsp;<span className="term-highlight">{t('环境配置', 'Environment Config')}</span>&nbsp;&nbsp;<span className="term-highlight">Homebrew</span><br />
                <span className="term-path">{t('AI工具集成', 'AI Tool Integration')}</span>&nbsp;<span className="term-path">Copilot-CLI</span>&nbsp;<span className="term-path">{t('自动化', 'Automation')}</span>
              </div>
              <br />
              <div className="term-line">
                <span className="term-prompt">❯</span>
                <span className="term-cmd">gh copilot suggest <span className="term-highlight">{t('"列出最近修改的文件"', '"List recently modified files"')}</span></span>
              </div>
              <div className="term-output">
                <span className="term-comment"># {t('建议的命令：', 'Suggested command:')}</span><br />
                <span className="term-success">ls -lt | head -10</span>
              </div>
              <br />
              <div className="term-line">
                <span className="term-prompt">❯</span>
                <span className="term-cmd">{typedText}<span className="term-cursor" /></span>
              </div>
            </TerminalWindow>
          </div>
        </section>

        {/* WHY */}
        <section id="why">
          <div className="section-label">{t('为什么学习终端', 'Why Learn the Terminal')}</div>
          <h2>{t('命令行是', 'The Command Line is')}<em>{t('现代开发者', 'a Modern Developer\'s')}</em>{t('的超能力', ' Superpower')}</h2>
          <p className="section-sub">{t('不论你是设计师、产品经理还是开发者，掌握终端将大幅提升你与 AI 工具协作的效率。', 'Whether you\'re a designer, product manager, or developer, mastering the terminal will dramatically improve your efficiency when collaborating with AI tools.')}</p>
          <div className="why-grid">
            <div className="why-card fade-in">
              <div className="why-icon">⚡</div>
              <h3>{t('效率倍增', 'Efficiency Multiplier')}</h3>
              <p>{t('一条命令可以完成图形界面需要十几步的操作。批量重命名文件、自动化重复任务，让你专注于真正重要的工作。', 'One command can accomplish what takes a dozen steps in a GUI. Batch rename files, automate repetitive tasks, and focus on what really matters.')}</p>
            </div>
            <div className="why-card fade-in">
              <div className="why-icon">🤖</div>
              <h3>{t('AI 工具必备', 'Essential for AI Tools')}</h3>
              <p>{t('GitHub Copilot CLI、Claude Code、gh CLI 等强大 AI 工具都运行在终端中。掌握终端，才能真正释放 AI 的生产力。', 'Powerful AI tools like GitHub Copilot CLI, Claude Code, and gh CLI all run in the terminal. Master the terminal to truly unleash AI productivity.')}</p>
            </div>
            <div className="why-card fade-in">
              <div className="why-icon">🔧</div>
              <h3>{t('深度掌控', 'Deep Control')}</h3>
              <p>{t('安装开发环境、管理服务器、处理数据…终端让你对系统拥有完全的控制权，而不依赖任何 GUI 工具。', 'Set up dev environments, manage servers, process data…the terminal gives you full control over your system without relying on any GUI tools.')}</p>
            </div>
          </div>
        </section>

        {/* LEARNING PATH */}
        <section id="path">
          <div className="section-label">{t('学习路径', 'Learning Path')}</div>
          <h2>{t('五个阶段，从零到', 'Five Stages, From Zero to')}<em>{t('精通', 'Mastery')}</em></h2>
          <p className="section-sub">{t('系统性的学习路径，每个阶段都有清晰的目标和实践任务。', 'A systematic learning path with clear goals and practical tasks for each stage.')}</p>
          <div className="path-grid">
            <div className="path-step active fade-in">
              <div className="path-num">01</div>
              <span className="path-tag tag-begin">{t('初学者', 'Beginner')}</span>
              <h3>{t('初识终端', 'First Look at the Terminal')}</h3>
              <p>{t('打开终端，理解基本界面，输入第一个命令', 'Open the terminal, understand the basic interface, enter your first command')}</p>
              <div className="path-items">
                <div className="path-item">Terminal.app {t('入门', 'Introduction')}</div>
                <div className="path-item">zsh {t('基础', 'Basics')}</div>
                <div className="path-item">pwd / ls / cd</div>
                <div className="path-item">Tab {t('自动补全', 'Autocomplete')}</div>
              </div>
            </div>
            <div className="path-step fade-in">
              <div className="path-num">02</div>
              <span className="path-tag tag-begin">{t('初学者', 'Beginner')}</span>
              <h3>{t('核心命令', 'Core Commands')}</h3>
              <p>{t('掌握文件操作、文本处理、系统信息等日常命令', 'Master daily commands for file operations, text processing, system information, and more')}</p>
              <div className="path-items">
                <div className="path-item">{t('文件增删改查', 'File CRUD Operations')}</div>
                <div className="path-item">grep / find</div>
                <div className="path-item">man {t('帮助手册', 'Manual')}</div>
                <div className="path-item">{t('历史记录', 'History')}</div>
              </div>
            </div>
            <div className="path-step fade-in">
              <div className="path-num">03</div>
              <span className="path-tag tag-inter">{t('进阶', 'Intermediate')}</span>
              <h3>{t('macOS 专属', 'macOS Specific')}</h3>
              <p>{t('配置 zsh 环境，安装 Homebrew，打造专业工作站', 'Configure the zsh environment, install Homebrew, build a professional workstation')}</p>
              <div className="path-items">
                <div className="path-item">Homebrew {t('包管理', 'Package Manager')}</div>
                <div className="path-item">oh-my-zsh {t('配置', 'Configuration')}</div>
                <div className="path-item">{t('终端优化', 'Terminal Optimization')}</div>
                <div className="path-item">PATH {t('环境变量', 'Environment Variable')}</div>
              </div>
            </div>
            <div className="path-step fade-in">
              <div className="path-num">04</div>
              <span className="path-tag tag-inter">{t('进阶', 'Intermediate')}</span>
              <h3>{t('进阶技巧', 'Advanced Skills')}</h3>
              <p>{t('管道、重定向、别名、Shell 脚本自动化', 'Pipes, redirection, aliases, Shell script automation')}</p>
              <div className="path-items">
                <div className="path-item">{t('管道与重定向', 'Pipes & Redirection')}</div>
                <div className="path-item">alias {t('别名', 'Aliases')}</div>
                <div className="path-item">Shell {t('脚本', 'Scripts')}</div>
                <div className="path-item">SSH {t('密钥', 'Keys')}</div>
              </div>
            </div>
            <div className="path-step fade-in">
              <div className="path-num">05</div>
              <span className="path-tag tag-adv">{t('高阶', 'Advanced')}</span>
              <h3>{t('AI 工具集成', 'AI Tool Integration')}</h3>
              <p>{t('在终端中使用 Copilot、Claude，实现 AI 辅助工作流', 'Use Copilot and Claude in the terminal for AI-assisted workflows')}</p>
              <div className="path-items">
                <div className="path-item">gh copilot CLI</div>
                <div className="path-item">Claude Code</div>
                <div className="path-item">{t('AI 写脚本', 'AI Script Writing')}</div>
                <div className="path-item">{t('自动化工作流', 'Automated Workflows')}</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* GETTING STARTED */}
        <section id="start">
          <div className="section-label">{t('阶段 01', 'Stage 01')}</div>
          <h2>{t('快速', 'Quick')}<em>{t('开始', 'Start')}</em></h2>
          <p className="section-sub">{t('打开你的第一个终端，认识它的基本构成。', 'Open your first terminal and get to know its basic components.')}</p>

          <div className="module">
            <div className="module-header">
              <div className="module-num">1.1</div>
              <div>
                <h2 style={{ fontSize: '1.6rem' }}>{t('如何打开终端', 'How to Open the Terminal')}</h2>
                <p className="section-sub" style={{ fontSize: 14, marginTop: 6 }}>{t('macOS 上有三种方式打开终端', 'Three ways to open the terminal on macOS')}</p>
              </div>
            </div>
            <div className="open-grid">
              <div className="macos-card">
                <h3 style={{ fontSize: 16 }}>🔍 Spotlight {t('搜索', 'Search')}</h3>
                <p>{t('按下', 'Press')} <span className="inline-code">⌘ + {t('空格', 'Space')}</span>{t('，输入 "Terminal" 或 "终端"，回车打开。这是最快的方式。', ', type "Terminal", and press Enter. This is the fastest way.')}</p>
              </div>
              <div className="macos-card">
                <h3 style={{ fontSize: 16 }}>📁 {t('访达', 'Finder')} (Finder)</h3>
                <p>{t('打开 Finder → 应用程序 → 实用工具 → 终端。适合不熟悉快捷键的新手。', 'Open Finder → Applications → Utilities → Terminal. Good for beginners unfamiliar with shortcuts.')}</p>
              </div>
            </div>
            <div className="tip">
              <strong>💡 {t('提示：', 'Tip:')}</strong>{t('你也可以考虑使用功能更丰富的第三方终端工具，如 iTerm2、Warp 或 Alacritty 等，它们支持分屏、丰富的主题、更好的颜色渲染等高级功能。', 'You can also consider using feature-rich third-party terminal tools like iTerm2, Warp, or Alacritty, which support split panes, rich themes, better color rendering, and other advanced features.')}
            </div>
          </div>

          <div className="module">
            <div className="module-header">
              <div className="module-num">1.2</div>
              <div>
                <h2 style={{ fontSize: '1.6rem' }}>{t('认识终端界面', 'Understanding the Terminal Interface')}</h2>
                <p className="section-sub" style={{ fontSize: 14, marginTop: 6 }}>{t('了解提示符的组成部分', 'Learn the components of the prompt')}</p>
              </div>
            </div>
            <TerminalWindow title={t('zsh — 终端界面解析', 'zsh — Terminal Interface Breakdown')}>
              <div style={{ marginBottom: 16, fontSize: 12, color: 'var(--t3)' }}># {t('典型的 zsh 提示符由以下部分组成：', 'A typical zsh prompt consists of the following parts:')}</div>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: 13, marginBottom: 16 }}>
                <span style={{ color: 'var(--blue)' }}>{t('用户名', 'Username')}</span>
                <span style={{ color: 'var(--t3)' }}>@</span>
                <span style={{ color: 'var(--amber)' }}>{t('主机名', 'Hostname')}</span>
                <span style={{ color: 'var(--t3)' }}>:</span>
                <span style={{ color: 'var(--green)' }}>~/{t('当前目录', 'Current Directory')}</span>
                <span style={{ color: 'var(--t1)' }}>❯ {t('命令在这里输入', 'Command goes here')}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: 13, color: 'var(--t2)', marginBottom: 16 }}>
                <span style={{ color: 'var(--blue)' }}>viper</span>
                <span style={{ color: 'var(--t3)' }}>@</span>
                <span style={{ color: 'var(--amber)' }}>MacBook-Pro</span>
                <span style={{ color: 'var(--t3)' }}>:</span>
                <span style={{ color: 'var(--green)' }}>~/projects</span>{' '}
                <span style={{ color: 'var(--t1)' }}>❯</span>{' '}
                <span className="term-cursor" />
              </div>
              <div className="term-comment"># ❯ {t('符号表示终端在等待你输入命令', 'symbol means the terminal is waiting for your command')}</div>
              <div className="term-comment"># ~ {t('代表你的主目录 (/Users/你的用户名)', 'represents your home directory (/Users/your-username)')}</div>
              <div className="term-comment"># {t('按 Tab 键可以自动补全命令和路径', 'Press Tab to autocomplete commands and paths')}</div>
              <div className="term-comment"># {t('按 ↑↓ 箭头键可以浏览历史命令', 'Press ↑↓ arrow keys to browse command history')}</div>
            </TerminalWindow>
          </div>

          <div className="module">
            <div className="module-header">
              <div className="module-num">1.3</div>
              <div>
                <h2 style={{ fontSize: '1.6rem' }}>{t('第一批命令', 'First Commands')}</h2>
                <p className="section-sub" style={{ fontSize: 14, marginTop: 6 }}>{t('这三个命令将是你最常用的', 'These three commands will be your most used')}</p>
              </div>
            </div>
            <div className="cmd-grid">
              <CmdCard title={t('pwd — 当前位置', 'pwd — Current Location')} name="pwd" desc={t('Print Working Directory — 显示你当前在文件系统中的位置', 'Print Working Directory — Shows your current location in the file system')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>pwd</div>
                  <div className="cmd-ex-line" style={{ color: 'var(--t2)' }}>/Users/viper/projects</div>
                  <div className="cmd-ex-comment"># {t('显示完整路径，~ 是主目录的简写', 'Shows the full path, ~ is shorthand for home directory')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('ls — 列出内容', 'ls — List Contents')} name="ls" desc={t('List — 查看目录下的文件和文件夹', 'List — View files and folders in a directory')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ls</div>
                  <div className="cmd-ex-line" style={{ color: 'var(--t2)' }}>Desktop  Documents  Downloads  Projects</div>
                </div>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ls <span style={{ color: 'var(--amber)' }}>-la</span></div>
                  <div className="cmd-ex-comment"># -l {t('详细信息', 'detailed info')}  -a {t('显示隐藏文件', 'show hidden files')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('cd — 移动位置', 'cd — Change Location')} name="cd" desc={t('Change Directory — 在目录之间导航', 'Change Directory — Navigate between directories')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cd <span style={{ color: 'var(--blue)' }}>Documents</span></div>
                  <div className="cmd-ex-comment"># {t('进入 Documents 目录', 'Enter the Documents directory')}</div>
                </div>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cd <span style={{ color: 'var(--amber)' }}>..</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cd <span style={{ color: 'var(--amber)' }}>~</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cd <span style={{ color: 'var(--amber)' }}>-</span></div>
                  <div className="cmd-ex-comment"># {t('上级目录 / 主目录 / 上一个目录', 'Parent directory / Home directory / Previous directory')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('man — 帮助手册', 'man — Manual')} name="man" desc={t('Manual — 查看任何命令的官方说明文档', 'Manual — View the official documentation for any command')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>man <span style={{ color: 'var(--blue)' }}>ls</span></div>
                  <div className="cmd-ex-comment"># {t('按 q 退出手册页', 'Press q to exit the manual page')}</div>
                </div>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ls <span style={{ color: 'var(--amber)' }}>--help</span></div>
                  <div className="cmd-ex-comment"># {t('快速查看常用选项', 'Quick view of common options')}</div>
                </div>
              </CmdCard>
            </div>
            <div className="tip">
              <strong>⌨️ {t('必学快捷键：', 'Essential Shortcuts:')}</strong>
              <code className="inline-code">Ctrl+C</code> {t('终止命令', 'Terminate command')} &nbsp;•&nbsp;
              <code className="inline-code">Ctrl+L</code> {t('清屏', 'Clear screen')} &nbsp;•&nbsp;
              <code className="inline-code">Tab</code> {t('自动补全', 'Autocomplete')} &nbsp;•&nbsp;
              <code className="inline-code">↑↓</code> {t('历史命令', 'Command history')} &nbsp;•&nbsp;
              <code className="inline-code">Ctrl+A</code> {t('行首', 'Line start')} &nbsp;•&nbsp;
              <code className="inline-code">Ctrl+E</code> {t('行尾', 'Line end')} &nbsp;•&nbsp;
              <code className="inline-code">Ctrl+R</code> {t('搜索历史', 'Search history')}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* CORE COMMANDS */}
        <section id="commands">
          <div className="section-label">{t('阶段 02', 'Stage 02')}</div>
          <h2><em>{t('核心命令', 'Core Commands')}</em>{t('大全', ' Encyclopedia')}</h2>
          <p className="section-sub">{t('掌握这些命令，覆盖 90% 的日常终端操作。', 'Master these commands to cover 90% of daily terminal operations.')}</p>

          <div className="module">
            <div className="module-header">
              <div className="module-num">2.1</div>
              <div><h2 style={{ fontSize: '1.6rem' }}>{t('文件与目录操作', 'File & Directory Operations')}</h2></div>
            </div>
            <div className="cmd-grid">
              <CmdCard title={t('mkdir — 创建目录', 'mkdir — Create Directory')} name="mkdir" desc={t('Make Directory — 创建新文件夹', 'Make Directory — Create a new folder')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>mkdir <span style={{ color: 'var(--blue)' }}>my-project</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>mkdir <span style={{ color: 'var(--amber)' }}>-p</span> <span style={{ color: 'var(--blue)' }}>a/b/c</span></div>
                  <div className="cmd-ex-comment"># -p {t('递归创建多层目录', 'Create nested directories recursively')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('touch — 创建文件', 'touch — Create File')} name="touch" desc={t('创建空文件，或更新文件的修改时间', 'Create empty files, or update file modification time')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>touch <span style={{ color: 'var(--blue)' }}>index.html</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>touch <span style={{ color: 'var(--blue)' }}>a.js b.js c.js</span></div>
                  <div className="cmd-ex-comment"># {t('一次创建多个文件', 'Create multiple files at once')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('cp — 复制', 'cp — Copy')} name="cp" desc={t('Copy — 复制文件或目录', 'Copy — Copy files or directories')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cp <span style={{ color: 'var(--blue)' }}>file.txt</span> <span style={{ color: 'var(--green)' }}>file-backup.txt</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cp <span style={{ color: 'var(--amber)' }}>-r</span> <span style={{ color: 'var(--blue)' }}>folder/</span> <span style={{ color: 'var(--green)' }}>folder-backup/</span></div>
                  <div className="cmd-ex-comment"># -r {t('递归复制整个目录', 'Recursively copy the entire directory')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('mv — 移动/重命名', 'mv — Move/Rename')} name="mv" desc={t('Move — 移动文件，也用于重命名', 'Move — Move files, also used for renaming')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>mv <span style={{ color: 'var(--blue)' }}>old-name.txt</span> <span style={{ color: 'var(--green)' }}>new-name.txt</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>mv <span style={{ color: 'var(--blue)' }}>file.txt</span> <span style={{ color: 'var(--green)' }}>~/Documents/</span></div>
                </div>
              </CmdCard>
              <CmdCard title={t('rm — 删除', 'rm — Remove')} name="rm" desc={t('Remove — 删除文件或目录（操作不可撤销！）', 'Remove — Delete files or directories (operation is irreversible!)')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>rm <span style={{ color: 'var(--blue)' }}>file.txt</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>rm <span style={{ color: 'var(--amber)' }}>-rf</span> <span style={{ color: 'var(--blue)' }}>folder/</span></div>
                  <div className="cmd-ex-comment"># -r {t('递归', 'recursive')}  -f {t('强制，不提示确认', 'force, no confirmation prompt')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('find — 搜索文件', 'find — Search Files')} name="find" desc={t('在目录树中查找文件', 'Find files in directory tree')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>find <span style={{ color: 'var(--blue)' }}>.</span> <span style={{ color: 'var(--amber)' }}>-name</span> <span style={{ color: 'var(--green)' }}>"*.js"</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>find <span style={{ color: 'var(--blue)' }}>~</span> <span style={{ color: 'var(--amber)' }}>-mtime</span> <span style={{ color: 'var(--green)' }}>-7</span></div>
                  <div className="cmd-ex-comment"># {t('最近 7 天修改的文件', 'Files modified in the last 7 days')}</div>
                </div>
              </CmdCard>
            </div>
            <div className="warn">
              <strong>⚠️ {t('警告：', 'Warning:')}</strong><code className="inline-code">rm -rf</code> {t('删除的文件', 'deleted files will')}<strong>{t('不会', 'NOT')}</strong>{t('进入废纸篓，无法恢复。执行前请三思，永远不要运行', 'go to the Trash and cannot be recovered. Think twice before executing, and never run')} <code className="inline-code">rm -rf /</code> {t('或', 'or')} <code className="inline-code">rm -rf ~</code>！
            </div>
          </div>

          <div className="module">
            <div className="module-header">
              <div className="module-num">2.2</div>
              <div><h2 style={{ fontSize: '1.6rem' }}>{t('查看与编辑文本', 'View & Edit Text')}</h2></div>
            </div>
            <div className="cmd-grid">
              <CmdCard title={t('cat — 查看文件内容', 'cat — View File Contents')} name="cat" desc={t('Concatenate — 输出文件内容到终端', 'Concatenate — Output file contents to the terminal')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cat <span style={{ color: 'var(--blue)' }}>README.md</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cat <span style={{ color: 'var(--amber)' }}>-n</span> <span style={{ color: 'var(--blue)' }}>script.sh</span></div>
                  <div className="cmd-ex-comment"># -n {t('显示行号', 'Show line numbers')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('grep — 搜索文本', 'grep — Search Text')} name="grep" desc={t('在文件中搜索文本内容，支持正则表达式', 'Search text in files, supports regular expressions')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>grep <span style={{ color: 'var(--green)' }}>"error"</span> <span style={{ color: 'var(--blue)' }}>app.log</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>grep <span style={{ color: 'var(--amber)' }}>-ri</span> <span style={{ color: 'var(--green)' }}>"TODO"</span> <span style={{ color: 'var(--blue)' }}>src/</span></div>
                  <div className="cmd-ex-comment"># -r {t('递归', 'recursive')}  -i {t('忽略大小写', 'ignore case')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('nano — 简单编辑器', 'nano — Simple Editor')} name="nano" desc={t('终端内置的简单文本编辑器，新手友好', 'Built-in simple text editor in the terminal, beginner-friendly')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>nano <span style={{ color: 'var(--blue)' }}>~/.zshrc</span></div>
                  <div className="cmd-ex-comment"># Ctrl+O {t('保存', 'Save')}  Ctrl+X {t('退出', 'Exit')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('head / tail — 查看部分', 'head / tail — View Part')} name="head / tail" desc={t('查看文件的开头或结尾部分内容', 'View the beginning or end of a file')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>head <span style={{ color: 'var(--amber)' }}>-20</span> <span style={{ color: 'var(--blue)' }}>log.txt</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>tail <span style={{ color: 'var(--amber)' }}>-f</span> <span style={{ color: 'var(--blue)' }}>app.log</span></div>
                  <div className="cmd-ex-comment"># -f {t('实时跟踪最新日志输出', 'Follow latest log output in real-time')}</div>
                </div>
              </CmdCard>
            </div>
          </div>

          <div className="module">
            <div className="module-header">
              <div className="module-num">2.3</div>
              <div><h2 style={{ fontSize: '1.6rem' }}>{t('系统信息与进程管理', 'System Info & Process Management')}</h2></div>
            </div>
            <div className="cmd-grid">
              <CmdCard title={t('top — 进程监控', 'top — Process Monitor')} name="top / htop" desc={t('实时查看系统进程和资源占用情况', 'Real-time view of system processes and resource usage')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>top</div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>htop <span style={{ color: 'var(--t3)' }}># brew install htop</span></div>
                </div>
              </CmdCard>
              <CmdCard title={t('df / du — 磁盘空间', 'df / du — Disk Space')} name="df / du" desc={t('查看磁盘和目录的空间使用情况', 'View disk and directory space usage')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>df <span style={{ color: 'var(--amber)' }}>-h</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>du <span style={{ color: 'var(--amber)' }}>-sh</span> <span style={{ color: 'var(--blue)' }}>*</span></div>
                  <div className="cmd-ex-comment"># -h {t('人类可读格式 (GB/MB)', 'Human-readable format (GB/MB)')}</div>
                </div>
              </CmdCard>
              <CmdCard title={t('ps — 进程列表', 'ps — Process List')} name="ps" desc={t('Process Status — 查看正在运行的进程', 'Process Status — View running processes')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ps <span style={{ color: 'var(--amber)' }}>aux</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ps <span style={{ color: 'var(--amber)' }}>aux</span> | grep <span style={{ color: 'var(--green)' }}>node</span></div>
                </div>
              </CmdCard>
              <CmdCard title={t('网络与下载', 'Network & Download')} name="curl / ping" desc={t('网络请求、测试连接、下载文件', 'Network requests, test connectivity, download files')}>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ping <span style={{ color: 'var(--blue)' }}>google.com</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>curl <span style={{ color: 'var(--amber)' }}>-O</span> <span style={{ color: 'var(--green)' }}>https://example.com/file</span></div>
                  <div className="cmd-ex-comment"># -O {t('下载并保留原文件名', 'Download and keep the original filename')}</div>
                </div>
              </CmdCard>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* MACOS SPECIFIC */}
        <section id="macos">
          <div className="section-label">{t('阶段 03', 'Stage 03')}</div>
          <h2>macOS <em>{t('专属', 'Specific')}</em>{t('配置', ' Configuration')}</h2>
          <p className="section-sub">{t('打造专业的 macOS 开发环境，让终端更顺手更强大。', 'Build a professional macOS development environment, making the terminal more convenient and powerful.')}</p>
          <div className="macos-grid">
            <div className="macos-card">
              <h3>🍺 Homebrew <span className="term-tag tag-tool">{t('包管理器', 'Package Manager')}</span></h3>
              <p>{t('macOS 上最重要的工具。用一条命令安装、更新、卸载几乎所有开发工具和应用。', 'The most important tool on macOS. Install, update, and uninstall almost all dev tools and apps with a single command.')}</p>
              <TerminalWindow title={t('安装与使用 Homebrew', 'Install & Use Homebrew')} bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># 1. {t('安装 Homebrew（复制到终端执行）', 'Install Homebrew (copy and run in terminal)')}</div>
                <div style={{ color: 'var(--t2)', fontSize: 11, wordBreak: 'break-all', marginBottom: 12, padding: 8, background: 'var(--bg-e)', borderRadius: 4 }}>
                  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
                </div>
                <div className="term-comment"># 2. {t('常用 brew 命令', 'Common brew commands')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew install <span className="term-highlight">git</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew install <span className="term-highlight">node</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew install <span className="term-highlight">gh</span>       <span className="term-comment"># GitHub CLI</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew upgrade           <span className="term-comment"># {t('更新所有软件', 'Update all packages')}</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew list              <span className="term-comment"># {t('已安装列表', 'Installed list')}</span></span></div>
              </TerminalWindow>
            </div>
            <div className="macos-card">
              <h3>⚙️ zsh {t('配置', 'Config')} <span className="term-tag tag-mac">macOS {t('默认', 'Default')}</span></h3>
              <p>macOS {t('从 Catalina 起默认使用 zsh。配置', 'has used zsh by default since Catalina. Configure')} <code className="inline-code">~/.zshrc</code> {t('文件来自定义你的终端环境。', 'file to customize your terminal environment.')}</p>
              <TerminalWindow title={t('~/.zshrc 配置示例', '~/.zshrc Configuration Example')} bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># {t('打开配置文件编辑', 'Open config file for editing')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">nano <span className="term-path">~/.zshrc</span></span></div>
                <br />
                <div style={{ color: 'var(--t2)', fontSize: 11, lineHeight: 2, background: 'var(--bg-e)', padding: 10, borderRadius: 4 }}>
                  <span style={{ color: 'var(--t3)' }}># PATH {t('配置', 'Config')}</span><br />
                  <span style={{ color: 'var(--blue)' }}>export</span> <span style={{ color: 'var(--amber)' }}>PATH</span>=<span style={{ color: 'var(--green)' }}>"/opt/homebrew/bin:$PATH"</span><br />
                  <span style={{ color: 'var(--t3)' }}># {t('常用别名', 'Common aliases')}</span><br />
                  <span style={{ color: 'var(--blue)' }}>alias</span> ll=<span style={{ color: 'var(--green)' }}>'ls -la'</span><br />
                  <span style={{ color: 'var(--blue)' }}>alias</span> gs=<span style={{ color: 'var(--green)' }}>'git status'</span><br />
                  <span style={{ color: 'var(--blue)' }}>alias</span> dev=<span style={{ color: 'var(--green)' }}>'npm run dev'</span>
                </div>
                <br />
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">source <span className="term-path">~/.zshrc</span>  <span className="term-comment"># {t('重载配置', 'Reload config')}</span></span></div>
              </TerminalWindow>
            </div>
            <div className="macos-card">
              <h3>🎨 oh-my-zsh <span className="term-tag tag-tool">{t('框架', 'Framework')}</span></h3>
              <p>{t('强大的 zsh 配置管理框架，提供数百个主题和插件，让终端焕然一新，功能强大。', 'Powerful zsh configuration management framework, offering hundreds of themes and plugins to make your terminal fresh and powerful.')}</p>
              <TerminalWindow title={t('安装 oh-my-zsh', 'Install oh-my-zsh')} bodyStyle={{ fontSize: 12 }}>
                <div style={{ color: 'var(--t2)', fontSize: 11, wordBreak: 'break-all', marginBottom: 12, padding: 8, background: 'var(--bg-e)', borderRadius: 4 }}>
                  sh -c "$(curl -fsSL https://ohmyz.sh/install.sh)"
                </div>
                <div className="term-comment"># {t('推荐插件（.zshrc 中配置）', 'Recommended plugins (configure in .zshrc)')}</div>
                <div style={{ color: 'var(--t2)', fontSize: 11, lineHeight: 1.9, background: 'var(--bg-e)', padding: 10, borderRadius: 4 }}>
                  plugins=(<span style={{ color: 'var(--green)' }}>git</span><br />
                  &nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--green)' }}>zsh-autosuggestions</span><br />
                  &nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--green)' }}>zsh-syntax-highlighting</span><br />
                  &nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--green)' }}>z</span> <span style={{ color: 'var(--green)' }}>web-search</span>)<br />
                  <span style={{ color: 'var(--blue)' }}>ZSH_THEME</span>=<span style={{ color: 'var(--amber)' }}>"powerlevel10k/powerlevel10k"</span>
                </div>
              </TerminalWindow>
            </div>
            <div className="macos-card">
              <h3>🍎 macOS {t('独有命令', 'Exclusive Commands')} <span className="term-tag tag-mac">{t('专属', 'Exclusive')}</span></h3>
              <p>{t('这些命令只在 macOS 上可用，非常实用，是与 Finder 和系统交互的利器。', 'These commands are only available on macOS, very practical for interacting with Finder and the system.')}</p>
              <TerminalWindow title={t('macOS 专属命令', 'macOS Exclusive Commands')} bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># {t('用默认程序打开文件/目录/URL', 'Open file/directory/URL with default program')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">open <span className="term-highlight">README.md</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">open <span className="term-highlight">.</span>   <span className="term-comment"># {t('在Finder中打开当前目录', 'Open current directory in Finder')}</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">open <span className="term-highlight">https://github.com</span></span></div>
                <br />
                <div className="term-comment"># {t('剪贴板操作', 'Clipboard operations')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">cat file.txt | <span className="term-success">pbcopy</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd"><span className="term-success">pbpaste</span> &gt; output.txt</span></div>
                <br />
                <div className="term-comment"># {t('文字转语音', 'Text to speech')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">say <span className="term-highlight">"Hello, Terminal!"</span></span></div>
              </TerminalWindow>
            </div>
          </div>
          <div className="tip" style={{ marginTop: 32 }}>
            <strong>🚀 {t('推荐工具链：', 'Recommended Toolchain:')}</strong>
            <code className="inline-code">oh-my-zsh</code> + <code className="inline-code">powerlevel10k</code> + <code className="inline-code">zsh-autosuggestions</code> + <code className="inline-code">zsh-syntax-highlighting</code>
            — {t('这是 macOS 开发者最流行的终端配置组合，安装后终端体验质的飞跃。', 'This is the most popular terminal config combo for macOS developers—a quantum leap in terminal experience after installation.')}
          </div>
        </section>

        <hr className="divider" />

        {/* ONE-CLICK SETUP */}
        <section id="setup">
          <div className="section-label">{t('环境部署', 'Environment Setup')}</div>
          <h2>{t('一键安装部署', 'One-Click Install & Deploy')}<em>{t('终端环境', ' Terminal Environment')}</em></h2>
          <p className="section-sub">{t('只需一条命令，自动完成 Oh My Zsh、Powerlevel10k 主题及高效插件的全部安装与配置。', 'Just one command to automatically install and configure Oh My Zsh, Powerlevel10k theme, and efficient plugins.')}</p>

          {/* Script block */}
          <div className="setup-script-wrap">
            <div className="setup-script-header">
              <div className="setup-script-title">
                <span className="setup-script-icon">📜</span>
                <span>setup-terminal.sh</span>
                <span className="term-tag tag-tool">{t('一键脚本', 'One-Click Script')}</span>
              </div>
              <div className="setup-script-actions">
                <button
                  className={`setup-script-btn${copiedScript ? ' copied' : ''}`}
                  onClick={handleCopyScript}
                  title={t('复制脚本内容', 'Copy script content')}
                >
                  {copiedScript ? t('✅ 已复制', '✅ Copied') : t('📋 一键复制', '📋 Copy')}
                </button>
                <button
                  className="setup-script-btn"
                  onClick={handleDownloadScript}
                  title={t('下载脚本文件', 'Download script file')}
                >
                  ⬇️ {t('下载脚本', 'Download Script')}
                </button>
              </div>
            </div>
            <div className="setup-script-hint-row">{t('将以下脚本保存为', 'Save the following script as')} <code className="inline-code">setup-terminal.sh</code>{t('，然后运行', ', then run')} <code className="inline-code">bash setup-terminal.sh</code></div>
            <TerminalWindow title={t('setup-terminal.sh — 一键终端环境安装脚本', 'setup-terminal.sh — One-Click Terminal Environment Setup Script')} bodyStyle={{ fontSize: 12, maxHeight: 520, overflowY: 'auto' }}>
              <div className="term-comment">#!/bin/bash</div>
              <br />
              <div className="term-line"><span className="term-cmd" style={{ color: 'var(--blue)' }}>set</span> <span style={{ color: 'var(--amber)' }}>-e</span></div>
              <br />
              <div className="term-line"><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>{t('"🚀 开始终端升级之旅..."', '"🚀 Starting terminal upgrade journey..."')}</span></span></div>
              <br />
              <div className="term-comment"># 1. {t('检查并安装 Homebrew (macOS 包管理器)', 'Check and install Homebrew (macOS package manager)')}</div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>if</span> ! command -v brew &amp;&gt; /dev/null; <span style={{ color: 'var(--blue)' }}>then</span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>{t('"🍺 正在安装 Homebrew..."', '"🍺 Installing Homebrew..."')}</span></span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}>/bin/bash -c <span style={{ color: 'var(--amber)' }}>"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</span></div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>else</span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>{t('"✅ Homebrew 已安装。"', '"✅ Homebrew already installed."')}</span></span></div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>fi</span></div>
              <br />
              <div className="term-comment"># 2. {t('安装 Oh My Zsh', 'Install Oh My Zsh')}</div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>if</span> [ ! -d <span style={{ color: 'var(--amber)' }}>"$HOME/.oh-my-zsh"</span> ]; <span style={{ color: 'var(--blue)' }}>then</span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>{t('"🌈 正在安装 Oh My Zsh..."', '"🌈 Installing Oh My Zsh..."')}</span></span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}>sh -c <span style={{ color: 'var(--amber)' }}>"$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"</span> <span style={{ color: 'var(--t2)' }}>"" --unattended</span></div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>else</span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>{t('"✅ Oh My Zsh 已存在。"', '"✅ Oh My Zsh already exists."')}</span></span></div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>fi</span></div>
              <br />
              <div className="term-comment"># {t('定义路径', 'Define paths')}</div>
              <div className="term-line"><span className="term-highlight">ZSH_CUSTOM</span>=${'{'}<span className="term-highlight">ZSH_CUSTOM</span>:-<span style={{ color: 'var(--amber)' }}>$HOME/.oh-my-zsh/custom</span>{'}'}</div>
              <br />
              <div className="term-comment"># 3. {t('下载 Powerlevel10k 主题', 'Download Powerlevel10k theme')}</div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>{t('"🎨 下载 Powerlevel10k..."', '"🎨 Downloading Powerlevel10k..."')}</span></div>
              <div className="term-line">[ ! -d <span style={{ color: 'var(--amber)' }}>"$ZSH_CUSTOM/themes/powerlevel10k"</span> ] &amp;&amp; \</div>
              <div className="term-line" style={{ paddingLeft: 20 }}>git clone --depth=1 https://github.com/romkatv/powerlevel10k.git <span className="term-path">$ZSH_CUSTOM/themes/powerlevel10k</span></div>
              <br />
              <div className="term-comment"># 4. {t('下载插件 (Autosuggestions & Syntax Highlighting)', 'Download plugins (Autosuggestions & Syntax Highlighting)')}</div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>{t('"🔌 下载效率插件..."', '"🔌 Downloading efficiency plugins..."')}</span></div>
              <div className="term-line">[ ! -d <span style={{ color: 'var(--amber)' }}>"$ZSH_CUSTOM/plugins/zsh-autosuggestions"</span> ] &amp;&amp; \</div>
              <div className="term-line" style={{ paddingLeft: 20 }}>git clone https://github.com/zsh-users/zsh-autosuggestions <span className="term-path">$ZSH_CUSTOM/plugins/zsh-autosuggestions</span></div>
              <br />
              <div className="term-line">[ ! -d <span style={{ color: 'var(--amber)' }}>"$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"</span> ] &amp;&amp; \</div>
              <div className="term-line" style={{ paddingLeft: 20 }}>git clone https://github.com/zsh-users/zsh-syntax-highlighting.git <span className="term-path">$ZSH_CUSTOM/plugins/zsh-syntax-highlighting</span></div>
              <br />
              <div className="term-comment"># 5. {t('修改 .zshrc 配置文件', 'Modify .zshrc configuration file')}</div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>{t('"⚙️ 正在写入配置到 .zshrc..."', '"⚙️ Writing config to .zshrc..."')}</span></div>
              <br />
              <div className="term-comment"># {t('设置主题', 'Set theme')}</div>
              <div className="term-line">sed -i <span style={{ color: 'var(--amber)' }}>''</span> <span style={{ color: 'var(--green)' }}>'s/ZSH_THEME="robbyrussell"/ZSH_THEME="powerlevel10k\/powerlevel10k"/g'</span> ~/.zshrc</div>
              <br />
              <div className="term-comment"># {t('设置插件', 'Set plugins')}</div>
              <div className="term-line">sed -i <span style={{ color: 'var(--amber)' }}>''</span> <span style={{ color: 'var(--green)' }}>'s/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/g'</span> ~/.zshrc</div>
              <br />
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--t2)' }}>"-----------------------------------------------"</span></div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>{t('"✨ 全部安装完成！"', '"✨ All installations complete!"')}</span></div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--blue)' }}>{t('"👉 请执行: source ~/.zshrc"', '"👉 Please run: source ~/.zshrc"')}</span></div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--t2)' }}>{t('"👉 注意：建议手动安装 Nerd Fonts 字体（如 \'MesloLGS NF\'）以完美显示图标。"', '"👉 Note: It is recommended to manually install Nerd Fonts (like \'MesloLGS NF\') for perfect icon display."')}</span></div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--t2)' }}>"-----------------------------------------------"</span></div>
            </TerminalWindow>
          </div>

          {/* Core config guide */}
          <div className="setup-guide-grid">
            <div className="setup-guide-card">
              <div className="setup-guide-num">1</div>
              <div className="setup-guide-content">
                <h3>🔤 {t('安装 Nerd Fonts 字体', 'Install Nerd Fonts')}</h3>
                <p>Powerlevel10k {t('的图标需要', 'icons require')} <strong>Nerd Fonts</strong> {t('支持，否则会显示乱码方块。推荐使用', 'support, otherwise garbled boxes will appear. We recommend using')} <strong>MesloLGS NF</strong> {t('字体。', 'font.')}</p>
                <div className="setup-guide-steps">
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">{t('方式1：自动安装', 'Method 1: Auto Install')}</span>
                    {t('运行', 'Run')} <code className="inline-code">source ~/.zshrc</code> {t('后，P10k 可能提示', ', P10k may prompt')} <em>Install Meslo Nerd Font for you?</em>{t('，直接输入', ', just type')} <code className="inline-code">y</code> {t('即可自动安装。', 'to auto-install.')}
                  </div>
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">{t('方式2：Homebrew 安装', 'Method 2: Homebrew Install')}</span>
                    {t('通过 Homebrew 安装 Nerd Fonts：', 'Install Nerd Fonts via Homebrew:')}<br />
                    <code className="inline-code">brew tap homebrew/cask-fonts</code><br />
                    <code className="inline-code">brew install --cask font-meslo-lg-nerd-font</code>
                  </div>
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">{t('方式3：手动下载', 'Method 3: Manual Download')}</span>
                    {t('访问', 'Visit')} <a href="https://www.nerdfonts.com/font-downloads" target="_blank" rel="noopener noreferrer" className="setup-link">Nerd Fonts {t('官网', 'Website')}</a>{t('，下载 MesloLGS NF 字体包，解压后双击', ', download the MesloLGS NF font package, extract and double-click')} <code className="inline-code">.ttf</code> {t('文件安装。', 'files to install.')}
                  </div>
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">{t('配置终端', 'Configure Terminal')}</span>
                    {t('安装完成后，在你的终端设置中选择', 'After installation, select')} <code className="inline-code">MesloLGS NF</code> {t('字体。不同终端应用的设置路径：', 'font in your terminal settings. Setup paths for different terminal apps:')}<br />
                    • <strong>Terminal.app</strong>: {t('偏好设置 → 描述文件 → 文本 → 字体', 'Preferences → Profiles → Text → Font')}<br />
                    • <strong>iTerm2</strong>: <code className="inline-code">Cmd + ,</code> → Profiles → Text → Font<br />
                    • <strong>VS Code {t('终端', 'Terminal')}</strong>: {t('设置中搜索', 'Search settings for')} <code className="inline-code">terminal.integrated.fontFamily</code>{t('，设置为', ', set to')} <code className="inline-code">"MesloLGS NF"</code>
                  </div>
                </div>
              </div>
            </div>
            <div className="setup-guide-card">
              <div className="setup-guide-num">2</div>
              <div className="setup-guide-content">
                <h3>🎨 {t('配置终端配色方案', 'Configure Terminal Color Schemes')}</h3>
                <p>{t('优秀的配色方案可以提升终端的可读性和美观度。以下是一些推荐配置：', 'Great color schemes improve terminal readability and aesthetics. Here are some recommendations:')}</p>
                <div className="setup-guide-steps">
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">{t('内置主题', 'Built-in Themes')}</span>
                    macOS Terminal.app {t('自带多个配色方案：偏好设置 → 描述文件，选择', 'comes with multiple color schemes: Preferences → Profiles, select')} <strong>Pro</strong> {t('或', 'or')} <strong>Novel</strong> {t('主题。', 'theme.')}
                  </div>
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">{t('流行配色', 'Popular Color Schemes')}</span>
                    {t('推荐配色方案：', 'Recommended color schemes:')}<br />
                    • <strong>Solarized Dark</strong> - {t('经典护眼配色', 'Classic eye-friendly scheme')}<br />
                    • <strong>Dracula</strong> - {t('流行的暗色主题', 'Popular dark theme')}<br />
                    • <strong>One Dark</strong> - Atom {t('编辑器同款', 'Editor style')}<br />
                    • <strong>Nord</strong> - {t('优雅的北欧风格', 'Elegant Nordic style')}<br />
                    {t('访问', 'Visit')} <a href="https://github.com/lysyi3m/macos-terminal-themes" target="_blank" rel="noopener noreferrer" className="setup-link">macOS Terminal Themes</a> {t('获取更多主题。', 'for more themes.')}
                  </div>
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">Powerlevel10k {t('配置', 'Configuration')}</span>
                    {t('运行', 'Run')} <code className="inline-code">p10k configure</code> {t('可以重新配置 Powerlevel10k 的样式，包括提示符样式、图标显示、颜色方案等。', 'to reconfigure Powerlevel10k styles, including prompt style, icon display, color scheme, and more.')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shortcut keys */}
          <div className="setup-shortcuts">
            <div className="section-label" style={{ marginBottom: 20 }}>📖 {t('常用快捷键复习', 'Common Shortcut Review')}</div>
            <div className="setup-shortcuts-grid">
              <div className="setup-shortcut-row setup-shortcut-header">
                <div>{t('功能', 'Function')}</div>
                <div>{t('操作', 'Action')}</div>
              </div>
              <div className="setup-shortcut-row">
                <div>{t('自动补全建议', 'Autocomplete Suggestions')}</div>
                <div>{t('输入部分命令后，按', 'After typing part of a command, press')} <kbd>→</kbd>{t('（方向右键）采纳灰色提示', ' (right arrow) to accept the gray suggestion')}</div>
              </div>
              <div className="setup-shortcut-row">
                <div>{t('语法高亮', 'Syntax Highlighting')}</div>
                <div><span style={{ color: 'var(--red)' }}>{t('红色', 'Red')}</span>{t('说明命令不存在或有错，', ' means the command doesn\'t exist or has errors, ')}<span style={{ color: 'var(--green)' }}>{t('绿色', 'Green')}</span>{t('表示正确', ' means correct')}</div>
              </div>
              <div className="setup-shortcut-row">
                <div>{t('重新配置界面', 'Reconfigure Interface')}</div>
                <div>{t('输入', 'Enter')} <code className="inline-code">p10k configure</code></div>
              </div>
              <div className="setup-shortcut-row">
                <div>{t('快速跳转目录', 'Quick Directory Jump')}</div>
                <div>{t('配合', 'Use with')} <code className="inline-code">z</code> {t('插件（Oh My Zsh 自带，在 plugins 中加入', 'plugin (built into Oh My Zsh, add')} <code className="inline-code">z</code>{t('）', ' to plugins)')}</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ADVANCED */}
        <section id="advanced">
          <div className="section-label">{t('阶段 04', 'Stage 04')}</div>
          <h2>{t('进阶', 'Advanced')}<em>{t('技巧', ' Skills')}</em></h2>
          <p className="section-sub">{t('掌握这些特性，让你的终端效率再上一个台阶。', 'Master these features to take your terminal efficiency to the next level.')}</p>
          <div className="adv-grid">
            <div className="adv-card">
              <h3>{t('管道 |', 'Pipes |')}</h3>
              <p>{t('将一个命令的输出传递给另一个命令，这是终端最强大的特性之一。', 'Pass the output of one command to another, one of the most powerful terminal features.')}</p>
              <div className="code-block">
                <div><span className="g">❯</span> ls -la | <span className="b">grep</span> <span className="g">".js"</span></div>
                <div className="d"># {t('列出所有 .js 文件', 'List all .js files')}</div>
                <br />
                <div><span className="g">❯</span> cat log.txt | <span className="b">grep</span> <span className="g">"error"</span> | <span className="b">wc -l</span></div>
                <div className="d"># {t('统计错误行数', 'Count error lines')}</div>
                <br />
                <div><span className="g">❯</span> ps aux | <span className="b">grep</span> node | <span className="b">awk</span> <span className="g">{"'{print $2}'"}</span></div>
                <div className="d"># {t('获取 node 进程 PID', 'Get node process PID')}</div>
              </div>
            </div>
            <div className="adv-card">
              <h3>{t('重定向', 'Redirection')} &gt; &gt;&gt;</h3>
              <p>{t('将命令输出保存到文件，或从文件读取输入。', 'Save command output to a file, or read input from a file.')}</p>
              <div className="code-block">
                <div><span className="g">❯</span> ls <span className="a">&gt;</span> files.txt</div>
                <div className="d"># {t('覆盖写入文件', 'Overwrite file')}</div>
                <br />
                <div><span className="g">❯</span> echo "new line" <span className="a">&gt;&gt;</span> log.txt</div>
                <div className="d"># {t('追加写入', 'Append to file')}</div>
                <br />
                <div><span className="g">❯</span> command <span className="b">2&gt;</span> error.log</div>
                <div className="d"># {t('错误输出重定向', 'Redirect error output')}</div>
                <br />
                <div><span className="g">❯</span> command <span className="b">&amp;&gt;</span> all.log</div>
                <div className="d"># {t('所有输出到文件', 'All output to file')}</div>
              </div>
            </div>
            <div className="adv-card">
              <h3>alias {t('别名', 'Aliases')}</h3>
              <p>{t('为常用的长命令创建短别名，大幅提升输入效率。', 'Create short aliases for long commands to dramatically improve typing efficiency.')}</p>
              <div className="code-block">
                <div className="d"># {t('添加到 ~/.zshrc', 'Add to ~/.zshrc')}</div>
                <br />
                <div><span className="b">alias</span> <span className="a">ll</span>=<span className="g">'ls -la --color'</span></div>
                <div><span className="b">alias</span> <span className="a">gs</span>=<span className="g">'git status'</span></div>
                <div><span className="b">alias</span> <span className="a">gp</span>=<span className="g">'git push'</span></div>
                <div><span className="b">alias</span> <span className="a">ni</span>=<span className="g">'npm install'</span></div>
                <div><span className="b">alias</span> <span className="a">dev</span>=<span className="g">'npm run dev'</span></div>
                <br />
                <div className="d"># {t('查看所有别名', 'View all aliases')}</div>
                <div><span className="g">❯</span> alias</div>
              </div>
            </div>
            <div className="adv-card">
              <h3>{t('环境变量', 'Environment Variables')}</h3>
              <p>{t('配置系统环境，管理 API 密钥和工具路径。', 'Configure system environment, manage API keys and tool paths.')}</p>
              <div className="code-block">
                <div className="d"># {t('查看环境变量', 'View environment variables')}</div>
                <div><span className="g">❯</span> <span className="b">printenv</span></div>
                <div><span className="g">❯</span> echo <span className="a">$HOME</span></div>
                <div><span className="g">❯</span> echo <span className="a">$PATH</span></div>
                <br />
                <div className="d"># {t('设置临时变量（当前会话）', 'Set temporary variable (current session)')}</div>
                <div><span className="b">export</span> <span className="a">API_KEY</span>=<span className="g">"your_key_here"</span></div>
                <br />
                <div className="d"># {t('永久设置（写入 ~/.zshrc）', 'Permanent setting (write to ~/.zshrc)')}</div>
                <div><span className="b">export</span> <span className="a">ANTHROPIC_KEY</span>=<span className="g">"sk-..."</span></div>
              </div>
            </div>
            <div className="adv-card">
              <h3>Shell {t('脚本', 'Scripts')}</h3>
              <p>{t('将多条命令写入脚本文件，实现自动化任务执行。', 'Write multiple commands into a script file for automated task execution.')}</p>
              <div className="code-block">
                <div className="d">#!/bin/zsh  # {t('脚本文件头', 'Script header')}</div>
                <div className="d"># deploy.sh</div>
                <br />
                <div><span className="b">echo</span> <span className="g">{t('"🚀 开始部署..."', '"🚀 Starting deployment..."')}</span></div>
                <div><span className="b">git</span> pull origin main</div>
                <div><span className="b">npm</span> install</div>
                <div><span className="b">npm</span> run build</div>
                <div><span className="b">echo</span> <span className="g">{t('"✅ 部署完成！"', '"✅ Deployment complete!"')}</span></div>
                <br />
                <div className="d"># {t('赋予执行权限并运行', 'Grant execute permission and run')}</div>
                <div><span className="g">❯</span> chmod +x deploy.sh</div>
                <div><span className="g">❯</span> ./deploy.sh</div>
              </div>
            </div>
            <div className="adv-card">
              <h3>SSH {t('与远程', '& Remote')}</h3>
              <p>{t('使用 SSH 连接远程服务器，配置密钥免密登录。', 'Use SSH to connect to remote servers, configure key-based passwordless login.')}</p>
              <div className="code-block">
                <div className="d"># {t('生成 SSH 密钥对', 'Generate SSH key pair')}</div>
                <div><span className="g">❯</span> ssh-keygen <span className="a">-t ed25519</span></div>
                <br />
                <div className="d"># {t('复制公钥到剪贴板', 'Copy public key to clipboard')}</div>
                <div><span className="g">❯</span> cat ~/.ssh/id_ed25519.pub | <span className="b">pbcopy</span></div>
                <div className="d"># {t('然后粘贴到 GitHub Settings', 'Then paste to GitHub Settings')}</div>
                <br />
                <div className="d"># {t('连接服务器', 'Connect to server')}</div>
                <div><span className="g">❯</span> ssh <span className="a">user@server.com</span></div>
                <br />
                <div className="d"># {t('测试 GitHub SSH 连接', 'Test GitHub SSH connection')}</div>
                <div><span className="g">❯</span> ssh -T git@github.com</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* AI TOOLS */}
        <section id="ai">
          <div className="section-label">{t('阶段 05 — 高阶', 'Stage 05 — Advanced')}</div>
          <h2>{t('终端 ×', 'Terminal ×')} <em>{t('AI 工具', 'AI Tools')}</em></h2>
          <p className="section-sub">{t('掌握 AI 工具与终端的结合，成为真正的效率大师。', 'Master the combination of AI tools and the terminal, become a true efficiency master.')}</p>
          <div className="ai-tools-grid">
            <div className="ai-tool-card">
              <div className="ai-tool-logo logo-g">🐙</div>
              <h3>GitHub Copilot CLI</h3>
              <p>{t('在终端中直接向 GitHub Copilot 提问。用自然语言描述想要的命令，AI 帮你生成并解释，无需记忆复杂语法。', 'Ask GitHub Copilot directly in the terminal. Describe the command you want in natural language, AI generates and explains it—no need to memorize complex syntax.')}</p>
              <span className="ai-badge" style={{ background: 'var(--green-d)', color: 'var(--green)' }}>gh extension</span>
              <TerminalWindow title={t('gh copilot 使用示例', 'gh copilot Usage Examples')} bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># {t('安装 GitHub CLI 和 Copilot 扩展', 'Install GitHub CLI and Copilot extension')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew install gh</span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh auth login</span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh extension install github/gh-copilot</span></div>
                <br />
                <div className="term-comment"># {t('用自然语言获取命令建议', 'Get command suggestions in natural language')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh copilot suggest <span className="term-highlight">{t('"找出占用8080端口的进程"', '"Find the process using port 8080"')}</span></span></div>
                <div className="term-output" style={{ color: 'var(--green)' }}>lsof -i :8080</div>
                <br />
                <div className="term-comment"># {t('解释命令的含义', 'Explain command meaning')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh copilot explain <span className="term-highlight">{t('"find . -name \'*.log\' -mtime +7"', '"find . -name \'*.log\' -mtime +7"')}</span></span></div>
                <div className="term-output">{t('查找当前目录下所有超过 7 天未修改的 .log 文件', 'Find all .log files in the current directory not modified in over 7 days')}</div>
              </TerminalWindow>
            </div>
            <div className="ai-tool-card amber-glow">
              <div className="ai-tool-logo logo-a">✦</div>
              <h3>Claude Code</h3>
              <p>{t('Anthropic 推出的终端 AI 编程助手。直接在项目目录中运行，理解整个代码库上下文，支持读写文件和执行命令。', 'Anthropic\'s terminal AI programming assistant. Run directly in your project directory, understands the entire codebase context, supports reading/writing files and executing commands.')}</p>
              <span className="ai-badge" style={{ background: 'var(--amber-d)', color: 'var(--amber)' }}>Anthropic</span>
              <TerminalWindow title={t('Claude Code 使用', 'Using Claude Code')} bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># {t('安装 Claude Code', 'Install Claude Code')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">npm install -g @anthropic-ai/claude-code</span></div>
                <br />
                <div className="term-comment"># {t('在项目目录启动', 'Start in project directory')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">cd <span className="term-path">~/my-project</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">claude</span></div>
                <div className="term-output" style={{ color: 'var(--green)' }}>✓ Claude Code {t('已启动', 'Started')}</div>
                <br />
                <div style={{ color: 'var(--amber)', fontSize: 11 }}>{t('你', 'You')}: {t('帮我给这个 API 添加错误处理', 'Help me add error handling to this API')}</div>
                <div style={{ color: 'var(--t2)', fontSize: 11 }}>Claude: {t('我分析了你的 api.js 文件，建议以下修改...', 'I analyzed your api.js file and suggest the following changes...')}</div>
              </TerminalWindow>
            </div>
            <div className="ai-tool-card blue-glow">
              <div className="ai-tool-logo logo-b">⬡</div>
              <h3>GitHub CLI (gh)</h3>
              <p>{t('在终端中管理 GitHub 的一切：PR、Issues、Actions、Releases。与 Copilot 深度集成，是现代开发工作流的核心。', 'Manage everything on GitHub from the terminal: PRs, Issues, Actions, Releases. Deeply integrated with Copilot, it\'s the core of modern development workflow.')}</p>
              <span className="ai-badge" style={{ background: 'var(--blue-d)', color: 'var(--blue)' }}>{t('官方工具', 'Official Tool')}</span>
              <TerminalWindow title={t('gh CLI 常用命令', 'gh CLI Common Commands')} bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># {t('安装并登录', 'Install and login')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew install gh &amp;&amp; gh auth login</span></div>
                <br />
                <div className="term-comment"># {t('仓库操作', 'Repository operations')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh repo clone <span className="term-highlight">{t('用户名/仓库', 'username/repo')}</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh repo create <span className="term-highlight">new-project</span></span></div>
                <br />
                <div className="term-comment"># PR {t('和 Issue 管理', 'and Issue Management')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh pr create <span style={{ color: 'var(--amber)' }}>--title</span> <span className="term-success">{t('"feat: 新功能"', '"feat: New Feature"')}</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh issue list</span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh run list</span></div>
              </TerminalWindow>
            </div>
            <div className="ai-tool-card">
              <div className="ai-tool-logo logo-g">🤖</div>
              <h3>{t('AI 辅助工作流', 'AI-Assisted Workflow')}</h3>
              <p>{t('利用 AI 帮你写复杂的 Shell 脚本、解决报错、优化命令。掌握正确的提问方式，让 AI 成为你的终端搭档。', 'Use AI to write complex Shell scripts, solve errors, and optimize commands. Master the right way to ask questions and make AI your terminal partner.')}</p>
              <span className="ai-badge" style={{ background: 'var(--green-d)', color: 'var(--green)' }}>{t('最佳实践', 'Best Practices')}</span>
              <TerminalWindow title={t('AI 辅助终端技巧', 'AI-Assisted Terminal Tips')} bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># {t('遇到报错，让 AI 解释', 'When encountering errors, let AI explain')}</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">npm install 2&gt;&amp;1 | pbcopy</span></div>
                <div style={{ color: 'var(--t2)', fontSize: 11 }}>{t('然后粘贴错误到 Claude/Copilot 询问解决方案', 'Then paste the error to Claude/Copilot and ask for a solution')}</div>
                <br />
                <div className="term-comment"># {t('用 AI 生成复杂命令', 'Use AI to generate complex commands')}</div>
                <div style={{ color: 'var(--amber)', fontSize: 11 }}>{t('"批量压缩当前目录所有 PNG 图片"', '"Batch compress all PNG images in the current directory"')}</div>
                <div style={{ color: 'var(--green)', fontSize: 11 }}>{'find . -name "*.png" -exec sips -Z 1920 {} \\;'}</div>
                <br />
                <div className="term-comment"># {t('提问技巧：提供上下文', 'Question tips: Provide context')}</div>
                <div style={{ color: 'var(--t2)', fontSize: 11 }}>✓ {t('"在 macOS 上，如何用 zsh 脚本..."', '"On macOS, how to use zsh script to..."')}<br />✓ {t('"报错信息是 [粘贴错误]，如何解决？"', '"The error message is [paste error], how to solve?"')}</div>
              </TerminalWindow>
            </div>
          </div>
          <div className="tip" style={{ marginTop: 40 }}>
            <strong>🔑 {t('安全原则：', 'Safety Principle:')}</strong>{t('永远不要盲目执行 AI 生成的命令，特别是涉及', 'Never blindly execute AI-generated commands, especially those involving')} <code className="inline-code">sudo</code>{t('、', ', ')}<code className="inline-code">rm</code> {t('等操作。先用', 'and similar operations. First use')} <code className="inline-code">gh copilot explain</code> {t('或询问 Claude 理解命令含义，再决定是否执行。', 'or ask Claude to understand the command meaning before deciding to execute.')}
          </div>
        </section>

        <hr className="divider" />

        {/* CHEATSHEET */}
        <section id="cheatsheet">
          <div className="section-label">{t('速查表', 'Cheatsheet')}</div>
          <h2>{t('命令', 'Command')}<em>{t('速查', ' Quick Reference')}</em>{t('手册', '')}</h2>
          <p className="section-sub">{t('收藏这个页面，遇到问题时快速查阅。', 'Bookmark this page for quick reference when you encounter problems.')}</p>
          <div className="cheat-grid">
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--green)' }} />📂 {t('导航与目录', 'Navigation & Directories')}</div>
              <table className="cheat-table"><tbody>
                <tr><td>pwd</td><td>{t('显示当前目录路径', 'Show current directory path')}</td></tr>
                <tr><td>ls -la</td><td>{t('详细列出所有文件', 'List all files in detail')}</td></tr>
                <tr><td>cd ~</td><td>{t('回到主目录', 'Go to home directory')}</td></tr>
                <tr><td>cd ..</td><td>{t('返回上级目录', 'Go to parent directory')}</td></tr>
                <tr><td>cd -</td><td>{t('返回上次所在目录', 'Go to previous directory')}</td></tr>
                <tr><td>mkdir -p a/b/c</td><td>{t('递归创建多层目录', 'Create nested directories')}</td></tr>
                <tr><td>tree</td><td>{t('树状显示目录结构', 'Display directory tree')}</td></tr>
              </tbody></table>
            </div>
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--amber)' }} />📄 {t('文件操作', 'File Operations')}</div>
              <table className="cheat-table"><tbody>
                <tr><td>touch file.txt</td><td>{t('创建空文件', 'Create empty file')}</td></tr>
                <tr><td>cp -r src/ dst/</td><td>{t('递归复制目录', 'Recursively copy directory')}</td></tr>
                <tr><td>mv old new</td><td>{t('移动或重命名', 'Move or rename')}</td></tr>
                <tr><td>rm -rf folder/</td><td>{t('递归强制删除（慎！）', 'Force delete recursively (caution!)')}</td></tr>
                <tr><td>cat file.txt</td><td>{t('查看文件全部内容', 'View entire file contents')}</td></tr>
                <tr><td>less file.txt</td><td>{t('分页查看大文件', 'Page through large files')}</td></tr>
                <tr><td>wc -l file.txt</td><td>{t('统计文件行数', 'Count file lines')}</td></tr>
              </tbody></table>
            </div>
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--blue)' }} />🔍 {t('搜索与过滤', 'Search & Filter')}</div>
              <table className="cheat-table"><tbody>
                <tr><td>grep "txt" file</td><td>{t('搜索文件中的文本', 'Search text in file')}</td></tr>
                <tr><td>grep -ri "txt" .</td><td>{t('递归、忽略大小写', 'Recursive, ignore case')}</td></tr>
                <tr><td>find . -name "*.js"</td><td>{t('按名称查找文件', 'Find files by name')}</td></tr>
                <tr><td>find . -mtime -7</td><td>{t('最近7天修改的文件', 'Files modified in last 7 days')}</td></tr>
                <tr><td>which node</td><td>{t('查找命令所在路径', 'Find command location')}</td></tr>
                <tr><td>history | grep git</td><td>{t('搜索历史命令', 'Search command history')}</td></tr>
                <tr><td>Ctrl + R</td><td>{t('反向搜索历史命令', 'Reverse search command history')}</td></tr>
              </tbody></table>
            </div>
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--red)' }} />⚙️ {t('系统与进程', 'System & Processes')}</div>
              <table className="cheat-table"><tbody>
                <tr><td>top</td><td>{t('实时进程监控', 'Real-time process monitor')}</td></tr>
                <tr><td>ps aux</td><td>{t('列出所有进程', 'List all processes')}</td></tr>
                <tr><td>df -h</td><td>{t('查看磁盘空间', 'View disk space')}</td></tr>
                <tr><td>du -sh *</td><td>{t('各目录占用大小', 'Directory size usage')}</td></tr>
                <tr><td>uname -a</td><td>{t('系统版本信息', 'System version info')}</td></tr>
                <tr><td>sudo command</td><td>{t('以管理员权限运行', 'Run with admin privileges')}</td></tr>
                <tr><td>Ctrl + C</td><td>{t('终止当前运行的命令', 'Terminate current command')}</td></tr>
              </tbody></table>
            </div>
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--amber)' }} />🍎 macOS {t('专属', 'Exclusive')}</div>
              <table className="cheat-table"><tbody>
                <tr><td>open .</td><td>Finder {t('打开当前目录', 'Open current directory')}</td></tr>
                <tr><td>open file.pdf</td><td>{t('用默认程序打开文件', 'Open file with default program')}</td></tr>
                <tr><td>pbcopy &lt; file</td><td>{t('将文件内容复制到剪贴板', 'Copy file contents to clipboard')}</td></tr>
                <tr><td>pbpaste &gt; file</td><td>{t('剪贴板内容写入文件', 'Write clipboard contents to file')}</td></tr>
                <tr><td>say "hello"</td><td>{t('文字转语音朗读', 'Text-to-speech')}</td></tr>
                <tr><td>brew install pkg</td><td>{t('安装软件包', 'Install package')}</td></tr>
                <tr><td>brew upgrade</td><td>{t('更新所有已安装软件', 'Update all installed packages')}</td></tr>
              </tbody></table>
            </div>
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--green)' }} />🤖 {t('AI 工具命令', 'AI Tool Commands')}</div>
              <table className="cheat-table"><tbody>
                <tr><td>gh auth login</td><td>{t('登录 GitHub 账户', 'Login to GitHub account')}</td></tr>
                <tr><td>gh copilot suggest</td><td>{t('AI 建议终端命令', 'AI suggests terminal commands')}</td></tr>
                <tr><td>gh copilot explain</td><td>{t('AI 解释命令含义', 'AI explains command meaning')}</td></tr>
                <tr><td>gh pr create</td><td>{t('创建 Pull Request', 'Create Pull Request')}</td></tr>
                <tr><td>gh issue list</td><td>{t('查看项目 Issues', 'View project Issues')}</td></tr>
                <tr><td>claude</td><td>{t('启动 Claude Code', 'Start Claude Code')}</td></tr>
                <tr><td>gh run list</td><td>{t('查看 Actions 运行记录', 'View Actions run history')}</td></tr>
              </tbody></table>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="term-footer">
          <div className="footer-logo">~<span>/</span>terminal-master</div>
          <p>{t('从命令行到 AI 工具，掌握终端，释放潜能。', 'From command line to AI tools, master the terminal, unleash your potential.')}</p>
          <div className="footer-links">
            <span onClick={() => scrollTo('start')}>{t('快速开始', 'Quick Start')}</span>
            <span onClick={() => scrollTo('commands')}>{t('核心命令', 'Core Commands')}</span>
            <span onClick={() => scrollTo('ai')}>{t('AI 工具', 'AI Tools')}</span>
            <span onClick={() => scrollTo('cheatsheet')}>{t('速查表', 'Cheatsheet')}</span>
          </div>
        </footer>
      </Layout>
    </div>
  )
}
