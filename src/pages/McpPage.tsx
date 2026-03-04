import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/mcp.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandGradient: 'gradient-sky-rose',
  activeClass: 'active-sky',
  groups: [
    {
      title: '认识 MCP',
      items: [
        { id: 'what', label: '什么是 MCP' },
        { id: 'why', label: '能实现什么' },
        { id: 'find', label: '查找 MCP 服务器' },
      ],
    },
    {
      title: '如何使用',
      items: [
        { id: 'config-claude', label: '在 Claude 中配置' },
        { id: 'config-cursor', label: '在 Cursor 中使用' },
        { id: 'config-copilot', label: '在 Copilot CLI 中使用' },
      ],
    },
    {
      title: '开发实战',
      items: [
        { id: 'create', label: '创建自己的 MCP Server' },
      ],
    },
  ],
  backTo: { label: '返回首页', path: '/' },
}

export default function McpPage() {
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">MCP 协议</h1>
        <p className="page-desc">
          Model Context Protocol (MCP) 是连接 AI 应用与外部系统的开源标准，让模型获取真实上下文并执行任务。
        </p>
      </header>

      {/* WHAT */}
      <section id="what" className="section">
        <h2><span className="icon-sky">🧩</span> 什么是 MCP？</h2>
        <p>MCP（Model Context Protocol，模型上下文协议）是一个<strong>开源标准</strong>，用于连接 AI 应用与外部系统。通过 MCP，像 Claude 或 ChatGPT 这样的 AI 应用可以：</p>

        <div className="skill-grid">
          <div className="skill-card">
            <span className="skill-icon">📂</span>
            <h3>连接数据源</h3>
            <p>访问本地文件、数据库、云存储等数据源，获取实时信息和上下文。</p>
            <span className="skill-tag">Data Sources</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🛠️</span>
            <h3>调用工具</h3>
            <p>使用搜索引擎、计算器、代码执行器等工具，扩展 AI 的能力边界。</p>
            <span className="skill-tag">Tools</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">⚙️</span>
            <h3>执行工作流</h3>
            <p>调用专业化的提示词模板、自动化流程，完成复杂任务。</p>
            <span className="skill-tag">Workflows</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🔌</span>
            <h3>统一标准</h3>
            <p>像 USB-C 接口一样，MCP 提供了统一的方式连接各种外部系统。</p>
            <span className="skill-tag">Standard</span>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '12px' }}>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}>
            💡 <strong>通俗理解</strong>：AI 模型很聪明，但它们被困在"训练数据"的框里。MCP 就像给 AI 安装了"双手"和"眼睛"，让它能够读取你的文件、查询数据库、搜索互联网、操作应用——从一个只会聊天的机器人，变成能真正帮你做事的助手。
          </p>
        </div>
      </section>

      {/* WHY MCP */}
      <section id="why" className="section">
        <h2><span className="icon-sky">⚡</span> MCP 能实现什么？</h2>
        <p>通过 MCP，AI 可以完成许多以前做不到的事情：</p>

        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'var(--teal)' }}>
            <span className="skill-icon">📅</span>
            <h3>个人助理</h3>
            <p>AI 可以访问你的 Google 日历和 Notion，成为真正了解你日程和笔记的个性化助手。</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--coral)' }}>
            <span className="skill-icon">🎨</span>
            <h3>设计到代码</h3>
            <p>Claude Code 可以读取 Figma 设计稿，直接生成完整的网站应用。</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--lavender)' }}>
            <span className="skill-icon">💼</span>
            <h3>企业数据分析</h3>
            <p>企业聊天机器人可以连接多个数据库，让员工通过对话就能分析数据。</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--sky)' }}>
            <span className="skill-icon">🖨️</span>
            <h3>创意制造</h3>
            <p>AI 可以在 Blender 中创建 3D 设计，并直接发送到 3D 打印机打印出来。</p>
          </div>
        </div>
      </section>

      {/* FIND */}
      <section id="find" className="section">
        <h2><span className="icon-sky">🔍</span> 去哪找 MCP 服务器？</h2>
        <p>社区已经开发了大量现成的 MCP 服务器，涵盖各种常见需求。</p>

        <div className="skill-grid">
          <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noreferrer" className="skill-card" style={{ borderColor: 'var(--sky)' }}>
            <span className="skill-icon">🐙</span>
            <h3>官方 MCP Servers</h3>
            <p>GitHub 官方维护的服务器列表。包含 Google Drive、Slack、PostgreSQL、Memory 等高质量实现。</p>
            <span className="skill-tag">Recommended</span>
          </a>
          <div className="skill-card">
            <span className="skill-icon">🏪</span>
            <h3>Glama / MCP Hub</h3>
            <p>社区驱动的 MCP 服务器目录，可以搜索和发现各种第三方实现。</p>
          </div>
          <div className="skill-card">
            <span className="skill-icon">📦</span>
            <h3>NPM / PyPI</h3>
            <p>很多 MCP 服务器以包的形式发布。搜索 <code>mcp-server-</code> 或 <code>@modelcontextprotocol/</code> 前缀。</p>
          </div>
          <div className="skill-card">
            <span className="skill-icon">💡</span>
            <h3>社区讨论</h3>
            <p>访问 <a href="https://github.com/orgs/modelcontextprotocol/discussions" target="_blank" rel="noreferrer">GitHub Discussions</a> 了解最新的社区开发动态。</p>
          </div>
        </div>
      </section>

      {/* CONFIG CLAUDE */}
      <section id="config-claude" className="section">
        <h2><span className="icon-sky">🤖</span> 在 Claude Desktop 中配置</h2>
        <p>Claude Desktop App 原生支持 MCP。通过修改配置文件即可挂载 Skill。</p>

        <ol className="step-list">
          <li className="step-item step-sky">
            <h4>找到配置文件</h4>
            <p>macOS: <code>~/Library/Application Support/Claude/claude_desktop_config.json</code><br />
            Windows: <code>%APPDATA%\Claude\claude_desktop_config.json</code></p>
          </li>
          <li className="step-item step-sky">
            <h4>添加 Server 配置</h4>
            <p>以添加 "SQLite" 数据库能力为例：</p>
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
            <h4>重启 Claude</h4>
            <p>完全退出并重新打开 Claude。你会看到输入框旁边多了一个 🔌 图标，点击即可查看已加载的工具。</p>
          </li>
        </ol>
      </section>

      {/* CONFIG CURSOR */}
      <section id="config-cursor" className="section">
        <h2><span className="icon-sky">⚡</span> 在 Cursor 中使用 MCP</h2>
        <p>Cursor 最新版已原生支持 MCP 协议，可以方便地添加各种服务器。</p>

        <div className="skill-grid">
          <div className="skill-card">
            <h3>📚 通过 Docs 添加知识</h3>
            <p>让 Cursor 学习特定框架或库的文档。</p>
            <ol style={{ paddingLeft: '1.2rem', marginTop: '1rem', fontSize: '.9rem', color: 'var(--text-secondary)' }}>
              <li>打开 Cursor 设置 (Cmd+,)</li>
              <li>找到 <strong>Features &gt; Docs</strong></li>
              <li>输入文档 URL (如 https://react.dev)</li>
              <li>使用时在 Chat 输入 <code>@Docs</code> 选择</li>
            </ol>
          </div>
          <div className="skill-card">
            <h3>🛠️ 通过 MCP 添加能力</h3>
            <p>连接外部系统和工具。</p>
            <ol style={{ paddingLeft: '1.2rem', marginTop: '1rem', fontSize: '.9rem', color: 'var(--text-secondary)' }}>
              <li>打开 Cursor 设置</li>
              <li>找到 <strong>MCP</strong> 选项卡</li>
              <li>点击 "Add new MCP server"</li>
              <li>输入配置（类型、命令、参数）</li>
            </ol>
          </div>
        </div>
      </section>

      {/* CONFIG COPILOT CLI */}
      <section id="config-copilot" className="section">
        <h2><span className="icon-sky">🖥️</span> 在 GitHub Copilot CLI 中使用 MCP</h2>
        <p>GitHub Copilot CLI 支持通过 MCP 扩展其在终端中的能力，让 AI 可以访问外部工具和数据源。</p>

        <ol className="step-list">
          <li className="step-item step-sky">
            <h4>确保安装了 Copilot CLI</h4>
            <div className="code-box">
              <div className="code-title">安装扩展</div>
              <div style={{ color: '#d4d4d4' }}><span style={{ color: '#a5d6ff' }}>gh extension install</span> github/gh-copilot</div>
              <div style={{ color: '#d4d4d4' }}><span style={{ color: '#a5d6ff' }}>gh copilot</span> --version</div>
            </div>
          </li>
          <li className="step-item step-sky">
            <h4>配置 MCP 服务器</h4>
            <p>在 Copilot CLI 的配置文件中添加 MCP 服务器。配置文件通常位于：<code>~/.config/gh-copilot/config.yaml</code></p>
            <div className="code-box">
              <div className="code-title">config.yaml</div>
<pre style={{ color: '#d4d4d4' }}>{`mcp_servers:
  - name: `}<span className="string">"filesystem"</span>{`
    command: `}<span className="string">"npx"</span>{`
    args:
      - `}<span className="string">"-y"</span>{`
      - `}<span className="string">"@modelcontextprotocol/server-filesystem"</span>{`
      - `}<span className="string">"/Users/username/projects"</span>{`
  - name: `}<span className="string">"github"</span>{`
    command: `}<span className="string">"npx"</span>{`
    args:
      - `}<span className="string">"-y"</span>{`
      - `}<span className="string">"@modelcontextprotocol/server-github"</span></pre>
            </div>
          </li>
          <li className="step-item step-sky">
            <h4>在终端中使用 MCP 扩展能力</h4>
            <p>配置完成后，Copilot CLI 可以通过 MCP 访问你的文件系统或其他工具：</p>
            <div className="code-box">
              <div className="code-title">示例命令</div>
              <div style={{ color: '#6a9955' }}># 让 Copilot 读取项目文件后给出建议</div>
              <div style={{ color: '#d4d4d4' }}><span style={{ color: '#a5d6ff' }}>gh copilot suggest</span> <span style={{ color: '#ce9178' }}>"分析我的 src 目录结构并建议优化方案"</span></div>
              <br />
              <div style={{ color: '#6a9955' }}># 结合文件系统 MCP 进行代码审查</div>
              <div style={{ color: '#d4d4d4' }}><span style={{ color: '#a5d6ff' }}>gh copilot explain</span> <span style={{ color: '#ce9178' }}>"review the auth.ts file for security issues"</span></div>
            </div>
          </li>
        </ol>

        <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '12px' }}>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}>
            💡 <strong>注意</strong>：GitHub Copilot CLI 的 MCP 支持仍在快速演进中。最新文档请参考 <a href="https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line" target="_blank" rel="noreferrer" style={{ color: 'var(--sky)' }}>GitHub Copilot CLI 官方文档</a>。
          </p>
        </div>
      </section>

      {/* CREATE */}
      <section id="create" className="section">
        <h2><span className="icon-sky">🔨</span> 创建自己的 MCP Server</h2>
        <p>想让 AI 控制你的智能设备？或查询公司内部系统？通过 MCP SDK 快速实现。</p>

        <div className="code-box">
          <div className="code-title">Python 示例：创建一个天气查询 MCP Server</div>
