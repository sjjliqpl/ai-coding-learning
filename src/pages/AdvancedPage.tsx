import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/advanced.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandGradient: 'gradient-amber-coral',
  activeClass: 'active',
  groups: [
    {
      title: 'Agent 深度配置',
      items: [
        { id: 'claude', label: 'Claude Code' },
        { id: 'copilot', label: 'GitHub Copilot CLI' },
        { id: 'cursor', label: 'Cursor' },
      ],
    },
    {
      title: '全流程实战',
      items: [
        { id: 'design', label: '设计与架构' },
        { id: 'dev', label: '开发与质量' },
        { id: 'launch', label: '发布与运营' },
      ],
    },
    {
      title: '高级技巧',
      items: [
        { id: 'prompts', label: 'Prompt 模式' },
        { id: 'security', label: '安全防护' },
      ],
    },
  ],
  backTo: { label: '返回首页', path: '/' },
}

export default function AdvancedPage() {
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">AI 编程进阶指南</h1>
        <p className="page-desc">深入了解 AI 编程工具的高级用法与最佳实践</p>
      </header>

      {/* CLAUDE CODE */}
      <section id="claude" className="section">
        <h2><span className="icon">🤖</span> Claude Code (CLI)</h2>
        <p>Anthropic 官方推出的命令行 Agent 工具，擅长处理复杂的重构和理解大型项目。</p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">C</div>
            <div>
              <h3>Claude Code</h3>
              <div className="agent-tags">
                <span className="tag">CLI</span>
                <span className="tag">Claude 3.7 Sonnet</span>
                <span className="tag">重构专家</span>
              </div>
            </div>
          </div>

          <div className="code-box">
            <div className="code-title">安装与认证</div>
            <div className="cmd">npm install -g @anthropic-ai/claude-code</div>
            <div className="cmd">claude login</div> <span className="comment"># 需要 API Key</span>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>🕵️ 深度推理模式</h4>
              <p>遇到极其复杂的 Bug 时，使用 <code>claude --thinking</code> 开启深度思考模式，虽然慢但逻辑更严密。</p>
            </div>
            <div className="feature-item">
              <h4>🔄 自动化重构</h4>
              <p>指令：<code>/refactor src/auth --goal "迁移到 NextAuth v5"</code>。它会自动分析依赖、修改文件并运行测试。</p>
            </div>
          </div>

          <div className="callout tip">
            <h4>💡 最佳实践</h4>
            <p>Claude Code 消耗 Token 较快。建议在遇到 IDE 插件解决不了的"硬骨头"问题时使用，比如跨文件重构、升级依赖版本、解释复杂架构。</p>
          </div>
        </div>
      </section>

      {/* GITHUB COPILOT CLI */}
      <section id="copilot" className="section">
        <h2><span className="icon">✈️</span> GitHub Copilot CLI</h2>
        <p>GitHub 官方出品的终端 AI 编程助手，在命令行中与 AI 协同完成构建、调试和代码理解任务。由与 GitHub Copilot 编程代理相同的 AI 引擎驱动。</p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">G</div>
            <div>
              <h3>GitHub Copilot CLI</h3>
              <div className="agent-tags">
                <span className="tag">Terminal</span>
                <span className="tag">Agentic AI</span>
                <span className="tag">Claude Sonnet</span>
                <span className="tag">MCP 支持</span>
              </div>
            </div>
          </div>

          <div className="code-box">
            <div className="code-title">安装</div>
            <div><span className="comment"># macOS / Linux (推荐)</span></div>
            <div><span className="cmd">brew install copilot-cli</span></div>
            <br />
            <div><span className="comment"># 或通过安装脚本</span></div>
            <div><span className="cmd">curl -fsSL https://gh.io/copilot-install | bash</span></div>
            <br />
            <div><span className="comment"># 或通过 npm</span></div>
            <div><span className="cmd">npm install -g @github/copilot</span></div>
            <br />
            <div><span className="comment"># Windows (WinGet)</span></div>
            <div><span className="cmd">winget install GitHub.Copilot</span></div>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>🚀 启动与登录</h4>
              <p>在项目目录运行 <code>copilot</code> 启动，首次使用输入 <code>/login</code> 进行 GitHub 账号授权，需要有效的 Copilot 订阅。</p>
            </div>
            <div className="feature-item">
              <h4>🤖 Agentic 能力</h4>
              <p>可规划并执行复杂任务——构建、编辑、调试、重构代码，是真正的 AI 协作者，而非简单的命令生成。</p>
            </div>
            <div className="feature-item">
              <h4>🧠 模型选择</h4>
              <p>默认使用 Claude Sonnet 4.5，运行 <code>/model</code> 可切换至其他模型（如 Claude Sonnet 4、GPT-5）。</p>
            </div>
            <div className="feature-item">
              <h4>🔌 MCP 生态</h4>
              <p>内置 GitHub MCP 服务器，同时支持自定义 MCP 服务器扩展——访问文件、数据库、API 等任意外部系统。</p>
            </div>
          </div>

          <div className="code-box">
            <div className="code-title">常用操作</div>
            <div><span className="comment"># 启动 Copilot CLI（在项目目录下）</span></div>
            <div><span className="cmd">copilot</span></div>
            <br />
            <div><span className="comment"># 在 CLI 中使用斜杠命令</span></div>
            <div><span className="cmd">/login     </span><span className="comment"># 登录 GitHub</span></div>
            <div><span className="cmd">/model     </span><span className="comment"># 选择 AI 模型</span></div>
            <div><span className="cmd">/lsp       </span><span className="comment"># 查看 LSP 服务状态</span></div>
            <div><span className="cmd">/feedback  </span><span className="comment"># 提交反馈</span></div>
            <br />
            <div><span className="comment"># Autopilot 模式（实验功能，Shift+Tab 切换）</span></div>
            <div><span className="cmd">copilot --experimental</span></div>
          </div>

          <div className="callout tip">
            <h4>💡 与传统 AI 工具的区别</h4>
            <p>GitHub Copilot CLI 不同于 <code>gh copilot suggest/explain</code>（旧版 gh 扩展）。它是一个独立的 agentic 终端应用，能够理解你的代码库、GitHub 上下文，并自主执行复杂的多步骤任务。每次提交 prompt 会消耗一个 premium request 配额。</p>
          </div>
        </div>
      </section>

      {/* CURSOR */}
      <section id="cursor" className="section">
        <h2><span className="icon">⚡</span> Cursor</h2>
        <p>当前体验最好的 AI 原生编辑器。它的 Rules 功能是让 AI 听话的关键。</p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">⚡</div>
            <div>
              <h3>Cursor</h3>
              <div className="agent-tags">
                <span className="tag">Editor</span>
                <span className="tag">Composer</span>
                <span className="tag">Rules</span>
              </div>
            </div>
          </div>

          <div className="callout tip">
            <h4>📝 .cursorrules 配置 (核心秘籍)</h4>
            <p>在项目根目录创建 <code>.cursorrules</code> 文件，AI 会自动遵守这里的规则。防止它乱写。</p>
          </div>

          <div className="code-box">
            <div className="code-title">.cursorrules 示例</div>
            <span className="comment"># Tech Stack</span><br />
            Framework: Next.js 14 (App Router)<br />
            Style: Tailwind CSS<br />
            State: Zustand<br /><br />
            <span className="comment"># Rules</span><br />
            - Always use functional components.<br />
            - Use "const" for functions.<br />
            - Do not use "any" type, always define interfaces.<br />
            - Prefer Shadcn UI components over raw HTML.
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>🎹 Composer (Ctrl+I)</h4>
              <p>多文件编辑神器。输入"把所有页面的 Header 颜色改成蓝色"，它会自动找到相关文件并修改。</p>
            </div>
            <div className="feature-item">
              <h4>📚 Docs 索引</h4>
              <p>在 Chat 中输入 <code>@Docs</code>，添加官方文档链接（如 Stripe API），AI 就会基于最新文档回答，不再胡编乱造。</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN & ARCHITECTURE */}
      <section id="design" className="section">
        <h2><span className="icon">🏗️</span> 设计与架构</h2>
        <p>AI 代码的质量取决于你的设计。好的架构能让 AI 发挥 200% 的能力。</p>

        <div className="agent-detail">
          <h3>前后端交互规范</h3>
          <p>明确规范，避免 AI 混淆前后端逻辑。</p>
          <div className="code-box">
            <div className="code-title">Prompt 示例</div>
            "请遵循以下架构规范：<br />
            1. <strong>Frontend</strong>: 使用 Server Components 获取数据，Client Components 处理交互。<br />
            2. <strong>Backend</strong>: 所有数据库操作封装在 <code>src/actions</code> 中。<br />
            3. <strong>Types</strong>: 数据库类型定义在 <code>src/types/db.ts</code>，前端组件 Props 必须定义接口。"
          </div>
        </div>
      </section>

      {/* DEV & QUALITY */}
      <section id="dev" className="section">
        <h2><span className="icon">🐛</span> 开发与质量</h2>
        <p>如何管理 AI 生成的代码质量，防止"屎山"堆积。</p>

        <div className="feature-grid">
          <div className="agent-detail" style={{ margin: 0 }}>
            <h3>🔍 交叉审查 (Cross-Check)</h3>
            <p>不要相信单一模型。用 Claude 写完代码，用 GPT-4 Review 一遍。</p>
            <div className="code-box">
              Prompt: "请作为一名资深工程师 Review 这段代码，重点检查：1. 潜在的内存泄漏 2. 错误处理是否完整 3. 变量命名是否清晰。"
            </div>
          </div>
          <div className="agent-detail" style={{ margin: 0 }}>
            <h3>🛡️ 类型防御</h3>
            <p>强制要求 TypeScript。</p>
            <p>TS 是 AI 最好的约束。如果 AI 瞎写属性，TS 编译器会立刻报错。这是比任何 Prompt 都有效的"防呆"机制。</p>
          </div>
        </div>
      </section>

      {/* LAUNCH */}
      <section id="launch" className="section">
        <h2><span className="icon">🚀</span> 发布与运营</h2>
        <p>产品上线只是开始。利用 AI 进行全方位的数据分析和推广。</p>

        <div className="feature-grid">
          <div className="agent-detail" style={{ margin: 0 }}>
            <h3>📊 数据埋点 (PostHog)</h3>
            <p>不要瞎猜用户行为。让 AI 帮你写埋点。</p>
            <div className="code-box">
              <span className="comment">// 让 AI 写的代码</span><br />
              <span className="keyword">import</span> posthog <span className="keyword">from</span> <span className="string">'posthog-js'</span>;<br />
              posthog.capture(<span className="string">'user_signup'</span>, {'{ source: '}<span className="string">'landing_page'</span>{" }"});
            </div>
          </div>
          <div className="agent-detail" style={{ margin: 0 }}>
            <h3>📣 自动化 SEO</h3>
            <p>利用 GPT 生成 Sitemap 和 Meta Tags。</p>
            <div className="code-box">
              Prompt: "分析我的 landing page 内容，生成 5 个高转化率的 Title 和 Description，包含关键词 'AI 编程'。"
            </div>
          </div>
        </div>
      </section>

      {/* PROMPTS */}
      <section id="prompts" className="section">
        <h2><span className="icon">🗣️</span> Prompt 模式</h2>
        <p>高级开发者常用的 Prompt 技巧。</p>

        <div className="agent-detail">
          <div className="code-box">
            <div className="code-title">链式思考 (Chain of Thought)</div>
            "在写代码之前，先逐步分析这个功能的实现逻辑，列出需要的步骤，并解释为什么选择这个方案。"
          </div>
          <div className="code-box">
            <div className="code-title">角色扮演 (Role Play)</div>
            "你是一名资深的 React 性能优化专家。请优化这个组件的渲染性能，并解释 memo 和 useCallback 的使用理由。"
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="section">
        <h2><span className="icon">🛡️</span> 安全防护</h2>

        <div className="callout warn">
          <h4>🚫 绝对禁止的操作</h4>
          <ul>
            <li>不要把 <code>.env</code> 文件提交到 Git。</li>
            <li>不要在前端代码中暴露 <code>OPENAI_API_KEY</code>。</li>
            <li>不要直接运行 AI 生成的 Shell 命令（特别是涉及 <code>rm -rf</code> 的）。</li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}
