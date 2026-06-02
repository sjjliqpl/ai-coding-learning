import { useState, useEffect, useRef, useCallback } from 'react'

import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import { useLang } from '../i18n/LanguageContext'
import '../styles/home.css'

/* ============================================================
   DATA
   ============================================================ */

const concepts = [
  { icon: '🤖', name: '模型 Model', en: 'Large Language Model', color: 'var(--amber)',
    brief: 'AI 的"大脑"，理解你说的话并生成代码。',
    briefEn: 'The "brain" of AI — understands your words and generates code.',
    detail: '大语言模型（LLM）是经过海量文本训练的 AI 系统。<strong>常见模型</strong>有 GPT-5、Claude、Gemini、DeepSeek 等。模型的能力决定了 AI 编程的质量。不同模型有不同特长：有的擅长写代码，有的擅长推理，有的速度更快。',
    detailEn: 'Large Language Models (LLMs) are AI systems trained on massive text datasets. <strong>Common models</strong> include GPT-5, Claude, Gemini, DeepSeek, and more. Model capability determines AI coding quality. Different models have different strengths: some excel at code generation, some at reasoning, some are faster.',
    tags: [{ text: 'GPT-5', c: 'var(--teal)' }, { text: 'Claude', c: 'var(--coral)' }, { text: 'DeepSeek', c: 'var(--sky)' }] },
  { icon: '🕵️', name: '智能体 Agent', en: 'AI Agent', color: 'var(--coral)',
    brief: '能自主执行任务的 AI，不只是回答问题。',
    briefEn: 'AI that autonomously executes tasks, not just answering questions.',
    detail: 'Agent 是一种<strong>能自主思考、规划和执行的 AI</strong>。它不只回答问题，还会主动分解任务、调用工具、查找资料、编写和测试代码。比如你说"帮我做一个网站"，Agent 会自动规划步骤、创建文件、写代码、测试、修复 Bug，整个过程自动完成。',
    detailEn: 'An Agent is <strong>AI that can think, plan, and execute autonomously</strong>. It doesn\'t just answer questions — it proactively decomposes tasks, calls tools, searches references, writes and tests code. Say "build me a website", and the Agent automatically plans steps, creates files, writes code, tests, and fixes bugs — all hands-free.',
    tags: [{ text: '自主规划', c: 'var(--amber)' }, { text: '工具调用', c: 'var(--teal)' }, { text: '多步执行', c: 'var(--lavender)' }] },
  { icon: '💬', name: '提示词 Prompt', en: 'Prompt Engineering', color: 'var(--teal)',
    brief: '你对 AI 说的话，写得好坏直接影响结果。',
    briefEn: 'What you say to AI — quality directly impacts results.',
    detail: 'Prompt 就是你输入给 AI 的指令。<strong>好的提示词 = 好的结果</strong>。技巧包括：描述清楚需求、给出例子、指定输出格式、分步骤描述。比如"做一个网站"不如"用 React 做一个有登录、注册、个人主页功能的社交网站，使用蓝色主题"。',
    detailEn: 'A Prompt is the instruction you give AI. <strong>Better prompts = better results</strong>. Techniques: describe requirements clearly, provide examples, specify output format, describe step by step. For example, "make a website" is inferior to "build a social network with login, registration, and profile pages using React with a blue theme."',
    tags: [{ text: '清晰描述', c: 'var(--amber)' }, { text: '给出示例', c: 'var(--coral)' }, { text: '指定格式', c: 'var(--sky)' }] },
  { icon: '🧠', name: '上下文 Context', en: 'Context Window', color: 'var(--lavender)',
    brief: 'AI 的"记忆"，决定它能记住多少对话内容。',
    briefEn: 'AI\'s "memory" — determines how much conversation it can remember.',
    detail: '上下文窗口是 AI 一次能处理的文本量。<strong>上下文越大，AI 能理解的项目代码越多</strong>。现代模型通常支持 100K~200K tokens 的上下文。在 AI 编程中，上下文包括你的代码文件、对话历史、项目说明等。管理好上下文是高效使用 AI 的关键。',
    detailEn: 'The context window is how much text AI can process at once. <strong>Larger context = more project code AI can understand</strong>. Modern models typically support 100K–200K token contexts. In AI coding, context includes your code files, chat history, project docs, etc. Managing context well is key to using AI effectively.',
    tags: [{ text: 'Token 限制', c: 'var(--coral)' }, { text: '代码理解', c: 'var(--teal)' }] },
  { icon: '🛠️', name: '技能 Skill', en: 'AI Skill / Plugin', color: 'var(--sky)',
    brief: 'AI 的特定能力模块，像是给 AI 装"插件"。',
    briefEn: 'Specialized AI capability modules — like installing "plugins" for AI.',
    detail: 'Skill 是 AI 的<strong>专项能力</strong>。比如"前端设计"技能让 AI 更擅长写漂亮的网页，"数据分析"技能让它更擅长处理数据。不同的 AI 工具有不同的 Skill 系统，可以理解为给 AI 安装专业插件，让它在特定领域表现更好。',
    detailEn: 'Skills are AI\'s <strong>specialized capabilities</strong>. For example, a "frontend design" skill makes AI better at beautiful UIs, a "data analysis" skill makes it better at processing data. Different AI tools have different skill systems — think of them as professional plugins that enhance AI in specific domains.',
    tags: [{ text: '前端设计', c: 'var(--amber)' }, { text: '数据分析', c: 'var(--lavender)' }, { text: '代码审查', c: 'var(--teal)' }] },
  { icon: '🔌', name: 'MCP 协议', en: 'Model Context Protocol', color: 'var(--rose)',
    brief: '让 AI 连接外部工具和数据的标准协议。',
    briefEn: 'A standard protocol for connecting AI to external tools and data.',
    detail: 'MCP 是<strong>模型上下文协议</strong>，它让 AI 能安全地访问外部工具、数据库、API 等资源。就像 USB 接口让不同设备能连接电脑一样，MCP 让 AI 能连接各种服务。通过 MCP，AI 可以读取文件、搜索网页、操作数据库等。',
    detailEn: 'MCP is the <strong>Model Context Protocol</strong>, enabling AI to securely access external tools, databases, APIs, and more. Just like USB lets different devices connect to a computer, MCP lets AI connect to various services. Through MCP, AI can read files, search the web, query databases, and more.',
    tags: [{ text: '工具连接', c: 'var(--amber)' }, { text: '标准协议', c: 'var(--sky)' }, { text: '安全访问', c: 'var(--teal)' }] },
  { icon: '📦', name: 'RAG 检索', en: 'Retrieval-Augmented Generation', color: 'var(--teal)',
    brief: '让 AI 查资料后再回答，结果更准确。',
    briefEn: 'AI looks up references before answering — more accurate results.',
    detail: 'RAG 是<strong>检索增强生成</strong>。AI 先从知识库中搜索相关信息，再结合搜索结果生成回答。这样 AI 的回答更准确、更有依据。在编程中，RAG 可以让 AI 参考项目文档、API 文档等，生成更符合项目需求的代码。',
    detailEn: 'RAG stands for <strong>Retrieval-Augmented Generation</strong>. AI first searches relevant info from a knowledge base, then generates answers based on search results. This makes AI responses more accurate and evidence-based. In coding, RAG lets AI reference project docs, API docs, etc. to generate code that better fits your project.',
    tags: [{ text: '知识检索', c: 'var(--coral)' }, { text: '精准回答', c: 'var(--amber)' }] },
  { icon: '🔑', name: 'Token', en: 'Token / API Key', color: 'var(--amber)',
    brief: 'AI 处理文本的基本单位 & 使用 AI 的密钥。',
    briefEn: 'The basic text unit AI processes & the key to use AI services.',
    detail: 'Token 有两层含义：<strong>1) 文本单位</strong>：AI 把文字拆成小块（token）来处理，一个中文字约等于 1-2 个 token。<strong>2) API Key</strong>：使用 AI 服务的身份密钥，像一把钥匙，让你能调用 AI 的能力。免费额度用完后需要付费。',
    detailEn: 'Token has two meanings: <strong>1) Text unit</strong>: AI breaks text into small chunks (tokens) for processing — one Chinese character ≈ 1–2 tokens. <strong>2) API Key</strong>: your identity key for using AI services, like a key that lets you access AI capabilities. Free quotas run out and require payment thereafter.',
    tags: [{ text: '计费单位', c: 'var(--coral)' }, { text: 'API 密钥', c: 'var(--teal)' }] },
  { icon: '🔀', name: 'Git 版本控制', en: 'Version Control', color: 'var(--sky)',
    brief: '代码的"时光机"，随时回到任何历史版本。',
    briefEn: 'A "time machine" for code — go back to any historical version anytime.',
    detail: 'Git 是<strong>代码版本管理工具</strong>。每次修改代码都可以保存一个"快照"，出问题时可以回退。GitHub 是基于 Git 的代码托管平台。AI 编程中，Git 帮你管理代码变更，即使 AI 改错了代码，你也能轻松恢复。',
    detailEn: 'Git is a <strong>code version management tool</strong>. Every code change can be saved as a "snapshot", so you can roll back when issues arise. GitHub is a code hosting platform built on Git. In AI coding, Git helps manage code changes — even if AI makes a mistake, you can easily recover.',
    tags: [{ text: '代码管理', c: 'var(--amber)' }, { text: '团队协作', c: 'var(--lavender)' }, { text: 'GitHub', c: 'var(--coral)' }] },
  { icon: '☁️', name: '部署 Deploy', en: 'Deployment', color: 'var(--lavender)',
    brief: '把你的作品放到互联网上，让所有人都能访问。',
    briefEn: 'Put your work on the internet for everyone to access.',
    detail: '部署就是<strong>把代码放到服务器上运行</strong>，让用户可以通过网址访问。现代部署工具（Vercel、Netlify）非常简单，几乎一键完成。AI 也能帮你完成部署配置。部署后，你的网站就有了自己的网址，全世界都能访问。',
    detailEn: 'Deployment means <strong>running your code on a server</strong> so users can access it via a URL. Modern deployment tools (Vercel, Netlify) are incredibly simple — nearly one-click. AI can also help you configure deployment. Once deployed, your website gets its own URL accessible worldwide.',
    tags: [{ text: 'Vercel', c: 'var(--teal)' }, { text: 'Netlify', c: 'var(--sky)' }, { text: '一键部署', c: 'var(--amber)' }] },
  { icon: '🧩', name: 'API 接口', en: 'Application Programming Interface', color: 'var(--coral)',
    brief: '不同软件之间"对话"的桥梁。',
    briefEn: 'The bridge for "conversation" between different software.',
    detail: 'API 是<strong>应用程序接口</strong>，让不同软件能互相通信。比如天气 App 通过 API 获取天气数据，支付功能通过 API 连接支付宝/微信。AI 编程中你会经常调用各种 API，AI 可以帮你编写 API 调用代码。',
    detailEn: 'API stands for <strong>Application Programming Interface</strong>, enabling different software to communicate. For example, a weather app fetches data via API, payment features connect to Alipay/WeChat via API. In AI coding, you\'ll frequently call various APIs — AI can help write the API call code.',
    tags: [{ text: '数据获取', c: 'var(--amber)' }, { text: '服务连接', c: 'var(--lavender)' }] },
  { icon: '🏗️', name: '前端 & 后端', en: 'Frontend & Backend', color: 'var(--rose)',
    brief: '前端是用户看到的界面，后端是背后的逻辑。',
    briefEn: 'Frontend is what users see; backend is the logic behind it.',
    detail: '<strong>前端</strong>（Frontend）是用户看到和操作的部分——按钮、页面、动画等。<strong>后端</strong>（Backend）是服务器端的逻辑——用户数据存储、业务处理、安全验证等。全栈开发就是前后端都做。AI 编程可以帮你同时处理前后端。',
    detailEn: '<strong>Frontend</strong> is what users see and interact with — buttons, pages, animations, etc. <strong>Backend</strong> is server-side logic — user data storage, business processing, security validation, etc. Full-stack development covers both ends. AI coding can help you handle both frontend and backend simultaneously.',
    tags: [{ text: 'HTML/CSS/JS', c: 'var(--amber)' }, { text: 'Node.js', c: 'var(--teal)' }, { text: '数据库', c: 'var(--lavender)' }] },
]

