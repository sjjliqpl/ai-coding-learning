import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/markdown.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandGradient: 'gradient-teal-lavender',
  activeClass: 'active-teal',
  groups: [
    {
      title: '认识 Markdown',
      items: [
        { id: 'what', label: '什么是 Markdown' },
        { id: 'why', label: '为什么用 Markdown' },
      ],
    },
    {
      title: '基础语法',
      items: [
        { id: 'headings', label: '标题' },
        { id: 'emphasis', label: '加粗与斜体' },
        { id: 'lists', label: '列表' },
        { id: 'code', label: '代码' },
        { id: 'links', label: '链接与图片' },
        { id: 'table', label: '表格与引用' },
      ],
    },
    {
      title: '工具推荐',
      items: [
        { id: 'tools', label: 'Markdown 编辑器' },
        { id: 'editor-project', label: '我的 Markdown 编辑器' },
      ],
    },
  ],
  backTo: { label: '返回首页', path: '/' },
}

export default function MarkdownPage() {
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">Markdown 入门指南</h1>
        <p className="page-desc">写文档、写笔记、写README——用最简单的符号，排出漂亮的格式</p>
      </header>

      {/* WHAT IS MARKDOWN */}
      <section id="what" className="section">
        <h2><span className="icon-teal">📝</span> 什么是 Markdown？</h2>
        <p>Markdown 是一种<strong>超轻量的文本格式语言</strong>，让你可以用普通键盘符号（比如 <code>#</code>、<code>*</code>、<code>-</code>）来描述文档结构，然后自动渲染成带格式的漂亮文档。</p>

        <div className="md-preview">
          <div className="md-preview-col">
            <div className="md-preview-label">✍️ 你写的源文本</div>
            <div className="md-preview-source">{`# 我的笔记

这是一段**加粗**的文字，
也可以写*斜体*。

- 列表项一
- 列表项二

> 这是一句引用`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">👁️ 渲染后看到的效果</div>
            <div className="md-preview-render">
              <h1>我的笔记</h1>
              <p>这是一段<strong>加粗</strong>的文字，也可以写<em>斜体</em>。</p>
              <ul>
                <li>列表项一</li>
                <li>列表项二</li>
              </ul>
              <blockquote>这是一句引用</blockquote>
            </div>
          </div>
        </div>

        <div className="highlight-teal">
          <p>💡 <strong>一句话理解</strong>：Markdown 就像给文字加"暗号"——你在源文件里写 <code>**粗体**</code>，打开后就自动变成 <strong>粗体</strong>。这些符号既简单易记，又让纯文本文件就能携带排版信息。</p>
        </div>
      </section>

      {/* WHY MARKDOWN */}
      <section id="why" className="section">
        <h2><span className="icon-teal">💡</span> 为什么用 Markdown？</h2>
        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'rgba(78,205,196,0.3)' }}>
            <span className="skill-icon">🌍</span>
            <h3>到处都用</h3>
            <p>GitHub、Notion、语雀、掘金、CSDN、各种聊天工具……Markdown 已成为互联网写作的通用格式。</p>
            <span className="skill-tag">通用标准</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(78,205,196,0.3)' }}>
            <span className="skill-icon">⚡</span>
            <h3>纯键盘操作</h3>
            <p>不用鼠标点工具栏。双手不离键盘就能完成排版，写作效率提升明显。</p>
            <span className="skill-tag">效率神器</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(78,205,196,0.3)' }}>
            <span className="skill-icon">📂</span>
            <h3>纯文本存储</h3>
            <p>Markdown 文件是 <code>.md</code> 纯文本，体积极小，可用 Git 版本控制，永不过时。</p>
            <span className="skill-tag">轻量持久</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(78,205,196,0.3)' }}>
            <span className="skill-icon">🤖</span>
            <h3>AI 最爱的格式</h3>
            <p>和 AI 对话、整理 AI 输出、写提示词文档……AI 工具普遍使用 Markdown，掌握它事半功倍。</p>
            <span className="skill-tag">AI 友好</span>
          </div>
        </div>
      </section>

      {/* HEADINGS */}
      <section id="headings" className="section">
        <h2><span className="icon-teal">H</span> 标题</h2>
        <p>在行首加 <code>#</code>，<code>#</code> 的数量代表标题级别（1–6 级）。</p>

        <table className="md-syntax-table">
          <thead>
            <tr><th>写法</th><th>效果说明</th><th>对应 HTML</th></tr>
          </thead>
          <tbody>
            <tr><td># 一级标题</td><td>最大的标题，页面主标题</td><td>&lt;h1&gt;</td></tr>
            <tr><td>## 二级标题</td><td>章节标题</td><td>&lt;h2&gt;</td></tr>
            <tr><td>### 三级标题</td><td>小节标题</td><td>&lt;h3&gt;</td></tr>
            <tr><td>#### 四级标题</td><td>更小的分组</td><td>&lt;h4&gt;</td></tr>
          </tbody>
        </table>

        <div className="callout tip">
          <h4>💡 小技巧</h4>
          <p><code>#</code> 后面要有一个空格，否则部分编辑器不会识别为标题。</p>
        </div>
      </section>

      {/* EMPHASIS */}
      <section id="emphasis" className="section">
        <h2><span className="icon-teal">B/I</span> 加粗与斜体</h2>

        <table className="md-syntax-table">
          <thead>
            <tr><th>写法</th><th>效果</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td>**加粗文字**</td><td><strong>加粗文字</strong></td><td>两个星号包裹</td></tr>
            <tr><td>*斜体文字*</td><td><em>斜体文字</em></td><td>一个星号包裹</td></tr>
            <tr><td>***加粗斜体***</td><td><strong><em>加粗斜体</em></strong></td><td>三个星号包裹</td></tr>
            <tr><td>~~删除线~~</td><td><s>删除线</s></td><td>两个波浪线包裹</td></tr>
            <tr><td>`行内代码`</td><td><code>行内代码</code></td><td>反引号包裹</td></tr>
          </tbody>
        </table>
      </section>

      {/* LISTS */}
      <section id="lists" className="section">
        <h2><span className="icon-teal">≡</span> 列表</h2>

        <div className="md-preview">
          <div className="md-preview-col">
            <div className="md-preview-label">无序列表（用 - 或 *）</div>
            <div className="md-preview-source">{`- 苹果
- 香蕉
- 橙子
  - 嵌套项目`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">有序列表（用数字.）</div>
            <div className="md-preview-source">{`1. 第一步
2. 第二步
3. 第三步`}</div>
          </div>
        </div>

        <div className="md-preview">
          <div className="md-preview-col">
            <div className="md-preview-label">任务清单（GitHub 支持）</div>
            <div className="md-preview-source">{`- [x] 已完成的任务
- [ ] 待完成的任务
- [ ] 另一个任务`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">渲染效果</div>
            <div className="md-preview-render">
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li>☑️ 已完成的任务</li>
                <li>⬜ 待完成的任务</li>
                <li>⬜ 另一个任务</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CODE */}
      <section id="code" className="section">
        <h2><span className="icon-teal">{'</>'}</span> 代码</h2>
        <p>Markdown 对代码有专门的支持，非常适合技术写作。</p>

        <div className="md-preview">
          <div className="md-preview-col">
            <div className="md-preview-label">行内代码（单反引号）</div>
            <div className="md-preview-source">{'运行 `npm install` 命令'}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">效果</div>
            <div className="md-preview-render">运行 <code>npm install</code> 命令</div>
          </div>
        </div>

        <p style={{ marginTop: '1rem' }}>代码块用三个反引号 <code>```</code> 包裹，可以指定编程语言以获得语法高亮：</p>

        <div className="code-box">
          <div className="code-title">Markdown 代码块写法</div>
          <pre style={{ color: '#ce9178' }}>{`\`\`\`javascript
// 这是一段 JavaScript 代码
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\``}</pre>
        </div>
      </section>

      {/* LINKS & IMAGES */}
      <section id="links" className="section">
        <h2><span className="icon-teal">🔗</span> 链接与图片</h2>

        <table className="md-syntax-table">
          <thead>
            <tr><th>写法</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td>[链接文字](https://example.com)</td><td>插入超链接</td></tr>
            <tr><td>[链接文字](url "悬停提示")</td><td>带提示文字的链接</td></tr>
            <tr><td>![图片描述](图片地址)</td><td>插入图片（比链接多一个 !）</td></tr>
            <tr><td>[![图片](图片地址)](链接地址)</td><td>可点击的图片链接</td></tr>
          </tbody>
        </table>

        <div className="callout tip">
          <h4>💡 记忆技巧</h4>
          <p>链接格式：<code>[显示的文字](实际地址)</code>。图片格式只是在最前面多了一个感叹号 <code>!</code>，表示"展示"这张图。</p>
        </div>
      </section>

      {/* TABLE & BLOCKQUOTE */}
      <section id="table" className="section">
        <h2><span className="icon-teal">⊞</span> 表格与引用</h2>

        <div className="md-preview">
          <div className="md-preview-col">
            <div className="md-preview-label">表格写法</div>
            <div className="md-preview-source">{`| 姓名 | 年龄 | 城市 |
|------|------|------|
| 小明 | 25   | 北京 |
| 小红 | 23   | 上海 |`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">渲染效果</div>
            <div className="md-preview-render">
              <table>
                <thead><tr><th>姓名</th><th>年龄</th><th>城市</th></tr></thead>
                <tbody>
                  <tr><td>小明</td><td>25</td><td>北京</td></tr>
                  <tr><td>小红</td><td>23</td><td>上海</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="md-preview" style={{ marginTop: '1.5rem' }}>
          <div className="md-preview-col">
            <div className="md-preview-label">引用块（用 &gt;）</div>
            <div className="md-preview-source">{`> 这是一段引用内容。
> 可以多行连续写。
>
> 还可以嵌套 **加粗**。`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">效果</div>
            <div className="md-preview-render">
              <blockquote>
                这是一段引用内容。可以多行连续写。<br /><br />
                还可以嵌套 <strong>加粗</strong>。
              </blockquote>
            </div>
          </div>
        </div>

        <div className="callout tip">
          <h4>💡 分割线</h4>
          <p>单独一行写三个或以上的 <code>---</code>、<code>***</code> 或 <code>___</code> 就会变成水平分割线。</p>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="section">
        <h2><span className="icon-teal">🛠️</span> Markdown 编辑器推荐</h2>
        <p>好的编辑器能让你边写边看效果（即时预览），大大提升体验。</p>

        <div className="md-tool-grid">
          <div className="md-tool-card">
            <span className="md-tool-icon">🖊️</span>
            <h3>Typora</h3>
            <p>所见即所得的 Markdown 编辑器，写完即看到排版效果，对新手极友好。支持 Windows/Mac/Linux。</p>
            <span className="md-tool-tag">桌面应用</span>
          </div>
          <div className="md-tool-card">
            <span className="md-tool-icon">📒</span>
            <h3>Obsidian</h3>
            <p>双链笔记软件，用 Markdown 写笔记，支持关系图谱，适合构建个人知识库。</p>
            <span className="md-tool-tag">知识库</span>
          </div>
          <div className="md-tool-card">
            <span className="md-tool-icon">🧠</span>
            <h3>Notion</h3>
            <p>在线协作笔记工具，支持 Markdown 语法快捷键输入，界面美观，适合团队文档。</p>
            <span className="md-tool-tag">在线协作</span>
          </div>
          <div className="md-tool-card">
            <span className="md-tool-icon">⌨️</span>
            <h3>VS Code</h3>
            <p>代码编辑器内置 Markdown 预览（快捷键 <code>Ctrl+Shift+V</code>），搭配插件功能非常强大。</p>
            <span className="md-tool-tag">开发利器</span>
          </div>
          <div className="md-tool-card">
            <span className="md-tool-icon">🐙</span>
            <h3>GitHub</h3>
            <p>直接在网页上编辑 <code>.md</code> 文件并预览，README 就是 Markdown，无需任何安装。</p>
            <span className="md-tool-tag">在线免费</span>
          </div>
          <div className="md-tool-card">
            <span className="md-tool-icon">🌐</span>
            <h3>StackEdit / Dillinger</h3>
            <p>免安装的在线 Markdown 编辑器，左边写源码，右边实时预览。随时可用，适合临时编辑。</p>
            <span className="md-tool-tag">网页工具</span>
          </div>
        </div>
      </section>

      {/* EDITOR PROJECT */}
      <section id="editor-project" className="section">
        <h2><span className="icon-teal">✨</span> 我的 Markdown 编辑器</h2>
        <p>这是一个用 AI 辅助开发的在线 Markdown 编辑器项目，集成了实时预览、主题切换、导出功能，完全开源。</p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">📝</div>
            <div>
              <h3>Markdown Editor</h3>
              <div className="agent-tags">
                <span className="tag">开源</span>
                <span className="tag">实时预览</span>
                <span className="tag">AI 辅助开发</span>
              </div>
            </div>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>⚡ 即时预览</h4>
              <p>左侧输入 Markdown 源码，右侧实时渲染效果，所见即所得，边写边看。</p>
            </div>
            <div className="feature-item">
              <h4>🎨 多主题支持</h4>
              <p>提供多种预设主题，满足不同风格偏好，夜间模式友好。</p>
            </div>
            <div className="feature-item">
              <h4>📤 导出功能</h4>
              <p>支持将文档导出为 HTML 或复制富文本，方便发布到各类平台。</p>
            </div>
            <div className="feature-item">
              <h4>🤖 AI 辅助创作</h4>
              <p>集成 AI 写作辅助，帮助你快速生成和优化 Markdown 内容。</p>
            </div>
          </div>

          <div className="highlight-teal" style={{ marginTop: '1.5rem' }}>
            <p>🔗 这个项目本身就是用 AI 辅助编程完成的——从界面设计到功能实现，全程与 AI 协作。想了解 AI 如何帮助完成真实项目，可以查看项目的 GitHub 仓库和提交历史。</p>
          </div>

          <div className="callout tip" style={{ marginTop: '1.5rem' }}>
            <h4>🚀 想做一个类似的项目？</h4>
            <p>用 Cursor 或 Claude，告诉 AI："帮我做一个 Markdown 在线编辑器，左右分栏布局，左边输入源码，右边实时预览，支持语法高亮"，几分钟内就能得到一个可用的原型。</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
