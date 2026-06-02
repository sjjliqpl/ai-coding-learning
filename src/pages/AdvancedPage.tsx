import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import { useLang } from '../i18n/LanguageContext'
import '../styles/advanced.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandTextEn: 'AI Coding Guide',
  brandGradient: 'gradient-amber-coral',
  activeClass: 'active',
  groups: [
    {
      title: 'Agent 深度配置',
      titleEn: 'Agent Deep Config',
      items: [
        { id: 'claude', label: 'Claude Code', labelEn: 'Claude Code' },
        { id: 'copilot', label: 'GitHub Copilot CLI', labelEn: 'GitHub Copilot CLI' },
        { id: 'cursor', label: 'Cursor', labelEn: 'Cursor' },
      ],
    },
    {
      title: '全流程实战',
      titleEn: 'Full Workflow',
      items: [
        { id: 'design', label: '设计与架构', labelEn: 'Design & Architecture' },
        { id: 'dev', label: '开发与质量', labelEn: 'Dev & Quality' },
        { id: 'launch', label: '发布与运营', labelEn: 'Launch & Operations' },
      ],
    },
    {
      title: '高级技巧',
      titleEn: 'Advanced Techniques',
      items: [
        { id: 'prompts', label: 'Prompt 模式', labelEn: 'Prompt Patterns' },
        { id: 'security', label: '安全防护', labelEn: 'Security' },
      ],
    },
  ],
  backTo: { label: '返回首页', labelEn: 'Back to Home', path: '/' },
}

