import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/home.css'

/* ============================================================
   DATA
   ============================================================ */

const concepts = [
  { icon: '🤖', name: '模型 Model', en: 'Large Language Model', color: 'var(--amber)',
    brief: 'AI 的"大脑"，理解你说的话并生成代码。',
    detail: '大语言模型（LLM）是经过海量文本训练的 AI 系统。<strong>常见模型</strong>有 GPT-4、Claude、Gemini 等。模型的能力决定了 AI 编程的质量。不同模型有不同特长：有的擅长写代码，有的擅长推理，有的速度更快。',
    tags: [{ text: 'GPT-4', c: 'var(--teal)' }, { text: 'Claude', c: 'var(--coral)' }, { text: 'Gemini', c: 'var(--sky)' }] },
  { icon: '🕵️', name: '智能体 Agent', en: 'AI Agent', color: 'var(--coral)',
    brief: '能自主执行任务的 AI，不只是回答问题。',
    detail: 'Agent 是一种<strong>能自主思考、规划和执行的 AI</strong>。它不只回答问题，还会主动分解任务、调用工具、查找资料、编写和测试代码。比如你说"帮我做一个网站"，Agent 会自动规划步骤、创建文件、写代码、测试、修复 Bug，整个过程自动完成。',
    tags: [{ text: '自主规划', c: 'var(--amber)' }, { text: '工具调用', c: 'var(--teal)' }, { text: '多步执行', c: 'var(--lavender)' }] },
  { icon: '💬', name: '提示词 Prompt', en: 'Prompt Engineering', color: 'var(--teal)',
    brief: '你对 AI 说的话，写得好坏直接影响结果。',
    detail: 'Prompt 就是你输入给 AI 的指令。<strong>好的提示词 = 好的结果</strong>。技巧包括：描述清楚需求、给出例子、指定输出格式、分步骤描述。比如"做一个网站"不如"用 React 做一个有登录、注册、个人主页功能的社交网站，使用蓝色主题"。',
    tags: [{ text: '清晰描述', c: 'var(--amber)' }, { text: '给出示例', c: 'var(--coral)' }, { text: '指定格式', c: 'var(--sky)' }] },
  { icon: '🧠', name: '上下文 Context', en: 'Context Window', color: 'var(--lavender)',
    brief: 'AI 的"记忆"，决定它能记住多少对话内容。',
    detail: '上下文窗口是 AI 一次能处理的文本量。<strong>上下文越大，AI 能理解的项目代码越多</strong>。现代模型通常支持 100K~200K tokens 的上下文。在 AI 编程中，上下文包括你的代码文件、对话历史、项目说明等。管理好上下文是高效使用 AI 的关键。',
    tags: [{ text: 'Token 限制', c: 'var(--coral)' }, { text: '代码理解', c: 'var(--teal)' }] },
  { icon: '🛠️', name: '技能 Skill', en: 'AI Skill / Plugin', color: 'var(--sky)',
    brief: 'AI 的特定能力模块，像是给 AI 装"插件"。',
    detail: 'Skill 是 AI 的<strong>专项能力</strong>。比如"前端设计"技能让 AI 更擅长写漂亮的网页，"数据分析"技能让它更擅长处理数据。不同的 AI 工具有不同的 Skill 系统，可以理解为给 AI 安装专业插件，让它在特定领域表现更好。',
    tags: [{ text: '前端设计', c: 'var(--amber)' }, { text: '数据分析', c: 'var(--lavender)' }, { text: '代码审查', c: 'var(--teal)' }] },
  { icon: '🔌', name: 'MCP 协议', en: 'Model Context Protocol', color: 'var(--rose)',
    brief: '让 AI 连接外部工具和数据的标准协议。',
    detail: 'MCP 是<strong>模型上下文协议</strong>，它让 AI 能安全地访问外部工具、数据库、API 等资源。就像 USB 接口让不同设备能连接电脑一样，MCP 让 AI 能连接各种服务。通过 MCP，AI 可以读取文件、搜索网页、操作数据库等。',
    tags: [{ text: '工具连接', c: 'var(--amber)' }, { text: '标准协议', c: 'var(--sky)' }, { text: '安全访问', c: 'var(--teal)' }] },
  { icon: '📦', name: 'RAG 检索', en: 'Retrieval-Augmented Generation', color: 'var(--teal)',
    brief: '让 AI 查资料后再回答，结果更准确。',
    detail: 'RAG 是<strong>检索增强生成</strong>。AI 先从知识库中搜索相关信息，再结合搜索结果生成回答。这样 AI 的回答更准确、更有依据。在编程中，RAG 可以让 AI 参考项目文档、API 文档等，生成更符合项目需求的代码。',
    tags: [{ text: '知识检索', c: 'var(--coral)' }, { text: '精准回答', c: 'var(--amber)' }] },
  { icon: '🔑', name: 'Token', en: 'Token / API Key', color: 'var(--amber)',
    brief: 'AI 处理文本的基本单位 & 使用 AI 的密钥。',
    detail: 'Token 有两层含义：<strong>1) 文本单位</strong>：AI 把文字拆成小块（token）来处理，一个中文字约等于 1-2 个 token。<strong>2) API Key</strong>：使用 AI 服务的身份密钥，像一把钥匙，让你能调用 AI 的能力。免费额度用完后需要付费。',
    tags: [{ text: '计费单位', c: 'var(--coral)' }, { text: 'API 密钥', c: 'var(--teal)' }] },
  { icon: '🔀', name: 'Git 版本控制', en: 'Version Control', color: 'var(--sky)',
    brief: '代码的"时光机"，随时回到任何历史版本。',
    detail: 'Git 是<strong>代码版本管理工具</strong>。每次修改代码都可以保存一个"快照"，出问题时可以回退。GitHub 是基于 Git 的代码托管平台。AI 编程中，Git 帮你管理代码变更，即使 AI 改错了代码，你也能轻松恢复。',
    tags: [{ text: '代码管理', c: 'var(--amber)' }, { text: '团队协作', c: 'var(--lavender)' }, { text: 'GitHub', c: 'var(--coral)' }] },
  { icon: '☁️', name: '部署 Deploy', en: 'Deployment', color: 'var(--lavender)',
    brief: '把你的作品放到互联网上，让所有人都能访问。',
    detail: '部署就是<strong>把代码放到服务器上运行</strong>，让用户可以通过网址访问。现代部署工具（Vercel、Netlify）非常简单，几乎一键完成。AI 也能帮你完成部署配置。部署后，你的网站就有了自己的网址，全世界都能访问。',
    tags: [{ text: 'Vercel', c: 'var(--teal)' }, { text: 'Netlify', c: 'var(--sky)' }, { text: '一键部署', c: 'var(--amber)' }] },
  { icon: '🧩', name: 'API 接口', en: 'Application Programming Interface', color: 'var(--coral)',
    brief: '不同软件之间"对话"的桥梁。',
    detail: 'API 是<strong>应用程序接口</strong>，让不同软件能互相通信。比如天气 App 通过 API 获取天气数据，支付功能通过 API 连接支付宝/微信。AI 编程中你会经常调用各种 API，AI 可以帮你编写 API 调用代码。',
    tags: [{ text: '数据获取', c: 'var(--amber)' }, { text: '服务连接', c: 'var(--lavender)' }] },
  { icon: '🏗️', name: '前端 & 后端', en: 'Frontend & Backend', color: 'var(--rose)',
    brief: '前端是用户看到的界面，后端是背后的逻辑。',
    detail: '<strong>前端</strong>（Frontend）是用户看到和操作的部分——按钮、页面、动画等。<strong>后端</strong>（Backend）是服务器端的逻辑——用户数据存储、业务处理、安全验证等。全栈开发就是前后端都做。AI 编程可以帮你同时处理前后端。',
    tags: [{ text: 'HTML/CSS/JS', c: 'var(--amber)' }, { text: 'Node.js', c: 'var(--teal)' }, { text: '数据库', c: 'var(--lavender)' }] },
]

