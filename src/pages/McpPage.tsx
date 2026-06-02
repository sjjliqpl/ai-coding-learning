import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/mcp.css'
import { useLang } from '../i18n/LanguageContext'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandTextEn: 'AI Coding Guide',
  brandGradient: 'gradient-sky-rose',
  activeClass: 'active-sky',
  groups: [
    {
      title: '认识 MCP',
      titleEn: 'Understanding MCP',
      items: [
        { id: 'what', label: '什么是 MCP', labelEn: 'What is MCP' },
        { id: 'why', label: '能实现什么', labelEn: 'Capabilities' },
        { id: 'find', label: '查找 MCP 服务器', labelEn: 'Find MCP Servers' },
      ],
    },
    {
      title: '如何使用',
      titleEn: 'How to Use',
      items: [
        { id: 'config-claude', label: '在 Claude 中配置', labelEn: 'Configure in Claude' },
        { id: 'config-cursor', label: '在 Cursor 中使用', labelEn: 'Use in Cursor' },
        { id: 'config-copilot', label: '在 Copilot CLI 中使用', labelEn: 'Use in Copilot CLI' },
      ],
    },
    {
      title: '开发实战',
      titleEn: 'Development',
      items: [
        { id: 'create', label: '创建自己的 MCP Server', labelEn: 'Create Your Own MCP Server' },
      ],
    },
  ],
  backTo: { label: '返回首页', labelEn: 'Back to Home', path: '/' },
}