const roadmapData: Record<string, Array<{ num: string; title: string; titleEn?: string; desc: string; descEn?: string; detail?: string; detailEn?: string }>> = {
  simple: [
    { num: 'STEP 01', title: '选择一个 AI 编程工具', titleEn: 'Choose an AI Coding Tool', desc: '推荐从 Cursor 或 Claude 开始，它们对新手最友好。下载安装后即可使用。', descEn: 'Start with Cursor or Claude — they are the most beginner-friendly. Download and install to get started.' },
    { num: 'STEP 02', title: '描述你的想法', titleEn: 'Describe Your Idea', desc: '用中文告诉 AI 你想做什么。比如"帮我做一个记账网站"，越具体越好。', descEn: 'Tell AI what you want in plain language. For example, "Help me build a bookkeeping website" — the more specific, the better.' },
    { num: 'STEP 03', title: '和 AI 对话完善', titleEn: 'Iterate with AI', desc: '看到结果后，继续告诉 AI 哪里需要修改。反复对话直到满意。', descEn: 'After seeing the result, keep telling AI what to improve. Iterate until you\'re satisfied.' },
    { num: 'STEP 04', title: '测试和调试', titleEn: 'Test and Debug', desc: '在本地运行你的项目，发现问题直接告诉 AI，让它帮你修复。', descEn: 'Run your project locally, report any issues to AI, and let it fix them for you.' },
    { num: 'STEP 05', title: '部署上线 🎉', titleEn: 'Deploy Online 🎉', desc: '使用 Vercel 等平台一键部署，你的产品就上线了！分享给朋友吧。', descEn: 'Use Vercel or similar platforms for one-click deployment — your product is live! Share it with friends.' },
  ],
  detail: [
    { num: 'STEP 01', title: '了解基础概念（第 1 天）', titleEn: 'Learn Basic Concepts (Day 1)', desc: '不需要学代码，但要理解几个核心概念。', descEn: 'No need to learn coding, but understand a few core concepts.',
      detail: `<p>在开始之前，花 1-2 小时了解以下概念：</p>
      <ul>
        <li><strong>前端与后端</strong>：前端是看得见的界面，后端是处理数据的服务器</li>
        <li><strong>HTML/CSS/JS</strong>：网页的三大基础语言（AI 会帮你写，但认识它们有帮助）</li>
        <li><strong>数据库</strong>：存放用户数据的地方，像一个超大 Excel 表</li>
        <li><strong>API</strong>：不同软件之间传递信息的桥梁</li>
      </ul>
      <p>💡 <strong>不用记住</strong>，只要知道有这些东西就行，遇到时再查。</p>`,
      detailEn: `<p>Before starting, spend 1–2 hours understanding these concepts:</p>
      <ul>
        <li><strong>Frontend & Backend</strong>: Frontend is the visible interface, backend is the server processing data</li>
        <li><strong>HTML/CSS/JS</strong>: The three core web languages (AI will write them, but recognizing them helps)</li>
        <li><strong>Database</strong>: Where user data is stored — like a giant spreadsheet</li>
        <li><strong>API</strong>: The bridge for communication between different software</li>
      </ul>
      <p>💡 <strong>Don't memorize</strong> — just know they exist. Look them up when needed.</p>` },
    { num: 'STEP 02', title: '安装开发环境（第 1 天）', titleEn: 'Set Up Dev Environment (Day 1)', desc: '只需安装 2-3 个软件，10 分钟搞定。', descEn: 'Just install 2–3 tools — done in 10 minutes.',
      detail: `<p>你需要安装以下工具：</p>
      <ul>
        <li><strong>Cursor 编辑器</strong>：内置 AI 的代码编辑器，新手首选</li>
        <li><strong>Node.js</strong>：运行 JavaScript 代码的工具</li>
        <li><strong>Git</strong>：代码版本管理工具</li>
      </ul>
      <div style="margin-top:.5rem">
        <span class="tool-tag">📥 cursor.com</span>
        <span class="tool-tag">📥 nodejs.org</span>
        <span class="tool-tag">📥 git-scm.com</span>
      </div>
      <p style="margin-top:.5rem">💡 安装遇到问题？直接把错误截图发给 AI，它会告诉你怎么解决。</p>`,
      detailEn: `<p>You need to install these tools:</p>
      <ul>
        <li><strong>Cursor Editor</strong>: AI-powered code editor, best choice for beginners</li>
        <li><strong>Node.js</strong>: Tool for running JavaScript code</li>
        <li><strong>Git</strong>: Code version management tool</li>
      </ul>
      <div style="margin-top:.5rem">
        <span class="tool-tag">📥 cursor.com</span>
        <span class="tool-tag">📥 nodejs.org</span>
        <span class="tool-tag">📥 git-scm.com</span>
      </div>
      <p style="margin-top:.5rem">💡 Installation issues? Screenshot the error and send it to AI — it will tell you how to fix it.</p>` },
    { num: 'STEP 03', title: '创建第一个项目（第 2 天）', titleEn: 'Create Your First Project (Day 2)', desc: '用 AI 生成项目骨架，从一个简单的网页开始。', descEn: 'Use AI to generate a project scaffold — start with a simple webpage.',
      detail: `<p>打开 Cursor，开始和 AI 对话：</p>
      <ul>
        <li>按 <strong>Ctrl+L</strong>（或 Cmd+L）打开 AI 对话框</li>
        <li>输入：<em>"帮我创建一个简单的个人网页，包含自我介绍、作品展示和联系方式"</em></li>
        <li>AI 会生成完整的代码，点击"应用"即可</li>
        <li>按 <strong>Ctrl+Shift+\`</strong> 打开终端，输入提示的命令来运行</li>
      </ul>
      <p>💡 看到网页在浏览器中打开了吗？恭喜，这就是你写的第一个"程序"！</p>`,
      detailEn: `<p>Open Cursor and start chatting with AI:</p>
      <ul>
        <li>Press <strong>Ctrl+L</strong> (or Cmd+L) to open the AI dialog</li>
        <li>Type: <em>"Help me create a simple personal webpage with an about section, portfolio, and contact info"</em></li>
        <li>AI generates complete code — click "Apply" to use it</li>
        <li>Press <strong>Ctrl+Shift+\`</strong> to open the terminal and run the suggested commands</li>
      </ul>
      <p>💡 See your webpage open in the browser? Congrats — that's your first "program"!</p>` },
    { num: 'STEP 04', title: '学会提需求（第 2-3 天）', titleEn: 'Master Prompting (Days 2–3)', desc: '掌握和 AI 有效沟通的技巧，让结果更精准。', descEn: 'Learn effective AI communication techniques for more precise results.',
      detail: `<p><strong>好的提示词公式</strong>：场景 + 功能 + 细节 + 技术偏好</p>
      <ul>
        <li>❌ "做一个网站"</li>
        <li>✅ "做一个美食博客网站，需要：首页展示最新文章列表、文章详情页支持图片和文字、有分类筛选功能、深色主题、使用 React"</li>
      </ul>
      <p>其他技巧：</p>
      <ul>
        <li>分步骤描述复杂需求</li>
        <li>给 AI 参考图片或竞品链接</li>
        <li>明确说明不要什么功能</li>
        <li>如果不满意，说"重新来"或"换一种方案"</li>
      </ul>`,
      detailEn: `<p><strong>Good prompt formula</strong>: Context + Features + Details + Tech Preferences</p>
      <ul>
        <li>❌ "Make a website"</li>
        <li>✅ "Build a food blog with: homepage showing latest articles, article detail pages with images and text, category filtering, dark theme, using React"</li>
      </ul>
      <p>More tips:</p>
      <ul>
        <li>Describe complex requirements step by step</li>
        <li>Share reference images or competitor links with AI</li>
        <li>Clearly state what features you DON'T want</li>
        <li>If unsatisfied, say "start over" or "try a different approach"</li>
      </ul>` },
    { num: 'STEP 05', title: '完善功能（第 3-5 天）', titleEn: 'Refine Features (Days 3–5)', desc: '逐步添加功能，让产品从 Demo 变成真正可用的产品。', descEn: 'Gradually add features to turn your demo into a production-ready product.',
      detail: `<p>按优先级逐步完善：</p>
      <ul>
        <li><strong>核心功能</strong>：先确保主要功能正常运行</li>
        <li><strong>界面美化</strong>：告诉 AI "让页面更好看"，它会优化样式</li>
        <li><strong>响应式适配</strong>：确保手机上也能正常显示</li>
        <li><strong>用户体验</strong>：添加加载动画、错误提示等细节</li>
        <li><strong>数据持久化</strong>：需要保存数据？AI 会帮你接入数据库</li>
      </ul>
      <p>💡 每完成一个小功能就用 Git 保存一次，这样出问题随时可以回退。</p>`,
      detailEn: `<p>Iterate by priority:</p>
      <ul>
        <li><strong>Core features</strong>: Ensure the main functionality works first</li>
        <li><strong>UI polish</strong>: Tell AI "make it look better" — it will optimize styles</li>
        <li><strong>Responsive design</strong>: Make sure it displays properly on mobile too</li>
        <li><strong>UX details</strong>: Add loading animations, error messages, and other touches</li>
        <li><strong>Data persistence</strong>: Need to save data? AI will help you integrate a database</li>
      </ul>
      <p>💡 Save with Git after each small feature — so you can always roll back if something breaks.</p>` },
    { num: 'STEP 06', title: '测试和修复 Bug（第 5-6 天）', titleEn: 'Test & Fix Bugs (Days 5–6)', desc: '让 AI 帮你发现和修复问题。', descEn: 'Let AI help you discover and fix issues.',
      detail: `<p>测试方法：</p>
      <ul>
        <li>自己用一遍所有功能，记录问题</li>
        <li>让朋友试用，收集反馈</li>
        <li>用不同设备（手机、电脑）测试</li>
        <li>把 Bug 描述告诉 AI，让它修复</li>
      </ul>
      <p>常见问题处理：</p>
      <ul>
        <li>页面显示异常 → 截图给 AI</li>
        <li>功能不工作 → 打开浏览器控制台，把错误信息发给 AI</li>
        <li>性能太慢 → 告诉 AI "优化性能"</li>
      </ul>`,
      detailEn: `<p>Testing methods:</p>
      <ul>
        <li>Use all features yourself and note issues</li>
        <li>Have friends try it and collect feedback</li>
        <li>Test on different devices (phone, desktop)</li>
        <li>Describe bugs to AI and let it fix them</li>
      </ul>
      <p>Common fixes:</p>
      <ul>
        <li>Display issues → Screenshot and send to AI</li>
        <li>Feature not working → Open browser console, copy error messages to AI</li>
        <li>Slow performance → Tell AI "optimize performance"</li>
      </ul>` },
    { num: 'STEP 07', title: '部署上线（第 7 天）🎉', titleEn: 'Deploy Online (Day 7) 🎉', desc: '让全世界都能访问你的作品！', descEn: 'Make your work accessible to the world!',
      detail: `<p>推荐部署平台（都有免费额度）：</p>
      <ul>
        <li><strong>Vercel</strong>：最适合前端项目，连接 GitHub 自动部署</li>
        <li><strong>Netlify</strong>：类似 Vercel，同样简单好用</li>
        <li><strong>Railway</strong>：适合需要后端/数据库的项目</li>
      </ul>
      <p>部署步骤（以 Vercel 为例）：</p>
      <ul>
        <li>1. 把代码上传到 GitHub</li>
        <li>2. 在 vercel.com 登录，导入项目</li>
        <li>3. 点击 Deploy，等待几分钟</li>
        <li>4. 获得一个 .vercel.app 的网址</li>
      </ul>
      <div style="margin-top:.5rem">
        <span class="tool-tag">🌐 vercel.com</span>
        <span class="tool-tag">🌐 netlify.com</span>
        <span class="tool-tag">🌐 railway.app</span>
      </div>
      <p style="margin-top:.5rem">💡 整个部署过程也可以让 AI 指导你一步步完成。</p>`,
      detailEn: `<p>Recommended platforms (all have free tiers):</p>
      <ul>
        <li><strong>Vercel</strong>: Best for frontend projects, auto-deploys from GitHub</li>
        <li><strong>Netlify</strong>: Similar to Vercel, equally easy to use</li>
        <li><strong>Railway</strong>: Great for projects needing a backend/database</li>
      </ul>
      <p>Deployment steps (Vercel example):</p>
      <ul>
        <li>1. Push your code to GitHub</li>
        <li>2. Log in at vercel.com and import your project</li>
        <li>3. Click Deploy and wait a few minutes</li>
        <li>4. Get a .vercel.app URL</li>
      </ul>
      <div style="margin-top:.5rem">
        <span class="tool-tag">🌐 vercel.com</span>
        <span class="tool-tag">🌐 netlify.com</span>
        <span class="tool-tag">🌐 railway.app</span>
      </div>
      <p style="margin-top:.5rem">💡 AI can guide you through the entire deployment process step by step.</p>` },
  ]
}