<pre style={{ color: '#d4d4d4' }}>{`from mcp.server.fastmcp import FastMCP
import httpx

`}<span className="comment"># 1. 初始化 MCP Server</span>{`
mcp = FastMCP(`}<span className="string">"weather-server"</span>{`)

`}<span className="comment"># 2. 定义工具 (Tool)</span>{`
`}<span className="comment"># AI 会自动读取函数签名、参数类型和文档字符串</span>{`
@mcp.tool()
async def `}<span className="func">get_weather</span>{`(city: str) -> dict:
    `}<span className="string">{`"""获取指定城市的实时天气信息
    
    参数:
        city: 城市名称（中文或英文）
        
    返回:
        包含温度、天气描述、湿度等信息的字典
    """`}</span>{`
    `}<span className="comment"># 调用天气 API（这里使用示例代码）</span>{`
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f`}<span className="string">"https://api.openweathermap.org/data/2.5/weather?q={'{city}'}&appid=YOUR_KEY"</span>{`
        )
        data = resp.json()
        
    return {
        `}<span className="string">"city"</span>{`: data[`}<span className="string">"name"</span>{`],
        `}<span className="string">"temperature"</span>{`: data[`}<span className="string">"main"</span>{`][`}<span className="string">"temp"</span>{`] - 273.15,  `}<span className="comment"># 转为摄氏度</span>{`
        `}<span className="string">"description"</span>{`: data[`}<span className="string">"weather"</span>{`][0][`}<span className="string">"description"</span>{`],
        `}<span className="string">"humidity"</span>{`: data[`}<span className="string">"main"</span>{`][`}<span className="string">"humidity"</span>{`]
    }

`}<span className="comment"># 3. 运行 Server</span>{`
if __name__ == `}<span className="string">"__main__"</span>{`:
    mcp.run()`}</pre>
        </div>

        <p style={{ marginTop: '1.5rem' }}>保存为 <code>weather_server.py</code>，然后在 Claude Desktop 配置中添加：</p>
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
          <h3 style={{ marginBottom: '1rem' }}>🛠️ 更多开发资源</h3>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li><strong>官方文档</strong>: <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">modelcontextprotocol.io</a></li>
            <li><strong>Python SDK</strong>: <code>pip install mcp</code></li>
            <li><strong>TypeScript SDK</strong>: <code>npm install @modelcontextprotocol/sdk</code></li>
            <li><strong>示例代码</strong>: <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noreferrer">github.com/modelcontextprotocol/servers</a></li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}
