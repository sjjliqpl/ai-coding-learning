import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/markdown.css'
import { useLang } from '../i18n/LanguageContext'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandTextEn: 'AI Coding Guide',
  brandGradient: 'gradient-teal-lavender',
  activeClass: 'active-teal',
  groups: [
    {
      title: '认识 Markdown',
      titleEn: 'Understanding Markdown',
      items: [
        { id: 'what', label: '什么是 Markdown', labelEn: 'What is Markdown' },
        { id: 'why', label: '为什么用 Markdown', labelEn: 'Why Markdown' },
      ],
    },
    {
      title: '基础语法',
      titleEn: 'Basic Syntax',
      items: [
        { id: 'headings', label: '标题', labelEn: 'Headings' },
        { id: 'emphasis', label: '加粗与斜体', labelEn: 'Bold & Italic' },
        { id: 'lists', label: '列表', labelEn: 'Lists' },
        { id: 'code', label: '代码', labelEn: 'Code' },
        { id: 'links', label: '链接与图片', labelEn: 'Links & Images' },
        { id: 'table', label: '表格与引用', labelEn: 'Tables & Quotes' },
      ],
    },
    {
      title: '工具推荐',
      titleEn: 'Tool Recommendations',
      items: [
        { id: 'tools', label: 'Markdown 编辑器', labelEn: 'Markdown Editors' },
        { id: 'editor-project', label: '我的 Markdown 编辑器', labelEn: 'My Markdown Editor' },
      ],
    },
  ],
  backTo: { label: '返回首页', labelEn: 'Back to Home', path: '/' },
}