const products = [
  { icon: '🌐', name: '网站 / Web App', difficulty: 2, desc: '从个人博客到电商平台，网站是最容易上手的产品类型。', descEn: 'From personal blogs to e-commerce platforms, websites are the easiest product type to start with.', stack: ['HTML', 'CSS', 'React', 'Next.js', 'Vercel'] },
  { icon: '📱', name: '手机 App', difficulty: 3, desc: '使用 React Native 或 Flutter，一套代码同时生成 iOS 和 Android 应用。', descEn: 'Use React Native or Flutter — one codebase for both iOS and Android apps.', stack: ['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin'] },
  { icon: '🖥️', name: '桌面应用', difficulty: 3, desc: '用 Electron 或 Tauri 把网页技术打包成 Windows/Mac 桌面应用。', descEn: 'Package web technologies into Windows/Mac desktop apps with Electron or Tauri.', stack: ['Electron', 'Tauri', 'Python', 'Qt'] },
  { icon: '🤖', name: 'AI 工具 / 聊天机器人', difficulty: 2, desc: '利用 AI API 创建智能助手、内容生成器、数据分析工具等。', descEn: 'Use AI APIs to create smart assistants, content generators, data analysis tools, and more.', stack: ['OpenAI API', 'LangChain', 'Python', 'Streamlit'] },
  { icon: '🎮', name: '小游戏', difficulty: 2, desc: '从经典小游戏到网页互动体验，AI 能快速生成游戏逻辑和界面。', descEn: 'From classic mini-games to interactive web experiences, AI can quickly generate game logic and UIs.', stack: ['Canvas', 'Phaser.js', 'Three.js', 'Unity'] },
  { icon: '📊', name: '数据看板 / 工具', difficulty: 2, desc: '将数据可视化、自动化脚本、效率工具等想法快速实现。', descEn: 'Quickly build data visualizations, automation scripts, productivity tools, and more.', stack: ['D3.js', 'ECharts', 'Python', 'Notion API'] },
  { icon: '💬', name: '微信小程序', difficulty: 3, desc: '在微信生态中创建轻量应用，触达海量用户。', descEn: 'Create lightweight apps within the WeChat ecosystem, reaching millions of users.', stack: ['微信开发者工具', 'Taro', 'uni-app'] },
  { icon: '🔌', name: '浏览器插件', difficulty: 1, desc: '给浏览器添加功能，比如翻译、截图、效率工具等。', descEn: 'Add features to your browser — translation, screenshots, productivity tools, etc.', stack: ['Chrome API', 'JavaScript', 'HTML'] },
]

