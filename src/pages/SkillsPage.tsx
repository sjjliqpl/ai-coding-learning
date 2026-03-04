import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/skills.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandGradient: 'gradient-lavender-sky',
  activeClass: 'active-lavender',
  backTo: { label: '返回首页', path: '/' },
  groups: [
    {
      title: '认识 Skills',
      items: [
        { id: 'what', label: '什么是 Skills' },
        { id: 'why', label: '为什么需要' },
        { id: 'enable', label: '能实现什么' },
        { id: 'structure', label: 'Skill 结构' },
      ],
    },
    {
      title: '如何使用',
      items: [
        { id: 'discover', label: '哪里找 Skills' },
        { id: 'use-code', label: '在 Claude Code 中使用' },
        { id: 'use-claude', label: '在 Claude.ai 中使用' },
        { id: 'use-api', label: '在 API 中使用' },
      ],
    },
    {
      title: '创建 Skills',
      items: [
        { id: 'create', label: '创建自己的 Skill' },
        { id: 'best', label: '最佳实践' },
      ],
    },
  ],
}

export default function SkillsPage() {
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">AI Agent Skills</h1>
        <p className="page-desc">
          Agent 技能是可被发现并按需加载的能力包，让智能体在真实工作中更可靠、更高效。
        </p>
      </header>

      {/* WHAT */}
      <section id="what" className="section">
        <h2><span className="icon-lavender">🧩</span> 什么是 Skills？</h2>
        <p>
          Skills 是<strong>包含指令、脚本和资源的文件夹</strong>，智能体会在需要时动态加载，用来提升在特定任务上的表现。
          它们让 AI 能以<strong>可重复、可审计</strong>的方式完成专业工作。
        </p>
        <div className="skills-highlight-box">
          <p>
            智能体越来越强大，但常常缺少完成真实工作所需的上下文。Skills 通过提供可加载的流程知识，以及公司、团队、用户层面的专属上下文，让智能体在需要时按需调用，从而显著提升可靠性与准确性。
          </p>
          <p className="skills-highlight-en">
            Agents are increasingly capable, but often don't have the context they need to do real work reliably. Skills solve this by giving agents access to procedural knowledge and company-, team-, and user-specific context they can load on demand. Agents with access to a set of skills can extend their capabilities based on the task they're working on.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="section">
        <h2><span className="icon-lavender">🎯</span> 为什么需要 Skills？</h2>
        <div className="skill-grid">
          <div className="skill-card">
            <span className="skill-icon">📚</span>
            <h3>补足上下文</h3>
            <p>模型很强，但常常缺少业务流程、团队规范、用户偏好等"真实上下文"。Skills 可以按需加载这些内容。</p>
            <span className="skill-tag">Context</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🔁</span>
            <h3>复用能力</h3>
            <p>把一次性经验沉淀成可复用能力，在不同项目、不同 Agent 中重复使用。</p>
            <span className="skill-tag">Reusable</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🧭</span>
            <h3>稳定流程</h3>
            <p>将多步骤任务标准化，减少 AI 每次"即兴发挥"的不确定性。</p>
            <span className="skill-tag">Reliable</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🔗</span>
            <h3>跨工具共享</h3>
            <p>Skills 标准是开放的，可在多种支持技能的 Agent 产品中复用。</p>
            <span className="skill-tag">Interoperable</span>
          </div>
        </div>
      </section>

      {/* ENABLE */}
      <section id="enable" className="section">
        <h2><span className="icon-lavender">🚀</span> Skills 能实现什么？</h2>
        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'var(--teal)' }}>
            <span className="skill-icon">⚖️</span>
            <h3>领域专家能力</h3>
            <p>把法律审阅流程、财务报表分析、合规检查等专业流程封装成可调用的技能。</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--sky)' }}>
            <span className="skill-icon">🛠️</span>
            <h3>新功能扩展</h3>
            <p>让 Agent 具备生成 PPT、构建 MCP Server、测试 Web 应用等新能力。</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--coral)' }}>
            <span className="skill-icon">✅</span>
            <h3>可重复工作流</h3>
            <p>把复杂任务拆成稳定的步骤，使结果可预期、可追踪。</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--lavender)' }}>
            <span className="skill-icon">🌐</span>
            <h3>跨产品复用</h3>
            <p>同一 Skill 能在多个兼容 Agent 中使用，减少重复开发成本。</p>
          </div>
        </div>
      </section>

      {/* STRUCTURE */}
      <section id="structure" className="section">
        <h2><span className="icon-lavender">🧱</span> Skill 的结构是什么？</h2>
        <p>最简单的 Skill 只需要一个文件夹和一个 <code>SKILL.md</code> 文件：</p>
        <div className="code-box">
          <div className="code-title">SKILL.md（YAML Frontmatter）</div>