export default function MarkdownPage() {
  const { t } = useLang()
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">{t('Markdown 入门指南', 'Markdown Getting Started Guide')}</h1>
        <p className="page-desc">{t('写文档、写笔记、写README——用最简单的符号，排出漂亮的格式', 'Write docs, notes, READMEs — use the simplest symbols to create beautiful formatting')}</p>
      </header>

      {/* WHAT IS MARKDOWN */}
      <section id="what" className="section">
        <h2><span className="icon-teal">📝</span> {t('什么是 Markdown？', 'What is Markdown?')}</h2>
        <p>{t('Markdown 是一种', 'Markdown is a ')}<strong>{t('超轻量的文本格式语言', 'super lightweight text formatting language')}</strong>{t('，让你可以用普通键盘符号（比如', ' that lets you use ordinary keyboard symbols (like ')}<code>#</code>{t('、', ', ')}<code>*</code>{t('、', ', ')}<code>-</code>{t('）来描述文档结构，然后自动渲染成带格式的漂亮文档。', ') to describe document structure, which then automatically renders into beautifully formatted documents.')}</p>

        <div className="md-preview">
          <div className="md-preview-col">
            <div className="md-preview-label">{t('✍️ 你写的源文本', '✍️ Source Text You Write')}</div>
            <div className="md-preview-source">{`# ${t('我的笔记', 'My Notes')}

${t('这是一段', 'This is some ')}**${t('加粗', 'bold')}**${t('的文字，', ' text, ')}
${t('也可以写', 'and also ')}*${t('斜体', 'italic')}*${t('。', '.')}

- ${t('列表项一', 'List item one')}
- ${t('列表项二', 'List item two')}

> ${t('这是一句引用', 'This is a quote')}`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">{t('👁️ 渲染后看到的效果', '👁️ Rendered Output')}</div>
            <div className="md-preview-render">
              <h1>{t('我的笔记', 'My Notes')}</h1>
              <p>{t('这是一段', 'This is some ')}<strong>{t('加粗', 'bold')}</strong>{t('的文字，', ' text, ')}{t('也可以写', 'and also ')}<em>{t('斜体', 'italic')}</em>{t('。', '.')}</p>
              <ul>
                <li>{t('列表项一', 'List item one')}</li>
                <li>{t('列表项二', 'List item two')}</li>
              </ul>
              <blockquote>{t('这是一句引用', 'This is a quote')}</blockquote>
            </div>
          </div>
        </div>

        <div className="highlight-teal">
          <p>💡 <strong>{t('一句话理解', 'In a Nutshell')}</strong>{t('：Markdown 就像给文字加"暗号"——你在源文件里写', ': Markdown is like giving text "secret codes" — you write ')}<code>**粗体**</code>{t('，打开后就自动变成', ' in the source file, and it automatically becomes ')}<strong>{t('粗体', 'bold')}</strong>{t('。这些符号既简单易记，又让纯文本文件就能携带排版信息。', ' when opened. These symbols are easy to remember and let plain text files carry formatting information.')}</p>
        </div>
      </section>

      {/* WHY MARKDOWN */}
      <section id="why" className="section">
        <h2><span className="icon-teal">💡</span> {t('为什么用 Markdown？', 'Why Use Markdown?')}</h2>
        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'rgba(78,205,196,0.3)' }}>
            <span className="skill-icon">🌍</span>
            <h3>{t('到处都用', 'Used Everywhere')}</h3>
            <p>{t('GitHub、Notion、语雀、掘金、CSDN、各种聊天工具……Markdown 已成为互联网写作的通用格式。', 'GitHub, Notion, Yuque, Juejin, CSDN, various chat tools… Markdown has become the universal format for internet writing.')}</p>
            <span className="skill-tag">{t('通用标准', 'Universal Standard')}</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(78,205,196,0.3)' }}>
            <span className="skill-icon">⚡</span>
            <h3>{t('纯键盘操作', 'Keyboard-Only')}</h3>
            <p>{t('不用鼠标点工具栏。双手不离键盘就能完成排版，写作效率提升明显。', 'No mouse needed for toolbars. Format without leaving the keyboard, significantly boosting writing efficiency.')}</p>
            <span className="skill-tag">{t('效率神器', 'Efficiency Tool')}</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(78,205,196,0.3)' }}>
            <span className="skill-icon">📂</span>
            <h3>{t('纯文本存储', 'Plain Text Storage')}</h3>
            <p>{t('Markdown 文件是', 'Markdown files are ')}<code>.md</code>{t(' 纯文本，体积极小，可用 Git 版本控制，永不过时。', ' plain text, extremely small, Git-friendly, and never obsolete.')}</p>
            <span className="skill-tag">{t('轻量持久', 'Lightweight & Durable')}</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(78,205,196,0.3)' }}>
            <span className="skill-icon">🤖</span>
            <h3>{t('AI 最爱的格式', "AI's Favorite Format")}</h3>
            <p>{t('和 AI 对话、整理 AI 输出、写提示词文档……AI 工具普遍使用 Markdown，掌握它事半功倍。', 'Chat with AI, organize AI output, write prompt docs… AI tools widely use Markdown. Mastering it gets you twice the results with half the effort.')}</p>
            <span className="skill-tag">{t('AI 友好', 'AI-Friendly')}</span>
          </div>
        </div>
      </section>

      {/* HEADINGS */}
      <section id="headings" className="section">
        <h2><span className="icon-teal">H</span> {t('标题', 'Headings')}</h2>
        <p>{t('在行首加', 'Add ')}<code>#</code>{t('，', ' at the beginning of a line. ')}<code>#</code>{t(' 的数量代表标题级别（1–6 级）。', ' The number of # signs indicates the heading level (1-6).')}</p>

        <table className="md-syntax-table">
          <thead>
            <tr><th>{t('写法', 'Syntax')}</th><th>{t('效果说明', 'Effect')}</th><th>{t('对应 HTML', 'HTML')}</th></tr>
          </thead>
          <tbody>
            <tr><td># {t('一级标题', 'Level 1 Heading')}</td><td>{t('最大的标题，页面主标题', 'Largest heading, page title')}</td><td>&lt;h1&gt;</td></tr>
            <tr><td>## {t('二级标题', 'Level 2 Heading')}</td><td>{t('章节标题', 'Section heading')}</td><td>&lt;h2&gt;</td></tr>
            <tr><td>### {t('三级标题', 'Level 3 Heading')}</td><td>{t('小节标题', 'Subsection heading')}</td><td>&lt;h3&gt;</td></tr>
            <tr><td>#### {t('四级标题', 'Level 4 Heading')}</td><td>{t('更小的分组', 'Smaller grouping')}</td><td>&lt;h4&gt;</td></tr>
          </tbody>
        </table>

        <div className="callout tip">
          <h4>💡 {t('小技巧', 'Tip')}</h4>
          <p><code>#</code>{t(' 后面要有一个空格，否则部分编辑器不会识别为标题。', ' must be followed by a space, otherwise some editors won\'t recognize it as a heading.')}</p>
        </div>
      </section>

      {/* EMPHASIS */}
      <section id="emphasis" className="section">
        <h2><span className="icon-teal">B/I</span> {t('加粗与斜体', 'Bold & Italic')}</h2>

        <table className="md-syntax-table">
          <thead>
            <tr><th>{t('写法', 'Syntax')}</th><th>{t('效果', 'Result')}</th><th>{t('说明', 'Description')}</th></tr>
          </thead>
          <tbody>
            <tr><td>**{t('加粗文字', 'bold text')}**</td><td><strong>{t('加粗文字', 'bold text')}</strong></td><td>{t('两个星号包裹', 'Wrapped in two asterisks')}</td></tr>
            <tr><td>*{t('斜体文字', 'italic text')}*</td><td><em>{t('斜体文字', 'italic text')}</em></td><td>{t('一个星号包裹', 'Wrapped in one asterisk')}</td></tr>
            <tr><td>***{t('加粗斜体', 'bold italic')}***</td><td><strong><em>{t('加粗斜体', 'bold italic')}</em></strong></td><td>{t('三个星号包裹', 'Wrapped in three asterisks')}</td></tr>
            <tr><td>~~{t('删除线', 'strikethrough')}~~</td><td><s>{t('删除线', 'strikethrough')}</s></td><td>{t('两个波浪线包裹', 'Wrapped in two tildes')}</td></tr>
            <tr><td>`{t('行内代码', 'inline code')}`</td><td><code>{t('行内代码', 'inline code')}</code></td><td>{t('反引号包裹', 'Wrapped in backticks')}</td></tr>
          </tbody>
        </table>
      </section>

      {/* LISTS */}
      <section id="lists" className="section">
        <h2><span className="icon-teal">≡</span> {t('列表', 'Lists')}</h2>

        <div className="md-preview">
          <div className="md-preview-col">
            <div className="md-preview-label">{t('无序列表（用 - 或 *）', 'Unordered List (using - or *)')}</div>
            <div className="md-preview-source">{`- ${t('苹果', 'Apple')}
- ${t('香蕉', 'Banana')}
- ${t('橙子', 'Orange')}
  - ${t('嵌套项目', 'Nested item')}`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">{t('有序列表（用数字.）', 'Ordered List (using numbers.)')}</div>
            <div className="md-preview-source">{`1. ${t('第一步', 'Step 1')}
2. ${t('第二步', 'Step 2')}
3. ${t('第三步', 'Step 3')}`}</div>
          </div>
        </div>

        <div className="md-preview">
          <div className="md-preview-col">
            <div className="md-preview-label">{t('任务清单（GitHub 支持）', 'Task List (GitHub supported)')}</div>
            <div className="md-preview-source">{`- [x] ${t('已完成的任务', 'Completed task')}
- [ ] ${t('待完成的任务', 'Pending task')}
- [ ] ${t('另一个任务', 'Another task')}`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">{t('渲染效果', 'Rendered Result')}</div>
            <div className="md-preview-render">
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li>☑️ {t('已完成的任务', 'Completed task')}</li>
                <li>⬜ {t('待完成的任务', 'Pending task')}</li>
                <li>⬜ {t('另一个任务', 'Another task')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CODE */}
      <section id="code" className="section">
        <h2><span className="icon-teal">{'</>'}</span> {t('代码', 'Code')}</h2>
        <p>{t('Markdown 对代码有专门的支持，非常适合技术写作。', 'Markdown has dedicated support for code, making it ideal for technical writing.')}</p>

        <div className="md-preview">
          <div className="md-preview-col">
            <div className="md-preview-label">{t('行内代码（单反引号）', 'Inline Code (single backtick)')}</div>
            <div className="md-preview-source">{`${t('运行', 'Run ')} \`npm install\` ${t('命令', ' command')}`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">{t('效果', 'Result')}</div>
            <div className="md-preview-render">{t('运行', 'Run ')} <code>npm install</code> {t('命令', ' command')}</div>
          </div>
        </div>

        <p style={{ marginTop: '1rem' }}>{t('代码块用三个反引号', 'Code blocks use triple backticks ')}<code>```</code>{t(' 包裹，可以指定编程语言以获得语法高亮：', ' to wrap code, and you can specify the programming language for syntax highlighting:')}</p>

        <div className="code-box">
          <div className="code-title">{t('Markdown 代码块写法', 'Markdown Code Block Syntax')}</div>
          <pre style={{ color: '#ce9178' }}>{`\`\`\`javascript
// ${t('这是一段 JavaScript 代码', 'This is a JavaScript code snippet')}
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\``}</pre>
        </div>
      </section>

      {/* LINKS & IMAGES */}
      <section id="links" className="section">
        <h2><span className="icon-teal">🔗</span> {t('链接与图片', 'Links & Images')}</h2>

        <table className="md-syntax-table">
          <thead>
            <tr><th>{t('写法', 'Syntax')}</th><th>{t('说明', 'Description')}</th></tr>
          </thead>
          <tbody>
            <tr><td>[{t('链接文字', 'link text')}](https://example.com)</td><td>{t('插入超链接', 'Insert hyperlink')}</td></tr>
            <tr><td>[{t('链接文字', 'link text')}](url "{t('悬停提示', 'hover tooltip')}")</td><td>{t('带提示文字的链接', 'Link with tooltip text')}</td></tr>
            <tr><td>![{t('图片描述', 'image description')}]({t('图片地址', 'image url')})</td><td>{t('插入图片（比链接多一个 !）', 'Insert image (add ! before link syntax)')}</td></tr>
            <tr><td>[![{t('图片', 'image')}]({t('图片地址', 'image url')})]({t('链接地址', 'link url')})</td><td>{t('可点击的图片链接', 'Clickable image link')}</td></tr>
          </tbody>
        </table>

        <div className="callout tip">
          <h4>💡 {t('记忆技巧', 'Memory Trick')}</h4>
          <p>{t('链接格式：', 'Link format: ')}<code>[{t('显示的文字', 'display text')}]({t('实际地址', 'actual url')})</code>{t('。图片格式只是在最前面多了一个感叹号', '. Image format just adds an exclamation mark at the beginning ')}<code>!</code>{t('，表示"展示"这张图。', ', meaning "display" this image.')}</p>
        </div>
      </section>

      {/* TABLE & BLOCKQUOTE */}
      <section id="table" className="section">
        <h2><span className="icon-teal">⊞</span> {t('表格与引用', 'Tables & Quotes')}</h2>

        <div className="md-preview">
          <div className="md-preview-col">
            <div className="md-preview-label">{t('表格写法', 'Table Syntax')}</div>
            <div className="md-preview-source">{`| ${t('姓名', 'Name')} | ${t('年龄', 'Age')} | ${t('城市', 'City')} |
|------|------|------|
| ${t('小明', 'Xiao Ming')} | 25   | ${t('北京', 'Beijing')} |
| ${t('小红', 'Xiao Hong')} | 23   | ${t('上海', 'Shanghai')} |`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">{t('渲染效果', 'Rendered Result')}</div>
            <div className="md-preview-render">
              <table>
                <thead><tr><th>{t('姓名', 'Name')}</th><th>{t('年龄', 'Age')}</th><th>{t('城市', 'City')}</th></tr></thead>
                <tbody>
                  <tr><td>{t('小明', 'Xiao Ming')}</td><td>25</td><td>{t('北京', 'Beijing')}</td></tr>
                  <tr><td>{t('小红', 'Xiao Hong')}</td><td>23</td><td>{t('上海', 'Shanghai')}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="md-preview" style={{ marginTop: '1.5rem' }}>
          <div className="md-preview-col">
            <div className="md-preview-label">{t('引用块（用', 'Blockquote (using ')}&gt;{t('）', ')')}</div>
            <div className="md-preview-source">{`> ${t('这是一段引用内容。', 'This is a blockquote.')}
> ${t('可以多行连续写。', 'Can span multiple lines.')}
>
> ${t('还可以嵌套', 'Can also nest ')}**${t('加粗', 'bold')}**${t('。', '.')}`}</div>
          </div>
          <div className="md-preview-col">
            <div className="md-preview-label">{t('效果', 'Result')}</div>
            <div className="md-preview-render">
              <blockquote>
                {t('这是一段引用内容。可以多行连续写。', 'This is a blockquote. Can span multiple lines.')}<br /><br />
                {t('还可以嵌套', 'Can also nest ')} <strong>{t('加粗', 'bold')}</strong>{t('。', '.')}
              </blockquote>
            </div>
          </div>
        </div>

        <div className="callout tip">
          <h4>💡 {t('分割线', 'Horizontal Rule')}</h4>
          <p>{t('单独一行写三个或以上的', 'A line with three or more ')}<code>---</code>{t('、', ', ')}<code>***</code>{t(' 或 ', ' or ')}<code>___</code>{t(' 就会变成水平分割线。', ' becomes a horizontal rule.')}</p>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="section">
        <h2><span className="icon-teal">🛠️</span> {t('Markdown 编辑器推荐', 'Recommended Markdown Editors')}</h2>
        <p>{t('好的编辑器能让你边写边看效果（即时预览），大大提升体验。', 'A good editor lets you see the output as you type (live preview), greatly improving the experience.')}</p>

        <div className="md-tool-grid">
          <div className="md-tool-card">
            <span className="md-tool-icon">🖊️</span>
            <h3>Typora</h3>
            <p>{t('所见即所得的 Markdown 编辑器，写完即看到排版效果，对新手极友好。支持 Windows/Mac/Linux。', 'A WYSIWYG Markdown editor — see formatting as you type, extremely beginner-friendly. Supports Windows/Mac/Linux.')}</p>
            <span className="md-tool-tag">{t('桌面应用', 'Desktop App')}</span>
          </div>
          <div className="md-tool-card">
            <span className="md-tool-icon">📒</span>
            <h3>Obsidian</h3>
            <p>{t('双链笔记软件，用 Markdown 写笔记，支持关系图谱，适合构建个人知识库。', 'A dual-link note-taking app using Markdown, with relationship graphs — ideal for building personal knowledge bases.')}</p>
            <span className="md-tool-tag">{t('知识库', 'Knowledge Base')}</span>
          </div>
          <div className="md-tool-card">
            <span className="md-tool-icon">🧠</span>
            <h3>Notion</h3>
            <p>{t('在线协作笔记工具，支持 Markdown 语法快捷键输入，界面美观，适合团队文档。', 'Online collaborative note tool with Markdown shortcut support and a beautiful interface — great for team docs.')}</p>
            <span className="md-tool-tag">{t('在线协作', 'Online Collab')}</span>
          </div>
          <div className="md-tool-card">
            <span className="md-tool-icon">⌨️</span>
            <h3>VS Code</h3>
            <p>{t('代码编辑器内置 Markdown 预览（快捷键', 'Code editor with built-in Markdown preview (shortcut ')}<code>Ctrl+Shift+V</code>{t('），搭配插件功能非常强大。', '), extremely powerful with extensions.')}</p>
            <span className="md-tool-tag">{t('开发利器', 'Dev Tool')}</span>
          </div>
          <div className="md-tool-card">
            <span className="md-tool-icon">🐙</span>
            <h3>GitHub</h3>
            <p>{t('直接在网页上编辑', 'Edit ')}<code>.md</code>{t(' 文件并预览，README 就是 Markdown，无需任何安装。', ' files directly on the web with preview. README is Markdown — no installation needed.')}</p>
            <span className="md-tool-tag">{t('在线免费', 'Free Online')}</span>
          </div>
          <div className="md-tool-card">
            <span className="md-tool-icon">🌐</span>
            <h3>StackEdit / Dillinger</h3>
            <p>{t('免安装的在线 Markdown 编辑器，左边写源码，右边实时预览。随时可用，适合临时编辑。', 'No-install online Markdown editors — write source on the left, live preview on the right. Always available, perfect for quick edits.')}</p>
            <span className="md-tool-tag">{t('网页工具', 'Web Tool')}</span>
          </div>
        </div>
      </section>

      {/* EDITOR PROJECT */}
      <section id="editor-project" className="section">
        <h2><span className="icon-teal">✨</span> {t('我的 Markdown 编辑器', 'My Markdown Editor')}</h2>
        <p>{t('这是一个用 AI 辅助开发的在线 Markdown 编辑器项目，集成了实时预览、主题切换、导出功能，完全开源。', 'This is an AI-assisted online Markdown editor project with live preview, theme switching, and export — fully open source.')}</p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">📝</div>
            <div>
              <h3>Markdown Editor</h3>
              <div className="agent-tags">
                <span className="tag">{t('开源', 'Open Source')}</span>
                <span className="tag">{t('实时预览', 'Live Preview')}</span>
                <span className="tag">{t('AI 辅助开发', 'AI-Assisted Dev')}</span>
              </div>
            </div>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>⚡ {t('即时预览', 'Instant Preview')}</h4>
              <p>{t('左侧输入 Markdown 源码，右侧实时渲染效果，所见即所得，边写边看。', 'Enter Markdown source on the left, see live rendering on the right — WYSIWYG, see as you type.')}</p>
            </div>
            <div className="feature-item">
              <h4>🎨 {t('多主题支持', 'Multi-Theme Support')}</h4>
              <p>{t('提供多种预设主题，满足不同风格偏好，夜间模式友好。', 'Multiple preset themes to suit different style preferences, with dark mode support.')}</p>
            </div>
            <div className="feature-item">
              <h4>📤 {t('导出功能', 'Export Features')}</h4>
              <p>{t('支持将文档导出为 HTML 或复制富文本，方便发布到各类平台。', 'Export documents as HTML or copy rich text for easy publishing to various platforms.')}</p>
            </div>
            <div className="feature-item">
              <h4>🤖 {t('AI 辅助创作', 'AI-Assisted Writing')}</h4>
              <p>{t('集成 AI 写作辅助，帮助你快速生成和优化 Markdown 内容。', 'Integrated AI writing assistance to help you quickly generate and optimize Markdown content.')}</p>
            </div>
          </div>

          <div className="highlight-teal" style={{ marginTop: '1.5rem' }}>
            <p>🔗 {t('这个项目本身就是用 AI 辅助编程完成的——从界面设计到功能实现，全程与 AI 协作。想了解 AI 如何帮助完成真实项目，可以查看项目的 GitHub 仓库和提交历史。', 'This project itself was built with AI-assisted programming — from UI design to feature implementation, fully in collaboration with AI. To see how AI helps complete real projects, check out the GitHub repo and commit history.')}</p>
          </div>

          <div className="callout tip" style={{ marginTop: '1.5rem' }}>
            <h4>🚀 {t('想做一个类似的项目？', 'Want to build something similar?')}</h4>
            <p>{t('用 Cursor 或 Claude，告诉 AI："帮我做一个 Markdown 在线编辑器，左右分栏布局，左边输入源码，右边实时预览，支持语法高亮"，几分钟内就能得到一个可用的原型。', 'Use Cursor or Claude and tell AI: "Build me an online Markdown editor with a split-pane layout — source on the left, live preview on the right, with syntax highlighting" — you\'ll have a working prototype in minutes.')}</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