const roadmapData: Record<string, Array<{ num: string; title: string; desc: string; detail?: string }>> = {
  simple: [
    { num: 'STEP 01', title: '选择一个 AI 编程工具', desc: '推荐从 Cursor 或 Claude 开始，它们对新手最友好。下载安装后即可使用。' },
    { num: 'STEP 02', title: '描述你的想法', desc: '用中文告诉 AI 你想做什么。比如"帮我做一个记账网站"，越具体越好。' },
    { num: 'STEP 03', title: '和 AI 对话完善', desc: '看到结果后，继续告诉 AI 哪里需要修改。反复对话直到满意。' },
    { num: 'STEP 04', title: '测试和调试', desc: '在本地运行你的项目，发现问题直接告诉 AI，让它帮你修复。' },
    { num: 'STEP 05', title: '部署上线 🎉', desc: '使用 Vercel 等平台一键部署，你的产品就上线了！分享给朋友吧。' },
  ],
  detail: [
    { num: 'STEP 01', title: '了解基础概念（第 1 天）', desc: '不需要学代码，但要理解几个核心概念。',
      detail: `<p>在开始之前，花 1-2 小时了解以下概念：</p>
      <ul>
        <li><strong>前端与后端</strong>：前端是看得见的界面，后端是处理数据的服务器</li>
        <li><strong>HTML/CSS/JS</strong>：网页的三大基础语言（AI 会帮你写，但认识它们有帮助）</li>
        <li><strong>数据库</strong>：存放用户数据的地方，像一个超大 Excel 表</li>
        <li><strong>API</strong>：不同软件之间传递信息的桥梁</li>
      </ul>
      <p>💡 <strong>不用记住</strong>，只要知道有这些东西就行，遇到时再查。</p>` },
    { num: 'STEP 02', title: '安装开发环境（第 1 天）', desc: '只需安装 2-3 个软件，10 分钟搞定。',
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
      <p style="margin-top:.5rem">💡 安装遇到问题？直接把错误截图发给 AI，它会告诉你怎么解决。</p>` },
    { num: 'STEP 03', title: '创建第一个项目（第 2 天）', desc: '用 AI 生成项目骨架，从一个简单的网页开始。',
      detail: `<p>打开 Cursor，开始和 AI 对话：</p>
      <ul>
        <li>按 <strong>Ctrl+L</strong>（或 Cmd+L）打开 AI 对话框</li>
        <li>输入：<em>"帮我创建一个简单的个人网页，包含自我介绍、作品展示和联系方式"</em></li>
        <li>AI 会生成完整的代码，点击"应用"即可</li>
        <li>按 <strong>Ctrl+Shift+\`</strong> 打开终端，输入提示的命令来运行</li>
      </ul>
      <p>💡 看到网页在浏览器中打开了吗？恭喜，这就是你写的第一个"程序"！</p>` },
    { num: 'STEP 04', title: '学会提需求（第 2-3 天）', desc: '掌握和 AI 有效沟通的技巧，让结果更精准。',
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
      </ul>` },
    { num: 'STEP 05', title: '完善功能（第 3-5 天）', desc: '逐步添加功能，让产品从 Demo 变成真正可用的产品。',
      detail: `<p>按优先级逐步完善：</p>
      <ul>
        <li><strong>核心功能</strong>：先确保主要功能正常运行</li>
        <li><strong>界面美化</strong>：告诉 AI "让页面更好看"，它会优化样式</li>
        <li><strong>响应式适配</strong>：确保手机上也能正常显示</li>
        <li><strong>用户体验</strong>：添加加载动画、错误提示等细节</li>
        <li><strong>数据持久化</strong>：需要保存数据？AI 会帮你接入数据库</li>
      </ul>
      <p>💡 每完成一个小功能就用 Git 保存一次，这样出问题随时可以回退。</p>` },
    { num: 'STEP 06', title: '测试和修复 Bug（第 5-6 天）', desc: '让 AI 帮你发现和修复问题。',
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
      </ul>` },
    { num: 'STEP 07', title: '部署上线（第 7 天）🎉', desc: '让全世界都能访问你的作品！',
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
      <p style="margin-top:.5rem">💡 整个部署过程也可以让 AI 指导你一步步完成。</p>` },
  ]
}

const products = [
  { icon: '🌐', name: '网站 / Web App', difficulty: 2, desc: '从个人博客到电商平台，网站是最容易上手的产品类型。', stack: ['HTML', 'CSS', 'React', 'Next.js', 'Vercel'] },
  { icon: '📱', name: '手机 App', difficulty: 3, desc: '使用 React Native 或 Flutter，一套代码同时生成 iOS 和 Android 应用。', stack: ['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin'] },
  { icon: '🖥️', name: '桌面应用', difficulty: 3, desc: '用 Electron 或 Tauri 把网页技术打包成 Windows/Mac 桌面应用。', stack: ['Electron', 'Tauri', 'Python', 'Qt'] },
  { icon: '🤖', name: 'AI 工具 / 聊天机器人', difficulty: 2, desc: '利用 AI API 创建智能助手、内容生成器、数据分析工具等。', stack: ['OpenAI API', 'LangChain', 'Python', 'Streamlit'] },
  { icon: '🎮', name: '小游戏', difficulty: 2, desc: '从经典小游戏到网页互动体验，AI 能快速生成游戏逻辑和界面。', stack: ['Canvas', 'Phaser.js', 'Three.js', 'Unity'] },
  { icon: '📊', name: '数据看板 / 工具', difficulty: 2, desc: '将数据可视化、自动化脚本、效率工具等想法快速实现。', stack: ['D3.js', 'ECharts', 'Python', 'Notion API'] },
  { icon: '💬', name: '微信小程序', difficulty: 3, desc: '在微信生态中创建轻量应用，触达海量用户。', stack: ['微信开发者工具', 'Taro', 'uni-app'] },
  { icon: '🔌', name: '浏览器插件', difficulty: 1, desc: '给浏览器添加功能，比如翻译、截图、效率工具等。', stack: ['Chrome API', 'JavaScript', 'HTML'] },
]

const demoResponses: Record<string, { text: string; code: string }> = {
  '做一个待办事项应用': {
    text: '好的！我来帮你做一个待办事项应用。这是核心代码：',
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
  { icon: '⌨️', name: 'Cursor', type: 'AI 代码编辑器', bg: 'linear-gradient(135deg,#1a1a2e,#16213e)', desc: '最受欢迎的 AI 编程编辑器，内置 Claude 和 GPT 模型，适合所有水平的开发者。' },
  { icon: '🧠', name: 'Claude', type: 'AI 大模型', bg: 'linear-gradient(135deg,#2d1b4e,#1a1025)', desc: 'Anthropic 出品，擅长长文本理解和代码生成，对中文支持出色。' },
  { icon: '🤖', name: 'ChatGPT', type: 'AI 大模型', bg: 'linear-gradient(135deg,#0d3b2e,#1a2e1a)', desc: 'OpenAI 出品，全球最知名的 AI 对话工具，编程能力强大。' },
  { icon: '✈️', name: 'GitHub Copilot', type: 'AI 编程助手', bg: 'linear-gradient(135deg,#1b2838,#0d1117)', desc: 'GitHub 官方出品，在 VS Code 中实时提示代码，像有一个结对编程伙伴。' },
  { icon: '🔮', name: 'v0.dev', type: 'AI 前端生成', bg: 'linear-gradient(135deg,#1a1a1a,#2a2a2a)', desc: 'Vercel 出品，用自然语言描述就能生成精美的 React 界面组件。' },
  { icon: '🏗️', name: 'Bolt.new', type: 'AI 全栈开发', bg: 'linear-gradient(135deg,#2a1a0e,#1a1025)', desc: '在浏览器中用 AI 创建和部署全栈 Web 应用，无需本地环境。' },
  { icon: '🐙', name: 'GitHub', type: '代码托管平台', bg: 'linear-gradient(135deg,#161b22,#0d1117)', desc: '全球最大的代码托管平台，保存你的代码、协作开发、部署项目。' },
  { icon: '▲', name: 'Vercel', type: '部署平台', bg: 'linear-gradient(135deg,#111,#1a1a1a)', desc: '前端项目一键部署，连接 GitHub 后每次提交代码自动更新网站。' },
]

const faqs = [
  { q: '完全不懂编程，真的能用 AI 做出产品吗？', a: '当然可以！AI 编程的核心就是<strong>用自然语言描述需求</strong>。你不需要记住任何代码语法，只要能清楚地表达"我想要什么"，AI 就能帮你实现。很多完全没有编程经验的人已经用 AI 做出了上线的产品。' },
  { q: 'AI 编程需要花多少钱？', a: '<strong>入门完全免费</strong>。Cursor 有免费额度，Claude/ChatGPT 也有免费版本。部署到 Vercel/Netlify 也有免费额度。当你的产品需要更多功能或流量时，才需要付费，通常每月 $20 左右。' },
  { q: 'AI 写的代码质量怎么样？', a: '现代 AI（特别是 Claude 和 GPT-4）生成的代码质量已经<strong>相当不错</strong>，在很多场景下接近或达到中级开发者水平。对于个人项目和中小型产品完全够用。关键是学会好的提示词，让 AI 理解你的需求。' },
  { q: '用 AI 编程有什么局限性？', a: 'AI 编程主要的局限：<strong>1)</strong> 超大规模项目可能需要更多人工介入 <strong>2)</strong> 最新的技术框架 AI 可能还不熟悉 <strong>3)</strong> 高度定制化的性能优化仍需人工 <strong>4)</strong> AI 可能犯错，需要你检查验证。但对于 90% 的个人产品开发完全够用。' },
  { q: '学了 AI 编程，还需要学传统编程吗？', a: '<strong>不是必须的，但推荐逐步学习基础</strong>。理解编程基础（HTML/CSS/JS）能帮你更好地和 AI 沟通、更容易发现问题、做出更好的产品。但这不是前置条件，你可以边用 AI 边学，在实践中自然掌握。' },
  { q: '做出的产品可以商用吗？', a: '<strong>完全可以</strong>。AI 帮你写代码，代码的所有权归你。很多创业者用 AI 编程做出了商用产品。需要注意的是：使用的开源组件要遵守其许可证，API 调用要注意付费额度，用户数据要做好隐私保护。' },
]

const pageLinks = [
  { path: '/advanced', icon: '🚀', title: 'AI 编程进阶', desc: '掌握高级技巧，成为 AI 编程高手', color: 'var(--teal)' },
  { path: '/mcp', icon: '🔌', title: 'MCP 协议指南', desc: '了解模型上下文协议，连接更多工具', color: 'var(--sky)' },
  { path: '/skills', icon: '🧩', title: 'AI Skills 指南', desc: '探索 AI 的各种技能和插件', color: 'var(--lavender)' },
  { path: '/terminal', icon: '💻', title: '终端掌控术', desc: '掌握命令行，提升开发效率', color: 'var(--rose)' },
]

/* ============================================================
   SIDEBAR CONFIG
   ============================================================ */

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandGradient: 'gradient-amber-coral',
  activeClass: 'active',
  groups: [
    {
      title: '开始',
      items: [
        { id: 'hero', label: '首页' },
        { id: 'what', label: '什么是AI编程' },
      ]
    },
    {
      title: '核心内容',
      items: [
        { id: 'concepts', label: '核心概念' },
        { id: 'roadmap', label: '学习路线' },
        { id: 'products', label: '产品类型' },
      ]
    },
    {
      title: '资源',
      items: [
        { id: 'demo', label: '互动体验' },
        { id: 'tools', label: '工具推荐' },
        { id: 'faq', label: '常见问题' },
        { id: 'pages', label: '深入学习' },
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
  const navigate = useNavigate()

  // Concepts expand
  const [expandedConcept, setExpandedConcept] = useState<number | null>(null)

  // Roadmap mode
  const [roadmapMode, setRoadmapMode] = useState<'simple' | 'detail'>('simple')
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set())

  // Demo messages
  const [demoMessages, setDemoMessages] = useState<DemoMessage[]>([
    { id: 0, type: 'ai', html: '👋 你好！我是你的 AI 编程助手。告诉我你想做什么，我来帮你写代码。<br><br>你可以试试下面的快捷指令，或者直接输入你的想法。' }
  ])
  const [demoInput, setDemoInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
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

  // Auto-scroll demo messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [demoMessages])

  // Reset expanded steps on mode change
  useEffect(() => {
    setExpandedSteps(new Set())
  }, [roadmapMode])

  const sendDemo = useCallback(() => {
    const text = demoInput.trim()
    if (!text) return
    setDemoInput('')

    const userMsg: DemoMessage = { id: Date.now(), type: 'user', html: escapeHtml(text) }
    setDemoMessages(prev => [...prev, userMsg])

    setTimeout(() => {
      const resp = demoResponses[text] || defaultResponse
      const aiMsg: DemoMessage = {
        id: Date.now() + 1,
        type: 'ai',
        html: `${resp.text}<code>${escapeHtml(resp.code)}</code>`
      }
      setDemoMessages(prev => [...prev, aiMsg])

      setTimeout(() => {
        const followUp: DemoMessage = {
          id: Date.now() + 2,
          type: 'ai',
          html: '✅ 代码已生成！你可以继续修改需求，比如：<br>• "把主题改成深色"<br>• "加一个搜索功能"<br>• "适配手机屏幕"'
        }
        setDemoMessages(prev => [...prev, followUp])
      }, 800)
    }, 1000)
  }, [demoInput])

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
          html: `${resp.text}<code>${escapeHtml(resp.code)}</code>`
        }
        setDemoMessages(prev => [...prev, aiMsg])

        setTimeout(() => {
          const followUp: DemoMessage = {
            id: Date.now() + 2,
            type: 'ai',
            html: '✅ 代码已生成！你可以继续修改需求，比如：<br>• "把主题改成深色"<br>• "加一个搜索功能"<br>• "适配手机屏幕"'
          }
          setDemoMessages(prev => [...prev, followUp])
        }, 800)
      }, 1000)

      setDemoInput('')
    }, 0)
  }

  const toggleStep = (idx: number) => {
    setExpandedSteps(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
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
          2025 · AI 时代已来
        </div>
        <h1>
          从零开始<br />
          <span className="gradient">用 AI 编程</span><br />
          创造你的产品
        </h1>
        <p>你不需要计算机学位，不需要记住任何代码。<br />只需要一个想法，AI 会帮你把它变成现实。</p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="num">0</div>
            <div className="label">需要的编程基础</div>
          </div>
          <div className="hero-stat">
            <div className="num">7天</div>
            <div className="label">上线第一个产品</div>
          </div>
          <div className="hero-stat">
            <div className="num">∞</div>
            <div className="label">可创造的可能</div>
          </div>
        </div>
      </section>

      {/* ======= WHAT IS AI CODING ======= */}
      <section className="section" id="what">
        <div className="section-label reveal">01 · 理解</div>
        <h2 className="section-title reveal">什么是 AI 编程？</h2>
        <p className="section-desc reveal">
          AI 编程就是<strong>用自然语言告诉 AI 你想做什么</strong>，AI 帮你写代码、调试、部署。就像你有了一个 24 小时在线的程序员助手。
        </p>
        <div className="what-grid">
          <div className="card what-card reveal">
            <div className="icon" style={{ background: 'rgba(240,165,0,0.12)' }}>💬</div>
            <h3>用说话的方式写代码</h3>
            <p>你只需要用中文描述你想要的功能，比如"做一个可以记录每天花销的页面"，AI 就会帮你生成代码。</p>
          </div>
          <div className="card what-card reveal reveal-delay-1">
            <div className="icon" style={{ background: 'rgba(78,205,196,0.12)' }}>🔄</div>
            <h3>不断对话、不断完善</h3>
            <p>如果结果不满意，继续告诉 AI "把按钮改成蓝色" 或 "加一个搜索功能"，AI 会持续帮你修改。</p>
          </div>
          <div className="card what-card reveal reveal-delay-2">
            <div className="icon" style={{ background: 'rgba(167,139,250,0.12)' }}>🚀</div>
            <h3>从想法到上线</h3>
            <p>AI 不仅写代码，还能帮你部署上线、解决 Bug、优化性能，真正做到一站式产品开发。</p>
          </div>
        </div>
      </section>

      {/* ======= CONCEPTS ======= */}
      <section className="section" id="concepts">
        <div className="section-label reveal">02 · 概念</div>
        <h2 className="section-title reveal">AI 编程核心概念</h2>
        <p className="section-desc reveal">
          了解这些关键词，你就掌握了 AI 编程的"语言"。点击卡片查看详细解释。
        </p>
        <div className="concepts-grid">
          {concepts.map((c, i) => (
            <div
              key={i}
              className={`card concept-card reveal ${i < 4 ? `reveal-delay-${(i % 4) + 1}` : ''} ${expandedConcept === i ? 'expanded' : ''}`}
              onClick={() => setExpandedConcept(expandedConcept === i ? null : i)}
            >
              <div className="concept-icon">{c.icon}</div>
              <h3>{c.name} <span className="en">{c.en}</span></h3>
              <p className="brief">{c.brief}</p>
              <div className="detail">
                <div className="detail-inner">
                  <p dangerouslySetInnerHTML={{ __html: c.detail }} />
                  <div style={{ marginTop: '.6rem' }}>
                    {c.tags.map((t, ti) => (
                      <span key={ti} className="concept-tag" style={{ color: t.c, border: `1px solid ${t.c}` }}>{t.text}</span>
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
        <div className="section-label reveal">03 · 路线</div>
        <h2 className="section-title reveal">学习路线图</h2>
        <p className="section-desc reveal">
          选择适合你的节奏。简单版带你快速上手，详细版给你完整的学习指引。
        </p>
        <div className="roadmap-toggle reveal">
          <button className={roadmapMode === 'simple' ? 'active' : ''} onClick={() => setRoadmapMode('simple')}>⚡ 简单版</button>
          <button className={roadmapMode === 'detail' ? 'active' : ''} onClick={() => setRoadmapMode('detail')}>📖 详细版</button>
        </div>
        <div className="roadmap-content">
          <div className="roadmap-timeline">
            {currentSteps.map((s, i) => (
              <div
                key={`${roadmapMode}-${i}`}
                className="roadmap-step reveal"
                style={s.detail ? { cursor: 'pointer' } : undefined}
                onClick={() => s.detail && toggleStep(i)}
              >
                <div className="step-dot" style={{ borderColor: stepDotColors[i % 7] }}></div>
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {s.detail && (
                  <div className={`step-detail ${expandedSteps.has(i) ? 'show' : ''}`}>
                    <div className="step-detail-inner" dangerouslySetInnerHTML={{ __html: s.detail }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= PRODUCTS ======= */}
      <section className="section" id="products">
        <div className="section-label reveal">04 · 创造</div>
        <h2 className="section-title reveal">你可以创造这些产品</h2>
        <p className="section-desc reveal">
          不管你想做什么类型的产品，AI 都能帮你实现。
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
                <span style={{ marginLeft: '.3rem' }}>难度</span>
              </div>
              <p>{p.desc}</p>
              <div className="tech-stack">
                {p.stack.map((t, ti) => <span key={ti}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= INTERACTIVE DEMO ======= */}
      <section className="section" id="demo">
        <div className="section-label reveal">05 · 体验</div>
        <h2 className="section-title reveal">模拟 AI 编程对话</h2>
        <p className="section-desc reveal">
          感受一下和 AI 对话写代码是什么样的体验。试着输入你的想法！
        </p>
        <div className="demo-container reveal">
          <div className="demo-header">
            <div className="demo-dots"><span></span><span></span><span></span></div>
            <div className="demo-title">AI 编程助手 — 模拟演示</div>
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
                placeholder="输入你的想法，例如：做一个天气查询网站..."
              />
              <button onClick={sendDemo}>发送</button>
            </div>
            <div className="demo-quick-btns">
              <button onClick={() => quickDemo('做一个待办事项应用')}>📝 待办事项应用</button>
              <button onClick={() => quickDemo('做一个个人博客网站')}>📰 个人博客网站</button>
              <button onClick={() => quickDemo('做一个计算器')}>🔢 计算器</button>
              <button onClick={() => quickDemo('做一个天气查询页面')}>🌤️ 天气查询</button>
            </div>
          </div>
        </div>
      </section>

      {/* ======= TOOLS ======= */}
      <section className="section" id="tools">
        <div className="section-label reveal">06 · 工具</div>
        <h2 className="section-title reveal">推荐工具</h2>
        <p className="section-desc reveal">
          这些是目前最流行的 AI 编程工具，选一个开始你的旅程。
        </p>
        <div className="tools-grid">
          {tools.map((t, i) => (
            <div key={i} className={`card tool-card reveal ${i < 4 ? `reveal-delay-${(i % 4) + 1}` : ''}`}>
              <div className="tool-logo" style={{ background: t.bg }}>{t.icon}</div>
              <div>
                <div className="tool-type">{t.type}</div>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= FAQ ======= */}
      <section className="section" id="faq">
        <div className="section-label reveal">07 · 答疑</div>
        <h2 className="section-title reveal">常见问题</h2>
        <p className="section-desc reveal">点击展开查看解答。</p>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div
              key={i}
              ref={el => { faqRefs.current[i] = el }}
              className={`faq-item reveal ${openFaqIndex === i ? 'open' : ''}`}
            >
              <div className="faq-q" onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}>
                <span>{f.q}</span>
                <span className="arrow">▾</span>
              </div>
              <div className="faq-a" style={{ maxHeight: openFaqIndex === i ? '500px' : '0' }}>
                <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= PAGES NAV ======= */}
      <section className="section" id="pages">
        <div className="section-label reveal">08 · 深入</div>
        <h2 className="section-title reveal">继续探索</h2>
        <p className="section-desc reveal">
          准备好深入学习了吗？选择你感兴趣的方向继续前进。
        </p>
        <div className="pages-grid">
          {pageLinks.map((p, i) => (
            <div
              key={i}
              className={`page-nav-card reveal ${i < 4 ? `reveal-delay-${(i % 4) + 1}` : ''}`}
              onClick={() => navigate(p.path)}
            >
              <div className="page-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="home-footer">
        <div className="footer-brand">AI 编程之旅</div>
        <p>用 AI 编程创造，让每个人都能成为创造者 ✨</p>
        <p style={{ marginTop: '.5rem' }}>Made with ❤️ for beginners</p>
      </footer>
    </Layout>
  )
}