export default function McpPage() {
  const { t } = useLang()
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">{t('MCP 协议', 'MCP Protocol')}</h1>
        <p className="page-desc">
          {t('Model Context Protocol (MCP) 是连接 AI 应用与外部系统的开源标准，让模型获取真实上下文并执行任务。', 'Model Context Protocol (MCP) is an open standard that connects AI applications to external systems, enabling models to access real context and perform tasks.')}
        </p>
      </header>

      {/* WHAT */}
      <section id="what" className="section">
        <h2><span className="icon-sky">🧩</span> {t('什么是 MCP？', 'What is MCP?')}</h2>
        <p>{t('MCP（Model Context Protocol，模型上下文协议）是一个', 'MCP (Model Context Protocol) is an ')}<strong>{t('开源标准', 'open standard')}</strong>{t('，用于连接 AI 应用与外部系统。通过 MCP，像 Claude 或 ChatGPT 这样的 AI 应用可以：', ' for connecting AI applications to external systems. With MCP, AI applications like Claude or ChatGPT can:')}</p>

        <div className="skill-grid">
          <div className="skill-card">
            <span className="skill-icon">📂</span>
            <h3>{t('连接数据源', 'Connect Data Sources')}</h3>
            <p>{t('访问本地文件、数据库、云存储等数据源，获取实时信息和上下文。', 'Access local files, databases, cloud storage and other data sources to get real-time information and context.')}</p>
            <span className="skill-tag">Data Sources</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🛠️</span>
            <h3>{t('调用工具', 'Call Tools')}</h3>
            <p>{t('使用搜索引擎、计算器、代码执行器等工具，扩展 AI 的能力边界。', 'Use search engines, calculators, code executors and other tools to expand AI capabilities.')}</p>
            <span className="skill-tag">Tools</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">⚙️</span>
            <h3>{t('执行工作流', 'Execute Workflows')}</h3>
            <p>{t('调用专业化的提示词模板、自动化流程，完成复杂任务。', 'Call specialized prompt templates and automation workflows to complete complex tasks.')}</p>
            <span className="skill-tag">Workflows</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🔌</span>
            <h3>{t('统一标准', 'Unified Standard')}</h3>
            <p>{t('像 USB-C 接口一样，MCP 提供了统一的方式连接各种外部系统。', 'Like USB-C, MCP provides a unified way to connect various external systems.')}</p>
            <span className="skill-tag">Standard</span>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '12px' }}>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}>
            💡 <strong>{t('通俗理解', 'In Plain Terms')}</strong>{t('：AI 模型很聪明，但它们被困在"训练数据"的框里。MCP 就像给 AI 安装了"双手"和"眼睛"，让它能够读取你的文件、查询数据库、搜索互联网、操作应用——从一个只会聊天的机器人，变成能真正帮你做事的助手。', ': AI models are smart, but they are trapped in their training data. MCP is like giving AI "hands" and "eyes" — enabling it to read your files, query databases, search the internet, and operate applications — transforming from a chatbot into a truly helpful assistant.')}
          </p>
        </div>
      </section>

      {/* WHY MCP */}
      <section id="why" className="section">
        <h2><span className="icon-sky">⚡</span> {t('MCP 能实现什么？', 'What Can MCP Do?')}</h2>
        <p>{t('通过 MCP，AI 可以完成许多以前做不到的事情：', 'With MCP, AI can accomplish many things that were previously impossible:')}</p>

        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'var(--teal)' }}>
            <span className="skill-icon">📅</span>
            <h3>{t('个人助理', 'Personal Assistant')}</h3>
            <p>{t('AI 可以访问你的 Google 日历和 Notion，成为真正了解你日程和笔记的个性化助手。', 'AI can access your Google Calendar and Notion, becoming a personalized assistant that truly understands your schedule and notes.')}</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--coral)' }}>
            <span className="skill-icon">🎨</span>
            <h3>{t('设计到代码', 'Design to Code')}</h3>
            <p>{t('Claude Code 可以读取 Figma 设计稿，直接生成完整的网站应用。', 'Claude Code can read Figma designs and directly generate complete web applications.')}</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--lavender)' }}>
            <span className="skill-icon">💼</span>
            <h3>{t('企业数据分析', 'Enterprise Data Analysis')}</h3>
            <p>{t('企业聊天机器人可以连接多个数据库，让员工通过对话就能分析数据。', 'Enterprise chatbots can connect to multiple databases, allowing employees to analyze data through conversation.')}</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--sky)' }}>
            <span className="skill-icon">🖨️</span>
            <h3>{t('创意制造', 'Creative Manufacturing')}</h3>
            <p>{t('AI 可以在 Blender 中创建 3D 设计，并直接发送到 3D 打印机打印出来。', 'AI can create 3D designs in Blender and send them directly to a 3D printer.')}</p>
          </div>
        </div>
      </section>

      {/* FIND */}
      <section id="find" className="section">
        <h2><span className="icon-sky">🔍</span> {t('去哪找 MCP 服务器？', 'Where to Find MCP Servers?')}</h2>
        <p>{t('社区已经开发了大量现成的 MCP 服务器，涵盖各种常见需求。', 'The community has developed many ready-made MCP servers covering various common needs.')}</p>

        <div className="skill-grid">
          <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noreferrer" className="skill-card" style={{ borderColor: 'var(--sky)' }}>
            <span className="skill-icon">🐙</span>
            <h3>Official MCP Servers</h3>
            <p>{t('GitHub 官方维护的服务器列表。包含 Google Drive、Slack、PostgreSQL、Memory 等高质量实现。', 'GitHub officially maintained server list. Includes high-quality implementations for Google Drive, Slack, PostgreSQL, Memory, and more.')}</p>
            <span className="skill-tag">Recommended</span>
          </a>
          <div className="skill-card">
            <span className="skill-icon">🏪</span>
            <h3>Glama / MCP Hub</h3>
            <p>{t('社区驱动的 MCP 服务器目录，可以搜索和发现各种第三方实现。', 'Community-driven MCP server directory for searching and discovering various third-party implementations.')}</p>
          </div>
          <div className="skill-card">
            <span className="skill-icon">📦</span>
            <h3>NPM / PyPI</h3>
            <p>{t('很多 MCP 服务器以包的形式发布。搜索', 'Many MCP servers are published as packages. Search for ')}<code>mcp-server-</code>{t(' 或 ', ' or ')}<code>@modelcontextprotocol/</code>{t(' 前缀。', ' prefix.')}</p>
          </div>
          <div className="skill-card">
            <span className="skill-icon">💡</span>
            <h3>{t('社区讨论', 'Community Discussions')}</h3>
            <p>{t('访问', 'Visit ')}<a href="https://github.com/orgs/modelcontextprotocol/discussions" target="_blank" rel="noreferrer">GitHub Discussions</a>{t(' 了解最新的社区开发动态。', ' for the latest community development updates.')}</p>
          </div>
        </div>
      </section>

      {/* CONFIG CLAUDE */}
      <section id="config-claude" className="section">
        <h2><span className="icon-sky">🤖</span> {t('在 Claude Desktop 中配置', 'Configure in Claude Desktop')}</h2>
        <p>{t('Claude Desktop App 原生支持 MCP。通过修改配置文件即可挂载 Skill。', 'Claude Desktop App natively supports MCP. Mount skills by modifying the configuration file.')}</p>

        <ol className="step-list">
          <li className="step-item step-sky">
            <h4>{t('找到配置文件', 'Find the Config File')}</h4>
            <p>macOS: <code>~/Library/Application Support/Claude/claude_desktop_config.json</code><br />
            Windows: <code>%APPDATA%\Claude\claude_desktop_config.json</code></p>
          </li>
          <li className="step-item step-sky">
            <h4>{t('添加 Server 配置', 'Add Server Configuration')}</h4>
            <p>{t('以添加 "SQLite" 数据库能力为例：', 'Example: adding SQLite database capability:')}</p>
            <div className="code-box">
              <div className="code-title">claude_desktop_config.json</div>