export default function AdvancedPage() {
  const { t } = useLang()
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">{t('AI 编程进阶指南', 'AI Coding Advanced Guide')}</h1>
        <p className="page-desc">{t('深入了解 AI 编程工具的高级用法与最佳实践', 'Deep dive into advanced usage and best practices of AI coding tools')}</p>
      </header>

      {/* CLAUDE CODE */}
      <section id="claude" className="section">
        <h2><span className="icon">🤖</span> Claude Code (CLI)</h2>
        <p>{t('Anthropic 官方推出的命令行 Agent 工具，擅长处理复杂的重构和理解大型项目。', "Anthropic's official CLI agent tool, excelling at complex refactoring and understanding large projects.")}</p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">C</div>
            <div>
              <h3>Claude Code</h3>
              <div className="agent-tags">
                <span className="tag">CLI</span>
                <span className="tag">Claude Sonnet 4.5</span>
                <span className="tag">{t('重构专家', 'Refactoring Expert')}</span>
              </div>
            </div>
          </div>

          <div className="code-box">
            <div className="code-title">{t('安装与认证', 'Install & Auth')}</div>
            <div className="cmd">npm install -g @anthropic-ai/claude-code</div>
            <div className="cmd">claude login</div> <span className="comment">{t('# 需要 API Key', '# Requires API Key')}</span>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>{t('🕵️ 深度推理模式', '🕵️ Deep Reasoning Mode')}</h4>
              <p>{t('遇到极其复杂的 Bug 时，使用', 'When facing extremely complex bugs, use')} <code>claude --thinking</code> {t('开启深度思考模式，虽然慢但逻辑更严密。', 'to enable deep thinking mode. Slower but far more rigorous logic.')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('🔄 自动化重构', '🔄 Automated Refactoring')}</h4>
              <p>{t('指令：', 'Command: ')}<code>/refactor src/auth --goal "迁移到 NextAuth v5"</code>{t('。它会自动分析依赖、修改文件并运行测试。', '. It automatically analyzes dependencies, modifies files, and runs tests.')}</p>
            </div>
          </div>

          <div className="callout tip">
            <h4>{t('💡 最佳实践', '💡 Best Practices')}</h4>
            <p>{t('Claude Code 消耗 Token 较快。建议在遇到 IDE 插件解决不了的"硬骨头"问题时使用，比如跨文件重构、升级依赖版本、解释复杂架构。', 'Claude Code consumes tokens quickly. Use it for "tough nuts" that IDE plugins cannot crack — cross-file refactoring, dependency upgrades, and explaining complex architectures.')}</p>
          </div>
        </div>
      </section>

      {/* GITHUB COPILOT CLI */}
      <section id="copilot" className="section">
        <h2><span className="icon">✈️</span> GitHub Copilot CLI</h2>
        <p>{t('GitHub 官方出品的终端 AI 编程助手，在命令行中与 AI 协同完成构建、调试和代码理解任务。由与 GitHub Copilot 编程代理相同的 AI 引擎驱动。', "GitHub's official terminal AI coding assistant — collaborate with AI in the command line to build, debug, and understand code. Powered by the same AI engine as the GitHub Copilot coding agent.")}</p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">G</div>
            <div>
              <h3>GitHub Copilot CLI</h3>
              <div className="agent-tags">
                <span className="tag">Terminal</span>
                <span className="tag">Agentic AI</span>
                <span className="tag">Claude Sonnet 4.6</span>
                <span className="tag">{t('MCP 支持', 'MCP Support')}</span>
              </div>
            </div>
          </div>

          <div className="code-box">
            <div className="code-title">{t('安装', 'Installation')}</div>
            <div><span className="comment">{t('# macOS / Linux (推荐)', '# macOS / Linux (Recommended)')}</span></div>
            <div><span className="cmd">brew install copilot-cli</span></div>
            <br />
            <div><span className="comment">{t('# 或通过安装脚本', '# Or via install script')}</span></div>
            <div><span className="cmd">curl -fsSL https://gh.io/copilot-install | bash</span></div>
            <br />
            <div><span className="comment">{t('# 或通过 npm', '# Or via npm')}</span></div>
            <div><span className="cmd">npm install -g @github/copilot</span></div>
            <br />
            <div><span className="comment"># Windows (WinGet)</span></div>
            <div><span className="cmd">winget install GitHub.Copilot</span></div>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>{t('🚀 启动与登录', '🚀 Launch & Login')}</h4>
              <p>{t('在项目目录运行', 'Run')} <code>copilot</code> {t('启动，首次使用输入', 'to start in your project directory. First-time users: enter')} <code>/login</code> {t('进行 GitHub 账号授权，需要有效的 Copilot 订阅。', 'to authorize with GitHub. Requires an active Copilot subscription.')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('🤖 Agentic 能力', '🤖 Agentic Capabilities')}</h4>
              <p>{t('可规划并执行复杂任务——构建、编辑、调试、重构代码，是真正的 AI 协作者，而非简单的命令生成。', 'Plans and executes complex tasks — building, editing, debugging, and refactoring code. A true AI collaborator, not just a command generator.')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('🧠 模型选择', '🧠 Model Selection')}</h4>
              <p>{t('默认使用 Claude Sonnet 4.6，运行', 'Uses Claude Sonnet 4.6 by default. Run')} <code>/model</code> {t('可切换至其他模型（如 GPT-5.5、Claude Opus 4.7、Gemini 2.5 Pro）。', 'to switch to other models (e.g., GPT-5.5, Claude Opus 4.7, Gemini 2.5 Pro).')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('🔌 MCP 生态', '🔌 MCP Ecosystem')}</h4>
              <p>{t('内置 GitHub MCP 服务器，同时支持自定义 MCP 服务器扩展——访问文件、数据库、API 等任意外部系统。', 'Built-in GitHub MCP server, plus support for custom MCP server extensions — access files, databases, APIs, and any external system.')}</p>
            </div>
          </div>

          <div className="code-box">
            <div className="code-title">{t('常用操作', 'Common Operations')}</div>
            <div><span className="comment">{t('# 启动 Copilot CLI（在项目目录下）', '# Start Copilot CLI (in your project directory)')}</span></div>
            <div><span className="cmd">copilot</span></div>
            <br />
            <div><span className="comment">{t('# 在 CLI 中使用斜杠命令', '# Using slash commands in CLI')}</span></div>
            <div><span className="cmd">/login     </span><span className="comment">{t('# 登录 GitHub', '# Login to GitHub')}</span></div>
            <div><span className="cmd">/model     </span><span className="comment">{t('# 选择 AI 模型', '# Select AI model')}</span></div>
            <div><span className="cmd">/lsp       </span><span className="comment">{t('# 查看 LSP 服务状态', '# Check LSP service status')}</span></div>
            <div><span className="cmd">/feedback  </span><span className="comment">{t('# 提交反馈', '# Submit feedback')}</span></div>
            <br />
            <div><span className="comment">{t('# Autopilot 模式（实验功能，Shift+Tab 切换）', '# Autopilot mode (experimental, toggle with Shift+Tab)')}</span></div>
            <div><span className="cmd">copilot --experimental</span></div>
          </div>

          <div className="callout tip">
            <h4>{t('💡 与传统 AI 工具的区别', '💡 How It Differs from Traditional AI Tools')}</h4>
            <p>{t('GitHub Copilot CLI 不同于', 'GitHub Copilot CLI is different from')} <code>gh copilot suggest/explain</code> {t('（旧版 gh 扩展）。它是一个独立的 agentic 终端应用，能够理解你的代码库、GitHub 上下文，并自主执行复杂的多步骤任务。每次提交 prompt 会消耗一个 premium request 配额。', '(the legacy gh extension). It is a standalone agentic terminal app that understands your codebase, GitHub context, and autonomously executes complex multi-step tasks. Each prompt submission consumes one premium request quota.')}</p>
          </div>
        </div>
      </section>

      {/* CURSOR */}
      <section id="cursor" className="section">
        <h2><span className="icon">⚡</span> Cursor</h2>
        <p>{t('当前体验最好的 AI 原生编辑器，已升级至 Cursor 3.x 支持 Cloud Agents 和并行 Agent。它的 Rules 功能是让 AI 听话的关键。', 'Currently the best AI-native editor, now at Cursor 3.x with Cloud Agents and parallel agents. Its Rules feature is the key to making AI behave.')}</p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">⚡</div>
            <div>
              <h3>Cursor 3.x</h3>
              <div className="agent-tags">
                <span className="tag">Editor</span>
                <span className="tag">Composer 2.5</span>
                <span className="tag">Cloud Agents</span>
                <span className="tag">Rules</span>
              </div>
            </div>
          </div>

          <div className="callout tip">
            <h4>{t('📝 .cursorrules 配置 (核心秘籍)', '📝 .cursorrules Config (Secret Sauce)')}</h4>
            <p>{t('在项目根目录创建', 'Create a')} <code>.cursorrules</code> {t('文件，AI 会自动遵守这里的规则。防止它乱写。', 'file in your project root. The AI will automatically follow these rules, preventing it from going rogue.')}</p>
          </div>

          <div className="code-box">
            <div className="code-title">{t('.cursorrules 示例', '.cursorrules Example')}</div>
            <span className="comment"># Tech Stack</span><br />
            Framework: Next.js 16 (App Router)<br />
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
              <h4>{t('🎹 Composer (Ctrl+I)', '🎹 Composer (Ctrl+I)')}</h4>
              <p>{t('多文件编辑神器。输入"把所有页面的 Header 颜色改成蓝色"，它会自动找到相关文件并修改。', 'Multi-file editing wizard. Type "change all page headers to blue" and it automatically finds and edits the relevant files.')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('📚 Docs 索引', '📚 Docs Indexing')}</h4>
              <p>{t('在 Chat 中输入', 'Type')} <code>@Docs</code> {t('，添加官方文档链接（如 Stripe API），AI 就会基于最新文档回答，不再胡编乱造。', 'in Chat to add official documentation links (e.g., Stripe API). The AI will then answer based on the latest docs — no more hallucination.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN & ARCHITECTURE */}
      <section id="design" className="section">
        <h2><span className="icon">🏗️</span> {t('设计与架构', 'Design & Architecture')}</h2>
        <p>{t('AI 代码的质量取决于你的设计。好的架构能让 AI 发挥 200% 的能力。', 'AI code quality depends on your design. Good architecture unlocks 200% of AI\'s potential.')}</p>

        <div className="agent-detail">
          <h3>{t('前后端交互规范', 'Frontend-Backend Interaction Standards')}</h3>
          <p>{t('明确规范，避免 AI 混淆前后端逻辑。', 'Clear standards prevent AI from confusing frontend and backend logic.')}</p>
          <div className="code-box">
            <div className="code-title">{t('Prompt 示例', 'Prompt Example')}</div>
            {t('"请遵循以下架构规范：', '"Please follow these architecture standards:')}<br />
            1. <strong>Frontend</strong>: {t('使用 Server Components 获取数据，Client Components 处理交互。', 'Use Server Components for data fetching, Client Components for interactions.')}<br />
            2. <strong>Backend</strong>: {t('所有数据库操作封装在', 'All database operations wrapped in')} <code>src/actions</code> {t('中。', '.')}<br />
            3. <strong>Types</strong>: {t('数据库类型定义在', 'Database types defined in')} <code>src/types/db.ts</code>{t('，前端组件 Props 必须定义接口。"', '. Frontend component Props must have defined interfaces."')}
          </div>
        </div>
      </section>

      {/* DEV & QUALITY */}
      <section id="dev" className="section">
        <h2><span className="icon">🐛</span> {t('开发与质量', 'Dev & Quality')}</h2>
        <p>{t('如何管理 AI 生成的代码质量，防止"屎山"堆积。', 'How to manage AI-generated code quality and prevent technical debt from piling up.')}</p>

        <div className="feature-grid">
          <div className="agent-detail" style={{ margin: 0 }}>
            <h3>{t('🔍 交叉审查 (Cross-Check)', '🔍 Cross-Check')}</h3>
            <p>{t('不要相信单一模型。用 Claude 写完代码，用 GPT-5.5 或 Gemini 再 Review 一遍。', 'Don\'t trust a single model. Write code with Claude, then have GPT-5.5 or Gemini review it.')}</p>
            <div className="code-box">
              {t('Prompt: "请作为一名资深工程师 Review 这段代码，重点检查：1. 潜在的内存泄漏 2. 错误处理是否完整 3. 变量命名是否清晰。"', 'Prompt: "As a senior engineer, review this code. Focus on: 1. Potential memory leaks 2. Error handling completeness 3. Variable naming clarity."')}
            </div>
          </div>
          <div className="agent-detail" style={{ margin: 0 }}>
            <h3>{t('🛡️ 类型防御', '🛡️ TypeScript Defense')}</h3>
            <p>{t('强制要求 TypeScript。', 'Enforce TypeScript.')}</p>
            <p>{t('TS 是 AI 最好的约束。如果 AI 瞎写属性，TS 编译器会立刻报错。这是比任何 Prompt 都有效的"防呆"机制。', 'TS is AI\'s best constraint. If AI invents properties, the TS compiler immediately catches them. More effective than any prompt as a foolproof mechanism.')}</p>
          </div>
        </div>
      </section>

      {/* LAUNCH */}
      <section id="launch" className="section">
        <h2><span className="icon">🚀</span> {t('发布与运营', 'Launch & Operations')}</h2>
        <p>{t('产品上线只是开始。利用 AI 进行全方位的数据分析和推广。', 'Launch is just the beginning. Leverage AI for comprehensive data analysis and promotion.')}</p>

        <div className="feature-grid">
          <div className="agent-detail" style={{ margin: 0 }}>
            <h3>{t('📊 数据埋点 (PostHog)', '📊 Analytics Tracking (PostHog)')}</h3>
            <p>{t('不要瞎猜用户行为。让 AI 帮你写埋点。', 'Stop guessing user behavior. Let AI write the tracking code.')}</p>
            <div className="code-box">
              <span className="comment">{t('// 让 AI 写的代码', '// AI-generated tracking code')}</span><br />
              <span className="keyword">import</span> posthog <span className="keyword">from</span> <span className="string">'posthog-js'</span>;<br />
              posthog.capture(<span className="string">'user_signup'</span>, {'{ source: '}<span className="string">'landing_page'</span>{" }"});
            </div>
          </div>
          <div className="agent-detail" style={{ margin: 0 }}>
            <h3>{t('📣 自动化 SEO', '📣 Automated SEO')}</h3>
            <p>{t('利用 GPT 生成 Sitemap 和 Meta Tags。', 'Use GPT to generate Sitemaps and Meta Tags.')}</p>
            <div className="code-box">
              {t('Prompt: "分析我的 landing page 内容，生成 5 个高转化率的 Title 和 Description，包含关键词 \'AI 编程\'。"', 'Prompt: "Analyze my landing page content and generate 5 high-conversion Titles and Descriptions, including the keyword \'AI coding\'."')}
            </div>
          </div>
        </div>
      </section>

      {/* PROMPTS */}
      <section id="prompts" className="section">
        <h2><span className="icon">🗣️</span> {t('Prompt 模式', 'Prompt Patterns')}</h2>
        <p>{t('高级开发者常用的 Prompt 技巧。', 'Prompt techniques commonly used by advanced developers.')}</p>

        <div className="agent-detail">
          <div className="code-box">
            <div className="code-title">{t('链式思考 (Chain of Thought)', 'Chain of Thought')}</div>
            {t('"在写代码之前，先逐步分析这个功能的实现逻辑，列出需要的步骤，并解释为什么选择这个方案。"', '"Before writing code, analyze the implementation logic step by step, list the needed steps, and explain why this approach was chosen."')}
          </div>
          <div className="code-box">
            <div className="code-title">{t('角色扮演 (Role Play)', 'Role Play')}</div>
            {t('"你是一名资深的 React 性能优化专家。请优化这个组件的渲染性能，并解释 memo 和 useCallback 的使用理由。"', '"You are a senior React performance optimization expert. Optimize this component\'s rendering performance and explain the rationale for using memo and useCallback."')}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="section">
        <h2><span className="icon">🛡️</span> {t('安全防护', 'Security')}</h2>

        <div className="callout warn">
          <h4>{t('🚫 绝对禁止的操作', '🚫 Absolutely Prohibited Actions')}</h4>
          <ul>
            <li>{t('不要把', 'Never commit')} <code>.env</code> {t('文件提交到 Git。', 'files to Git.')}</li>
            <li>{t('不要在前端代码中暴露', 'Never expose')} <code>OPENAI_API_KEY</code>{t('。', 'in frontend code.')}</li>
            <li>{t('不要直接运行 AI 生成的 Shell 命令（特别是涉及', 'Never directly run AI-generated shell commands (especially those involving')} <code>rm -rf</code> {t('的）。', ').')}</li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}