<pre style={{ color: '#d4d4d4' }}>{`---
name: my-skill-name
description: 清晰描述这个技能做什么、何时使用
---

# My Skill Name

这里是技能指令，Claude 在使用该技能时会遵循这些步骤。

## Examples
- 示例 1
- 示例 2

## Guidelines
- 注意事项 1
- 注意事项 2`}</pre>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          技能可以包含脚本、资源文件、参考数据等内容，用来支持更复杂的流程。
        </p>
      </section>

      {/* DISCOVER */}
      <section id="discover" className="section">
        <h2><span className="icon-lavender">🔍</span> 哪里找 Skills？</h2>
        <div className="skill-grid">
          <a href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer" className="skill-card" style={{ borderColor: 'var(--lavender)' }}>
            <span className="skill-icon">🐙</span>
            <h3>Anthropic Skills 仓库</h3>
            <p>官方示例技能集合，覆盖创意、开发、企业流程、文档处理等场景。</p>
            <span className="skill-tag">Recommended</span>
          </a>
          <a href="https://agentskills.io" target="_blank" rel="noreferrer" className="skill-card" style={{ borderColor: 'var(--sky)' }}>
            <span className="skill-icon">📘</span>
            <h3>Agent Skills 标准</h3>
            <p>开放的 Skills 标准说明与生态入口，了解技能格式与演进方向。</p>
          </a>
          <div className="skill-card">
            <span className="skill-icon">🏢</span>
            <h3>社区与团队内部</h3>
            <p>很多团队会把私有技能放在内部仓库，沉淀业务流程与知识库。</p>
          </div>
        </div>
      </section>

      {/* USE CLAUDE CODE */}
      <section id="use-code" className="section">
        <h2><span className="icon-lavender">⌨️</span> 在 Claude Code 中使用</h2>
        <ol className="step-list">
          <li className="step-item step-lavender">
            <h4>添加插件市场</h4>
            <div className="code-box"><pre style={{ color: '#d4d4d4' }}>/plugin marketplace add anthropics/skills</pre></div>
          </li>
          <li className="step-item step-lavender">
            <h4>安装示例 Skill</h4>
            <div className="code-box"><pre style={{ color: '#d4d4d4' }}>{`/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills`}</pre></div>
          </li>
          <li className="step-item step-lavender">
            <h4>直接使用</h4>
            <p>安装后，直接在对话中提到技能即可触发，例如："使用 PDF skill 提取表单字段"。</p>
          </li>
        </ol>
      </section>

      {/* USE CLAUDE.AI */}
      <section id="use-claude" className="section">
        <h2><span className="icon-lavender">🤖</span> 在 Claude.ai 中使用</h2>
        <p>Anthropic 的示例技能在 Claude.ai 的付费计划中可用。你也可以上传自定义技能包。</p>
        <div className="skills-tip-box">
          <p>
            提示：使用技能时，直接告诉 Claude "使用某个技能完成任务"，并提供必要的输入文件或上下文。
          </p>
        </div>
      </section>

      {/* USE API */}
      <section id="use-api" className="section">
        <h2><span className="icon-lavender">🔌</span> 在 API 中使用</h2>
        <p>Claude API 支持上传和调用自定义 Skills，让你的产品具备更强的领域能力。</p>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <li>将 Skills 与业务流程绑定，保证输出一致性</li>
          <li>把团队经验固化为标准化的指令包</li>
          <li>在多个 Agent 产品中复用同一套技能</li>
        </ul>
      </section>

      {/* CREATE */}
      <section id="create" className="section">
        <h2><span className="icon-lavender">🛠️</span> 创建自己的 Skill</h2>
        <ol className="step-list">
          <li className="step-item step-lavender">
            <h4>明确场景</h4>
            <p>选择一个重复出现的任务，比如"文档风格统一"、"SQL 查询检查"、"测试报告整理"。</p>
          </li>
          <li className="step-item step-lavender">
            <h4>编写 SKILL.md</h4>
            <p>在技能文件夹中编写详细的指令、示例和注意事项。</p>
          </li>
          <li className="step-item step-lavender">
            <h4>迭代验证</h4>
            <p>用真实任务验证输出效果，逐步改进指令和流程。</p>
          </li>
        </ol>
      </section>

      {/* BEST PRACTICES */}
      <section id="best" className="section">
        <h2><span className="icon-lavender">✅</span> 最佳实践</h2>
        <div className="skill-grid">
          <div className="skill-card">
            <h3>写清楚触发条件</h3>
            <p>技能应该在什么场景使用？什么时候不该使用？必须明确。</p>
          </div>
          <div className="skill-card">
            <h3>提供标准化示例</h3>
            <p>示例越具体，Agent 越容易稳定地产出正确结果。</p>
          </div>
          <div className="skill-card">
            <h3>加入验证步骤</h3>
            <p>让技能包含检查点，避免输出"看起来对但其实错"的结果。</p>
          </div>
          <div className="skill-card">
            <h3>模块化拆分</h3>
            <p>复杂能力拆成多个小技能，组合调用更易维护。</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
