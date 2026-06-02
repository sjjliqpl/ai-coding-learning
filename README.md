# AI 编程之旅 — 从零开始，创造产品

> AI Coding Journey — From Zero to Product | 一站式 AI 编程学习指南，涵盖主流 AI 编程工具的入门与进阶。
> A comprehensive AI coding learning guide covering mainstream AI coding tools from beginner to advanced.

🔗 **在线访问 / Live Site**: [https://sjjliqpl.github.io/ai-coding-learning/](https://sjjliqpl.github.io/ai-coding-learning/)

## 📖 内容 / Contents

| 页面 / Page | 说明 / Description |
|-------------|---------------------|
| **首页 / Home** | 核心概念、学习路线、推荐工具、互动体验 / Core concepts, learning path, tool recommendations, interactive demo |
| **AI 编程进阶 / Advanced** | Claude Code / GitHub Copilot / Cursor 深度用法 / Deep dive into Claude Code, GitHub Copilot, Cursor |
| **MCP 协议 / MCP** | Model Context Protocol 入门与实战 / MCP introduction and hands-on |
| **AI Skills** | Agent 技能体系与创建指南 / Agent skill system and creation guide |
| **终端掌控术 / Terminal** | 终端基础、核心命令、macOS 技巧、AI 工具集成 / Terminal basics, core commands, macOS tips, AI tool integration |
| **Markdown 入门 / Markdown** | Markdown 语法速成与工具推荐 / Markdown syntax quick start and tool recommendations |
| **Git & GitHub** | 版本控制入门与 GitHub 协作 / Version control basics and GitHub collaboration |
| **接入第三方模型 / Models** | Copilot CLI BYOK、Claude Code 自定义模型、DeepSeek/智谱/千问/Kimi/MiniMax 接入指南 / Copilot CLI BYOK, Claude Code custom models, Chinese LLM integration guides |

## 🛠️ 技术栈 / Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **React Router** (HashRouter) — 适配 GitHub Pages / GitHub Pages compatible
- 暗色主题 · 玻璃拟态卡片 · 滚动动画 / Dark theme · Glassmorphism cards · Scroll animations
- **i18n** 中英文切换 / Chinese-English language switching

## 🚀 开发 / Development

```bash
npm install       # 安装依赖 / Install dependencies
npm run dev       # 启动开发服务器 / Start dev server (localhost:5173)
npm run build     # 构建到 docs/ 目录 / Build to docs/
npm run preview   # 预览构建结果 / Preview build
```

## 📁 项目结构 / Project Structure

```
src/
├── components/     # 共享组件 / Shared components (Layout, Sidebar)
├── pages/          # 页面组件 / Page components
├── styles/         # 全局样式 + 各页面样式 / Global + page styles
├── i18n/           # 国际化 / Internationalization
├── App.tsx         # 路由配置 / Route config
└── main.tsx        # 入口 / Entry
public/
└── screenshots/    # 页面截图 / Page screenshots
docs/               # 构建输出 / Build output (GitHub Pages)
```

## 📸 截图 / Screenshots

### 首页 / Home
![首页](public/screenshots/home.png)

### AI 编程进阶指南 / Advanced Guide
![进阶指南](public/screenshots/advanced.png)

### MCP 协议 / MCP Protocol
![MCP 协议](public/screenshots/mcp.png)

### AI Skills 清单 / AI Skills
![Skills](public/screenshots/skills.png)

### 掌握终端 / Terminal Mastery
![终端](public/screenshots/terminal.png)

### 接入第三方模型 / Third-Party Models
![第三方模型](public/screenshots/models.png)

## 📜 License

[MIT](LICENSE)
