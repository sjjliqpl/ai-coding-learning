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
        <p>GitHub 官方出品的命令行 AI 助手，让你用自然语言在终端中操作 Git、执行命令、解释代码。</p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">gh</div>
            <div>
              <h3>GitHub Copilot CLI</h3>
              <div className="agent-tags">
                <span className="tag">Terminal</span>
                <span className="tag">gh extension</span>
                <span className="tag">自然语言</span>
              </div>
            </div>
          </div>

          <div className="code-box">
            <div className="code-title">安装与配置</div>
            <div><span className="comment"># 安装 GitHub CLI</span></div>
            <div><span className="cmd">brew install gh</span></div>
            <div><span className="comment"># 安装 Copilot CLI 扩展</span></div>
            <div><span className="cmd">gh extension install github/gh-copilot</span></div>
            <div><span className="comment"># 登录授权</span></div>
            <div><span className="cmd">gh auth login</span></div>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>💬 gh copilot suggest</h4>
              <p>用自然语言描述你想做的事，Copilot 生成对应的 shell 命令并询问是否执行。<br />例：<code>gh copilot suggest "列出所有超过 100MB 的文件"</code></p>
            </div>
            <div className="feature-item">
              <h4>❓ gh copilot explain</h4>
              <p>把复杂命令粘贴进来，Copilot 用中文解释每个参数的含义。<br />例：<code>gh copilot explain "git rebase -i HEAD~3"</code></p>
            </div>
            <div className="feature-item">
              <h4>⚙️ 配置别名加速工作流</h4>
              <p>设置别名 <code>ghcs</code> 和 <code>ghce</code>，让常用命令触手可及。</p>
            </div>
            <div className="feature-item">
              <h4>🔌 MCP 工具支持</h4>
              <p>Copilot CLI 支持 MCP 服务器，可在终端中扩展 AI 的能力——访问文件、数据库等外部系统。</p>
            </div>
          </div>

          <div className="code-box">
            <div className="code-title">常用命令示例</div>
            <div><span className="comment"># 询问如何完成一个 shell 任务</span></div>
            <div><span className="cmd">gh copilot suggest "压缩当前目录下所有 .log 文件"</span></div>
            <br />
            <div><span className="comment"># 解释一条复杂命令</span></div>
            <div><span className="cmd">gh copilot explain "awk '{'{'}print $1{'}'}' access.log | sort | uniq -c | sort -rn"</span></div>
            <br />
            <div><span className="comment"># 配置方便的别名（加入 ~/.zshrc）</span></div>
            <div><span className="kw-blue">alias</span> <span className="func">ghcs</span>=<span className="string">'gh copilot suggest'</span></div>
            <div><span className="kw-blue">alias</span> <span className="func">ghce</span>=<span className="string">'gh copilot explain'</span></div>
          </div>

          <div className="callout tip">
            <h4>💡 最佳实践</h4>
            <p>Copilot CLI 特别适合：记不住命令参数时直接用自然语言描述；看到别人写的复杂 shell 脚本需要理解时；或者在终端环境中快速生成 Git 操作命令。搭配 <code>--target shell/git/gh</code> 参数可以精确指定命令类型。</p>
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