const demoResponses: Record<string, { text: string; textEn: string; code: string }> = {
  '做一个待办事项应用': {
    text: '好的！我来帮你做一个待办事项应用。这是核心代码：',
    textEn: 'Got it! Let me build a to-do list app for you. Here\'s the core code:',
    code: `// 📝 React 待办事项组件
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      done: false
    }]);
    setInput('');
  };

  return (
    <div className="todo-app">
      <h1>📝 我的待办事项</h1>
      <input value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="添加新任务..." />
      <button onClick={addTodo}>添加</button>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}`
  },
  '做一个个人博客网站': {
    text: '没问题！我来用 Next.js 帮你搭建一个漂亮的博客网站：',
    textEn: 'No problem! Let me build a beautiful blog site for you with Next.js:',
    code: `// 📰 博客首页组件
export default function Blog({ posts }) {
  return (
    <main className="blog">
      <header>
        <h1>我的技术博客</h1>
        <p>记录学习与成长 ✨</p>
      </header>

      <div className="posts-grid">
        {posts.map(post => (
          <article key={post.slug}>
            <img src={post.cover} alt="" />
            <h2>{post.title}</h2>
            <time>{post.date}</time>
            <p>{post.excerpt}</p>
            <Link href={\`/blog/\${post.slug}\`}>
              阅读全文 →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}`
  },
  '做一个计算器': {
    text: '来！一个漂亮的计算器，支持基础运算：',
    textEn: 'Here you go! A beautiful calculator with basic operations:',
    code: `<!-- 🔢 HTML 计算器 -->
<div class="calculator">
  <div class="display" id="display">0</div>
  <div class="buttons">
    <button onclick="clear()">C</button>
    <button onclick="del()">⌫</button>
    <button onclick="append('%')">%</button>
    <button onclick="append('/')">÷</button>
    <button onclick="append('7')">7</button>
    <button onclick="append('8')">8</button>
    <button onclick="append('9')">9</button>
    <button onclick="append('*')">×</button>
    <button onclick="append('4')">4</button>
    <button onclick="append('5')">5</button>
    <button onclick="append('6')">6</button>
    <button onclick="append('-')">−</button>
    <button onclick="append('1')">1</button>
    <button onclick="append('2')">2</button>
    <button onclick="append('3')">3</button>
    <button onclick="append('+')">+</button>
    <button onclick="append('0')" class="span2">0</button>
    <button onclick="append('.')">.</button>
    <button onclick="calc()" class="eq">=</button>
  </div>
</div>`
  },
  '做一个天气查询页面': {
    text: '好的！这是一个天气查询页面，调用天气 API 获取实时数据：',
    textEn: 'Sure! Here\'s a weather lookup page that calls a weather API for real-time data:',
    code: `// 🌤️ 天气查询功能
async function getWeather(city) {
  const API_KEY = 'your_api_key';
  const url = \`https://api.weather.com/
    ?q=\${city}&key=\${API_KEY}\`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    city: data.name,
    temp: data.main.temp + '°C',
    desc: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity + '%',
    wind: data.wind.speed + ' m/s'
  };
}

// 显示天气信息
function displayWeather(weather) {
  document.getElementById('city')
    .textContent = weather.city;
  document.getElementById('temp')
    .textContent = weather.temp;
  document.getElementById('desc')
    .textContent = weather.desc;
}`
  }
}

