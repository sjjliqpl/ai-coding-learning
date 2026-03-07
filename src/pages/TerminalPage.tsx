import { useState, useEffect, useRef, useCallback } from 'react'
import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/terminal.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'Terminal Mastery',
  brandGradient: 'terminal-brand',
  activeClass: 'active-green',
  groups: [
    {
      title: '入门基础',
      items: [
        { id: 'hero', label: '🚀 快速开始' },
        { id: 'why', label: '💡 为什么学终端' },
        { id: 'path', label: '🗺️ 学习路线' },
      ],
    },
    {
      title: '核心技能',
      items: [
        { id: 'start', label: '⌨️ 开始学习' },
        { id: 'commands', label: '⌨️ 核心命令' },
        { id: 'macos', label: '🍎 macOS 专属' },
        { id: 'setup', label: '⚡ 一键环境部署' },
        { id: 'advanced', label: '🔧 进阶技巧' },
      ],
    },
    {
      title: 'AI 工具集成',
      items: [
        { id: 'ai', label: '🤖 终端 × AI' },
        { id: 'cheatsheet', label: '📋 速查手册' },
      ],
    },
  ],
  backTo: { label: '返回首页', path: '/' },
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
  const [scrollPct, setScrollPct] = useState(0)
  const [typedText, setTypedText] = useState('')
  const mainRef = useRef<HTMLDivElement>(null)

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
    const cmds = ['学习终端基础...', 'brew install node', 'gh copilot suggest', 'cd ~/mastery/', 'echo "你做到了！" ']
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
            <div className="hero-badge">专为 macOS 用户设计</div>
            <h1 className="hero-title">
              掌握终端<br />
              <span className="line-green">解锁 AI 工具</span><br />
              <span className="line-dim">的全部潜力</span>
            </h1>
            <p className="hero-desc">
              面向零基础用户的完整终端指南。从打开第一个终端窗口，到熟练使用 GitHub Copilot、Claude 等 AI 工具，一步步建立你的命令行掌控力。
            </p>
            <div className="hero-actions">
              <span className="btn-primary" onClick={() => scrollTo('start')}>▶ 立即开始学习</span>
              <span className="btn-ghost" onClick={() => scrollTo('cheatsheet')}>📋 查看速查表</span>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">5</div>
                <div className="hero-stat-label">学习阶段</div>
              </div>
              <div>
                <div className="hero-stat-num">60+</div>
                <div className="hero-stat-label">核心命令</div>
              </div>
              <div>
                <div className="hero-stat-num">0</div>
                <div className="hero-stat-label">前置要求</div>
              </div>
            </div>
          </div>
          <div>
            <TerminalWindow title="zsh — 终端学习者的旅程">
              <div className="term-line">
                <span className="term-prompt">❯</span>
                <span className="term-cmd">whoami</span>
              </div>
              <div className="term-output">终端新手 → 终端高手</div>
              <br />
              <div className="term-line">
                <span className="term-prompt">❯</span>
                <span className="term-cmd">ls <span className="term-path">~/skills/</span></span>
              </div>
              <div className="term-output">
                <span className="term-success">基础导航</span>&nbsp;&nbsp;<span className="term-success">文件操作</span>&nbsp;&nbsp;<span className="term-success">文本处理</span><br />
                <span className="term-highlight">Shell脚本</span>&nbsp;&nbsp;<span className="term-highlight">环境配置</span>&nbsp;&nbsp;<span className="term-highlight">Homebrew</span><br />
                <span className="term-path">AI工具集成</span>&nbsp;<span className="term-path">Copilot-CLI</span>&nbsp;<span className="term-path">自动化</span>
              </div>
              <br />
              <div className="term-line">
                <span className="term-prompt">❯</span>
                <span className="term-cmd">gh copilot suggest <span className="term-highlight">"列出最近修改的文件"</span></span>
              </div>
              <div className="term-output">
                <span className="term-comment"># 建议的命令：</span><br />
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
          <div className="section-label">为什么学习终端</div>
          <h2>命令行是<em>现代开发者</em>的超能力</h2>
          <p className="section-sub">不论你是设计师、产品经理还是开发者，掌握终端将大幅提升你与 AI 工具协作的效率。</p>
          <div className="why-grid">
            <div className="why-card fade-in">
              <div className="why-icon">⚡</div>
              <h3>效率倍增</h3>
              <p>一条命令可以完成图形界面需要十几步的操作。批量重命名文件、自动化重复任务，让你专注于真正重要的工作。</p>
            </div>
            <div className="why-card fade-in">
              <div className="why-icon">🤖</div>
              <h3>AI 工具必备</h3>
              <p>GitHub Copilot CLI、Claude Code、gh CLI 等强大 AI 工具都运行在终端中。掌握终端，才能真正释放 AI 的生产力。</p>
            </div>
            <div className="why-card fade-in">
              <div className="why-icon">🔧</div>
              <h3>深度掌控</h3>
              <p>安装开发环境、管理服务器、处理数据…终端让你对系统拥有完全的控制权，而不依赖任何 GUI 工具。</p>
            </div>
          </div>
        </section>

        {/* LEARNING PATH */}
        <section id="path">
          <div className="section-label">学习路径</div>
          <h2>五个阶段，从零到<em>精通</em></h2>
          <p className="section-sub">系统性的学习路径，每个阶段都有清晰的目标和实践任务。</p>
          <div className="path-grid">
            <div className="path-step active fade-in">
              <div className="path-num">01</div>
              <span className="path-tag tag-begin">初学者</span>
              <h3>初识终端</h3>
              <p>打开终端，理解基本界面，输入第一个命令</p>
              <div className="path-items">
                <div className="path-item">Terminal.app 入门</div>
                <div className="path-item">zsh 基础</div>
                <div className="path-item">pwd / ls / cd</div>
                <div className="path-item">Tab 自动补全</div>
              </div>
            </div>
            <div className="path-step fade-in">
              <div className="path-num">02</div>
              <span className="path-tag tag-begin">初学者</span>
              <h3>核心命令</h3>
              <p>掌握文件操作、文本处理、系统信息等日常命令</p>
              <div className="path-items">
                <div className="path-item">文件增删改查</div>
                <div className="path-item">grep / find</div>
                <div className="path-item">man 帮助手册</div>
                <div className="path-item">历史记录</div>
              </div>
            </div>
            <div className="path-step fade-in">
              <div className="path-num">03</div>
              <span className="path-tag tag-inter">进阶</span>
              <h3>macOS 专属</h3>
              <p>配置 zsh 环境，安装 Homebrew，打造专业工作站</p>
              <div className="path-items">
                <div className="path-item">Homebrew 包管理</div>
                <div className="path-item">oh-my-zsh 配置</div>
                <div className="path-item">iTerm2 优化</div>
                <div className="path-item">PATH 环境变量</div>
              </div>
            </div>
            <div className="path-step fade-in">
              <div className="path-num">04</div>
              <span className="path-tag tag-inter">进阶</span>
              <h3>进阶技巧</h3>
              <p>管道、重定向、别名、Shell 脚本自动化</p>
              <div className="path-items">
                <div className="path-item">管道与重定向</div>
                <div className="path-item">alias 别名</div>
                <div className="path-item">Shell 脚本</div>
                <div className="path-item">SSH 密钥</div>
              </div>
            </div>
            <div className="path-step fade-in">
              <div className="path-num">05</div>
              <span className="path-tag tag-adv">高阶</span>
              <h3>AI 工具集成</h3>
              <p>在终端中使用 Copilot、Claude，实现 AI 辅助工作流</p>
              <div className="path-items">
                <div className="path-item">gh copilot CLI</div>
                <div className="path-item">Claude Code</div>
                <div className="path-item">AI 写脚本</div>
                <div className="path-item">自动化工作流</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* GETTING STARTED */}
        <section id="start">
          <div className="section-label">阶段 01</div>
          <h2>快速<em>开始</em></h2>
          <p className="section-sub">打开你的第一个终端，认识它的基本构成。</p>

          <div className="module">
            <div className="module-header">
              <div className="module-num">1.1</div>
              <div>
                <h2 style={{ fontSize: '1.6rem' }}>如何打开终端</h2>
                <p className="section-sub" style={{ fontSize: 14, marginTop: 6 }}>macOS 上有三种方式打开终端</p>
              </div>
            </div>
            <div className="open-grid">
              <div className="macos-card">
                <h3 style={{ fontSize: 16 }}>🔍 Spotlight 搜索</h3>
                <p>按下 <span className="inline-code">⌘ + 空格</span>，输入 "Terminal" 或 "终端"，回车打开。这是最快的方式。</p>
              </div>
              <div className="macos-card">
                <h3 style={{ fontSize: 16 }}>📁 访达 (Finder)</h3>
                <p>打开 Finder → 应用程序 → 实用工具 → 终端。适合不熟悉快捷键的新手。</p>
              </div>
              <div className="macos-card">
                <h3 style={{ fontSize: 16 }}>💻 iTerm2 <span className="term-tag tag-tool">推荐</span></h3>
                <p>更强大的终端替代品。访问 <span className="inline-code">iterm2.com</span> 下载，功能远超系统终端。</p>
              </div>
            </div>
            <div className="tip">
              <strong>💡 推荐：</strong>安装 iTerm2 作为默认终端。它支持分屏、丰富的主题、更好的颜色渲染，是专业用户的首选。
            </div>
          </div>

          <div className="module">
            <div className="module-header">
              <div className="module-num">1.2</div>
              <div>
                <h2 style={{ fontSize: '1.6rem' }}>认识终端界面</h2>
                <p className="section-sub" style={{ fontSize: 14, marginTop: 6 }}>了解提示符的组成部分</p>
              </div>
            </div>
            <TerminalWindow title="zsh — 终端界面解析">
              <div style={{ marginBottom: 16, fontSize: 12, color: 'var(--t3)' }}># 典型的 zsh 提示符由以下部分组成：</div>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: 13, marginBottom: 16 }}>
                <span style={{ color: 'var(--blue)' }}>用户名</span>
                <span style={{ color: 'var(--t3)' }}>@</span>
                <span style={{ color: 'var(--amber)' }}>主机名</span>
                <span style={{ color: 'var(--t3)' }}>:</span>
                <span style={{ color: 'var(--green)' }}>~/当前目录</span>
                <span style={{ color: 'var(--t1)' }}>❯ 命令在这里输入</span>
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
              <div className="term-comment"># ❯ 符号表示终端在等待你输入命令</div>
              <div className="term-comment"># ~ 代表你的主目录 (/Users/你的用户名)</div>
              <div className="term-comment"># 按 Tab 键可以自动补全命令和路径</div>
              <div className="term-comment"># 按 ↑↓ 箭头键可以浏览历史命令</div>
            </TerminalWindow>
          </div>

          <div className="module">
            <div className="module-header">
              <div className="module-num">1.3</div>
              <div>
                <h2 style={{ fontSize: '1.6rem' }}>第一批命令</h2>
                <p className="section-sub" style={{ fontSize: 14, marginTop: 6 }}>这三个命令将是你最常用的</p>
              </div>
            </div>
            <div className="cmd-grid">
              <CmdCard title="pwd — 当前位置" name="pwd" desc="Print Working Directory — 显示你当前在文件系统中的位置">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>pwd</div>
                  <div className="cmd-ex-line" style={{ color: 'var(--t2)' }}>/Users/viper/projects</div>
                  <div className="cmd-ex-comment"># 显示完整路径，~ 是主目录的简写</div>
                </div>
              </CmdCard>
              <CmdCard title="ls — 列出内容" name="ls" desc="List — 查看目录下的文件和文件夹">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ls</div>
                  <div className="cmd-ex-line" style={{ color: 'var(--t2)' }}>Desktop  Documents  Downloads  Projects</div>
                </div>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ls <span style={{ color: 'var(--amber)' }}>-la</span></div>
                  <div className="cmd-ex-comment"># -l 详细信息  -a 显示隐藏文件</div>
                </div>
              </CmdCard>
              <CmdCard title="cd — 移动位置" name="cd" desc="Change Directory — 在目录之间导航">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cd <span style={{ color: 'var(--blue)' }}>Documents</span></div>
                  <div className="cmd-ex-comment"># 进入 Documents 目录</div>
                </div>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cd <span style={{ color: 'var(--amber)' }}>..</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cd <span style={{ color: 'var(--amber)' }}>~</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cd <span style={{ color: 'var(--amber)' }}>-</span></div>
                  <div className="cmd-ex-comment"># 上级目录 / 主目录 / 上一个目录</div>
                </div>
              </CmdCard>
              <CmdCard title="man — 帮助手册" name="man" desc="Manual — 查看任何命令的官方说明文档">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>man <span style={{ color: 'var(--blue)' }}>ls</span></div>
                  <div className="cmd-ex-comment"># 按 q 退出手册页</div>
                </div>
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ls <span style={{ color: 'var(--amber)' }}>--help</span></div>
                  <div className="cmd-ex-comment"># 快速查看常用选项</div>
                </div>
              </CmdCard>
            </div>
            <div className="tip">
              <strong>⌨️ 必学快捷键：</strong>
              <code className="inline-code">Ctrl+C</code> 终止命令 &nbsp;•&nbsp;
              <code className="inline-code">Ctrl+L</code> 清屏 &nbsp;•&nbsp;
              <code className="inline-code">Tab</code> 自动补全 &nbsp;•&nbsp;
              <code className="inline-code">↑↓</code> 历史命令 &nbsp;•&nbsp;
              <code className="inline-code">Ctrl+A</code> 行首 &nbsp;•&nbsp;
              <code className="inline-code">Ctrl+E</code> 行尾 &nbsp;•&nbsp;
              <code className="inline-code">Ctrl+R</code> 搜索历史
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* CORE COMMANDS */}
        <section id="commands">
          <div className="section-label">阶段 02</div>
          <h2><em>核心命令</em>大全</h2>
          <p className="section-sub">掌握这些命令，覆盖 90% 的日常终端操作。</p>

          <div className="module">
            <div className="module-header">
              <div className="module-num">2.1</div>
              <div><h2 style={{ fontSize: '1.6rem' }}>文件与目录操作</h2></div>
            </div>
            <div className="cmd-grid">
              <CmdCard title="mkdir — 创建目录" name="mkdir" desc="Make Directory — 创建新文件夹">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>mkdir <span style={{ color: 'var(--blue)' }}>my-project</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>mkdir <span style={{ color: 'var(--amber)' }}>-p</span> <span style={{ color: 'var(--blue)' }}>a/b/c</span></div>
                  <div className="cmd-ex-comment"># -p 递归创建多层目录</div>
                </div>
              </CmdCard>
              <CmdCard title="touch — 创建文件" name="touch" desc="创建空文件，或更新文件的修改时间">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>touch <span style={{ color: 'var(--blue)' }}>index.html</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>touch <span style={{ color: 'var(--blue)' }}>a.js b.js c.js</span></div>
                  <div className="cmd-ex-comment"># 一次创建多个文件</div>
                </div>
              </CmdCard>
              <CmdCard title="cp — 复制" name="cp" desc="Copy — 复制文件或目录">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cp <span style={{ color: 'var(--blue)' }}>file.txt</span> <span style={{ color: 'var(--green)' }}>file-backup.txt</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cp <span style={{ color: 'var(--amber)' }}>-r</span> <span style={{ color: 'var(--blue)' }}>folder/</span> <span style={{ color: 'var(--green)' }}>folder-backup/</span></div>
                  <div className="cmd-ex-comment"># -r 递归复制整个目录</div>
                </div>
              </CmdCard>
              <CmdCard title="mv — 移动/重命名" name="mv" desc="Move — 移动文件，也用于重命名">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>mv <span style={{ color: 'var(--blue)' }}>old-name.txt</span> <span style={{ color: 'var(--green)' }}>new-name.txt</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>mv <span style={{ color: 'var(--blue)' }}>file.txt</span> <span style={{ color: 'var(--green)' }}>~/Documents/</span></div>
                </div>
              </CmdCard>
              <CmdCard title="rm — 删除" name="rm" desc="Remove — 删除文件或目录（操作不可撤销！）">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>rm <span style={{ color: 'var(--blue)' }}>file.txt</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>rm <span style={{ color: 'var(--amber)' }}>-rf</span> <span style={{ color: 'var(--blue)' }}>folder/</span></div>
                  <div className="cmd-ex-comment"># -r 递归  -f 强制，不提示确认</div>
                </div>
              </CmdCard>
              <CmdCard title="find — 搜索文件" name="find" desc="在目录树中查找文件">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>find <span style={{ color: 'var(--blue)' }}>.</span> <span style={{ color: 'var(--amber)' }}>-name</span> <span style={{ color: 'var(--green)' }}>"*.js"</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>find <span style={{ color: 'var(--blue)' }}>~</span> <span style={{ color: 'var(--amber)' }}>-mtime</span> <span style={{ color: 'var(--green)' }}>-7</span></div>
                  <div className="cmd-ex-comment"># 最近 7 天修改的文件</div>
                </div>
              </CmdCard>
            </div>
            <div className="warn">
              <strong>⚠️ 警告：</strong><code className="inline-code">rm -rf</code> 删除的文件<strong>不会</strong>进入废纸篓，无法恢复。执行前请三思，永远不要运行 <code className="inline-code">rm -rf /</code> 或 <code className="inline-code">rm -rf ~</code>！
            </div>
          </div>

          <div className="module">
            <div className="module-header">
              <div className="module-num">2.2</div>
              <div><h2 style={{ fontSize: '1.6rem' }}>查看与编辑文本</h2></div>
            </div>
            <div className="cmd-grid">
              <CmdCard title="cat — 查看文件内容" name="cat" desc="Concatenate — 输出文件内容到终端">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cat <span style={{ color: 'var(--blue)' }}>README.md</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>cat <span style={{ color: 'var(--amber)' }}>-n</span> <span style={{ color: 'var(--blue)' }}>script.sh</span></div>
                  <div className="cmd-ex-comment"># -n 显示行号</div>
                </div>
              </CmdCard>
              <CmdCard title="grep — 搜索文本" name="grep" desc="在文件中搜索文本内容，支持正则表达式">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>grep <span style={{ color: 'var(--green)' }}>"error"</span> <span style={{ color: 'var(--blue)' }}>app.log</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>grep <span style={{ color: 'var(--amber)' }}>-ri</span> <span style={{ color: 'var(--green)' }}>"TODO"</span> <span style={{ color: 'var(--blue)' }}>src/</span></div>
                  <div className="cmd-ex-comment"># -r 递归  -i 忽略大小写</div>
                </div>
              </CmdCard>
              <CmdCard title="nano — 简单编辑器" name="nano" desc="终端内置的简单文本编辑器，新手友好">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>nano <span style={{ color: 'var(--blue)' }}>~/.zshrc</span></div>
                  <div className="cmd-ex-comment"># Ctrl+O 保存  Ctrl+X 退出</div>
                </div>
              </CmdCard>
              <CmdCard title="head / tail — 查看部分" name="head / tail" desc="查看文件的开头或结尾部分内容">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>head <span style={{ color: 'var(--amber)' }}>-20</span> <span style={{ color: 'var(--blue)' }}>log.txt</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>tail <span style={{ color: 'var(--amber)' }}>-f</span> <span style={{ color: 'var(--blue)' }}>app.log</span></div>
                  <div className="cmd-ex-comment"># -f 实时跟踪最新日志输出</div>
                </div>
              </CmdCard>
            </div>
          </div>

          <div className="module">
            <div className="module-header">
              <div className="module-num">2.3</div>
              <div><h2 style={{ fontSize: '1.6rem' }}>系统信息与进程管理</h2></div>
            </div>
            <div className="cmd-grid">
              <CmdCard title="top — 进程监控" name="top / htop" desc="实时查看系统进程和资源占用情况">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>top</div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>htop <span style={{ color: 'var(--t3)' }}># brew install htop</span></div>
                </div>
              </CmdCard>
              <CmdCard title="df / du — 磁盘空间" name="df / du" desc="查看磁盘和目录的空间使用情况">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>df <span style={{ color: 'var(--amber)' }}>-h</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>du <span style={{ color: 'var(--amber)' }}>-sh</span> <span style={{ color: 'var(--blue)' }}>*</span></div>
                  <div className="cmd-ex-comment"># -h 人类可读格式 (GB/MB)</div>
                </div>
              </CmdCard>
              <CmdCard title="ps — 进程列表" name="ps" desc="Process Status — 查看正在运行的进程">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ps <span style={{ color: 'var(--amber)' }}>aux</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ps <span style={{ color: 'var(--amber)' }}>aux</span> | grep <span style={{ color: 'var(--green)' }}>node</span></div>
                </div>
              </CmdCard>
              <CmdCard title="网络与下载" name="curl / ping" desc="网络请求、测试连接、下载文件">
                <div className="cmd-ex">
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>ping <span style={{ color: 'var(--blue)' }}>google.com</span></div>
                  <div className="cmd-ex-line"><span className="cmd-prompt">❯ </span>curl <span style={{ color: 'var(--amber)' }}>-O</span> <span style={{ color: 'var(--green)' }}>https://example.com/file</span></div>
                  <div className="cmd-ex-comment"># -O 下载并保留原文件名</div>
                </div>
              </CmdCard>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* MACOS SPECIFIC */}
        <section id="macos">
          <div className="section-label">阶段 03</div>
          <h2>macOS <em>专属</em>配置</h2>
          <p className="section-sub">打造专业的 macOS 开发环境，让终端更顺手更强大。</p>
          <div className="macos-grid">
            <div className="macos-card">
              <h3>🍺 Homebrew <span className="term-tag tag-tool">包管理器</span></h3>
              <p>macOS 上最重要的工具。用一条命令安装、更新、卸载几乎所有开发工具和应用。</p>
              <TerminalWindow title="安装与使用 Homebrew" bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># 1. 安装 Homebrew（复制到终端执行）</div>
                <div style={{ color: 'var(--t2)', fontSize: 11, wordBreak: 'break-all', marginBottom: 12, padding: 8, background: 'var(--bg-e)', borderRadius: 4 }}>
                  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
                </div>
                <div className="term-comment"># 2. 常用 brew 命令</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew install <span className="term-highlight">git</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew install <span className="term-highlight">node</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew install <span className="term-highlight">gh</span>       <span className="term-comment"># GitHub CLI</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew upgrade           <span className="term-comment"># 更新所有软件</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew list              <span className="term-comment"># 已安装列表</span></span></div>
              </TerminalWindow>
            </div>
            <div className="macos-card">
              <h3>⚙️ zsh 配置 <span className="term-tag tag-mac">macOS 默认</span></h3>
              <p>macOS 从 Catalina 起默认使用 zsh。配置 <code className="inline-code">~/.zshrc</code> 文件来自定义你的终端环境。</p>
              <TerminalWindow title="~/.zshrc 配置示例" bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># 打开配置文件编辑</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">nano <span className="term-path">~/.zshrc</span></span></div>
                <br />
                <div style={{ color: 'var(--t2)', fontSize: 11, lineHeight: 2, background: 'var(--bg-e)', padding: 10, borderRadius: 4 }}>
                  <span style={{ color: 'var(--t3)' }}># PATH 配置</span><br />
                  <span style={{ color: 'var(--blue)' }}>export</span> <span style={{ color: 'var(--amber)' }}>PATH</span>=<span style={{ color: 'var(--green)' }}>"/opt/homebrew/bin:$PATH"</span><br />
                  <span style={{ color: 'var(--t3)' }}># 常用别名</span><br />
                  <span style={{ color: 'var(--blue)' }}>alias</span> ll=<span style={{ color: 'var(--green)' }}>'ls -la'</span><br />
                  <span style={{ color: 'var(--blue)' }}>alias</span> gs=<span style={{ color: 'var(--green)' }}>'git status'</span><br />
                  <span style={{ color: 'var(--blue)' }}>alias</span> dev=<span style={{ color: 'var(--green)' }}>'npm run dev'</span>
                </div>
                <br />
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">source <span className="term-path">~/.zshrc</span>  <span className="term-comment"># 重载配置</span></span></div>
              </TerminalWindow>
            </div>
            <div className="macos-card">
              <h3>🎨 oh-my-zsh <span className="term-tag tag-tool">框架</span></h3>
              <p>强大的 zsh 配置管理框架，提供数百个主题和插件，让终端焕然一新，功能强大。</p>
              <TerminalWindow title="安装 oh-my-zsh" bodyStyle={{ fontSize: 12 }}>
                <div style={{ color: 'var(--t2)', fontSize: 11, wordBreak: 'break-all', marginBottom: 12, padding: 8, background: 'var(--bg-e)', borderRadius: 4 }}>
                  sh -c "$(curl -fsSL https://ohmyz.sh/install.sh)"
                </div>
                <div className="term-comment"># 推荐插件（.zshrc 中配置）</div>
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
              <h3>🍎 macOS 独有命令 <span className="term-tag tag-mac">专属</span></h3>
              <p>这些命令只在 macOS 上可用，非常实用，是与 Finder 和系统交互的利器。</p>
              <TerminalWindow title="macOS 专属命令" bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># 用默认程序打开文件/目录/URL</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">open <span className="term-highlight">README.md</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">open <span className="term-highlight">.</span>   <span className="term-comment"># 在Finder中打开当前目录</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">open <span className="term-highlight">https://github.com</span></span></div>
                <br />
                <div className="term-comment"># 剪贴板操作</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">cat file.txt | <span className="term-success">pbcopy</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd"><span className="term-success">pbpaste</span> &gt; output.txt</span></div>
                <br />
                <div className="term-comment"># 文字转语音</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">say <span className="term-highlight">"Hello, Terminal!"</span></span></div>
              </TerminalWindow>
            </div>
          </div>
          <div className="tip" style={{ marginTop: 32 }}>
            <strong>🚀 推荐工具链：</strong>
            <code className="inline-code">iTerm2</code> + <code className="inline-code">oh-my-zsh</code> + <code className="inline-code">powerlevel10k</code> + <code className="inline-code">zsh-autosuggestions</code> + <code className="inline-code">zsh-syntax-highlighting</code>
            — 这是 macOS 开发者最流行的终端配置组合，安装后终端体验质的飞跃。
          </div>
        </section>

        <hr className="divider" />

        {/* ONE-CLICK SETUP */}
        <section id="setup">
          <div className="section-label">环境部署</div>
          <h2>一键安装部署<em>终端环境</em></h2>
          <p className="section-sub">只需一条命令，自动完成 iTerm2、Oh My Zsh、Powerlevel10k 主题及高效插件的全部安装与配置。</p>

          {/* Script block */}
          <div className="setup-script-wrap">
            <div className="setup-script-header">
              <div className="setup-script-title">
                <span className="setup-script-icon">📜</span>
                <span>setup-terminal.sh</span>
                <span className="term-tag tag-tool">一键脚本</span>
              </div>
              <div className="setup-script-hint">将以下脚本保存为 <code className="inline-code">setup-terminal.sh</code>，然后运行 <code className="inline-code">bash setup-terminal.sh</code></div>
            </div>
            <TerminalWindow title="setup-terminal.sh — 一键终端环境安装脚本" bodyStyle={{ fontSize: 12, maxHeight: 520, overflowY: 'auto' }}>
              <div className="term-comment">#!/bin/bash</div>
              <br />
              <div className="term-line"><span className="term-cmd" style={{ color: 'var(--blue)' }}>set</span> <span style={{ color: 'var(--amber)' }}>-e</span></div>
              <br />
              <div className="term-line"><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"🚀 开始终端升级之旅..."</span></span></div>
              <br />
              <div className="term-comment"># 1. 检查并安装 Homebrew (macOS 包管理器)</div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>if</span> ! command -v brew &amp;&gt; /dev/null; <span style={{ color: 'var(--blue)' }}>then</span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"🍺 正在安装 Homebrew..."</span></span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}>/bin/bash -c <span style={{ color: 'var(--amber)' }}>"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</span></div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>else</span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"✅ Homebrew 已安装。"</span></span></div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>fi</span></div>
              <br />
              <div className="term-comment"># 2. 检查并安装 iTerm2</div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>if</span> [ ! -d <span style={{ color: 'var(--amber)' }}>"/Applications/iTerm.app"</span> ]; <span style={{ color: 'var(--blue)' }}>then</span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"💻 正在安装 iTerm2..."</span></span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}>brew install --cask iterm2</div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>else</span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"✅ iTerm2 已存在。"</span></span></div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>fi</span></div>
              <br />
              <div className="term-comment"># 3. 安装 Oh My Zsh</div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>if</span> [ ! -d <span style={{ color: 'var(--amber)' }}>"$HOME/.oh-my-zsh"</span> ]; <span style={{ color: 'var(--blue)' }}>then</span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"🌈 正在安装 Oh My Zsh..."</span></span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}>sh -c <span style={{ color: 'var(--amber)' }}>"$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"</span> <span style={{ color: 'var(--t2)' }}>"" --unattended</span></div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>else</span></div>
              <div className="term-line" style={{ paddingLeft: 20 }}><span className="term-cmd"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"✅ Oh My Zsh 已存在。"</span></span></div>
              <div className="term-line"><span style={{ color: 'var(--blue)' }}>fi</span></div>
              <br />
              <div className="term-comment"># 定义路径</div>
              <div className="term-line"><span className="term-highlight">ZSH_CUSTOM</span>=${'{'}<span className="term-highlight">ZSH_CUSTOM</span>:-<span style={{ color: 'var(--amber)' }}>$HOME/.oh-my-zsh/custom</span>{'}'}</div>
              <br />
              <div className="term-comment"># 4. 下载 Powerlevel10k 主题</div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"🎨 下载 Powerlevel10k..."</span></div>
              <div className="term-line">[ ! -d <span style={{ color: 'var(--amber)' }}>"$ZSH_CUSTOM/themes/powerlevel10k"</span> ] &amp;&amp; \</div>
              <div className="term-line" style={{ paddingLeft: 20 }}>git clone --depth=1 https://github.com/romkatv/powerlevel10k.git <span className="term-path">$ZSH_CUSTOM/themes/powerlevel10k</span></div>
              <br />
              <div className="term-comment"># 5. 下载插件 (Autosuggestions &amp; Syntax Highlighting)</div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"🔌 下载效率插件..."</span></div>
              <div className="term-line">[ ! -d <span style={{ color: 'var(--amber)' }}>"$ZSH_CUSTOM/plugins/zsh-autosuggestions"</span> ] &amp;&amp; \</div>
              <div className="term-line" style={{ paddingLeft: 20 }}>git clone https://github.com/zsh-users/zsh-autosuggestions <span className="term-path">$ZSH_CUSTOM/plugins/zsh-autosuggestions</span></div>
              <br />
              <div className="term-line">[ ! -d <span style={{ color: 'var(--amber)' }}>"$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"</span> ] &amp;&amp; \</div>
              <div className="term-line" style={{ paddingLeft: 20 }}>git clone https://github.com/zsh-users/zsh-syntax-highlighting.git <span className="term-path">$ZSH_CUSTOM/plugins/zsh-syntax-highlighting</span></div>
              <br />
              <div className="term-comment"># 6. 修改 .zshrc 配置文件</div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"⚙️ 正在写入配置到 .zshrc..."</span></div>
              <br />
              <div className="term-comment"># 设置主题</div>
              <div className="term-line">sed -i <span style={{ color: 'var(--amber)' }}>''</span> <span style={{ color: 'var(--green)' }}>'s/ZSH_THEME="robbyrussell"/ZSH_THEME="powerlevel10k\/powerlevel10k"/g'</span> ~/.zshrc</div>
              <br />
              <div className="term-comment"># 设置插件</div>
              <div className="term-line">sed -i <span style={{ color: 'var(--amber)' }}>''</span> <span style={{ color: 'var(--green)' }}>'s/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/g'</span> ~/.zshrc</div>
              <br />
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--t2)' }}>"-----------------------------------------------"</span></div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--amber)' }}>"✨ 全部安装完成！"</span></div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--blue)' }}>"👉 请执行: source ~/.zshrc"</span></div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--t2)' }}>"👉 注意：建议在 iTerm2 设置中手动安装 'MesloLGS NF' 字体以完美显示图标。"</span></div>
              <div className="term-line"><span className="term-success">echo</span> <span style={{ color: 'var(--t2)' }}>"-----------------------------------------------"</span></div>
            </TerminalWindow>
          </div>

          {/* Core config guide */}
          <div className="setup-guide-grid">
            <div className="setup-guide-card">
              <div className="setup-guide-num">1</div>
              <div className="setup-guide-content">
                <h3>🔤 字体是灵魂</h3>
                <p>Powerlevel10k 的图标需要 <strong>Nerd Fonts</strong> 支持，否则会显示乱码方块。</p>
                <div className="setup-guide-steps">
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">自动</span>
                    运行 <code className="inline-code">source ~/.zshrc</code> 后，P10k 可能提示 <em>Install Meslo Nerd Font for you?</em>，直接输入 <code className="inline-code">y</code> 即可。
                  </div>
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">手动</span>
                    打开 iTerm2 设置 <code className="inline-code">Cmd + ,</code> → <strong>Profiles</strong> → <strong>Text</strong> → <strong>Font</strong>，选择 <code className="inline-code">MesloLGS NF</code>。
                  </div>
                </div>
              </div>
            </div>
            <div className="setup-guide-card">
              <div className="setup-guide-num">2</div>
              <div className="setup-guide-content">
                <h3>🎨 iTerm2 配色方案</h3>
                <p>推荐一个经典组合，让你的界面看起来专业舒适：</p>
                <div className="setup-guide-steps">
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">推荐</span>
                    前往 <a href="https://iterm2colorschemes.com" target="_blank" rel="noopener noreferrer" className="setup-link">iTerm2 Color Schemes</a>，个人推荐 <strong>Snazzy</strong> 或 <strong>Solarized Dark Higher Contrast</strong>。
                  </div>
                  <div className="setup-guide-step">
                    <span className="setup-step-tag">导入</span>
                    在 iTerm2 设置 → <strong>Profiles</strong> → <strong>Colors</strong> → <strong>Color Presets</strong> 中导入下载的 <code className="inline-code">.itermcolors</code> 文件。
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shortcut keys */}
          <div className="setup-shortcuts">
            <div className="section-label" style={{ marginBottom: 20 }}>📖 常用快捷键复习</div>
            <div className="setup-shortcuts-grid">
              <div className="setup-shortcut-row setup-shortcut-header">
                <div>功能</div>
                <div>操作</div>
              </div>
              <div className="setup-shortcut-row">
                <div>自动补全建议</div>
                <div>输入部分命令后，按 <kbd>→</kbd>（方向右键）采纳灰色提示</div>
              </div>
              <div className="setup-shortcut-row">
                <div>语法高亮</div>
                <div><span style={{ color: 'var(--red)' }}>红色</span>说明命令不存在或有错，<span style={{ color: 'var(--green)' }}>绿色</span>表示正确</div>
              </div>
              <div className="setup-shortcut-row">
                <div>重新配置界面</div>
                <div>输入 <code className="inline-code">p10k configure</code></div>
              </div>
              <div className="setup-shortcut-row">
                <div>快速跳转目录</div>
                <div>配合 <code className="inline-code">z</code> 插件（Oh My Zsh 自带，在 plugins 中加入 <code className="inline-code">z</code>）</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ADVANCED */}
        <section id="advanced">
          <div className="section-label">阶段 04</div>
          <h2>进阶<em>技巧</em></h2>
          <p className="section-sub">掌握这些特性，让你的终端效率再上一个台阶。</p>
          <div className="adv-grid">
            <div className="adv-card">
              <h3>管道 |</h3>
              <p>将一个命令的输出传递给另一个命令，这是终端最强大的特性之一。</p>
              <div className="code-block">
                <div><span className="g">❯</span> ls -la | <span className="b">grep</span> <span className="g">".js"</span></div>
                <div className="d"># 列出所有 .js 文件</div>
                <br />
                <div><span className="g">❯</span> cat log.txt | <span className="b">grep</span> <span className="g">"error"</span> | <span className="b">wc -l</span></div>
                <div className="d"># 统计错误行数</div>
                <br />
                <div><span className="g">❯</span> ps aux | <span className="b">grep</span> node | <span className="b">awk</span> <span className="g">{"'{print $2}'"}</span></div>
                <div className="d"># 获取 node 进程 PID</div>
              </div>
            </div>
            <div className="adv-card">
              <h3>重定向 &gt; &gt;&gt;</h3>
              <p>将命令输出保存到文件，或从文件读取输入。</p>
              <div className="code-block">
                <div><span className="g">❯</span> ls <span className="a">&gt;</span> files.txt</div>
                <div className="d"># 覆盖写入文件</div>
                <br />
                <div><span className="g">❯</span> echo "new line" <span className="a">&gt;&gt;</span> log.txt</div>
                <div className="d"># 追加写入</div>
                <br />
                <div><span className="g">❯</span> command <span className="b">2&gt;</span> error.log</div>
                <div className="d"># 错误输出重定向</div>
                <br />
                <div><span className="g">❯</span> command <span className="b">&amp;&gt;</span> all.log</div>
                <div className="d"># 所有输出到文件</div>
              </div>
            </div>
            <div className="adv-card">
              <h3>alias 别名</h3>
              <p>为常用的长命令创建短别名，大幅提升输入效率。</p>
              <div className="code-block">
                <div className="d"># 添加到 ~/.zshrc</div>
                <br />
                <div><span className="b">alias</span> <span className="a">ll</span>=<span className="g">'ls -la --color'</span></div>
                <div><span className="b">alias</span> <span className="a">gs</span>=<span className="g">'git status'</span></div>
                <div><span className="b">alias</span> <span className="a">gp</span>=<span className="g">'git push'</span></div>
                <div><span className="b">alias</span> <span className="a">ni</span>=<span className="g">'npm install'</span></div>
                <div><span className="b">alias</span> <span className="a">dev</span>=<span className="g">'npm run dev'</span></div>
                <br />
                <div className="d"># 查看所有别名</div>
                <div><span className="g">❯</span> alias</div>
              </div>
            </div>
            <div className="adv-card">
              <h3>环境变量</h3>
              <p>配置系统环境，管理 API 密钥和工具路径。</p>
              <div className="code-block">
                <div className="d"># 查看环境变量</div>
                <div><span className="g">❯</span> <span className="b">printenv</span></div>
                <div><span className="g">❯</span> echo <span className="a">$HOME</span></div>
                <div><span className="g">❯</span> echo <span className="a">$PATH</span></div>
                <br />
                <div className="d"># 设置临时变量（当前会话）</div>
                <div><span className="b">export</span> <span className="a">API_KEY</span>=<span className="g">"your_key_here"</span></div>
                <br />
                <div className="d"># 永久设置（写入 ~/.zshrc）</div>
                <div><span className="b">export</span> <span className="a">ANTHROPIC_KEY</span>=<span className="g">"sk-..."</span></div>
              </div>
            </div>
            <div className="adv-card">
              <h3>Shell 脚本</h3>
              <p>将多条命令写入脚本文件，实现自动化任务执行。</p>
              <div className="code-block">
                <div className="d">#!/bin/zsh  # 脚本文件头</div>
                <div className="d"># deploy.sh</div>
                <br />
                <div><span className="b">echo</span> <span className="g">"🚀 开始部署..."</span></div>
                <div><span className="b">git</span> pull origin main</div>
                <div><span className="b">npm</span> install</div>
                <div><span className="b">npm</span> run build</div>
                <div><span className="b">echo</span> <span className="g">"✅ 部署完成！"</span></div>
                <br />
                <div className="d"># 赋予执行权限并运行</div>
                <div><span className="g">❯</span> chmod +x deploy.sh</div>
                <div><span className="g">❯</span> ./deploy.sh</div>
              </div>
            </div>
            <div className="adv-card">
              <h3>SSH 与远程</h3>
              <p>使用 SSH 连接远程服务器，配置密钥免密登录。</p>
              <div className="code-block">
                <div className="d"># 生成 SSH 密钥对</div>
                <div><span className="g">❯</span> ssh-keygen <span className="a">-t ed25519</span></div>
                <br />
                <div className="d"># 复制公钥到剪贴板</div>
                <div><span className="g">❯</span> cat ~/.ssh/id_ed25519.pub | <span className="b">pbcopy</span></div>
                <div className="d"># 然后粘贴到 GitHub Settings</div>
                <br />
                <div className="d"># 连接服务器</div>
                <div><span className="g">❯</span> ssh <span className="a">user@server.com</span></div>
                <br />
                <div className="d"># 测试 GitHub SSH 连接</div>
                <div><span className="g">❯</span> ssh -T git@github.com</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* AI TOOLS */}
        <section id="ai">
          <div className="section-label">阶段 05 — 高阶</div>
          <h2>终端 × <em>AI 工具</em></h2>
          <p className="section-sub">掌握 AI 工具与终端的结合，成为真正的效率大师。</p>
          <div className="ai-tools-grid">
            <div className="ai-tool-card">
              <div className="ai-tool-logo logo-g">🐙</div>
              <h3>GitHub Copilot CLI</h3>
              <p>在终端中直接向 GitHub Copilot 提问。用自然语言描述想要的命令，AI 帮你生成并解释，无需记忆复杂语法。</p>
              <span className="ai-badge" style={{ background: 'var(--green-d)', color: 'var(--green)' }}>gh extension</span>
              <TerminalWindow title="gh copilot 使用示例" bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># 安装 GitHub CLI 和 Copilot 扩展</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew install gh</span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh auth login</span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh extension install github/gh-copilot</span></div>
                <br />
                <div className="term-comment"># 用自然语言获取命令建议</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh copilot suggest <span className="term-highlight">"找出占用8080端口的进程"</span></span></div>
                <div className="term-output" style={{ color: 'var(--green)' }}>lsof -i :8080</div>
                <br />
                <div className="term-comment"># 解释命令的含义</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh copilot explain <span className="term-highlight">"find . -name '*.log' -mtime +7"</span></span></div>
                <div className="term-output">查找当前目录下所有超过 7 天未修改的 .log 文件</div>
              </TerminalWindow>
            </div>
            <div className="ai-tool-card amber-glow">
              <div className="ai-tool-logo logo-a">✦</div>
              <h3>Claude Code</h3>
              <p>Anthropic 推出的终端 AI 编程助手。直接在项目目录中运行，理解整个代码库上下文，支持读写文件和执行命令。</p>
              <span className="ai-badge" style={{ background: 'var(--amber-d)', color: 'var(--amber)' }}>Anthropic</span>
              <TerminalWindow title="Claude Code 使用" bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># 安装 Claude Code</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">npm install -g @anthropic-ai/claude-code</span></div>
                <br />
                <div className="term-comment"># 在项目目录启动</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">cd <span className="term-path">~/my-project</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">claude</span></div>
                <div className="term-output" style={{ color: 'var(--green)' }}>✓ Claude Code 已启动</div>
                <br />
                <div style={{ color: 'var(--amber)', fontSize: 11 }}>你: 帮我给这个 API 添加错误处理</div>
                <div style={{ color: 'var(--t2)', fontSize: 11 }}>Claude: 我分析了你的 api.js 文件，建议以下修改...</div>
              </TerminalWindow>
            </div>
            <div className="ai-tool-card blue-glow">
              <div className="ai-tool-logo logo-b">⬡</div>
              <h3>GitHub CLI (gh)</h3>
              <p>在终端中管理 GitHub 的一切：PR、Issues、Actions、Releases。与 Copilot 深度集成，是现代开发工作流的核心。</p>
              <span className="ai-badge" style={{ background: 'var(--blue-d)', color: 'var(--blue)' }}>官方工具</span>
              <TerminalWindow title="gh CLI 常用命令" bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># 安装并登录</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">brew install gh &amp;&amp; gh auth login</span></div>
                <br />
                <div className="term-comment"># 仓库操作</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh repo clone <span className="term-highlight">用户名/仓库</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh repo create <span className="term-highlight">new-project</span></span></div>
                <br />
                <div className="term-comment"># PR 和 Issue 管理</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh pr create <span style={{ color: 'var(--amber)' }}>--title</span> <span className="term-success">"feat: 新功能"</span></span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh issue list</span></div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">gh run list</span></div>
              </TerminalWindow>
            </div>
            <div className="ai-tool-card">
              <div className="ai-tool-logo logo-g">🤖</div>
              <h3>AI 辅助工作流</h3>
              <p>利用 AI 帮你写复杂的 Shell 脚本、解决报错、优化命令。掌握正确的提问方式，让 AI 成为你的终端搭档。</p>
              <span className="ai-badge" style={{ background: 'var(--green-d)', color: 'var(--green)' }}>最佳实践</span>
              <TerminalWindow title="AI 辅助终端技巧" bodyStyle={{ fontSize: 12 }}>
                <div className="term-comment"># 遇到报错，让 AI 解释</div>
                <div className="term-line"><span className="term-prompt">❯</span><span className="term-cmd">npm install 2&gt;&amp;1 | pbcopy</span></div>
                <div style={{ color: 'var(--t2)', fontSize: 11 }}>然后粘贴错误到 Claude/Copilot 询问解决方案</div>
                <br />
                <div className="term-comment"># 用 AI 生成复杂命令</div>
                <div style={{ color: 'var(--amber)', fontSize: 11 }}>"批量压缩当前目录所有 PNG 图片"</div>
                <div style={{ color: 'var(--green)', fontSize: 11 }}>{'find . -name "*.png" -exec sips -Z 1920 {} \\;'}</div>
                <br />
                <div className="term-comment"># 提问技巧：提供上下文</div>
                <div style={{ color: 'var(--t2)', fontSize: 11 }}>✓ "在 macOS 上，如何用 zsh 脚本..."<br />✓ "报错信息是 [粘贴错误]，如何解决？"</div>
              </TerminalWindow>
            </div>
          </div>
          <div className="tip" style={{ marginTop: 40 }}>
            <strong>🔑 安全原则：</strong>永远不要盲目执行 AI 生成的命令，特别是涉及 <code className="inline-code">sudo</code>、<code className="inline-code">rm</code> 等操作。先用 <code className="inline-code">gh copilot explain</code> 或询问 Claude 理解命令含义，再决定是否执行。
          </div>
        </section>

        <hr className="divider" />

        {/* CHEATSHEET */}
        <section id="cheatsheet">
          <div className="section-label">速查表</div>
          <h2>命令<em>速查</em>手册</h2>
          <p className="section-sub">收藏这个页面，遇到问题时快速查阅。</p>
          <div className="cheat-grid">
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--green)' }} />📂 导航与目录</div>
              <table className="cheat-table"><tbody>
                <tr><td>pwd</td><td>显示当前目录路径</td></tr>
                <tr><td>ls -la</td><td>详细列出所有文件</td></tr>
                <tr><td>cd ~</td><td>回到主目录</td></tr>
                <tr><td>cd ..</td><td>返回上级目录</td></tr>
                <tr><td>cd -</td><td>返回上次所在目录</td></tr>
                <tr><td>mkdir -p a/b/c</td><td>递归创建多层目录</td></tr>
                <tr><td>tree</td><td>树状显示目录结构</td></tr>
              </tbody></table>
            </div>
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--amber)' }} />📄 文件操作</div>
              <table className="cheat-table"><tbody>
                <tr><td>touch file.txt</td><td>创建空文件</td></tr>
                <tr><td>cp -r src/ dst/</td><td>递归复制目录</td></tr>
                <tr><td>mv old new</td><td>移动或重命名</td></tr>
                <tr><td>rm -rf folder/</td><td>递归强制删除（慎！）</td></tr>
                <tr><td>cat file.txt</td><td>查看文件全部内容</td></tr>
                <tr><td>less file.txt</td><td>分页查看大文件</td></tr>
                <tr><td>wc -l file.txt</td><td>统计文件行数</td></tr>
              </tbody></table>
            </div>
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--blue)' }} />🔍 搜索与过滤</div>
              <table className="cheat-table"><tbody>
                <tr><td>grep "txt" file</td><td>搜索文件中的文本</td></tr>
                <tr><td>grep -ri "txt" .</td><td>递归、忽略大小写</td></tr>
                <tr><td>find . -name "*.js"</td><td>按名称查找文件</td></tr>
                <tr><td>find . -mtime -7</td><td>最近7天修改的文件</td></tr>
                <tr><td>which node</td><td>查找命令所在路径</td></tr>
                <tr><td>history | grep git</td><td>搜索历史命令</td></tr>
                <tr><td>Ctrl + R</td><td>反向搜索历史命令</td></tr>
              </tbody></table>
            </div>
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--red)' }} />⚙️ 系统与进程</div>
              <table className="cheat-table"><tbody>
                <tr><td>top</td><td>实时进程监控</td></tr>
                <tr><td>ps aux</td><td>列出所有进程</td></tr>
                <tr><td>df -h</td><td>查看磁盘空间</td></tr>
                <tr><td>du -sh *</td><td>各目录占用大小</td></tr>
                <tr><td>uname -a</td><td>系统版本信息</td></tr>
                <tr><td>sudo command</td><td>以管理员权限运行</td></tr>
                <tr><td>Ctrl + C</td><td>终止当前运行的命令</td></tr>
              </tbody></table>
            </div>
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--amber)' }} />🍎 macOS 专属</div>
              <table className="cheat-table"><tbody>
                <tr><td>open .</td><td>Finder 打开当前目录</td></tr>
                <tr><td>open file.pdf</td><td>用默认程序打开文件</td></tr>
                <tr><td>pbcopy &lt; file</td><td>将文件内容复制到剪贴板</td></tr>
                <tr><td>pbpaste &gt; file</td><td>剪贴板内容写入文件</td></tr>
                <tr><td>say "hello"</td><td>文字转语音朗读</td></tr>
                <tr><td>brew install pkg</td><td>安装软件包</td></tr>
                <tr><td>brew upgrade</td><td>更新所有已安装软件</td></tr>
              </tbody></table>
            </div>
            <div className="cheat-section">
              <div className="cheat-header"><div className="cheat-dot" style={{ background: 'var(--green)' }} />🤖 AI 工具命令</div>
              <table className="cheat-table"><tbody>
                <tr><td>gh auth login</td><td>登录 GitHub 账户</td></tr>
                <tr><td>gh copilot suggest</td><td>AI 建议终端命令</td></tr>
                <tr><td>gh copilot explain</td><td>AI 解释命令含义</td></tr>
                <tr><td>gh pr create</td><td>创建 Pull Request</td></tr>
                <tr><td>gh issue list</td><td>查看项目 Issues</td></tr>
                <tr><td>claude</td><td>启动 Claude Code</td></tr>
                <tr><td>gh run list</td><td>查看 Actions 运行记录</td></tr>
              </tbody></table>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="term-footer">
          <div className="footer-logo">~<span>/</span>terminal-master</div>
          <p>从命令行到 AI 工具，掌握终端，释放潜能。</p>
          <div className="footer-links">
            <span onClick={() => scrollTo('start')}>快速开始</span>
            <span onClick={() => scrollTo('commands')}>核心命令</span>
            <span onClick={() => scrollTo('ai')}>AI 工具</span>
            <span onClick={() => scrollTo('cheatsheet')}>速查表</span>
          </div>
        </footer>
      </Layout>
    </div>
  )
}