<pre style={{ color: '#d4d4d4' }}>{`{
  `}<span className="string">"mcpServers"</span>{`: {
    `}<span className="string">"sqlite"</span>{`: {
      `}<span className="string">"command"</span>{`: `}<span className="string">"uvx"</span>{`,
      `}<span className="string">"args"</span>{`: [`}<span className="string">"mcp-server-sqlite"</span>{`, `}<span className="string">"--db-path"</span>{`, `}<span className="string">"/path/to/my.db"</span>{`]
    },
    `}<span className="string">"filesystem"</span>{`: {
      `}<span className="string">"command"</span>{`: `}<span className="string">"npx"</span>{`,
      `}<span className="string">"args"</span>{`: [`}<span className="string">"-y"</span>{`, `}<span className="string">"@modelcontextprotocol/server-filesystem"</span>{`, `}<span className="string">"/Users/username/Desktop"</span>{`]
    }
  }
}`}</pre>
            </div>
          </li>
          <li className="step-item step-sky">
            <h4>{t('重启 Claude', 'Restart Claude')}</h4>
            <p>{t('完全退出并重新打开 Claude。你会看到输入框旁边多了一个 🔌 图标，点击即可查看已加载的工具。', 'Completely quit and reopen Claude. You will see a 🔌 icon next to the input box — click it to view loaded tools.')}</p>
          </li>
        </ol>
      </section>

      {/* CONFIG CURSOR */}
      <section id="config-cursor" className="section">
        <h2><span className="icon-sky">⚡</span> {t('在 Cursor 中使用 MCP', 'Use MCP in Cursor')}</h2>
        <p>{t('Cursor 最新版已原生支持 MCP 协议，可以方便地添加各种服务器。', 'The latest Cursor natively supports MCP protocol, making it easy to add various servers.')}</p>

        <div className="skill-grid">
          <div className="skill-card">
            <h3>{t('📚 通过 Docs 添加知识', '📚 Add Knowledge via Docs')}</h3>
            <p>{t('让 Cursor 学习特定框架或库的文档。', 'Let Cursor learn documentation for specific frameworks or libraries.')}</p>
            <ol style={{ paddingLeft: '1.2rem', marginTop: '1rem', fontSize: '.9rem', color: 'var(--text-secondary)' }}>
              <li>{t('打开 Cursor 设置 (Cmd+,)', 'Open Cursor Settings (Cmd+,)')}</li>
              <li>{t('找到', 'Find ')}<strong>Features &gt; Docs</strong></li>
              <li>{t('输入文档 URL (如 https://react.dev)', 'Enter docs URL (e.g. https://react.dev)')}</li>
              <li>{t('使用时在 Chat 输入', 'Use in Chat by typing ')}<code>@Docs</code>{t(' 选择', ' to select')}</li>
            </ol>
          </div>
          <div className="skill-card">
            <h3>{t('🛠️ 通过 MCP 添加能力', '🛠️ Add Capabilities via MCP')}</h3>
            <p>{t('连接外部系统和工具。', 'Connect external systems and tools.')}</p>
            <ol style={{ paddingLeft: '1.2rem', marginTop: '1rem', fontSize: '.9rem', color: 'var(--text-secondary)' }}>
              <li>{t('打开 Cursor 设置', 'Open Cursor Settings')}</li>
              <li>{t('找到', 'Find the ')}<strong>MCP</strong>{t(' 选项卡', ' tab')}</li>
              <li>{t('点击 "Add new MCP server"', 'Click "Add new MCP server"')}</li>
              <li>{t('输入配置（类型、命令、参数）', 'Enter configuration (type, command, args)')}</li>
            </ol>
          </div>
        </div>
      </section>

      {/* CONFIG COPILOT CLI */}
      <section id="config-copilot" className="section">
        <h2><span className="icon-sky">🖥️</span> {t('在 GitHub Copilot CLI 中使用 MCP', 'Use MCP in GitHub Copilot CLI')}</h2>
        <p>{t('GitHub Copilot CLI 内置 GitHub MCP 服务器，并支持添加自定义 MCP 服务器来扩展 AI 在终端中的能力。', 'GitHub Copilot CLI has a built-in GitHub MCP server and supports adding custom MCP servers to extend AI capabilities in the terminal.')}</p>

        <ol className="step-list">
          <li className="step-item step-sky">
            <h4>{t('安装 GitHub Copilot CLI', 'Install GitHub Copilot CLI')}</h4>
            <div className="code-box">
              <div className="code-title">{t('安装', 'Installation')}</div>
              <div style={{ color: '#6a9955' }}># macOS / Linux</div>
              <div style={{ color: '#d4d4d4' }}><span style={{ color: '#a5d6ff' }}>brew install</span> copilot-cli</div>
              <br />
              <div style={{ color: '#6a9955' }}>{t('# 或脚本安装', '# Or script install')}</div>
              <div style={{ color: '#d4d4d4' }}>curl -fsSL https://gh.io/copilot-install | bash</div>
              <br />
              <div style={{ color: '#6a9955' }}>{t('# 启动并登录', '# Start and login')}</div>
              <div style={{ color: '#d4d4d4' }}><span style={{ color: '#a5d6ff' }}>copilot</span>   <span style={{ color: '#6a9955' }}>{t('# 启动后输入 /login', '# After starting, enter /login')}</span></div>
            </div>
          </li>
          <li className="step-item step-sky">
            <h4>{t('配置自定义 MCP 服务器', 'Configure Custom MCP Servers')}</h4>
            <p>{t('在 Copilot CLI 的 MCP 配置文件中添加自定义服务器，默认位置：', 'Add custom servers in the Copilot CLI MCP config file, default location: ')}<code>~/.copilot/mcp.json</code></p>
            <div className="code-box">
              <div className="code-title">~/.copilot/mcp.json</div>