const defaultResponse = {
  text: '这是个好想法！让我帮你把它实现出来 🚀',
  textEn: 'That\'s a great idea! Let me help you build it 🚀',
  code: `// ✨ 项目初始化
// 1. 创建项目结构
mkdir my-project && cd my-project

// 2. 初始化项目
npm init -y
npm install react next

// 3. AI 正在为你生成代码...
// 根据你的需求，我会创建：
//   📁 pages/       - 页面文件
//   📁 components/  - 可复用组件
//   📁 styles/      - 样式文件
//   📁 public/      - 静态资源

// 接下来告诉我更多细节，
// 我就能生成完整的代码！`
}

const tools = [
  { icon: '⌨️', name: 'Cursor', type: 'AI 代码编辑器', bg: 'linear-gradient(135deg,#1a1a2e,#16213e)', desc: '最受欢迎的 AI 编程编辑器，内置 Claude 和 GPT 模型，适合所有水平的开发者。', descEn: 'The most popular AI coding editor, with built-in Claude and GPT models, suitable for all skill levels.' },
  { icon: '🧠', name: 'Claude', type: 'AI 大模型', bg: 'linear-gradient(135deg,#2d1b4e,#1a1025)', desc: 'Anthropic 出品，擅长长文本理解和代码生成，对中文支持出色。', descEn: 'By Anthropic — excels at long-text understanding and code generation, with excellent Chinese support.' },
  { icon: '🤖', name: 'ChatGPT', type: 'AI 大模型', bg: 'linear-gradient(135deg,#0d3b2e,#1a2e1a)', desc: 'OpenAI 出品，全球最知名的 AI 对话工具，编程能力强大。', descEn: 'By OpenAI — the world\'s most well-known AI chat tool with powerful coding capabilities.' },
  { icon: '✈️', name: 'GitHub Copilot', type: 'AI 编程助手', bg: 'linear-gradient(135deg,#1b2838,#0d1117)', desc: 'GitHub 官方出品，在 VS Code 中实时提示代码，像有一个结对编程伙伴。', descEn: 'Official from GitHub — real-time code suggestions in VS Code, like having a pair programming partner.' },
  { icon: '🔮', name: 'v0.dev', type: 'AI 前端生成', bg: 'linear-gradient(135deg,#1a1a1a,#2a2a2a)', desc: 'Vercel 出品，用自然语言描述就能生成精美的 React 界面组件。', descEn: 'By Vercel — describe UIs in natural language and get beautiful React components generated.' },
  { icon: '🏗️', name: 'Bolt.new', type: 'AI 全栈开发', bg: 'linear-gradient(135deg,#2a1a0e,#1a1025)', desc: '在浏览器中用 AI 创建和部署全栈 Web 应用，无需本地环境。', descEn: 'Create and deploy full-stack web apps with AI in your browser — no local setup needed.' },
  { icon: '🐙', name: 'GitHub', type: '代码托管平台', bg: 'linear-gradient(135deg,#161b22,#0d1117)', desc: '全球最大的代码托管平台，保存你的代码、协作开发、部署项目。', descEn: 'The world\'s largest code hosting platform — store your code, collaborate, and deploy projects.' },
  { icon: '▲', name: 'Vercel', type: '部署平台', bg: 'linear-gradient(135deg,#111,#1a1a1a)', desc: '前端项目一键部署，连接 GitHub 后每次提交代码自动更新网站。', descEn: 'One-click deployment for frontend projects — connect GitHub and auto-update on every commit.' },
]