<pre style={{ color: '#d4d4d4' }}>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/projects"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}`}</pre>
            </div>
          </li>
          <li className="step-item step-sky">
            <h4>{t('在对话中使用 MCP 能力', 'Use MCP Capabilities in Conversation')}</h4>
            <p>{t('配置完成后，直接在', 'Once configured, simply describe your task in natural language in the ')}<code>copilot</code>{t(' 对话中用自然语言描述任务，AI 会自动调用 MCP 工具访问文件或外部服务：', ' conversation, and AI will automatically call MCP tools to access files or external services:')}</p>
            <div className="code-box">
              <div className="code-title">{t('对话示例（在 copilot 终端中输入）', 'Example conversations (enter in copilot terminal)')}</div>
              <div style={{ color: '#ce9178' }}>{t('"分析 src 目录的结构，找出可优化的地方"', '"Analyze the src directory structure and find optimizations"')}</div>
              <br />
              <div style={{ color: '#ce9178' }}>{t('"帮我审查 auth.ts 文件中的安全问题"', '"Review auth.ts for security issues"')}</div>
              <br />
              <div style={{ color: '#ce9178' }}>{t('"列出我在 GitHub 上最近的 open issues 并按优先级排序"', '"List my recent open GitHub issues sorted by priority"')}</div>
            </div>
          </li>
        </ol>

        <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '12px' }}>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}>
            💡 <strong>{t('内置 GitHub MCP', 'Built-in GitHub MCP')}</strong>{t('：Copilot CLI 默认集成了 GitHub 的 MCP 服务器，无需额外配置即可访问你的仓库、issues 和 PR。更多详情参考', ': Copilot CLI integrates GitHub\'s MCP server by default — access your repos, issues, and PRs with no extra configuration. For more details, see the ')}<a href="https://docs.github.com/copilot/concepts/agents/about-copilot-cli" target="_blank" rel="noreferrer" style={{ color: 'var(--sky)' }}>{t('GitHub Copilot CLI 官方文档', 'GitHub Copilot CLI Docs')}</a>{t('。', '.')}
          </p>
        </div>
      </section>

      {/* CREATE */}
      <section id="create" className="section">
        <h2><span className="icon-sky">🔨</span> {t('创建自己的 MCP Server', 'Create Your Own MCP Server')}</h2>
        <p>{t('想让 AI 控制你的智能设备？或查询公司内部系统？通过 MCP SDK 快速实现。', 'Want AI to control your smart devices? Or query internal company systems? Quickly implement with the MCP SDK.')}</p>

        <div className="code-box">
          <div className="code-title">{t('Python 示例：创建一个天气查询 MCP Server', 'Python Example: Create a Weather MCP Server')}</div>
<pre style={{ color: '#d4d4d4' }}>{`from mcp.server.fastmcp import FastMCP
import httpx

`}<span className="comment"># 1. {t('初始化 MCP Server', 'Initialize MCP Server')}</span>{`
mcp = FastMCP(`}<span className="string">"weather-server"</span>{`)

`}<span className="comment"># 2. {t('定义工具 (Tool)', 'Define Tool')}</span>{`
`}<span className="comment"># {t('AI 会自动读取函数签名、参数类型和文档字符串', 'AI will automatically read function signature, parameter types, and docstring')}</span>{`
@mcp.tool()
async def `}<span className="func">get_weather</span>{`(city: str) -> dict:
    `}<span className="string">{`"""${t('获取指定城市的实时天气信息', 'Get real-time weather for a specified city')}

    ${t('参数', 'Args')}:
        city: ${t('城市名称（中文或英文）', 'City name (Chinese or English)')}

    ${t('返回', 'Returns')}:
        ${t('包含温度、天气描述、湿度等信息的字典', 'Dict containing temperature, weather description, humidity, etc.')}
    """`}</span>{`
    `}<span className="comment">{t('# 调用天气 API（这里使用示例代码）', '# Call weather API (example code)')}</span>{`
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f`}<span className="string">"https://api.openweathermap.org/data/2.5/weather?q={'{city}'}&appid=YOUR_KEY"</span>{`
        )
        data = resp.json()

    return {
        `}<span className="string">"city"</span>{`: data[`}<span className="string">"name"</span>{`],
        `}<span className="string">"temperature"</span>{`: data[`}<span className="string">"main"</span>{`][`}<span className="string">"temp"</span>{`] - 273.15,  `}<span className="comment">{t('# 转为摄氏度', '# Convert to Celsius')}</span>{`
        `}<span className="string">"description"</span>{`: data[`}<span className="string">"weather"</span>{`][0][`}<span className="string">"description"</span>{`],
        `}<span className="string">"humidity"</span>{`: data[`}<span className="string">"main"</span>{`][`}<span className="string">"humidity"</span>{`]
    }

`}<span className="comment"># 3. {t('运行 Server', 'Run Server')}</span>{`
if __name__ == `}<span className="string">"__main__"</span>{`:
    mcp.run()`}</pre>
        </div>

        <p style={{ marginTop: '1.5rem' }}>{t('保存为', 'Save as ')}<code>weather_server.py</code>{t('，然后在 Claude Desktop 配置中添加：', ', then add to Claude Desktop config:')}</p>
        <div className="code-box">
          <div className="code-title">claude_desktop_config.json</div>
<pre style={{ color: '#d4d4d4' }}>{`{
  `}<span className="string">"mcpServers"</span>{`: {
    `}<span className="string">"weather"</span>{`: {
      `}<span className="string">"command"</span>{`: `}<span className="string">"python"</span>{`,
      `}<span className="string">"args"</span>{`: [`}<span className="string">"/path/to/weather_server.py"</span>{`]
    }
  }
}`}</pre>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius)' }}>
          <h3 style={{ marginBottom: '1rem' }}>🛠️ {t('更多开发资源', 'More Development Resources')}</h3>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li><strong>{t('官方文档', 'Official Docs')}</strong>: <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">modelcontextprotocol.io</a></li>
            <li><strong>Python SDK</strong>: <code>pip install mcp</code></li>
            <li><strong>TypeScript SDK</strong>: <code>npm install @modelcontextprotocol/sdk</code></li>
            <li><strong>{t('示例代码', 'Example Code')}</strong>: <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noreferrer">github.com/modelcontextprotocol/servers</a></li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}