const faqs = [
  { q: '完全不懂编程，真的能用 AI 做出产品吗？', qEn: 'Can I really build a product with AI if I know nothing about coding?', a: '当然可以！AI 编程的核心就是<strong>用自然语言描述需求</strong>。你不需要记住任何代码语法，只要能清楚地表达"我想要什么"，AI 就能帮你实现。很多完全没有编程经验的人已经用 AI 做出了上线的产品。', aEn: 'Absolutely! The core of AI coding is <strong>describing your needs in natural language</strong>. You don\'t need to memorize any code syntax — just clearly express "what I want", and AI will build it for you. Many people with zero coding experience have already shipped products using AI.' },
  { q: 'AI 编程需要花多少钱？', qEn: 'How much does AI coding cost?', a: '<strong>入门完全免费</strong>。Cursor 有免费额度，Claude/ChatGPT 也有免费版本。部署到 Vercel/Netlify 也有免费额度。当你的产品需要更多功能或流量时，才需要付费，通常每月 $20 左右。', aEn: '<strong>Getting started is completely free</strong>. Cursor has free quotas, Claude/ChatGPT have free tiers. Deploying to Vercel/Netlify also has free tiers. You only need to pay when your product requires more features or traffic — typically around $20/month.' },
  { q: 'AI 写的代码质量怎么样？', qEn: 'How good is the code quality from AI?', a: '现代 AI（特别是 Claude、GPT-5.5 和 DeepSeek）生成的代码质量已经<strong>相当不错</strong>，在很多场景下接近或达到中级开发者水平。对于个人项目和中小型产品完全够用。关键是学会好的提示词，让 AI 理解你的需求。', aEn: 'Modern AI (especially Claude, GPT-5.5, and DeepSeek) generates code of <strong>quite good quality</strong>, approaching or reaching mid-level developer standards in many scenarios. It\'s fully sufficient for personal projects and small-to-medium products. The key is learning good prompting to help AI understand your needs.' },
  { q: '用 AI 编程有什么局限性？', qEn: 'What are the limitations of AI coding?', a: 'AI 编程主要的局限：<strong>1)</strong> 超大规模项目可能需要更多人工介入 <strong>2)</strong> 最新的技术框架 AI 可能还不熟悉 <strong>3)</strong> 高度定制化的性能优化仍需人工 <strong>4)</strong> AI 可能犯错，需要你检查验证。但对于 90% 的个人产品开发完全够用。', aEn: 'Main limitations: <strong>1)</strong> Very large-scale projects may need more human involvement <strong>2)</strong> AI may not yet be familiar with the latest tech frameworks <strong>3)</strong> Highly customized performance optimization still requires humans <strong>4)</strong> AI can make mistakes and needs your verification. But for 90% of personal product development, it\'s fully sufficient.' },
  { q: '学了 AI 编程，还需要学传统编程吗？', qEn: 'Do I still need to learn traditional coding after learning AI coding?', a: '<strong>不是必须的，但推荐逐步学习基础</strong>。理解编程基础（HTML/CSS/JS）能帮你更好地和 AI 沟通、更容易发现问题、做出更好的产品。但这不是前置条件，你可以边用 AI 边学，在实践中自然掌握。', aEn: '<strong>Not required, but gradually learning the basics is recommended</strong>. Understanding programming fundamentals (HTML/CSS/JS) helps you communicate better with AI, spot issues more easily, and build better products. But it\'s not a prerequisite — you can learn while using AI, naturally picking things up through practice.' },
  { q: '做出的产品可以商用吗？', qEn: 'Can I use AI-built products commercially?', a: '<strong>完全可以</strong>。AI 帮你写代码，代码的所有权归你。很多创业者用 AI 编程做出了商用产品。需要注意的是：使用的开源组件要遵守其许可证，API 调用要注意付费额度，用户数据要做好隐私保护。', aEn: '<strong>Absolutely</strong>. AI writes the code, but the code ownership belongs to you. Many entrepreneurs have built commercial products using AI coding. Things to note: comply with open-source component licenses, monitor API usage costs, and protect user data privacy.' },
]

const techTagColors = ['var(--amber)', 'var(--teal)', 'var(--sky)', 'var(--coral)', 'var(--lavender)', 'var(--rose)']

function TechTag({ name, index }: { name: string; index: number }) {
  const color = techTagColors[index % techTagColors.length]
  return (
    <a
      href={`https://www.google.com/search?q=${encodeURIComponent(name)}`}
      target="_blank"
      rel="noreferrer"
      className="tech-tag-link"
      style={{ color, borderColor: color }}
    >
      {name}
    </a>
  )
}

/* ============================================================
   SIDEBAR CONFIG
   ============================================================ */

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandTextEn: 'AI Coding Guide',
  brandGradient: 'gradient-amber-coral',
  activeClass: 'active',
  groups: [
    {
      title: '开始',
      titleEn: 'Getting Started',
      items: [
        { id: 'hero', label: '首页', labelEn: 'Home' },
        { id: 'what', label: '什么是AI编程', labelEn: 'What is AI Coding' },
      ]
    },
    {
      title: '核心内容',
      titleEn: 'Core Content',
      items: [
        { id: 'concepts', label: '核心概念', labelEn: 'Core Concepts' },
        { id: 'roadmap', label: '学习路线', labelEn: 'Learning Path' },
        { id: 'products', label: '产品类型', labelEn: 'Product Types' },
      ]
    },
    {
      title: '资源',
      titleEn: 'Resources',
      items: [
        { id: 'demo', label: '互动体验', labelEn: 'Interactive Demo' },
        { id: 'tools', label: '工具推荐', labelEn: 'Tool Recommendations' },
        { id: 'faq', label: '常见问题', labelEn: 'FAQ' },
      ]
    },
    {
      title: '深入学习',
      titleEn: 'Deep Dive',
      items: [
        { id: 'advanced', label: '📚 AI 编程进阶指南', labelEn: '📚 Advanced Guide', path: '/advanced' },
        { id: 'mcp', label: '🔌 MCP 协议', labelEn: '🔌 MCP Protocol', path: '/mcp' },
        { id: 'skills', label: '🎯 技能清单', labelEn: '🎯 Skills', path: '/skills' },
        { id: 'terminal', label: '💻 掌握终端', labelEn: '💻 Master Terminal', path: '/terminal' },
        { id: 'markdown', label: '📝 Markdown 入门', labelEn: '📝 Markdown Guide', path: '/markdown' },
        { id: 'git', label: '🌿 Git & GitHub', labelEn: '🌿 Git & GitHub', path: '/git' },
        { id: 'models', label: '🔌 接入第三方模型', labelEn: '🔌 Third-Party Models', path: '/models' },
      ]
    },
  ],
}

/* ============================================================
   HELPERS
   ============================================================ */

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const stepDotColors = ['var(--amber)', 'var(--coral)', 'var(--teal)', 'var(--lavender)', 'var(--sky)', 'var(--rose)', 'var(--amber)']

/* ============================================================
   COMPONENT
   ============================================================ */

interface DemoMessage {
  id: number
  type: 'user' | 'ai'
  html: string
}

export default function HomePage() {
  const { t } = useLang()

  // Roadmap mode
  const [roadmapMode, setRoadmapMode] = useState<'simple' | 'detail'>('simple')

  // Demo messages
  const [demoMessages, setDemoMessages] = useState<DemoMessage[]>([
    { id: 0, type: 'ai', html: t('👋 你好！我是你的 AI 编程助手。告诉我你想做什么，我来帮你写代码。<br><br>你可以试试下面的快捷指令，或者直接输入你的想法。', '👋 Hi! I\'m your AI coding assistant. Tell me what you want to build, and I\'ll write the code for you.<br><br>Try the quick prompts below, or type your own idea.') }
  ])
  const [demoInput, setDemoInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasInteracted = useRef(false)

  // FAQ
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set())
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [roadmapMode])

  // Auto-scroll demo messages (only after user interaction)
  useEffect(() => {
    if (hasInteracted.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [demoMessages])

  // Reset expanded steps on mode change (noop kept for compatibility)
  useEffect(() => {}, [roadmapMode])

  const sendDemo = useCallback(() => {
    const text = demoInput.trim()
    if (!text) return
    setDemoInput('')
    hasInteracted.current = true

    const userMsg: DemoMessage = { id: Date.now(), type: 'user', html: escapeHtml(text) }
    setDemoMessages(prev => [...prev, userMsg])

    setTimeout(() => {
      const resp = demoResponses[text] || defaultResponse
      const aiMsg: DemoMessage = {
        id: Date.now() + 1,
        type: 'ai',
        html: `${t(resp.text, resp.textEn)}<code>${escapeHtml(resp.code)}</code>`
      }
      setDemoMessages(prev => [...prev, aiMsg])

      setTimeout(() => {
        const followUp: DemoMessage = {
          id: Date.now() + 2,
          type: 'ai',
          html: t('✅ 代码已生成！你可以继续修改需求，比如：<br>• "把主题改成深色"<br>• "加一个搜索功能"<br>• "适配手机屏幕"', '✅ Code generated! You can keep refining, e.g.:<br>• "Change the theme to dark"<br>• "Add a search feature"<br>• "Make it mobile-friendly"')
        }
        setDemoMessages(prev => [...prev, followUp])
      }, 800)
    }, 1000)
  }, [demoInput, t])

  const quickDemo = (text: string) => {
    setDemoInput(text)
    setTimeout(() => {
      const userMsg: DemoMessage = { id: Date.now(), type: 'user', html: escapeHtml(text) }
      setDemoMessages(prev => [...prev, userMsg])

      setTimeout(() => {
        const resp = demoResponses[text] || defaultResponse
        const aiMsg: DemoMessage = {
          id: Date.now() + 1,
          type: 'ai',
          html: `${t(resp.text, resp.textEn)}<code>${escapeHtml(resp.code)}</code>`
        }
        setDemoMessages(prev => [...prev, aiMsg])

        setTimeout(() => {
          const followUp: DemoMessage = {
            id: Date.now() + 2,
            type: 'ai',
            html: t('✅ 代码已生成！你可以继续修改需求，比如：<br>• "把主题改成深色"<br>• "加一个搜索功能"<br>• "适配手机屏幕"', '✅ Code generated! You can keep refining, e.g.:<br>• "Change the theme to dark"<br>• "Add a search feature"<br>• "Make it mobile-friendly"')
          }
          setDemoMessages(prev => [...prev, followUp])
        }, 800)
      }, 1000)

      setDemoInput('')
    }, 0)
  }

  const toggleFaq = (i: number) => {
    setOpenFaqs(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const currentSteps = roadmapData[roadmapMode]

  return (
    <Layout sidebar={sidebarConfig}>
      {/* ======= HERO ======= */}
      <section className="hero section" id="hero">
        <div className="hero-badge">
          <span className="dot"></span>
          {t('2025 · AI 时代已来', '2025 · The AI Era Has Arrived')}
        </div>
        <h1>
          {t('从零开始', 'Start From Zero')}<br />
          <span className="gradient">{t('用 AI 编程', 'Code with AI')}</span><br />
          {t('创造你的产品', 'Build Your Product')}
        </h1>
        <p>{t('你不需要计算机学位，不需要记住任何代码。', 'You don\'t need a CS degree, you don\'t need to memorize any code.')}<br />{t('只需要一个想法，AI 会帮你把它变成现实。', 'All you need is an idea — AI will help you bring it to life.')}</p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="num">0</div>
            <div className="label">{t('需要的编程基础', 'Coding Experience Required')}</div>
          </div>
          <div className="hero-stat">
            <div className="num">{t('7天', '7 Days')}</div>
            <div className="label">{t('上线第一个产品', 'To Ship Your First Product')}</div>
          </div>
          <div className="hero-stat">
            <div className="num">∞</div>
            <div className="label">{t('可创造的可能', 'Possibilities to Create')}</div>
          </div>
        </div>
      </section>

      {/* ======= WHAT IS AI CODING ======= */}
      <section className="section" id="what">
        <div className="section-label reveal">{t('01 · 理解', '01 · Understanding')}</div>
        <h2 className="section-title reveal">{t('什么是 AI 编程？', 'What is AI Coding?')}</h2>
        <p className="section-desc reveal">
          {t('AI 编程就是用自然语言告诉 AI 你想做什么，AI 帮你写代码、调试、部署。就像你有了一个 24 小时在线的程序员助手。', 'AI coding means telling AI what you want in natural language, and AI writes the code, debugs, and deploys for you. It\'s like having a 24/7 programmer assistant.')}
        </p>
        <div className="what-grid">
          <div className="card what-card reveal">
            <div className="icon" style={{ background: 'rgba(240,165,0,0.12)' }}>💬</div>
            <h3>{t('用说话的方式写代码', 'Code by Speaking')}</h3>
            <p>{t('你只需要用中文描述你想要的功能，比如"做一个可以记录每天花销的页面"，AI 就会帮你生成代码。', 'Just describe what you want in plain language, like "build a page to track daily expenses", and AI generates the code for you.')}</p>
          </div>
          <div className="card what-card reveal reveal-delay-1">
            <div className="icon" style={{ background: 'rgba(78,205,196,0.12)' }}>🔄</div>
            <h3>{t('不断对话、不断完善', 'Iterate Through Conversation')}</h3>
            <p>{t('如果结果不满意，继续告诉 AI "把按钮改成蓝色" 或 "加一个搜索功能"，AI 会持续帮你修改。', 'If the result isn\'t satisfactory, keep telling AI like "change the button to blue" or "add a search feature" — AI will continuously refine it for you.')}</p>
          </div>
          <div className="card what-card reveal reveal-delay-2">
            <div className="icon" style={{ background: 'rgba(167,139,250,0.12)' }}>🚀</div>
            <h3>{t('从想法到上线', 'From Idea to Launch')}</h3>
            <p>{t('AI 不仅写代码，还能帮你部署上线、解决 Bug、优化性能，真正做到一站式产品开发。', 'AI not only writes code but also helps you deploy, fix bugs, and optimize performance — truly one-stop product development.')}</p>
          </div>
        </div>
      </section>

      {/* ======= CONCEPTS ======= */}
      <section className="section" id="concepts">
        <div className="section-label reveal">{t('02 · 概念', '02 · Concepts')}</div>
        <h2 className="section-title reveal">{t('AI 编程核心概念', 'AI Coding Core Concepts')}</h2>
        <p className="section-desc reveal">
          {t('了解这些关键词，你就掌握了 AI 编程的"语言"。点击卡片查看详细解释。', 'Learn these keywords and you\'ll master the "language" of AI coding. Click cards to see details.')}
        </p>
        <div className="concepts-grid">
          {concepts.map((c, i) => (
            <div
              key={i}
              className={`card concept-card expanded reveal ${i < 4 ? `reveal-delay-${(i % 4) + 1}` : ''}`}
            >
              <div className="concept-icon">{c.icon}</div>
              <h3>{c.name} <span className="en">{c.en}</span></h3>
              <p className="brief">{t(c.brief, c.briefEn)}</p>
              <div className="detail">
                <div className="detail-inner">
                  <p dangerouslySetInnerHTML={{ __html: t(c.detail, c.detailEn) }} />
                  <div style={{ marginTop: '.6rem' }}>
                    {c.tags.map((tag, ti) => (
                      <span key={ti} className="concept-tag" style={{ color: tag.c, border: `1px solid ${tag.c}` }}>{tag.text}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= ROADMAP ======= */}
      <section className="section" id="roadmap">
        <div className="section-label reveal">{t('03 · 路线', '03 · Path')}</div>
        <h2 className="section-title reveal">{t('学习路线图', 'Learning Roadmap')}</h2>
        <p className="section-desc reveal">
          {t('选择适合你的节奏。简单版带你快速上手，详细版给你完整的学习指引。', 'Choose the pace that suits you. The simple version gets you started fast, the detailed version gives you a complete learning guide.')}
        </p>
        <div className="roadmap-toggle reveal">
          <button className={roadmapMode === 'simple' ? 'active' : ''} onClick={() => setRoadmapMode('simple')}>{t('⚡ 简单版', '⚡ Simple')}</button>
          <button className={roadmapMode === 'detail' ? 'active' : ''} onClick={() => setRoadmapMode('detail')}>{t('📖 详细版', '📖 Detailed')}</button>
        </div>
        <div className="roadmap-content">
          <div className="roadmap-timeline">
            {currentSteps.map((s, i) => (
              <div
                key={`${roadmapMode}-${i}`}
                className="roadmap-step reveal"
              >
                <div className="step-dot" style={{ borderColor: stepDotColors[i % 7] }}></div>
                <div className="step-num">{s.num}</div>
                <h3>{t(s.title, s.titleEn || s.title)}</h3>
                <p>{t(s.desc, s.descEn || s.desc)}</p>
                {s.detail && (
                  <div className="step-detail show">
                    <div className="step-detail-inner" dangerouslySetInnerHTML={{ __html: t(s.detail, s.detailEn || s.detail) }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= PRODUCTS ======= */}
      <section className="section" id="products">
        <div className="section-label reveal">{t('04 · 创造', '04 · Create')}</div>
        <h2 className="section-title reveal">{t('你可以创造这些产品', 'Products You Can Create')}</h2>
        <p className="section-desc reveal">
          {t('不管你想做什么类型的产品，AI 都能帮你实现。', 'Whatever type of product you want to build, AI can help you make it happen.')}
        </p>
        <div className="products-grid">
          {products.map((p, i) => (
            <div key={i} className={`card product-card reveal ${i < 4 ? `reveal-delay-${(i % 4) + 1}` : ''}`}>
              <div className="product-icon">{p.icon}</div>
              <h3>{p.name}</h3>
              <div className="difficulty">
                {Array(5).fill(0).map((_, j) => (
                  <span key={j} className={`star${j < p.difficulty ? '' : ' empty'}`}>★</span>
                ))}
                <span style={{ marginLeft: '.3rem' }}>{t('难度', 'Difficulty')}</span>
              </div>
              <p>{t(p.desc, p.descEn)}</p>
              <div className="tech-stack">
                {p.stack.map((t, ti) => <TechTag key={ti} name={t} index={ti} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= INTERACTIVE DEMO ======= */}
      <section className="section" id="demo">
        <div className="section-label reveal">{t('05 · 体验', '05 · Experience')}</div>
        <h2 className="section-title reveal">{t('模拟 AI 编程对话', 'Simulate AI Coding Chat')}</h2>
        <p className="section-desc reveal">
          {t('感受一下和 AI 对话写代码是什么样的体验。试着输入你的想法！', 'Experience what it\'s like to code by chatting with AI. Try typing your idea!')}
        </p>
        <div className="demo-container reveal">
          <div className="demo-header">
            <div className="demo-dots"><span></span><span></span><span></span></div>
            <div className="demo-title">{t('AI 编程助手 — 模拟演示', 'AI Coding Assistant — Demo')}</div>
          </div>
          <div className="demo-body">
            <div className="demo-messages">
              {demoMessages.map(msg => (
                <div key={msg.id} className={`demo-msg ${msg.type}`} dangerouslySetInnerHTML={{ __html: msg.html }} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="demo-input-area">
              <input
                type="text"
                value={demoInput}
                onChange={e => setDemoInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendDemo()}
                placeholder={t('输入你的想法，例如：做一个天气查询网站...', 'Type your idea, e.g.: Build a weather lookup site...')}
              />
              <button onClick={sendDemo}>{t('发送', 'Send')}</button>
            </div>
            <div className="demo-quick-btns">
              <button onClick={() => quickDemo('做一个待办事项应用')}>{t('📝 待办事项应用', '📝 To-Do App')}</button>
              <button onClick={() => quickDemo('做一个个人博客网站')}>{t('📰 个人博客网站', '📰 Blog Site')}</button>
              <button onClick={() => quickDemo('做一个计算器')}>{t('🔢 计算器', '🔢 Calculator')}</button>
              <button onClick={() => quickDemo('做一个天气查询页面')}>{t('🌤️ 天气查询', '🌤️ Weather Lookup')}</button>
            </div>
          </div>
        </div>
      </section>

      {/* ======= TOOLS ======= */}
      <section className="section" id="tools">
        <div className="section-label reveal">{t('06 · 工具', '06 · Tools')}</div>
        <h2 className="section-title reveal">{t('推荐工具', 'Recommended Tools')}</h2>
        <p className="section-desc reveal">
          {t('这些是目前最流行的 AI 编程工具，选一个开始你的旅程。', 'These are the most popular AI coding tools right now — pick one and start your journey.')}
        </p>
        <div className="tools-grid">
          {tools.map((tool, i) => (
            <div key={i} className={`card tool-card reveal ${i < 4 ? `reveal-delay-${(i % 4) + 1}` : ''}`}>
              <div className="tool-logo" style={{ background: tool.bg }}>{tool.icon}</div>
              <div>
                <div className="tool-type">{tool.type}</div>
                <h3>{tool.name}</h3>
                <p>{t(tool.desc, tool.descEn)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= FAQ ======= */}
      <section className="section" id="faq">
        <div className="section-label reveal">{t('07 · 答疑', '07 · FAQ')}</div>
        <h2 className="section-title reveal">{t('常见问题', 'FAQ')}</h2>
        <p className="section-desc reveal">{t('点击展开查看解答。', 'Click to expand and view answers.')}</p>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div
              key={i}
              ref={el => { faqRefs.current[i] = el }}
              className={`faq-item reveal ${openFaqs.has(i) ? 'open' : ''}`}
            >
              <div className="faq-q" onClick={() => toggleFaq(i)}>
                <span>{t(f.q, f.qEn)}</span>
                <span className="arrow">▾</span>
              </div>
              <div className="faq-a" style={{ maxHeight: openFaqs.has(i) ? '500px' : '0' }}>
                <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: t(f.a, f.aEn) }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="home-footer">
        <div className="footer-brand">{t('AI 编程之旅', 'AI Coding Journey')}</div>
        <p>{t('用 AI 编程创造，让每个人都能成为创造者 ✨', 'Create with AI coding — empower everyone to be a creator ✨')}</p>
        <p style={{ marginTop: '.5rem' }}>{t('Made with ❤️ for beginners', 'Made with ❤️ for beginners')}</p>
      </footer>
    </Layout>
  )
}
