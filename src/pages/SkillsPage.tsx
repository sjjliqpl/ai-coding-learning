import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import { useLang } from '../i18n/LanguageContext'
import '../styles/skills.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandTextEn: 'AI Coding Guide',
  brandGradient: 'gradient-lavender-sky',
  activeClass: 'active-lavender',
  backTo: { label: '返回首页', labelEn: 'Back to Home', path: '/' },
  groups: [
    {
      title: '认识 Skills',
      titleEn: 'Understanding Skills',
      items: [
        { id: 'what', label: '什么是 Skills', labelEn: 'What are Skills' },
        { id: 'why', label: '为什么需要', labelEn: 'Why Needed' },
        { id: 'enable', label: '能实现什么', labelEn: 'What They Enable' },
        { id: 'structure', label: 'Skill 结构', labelEn: 'Skill Structure' },
      ],
    },
    {
      title: '如何使用',
      titleEn: 'How to Use',
      items: [
        { id: 'discover', label: '哪里找 Skills', labelEn: 'Finding Skills' },
        { id: 'use-code', label: '在 Claude Code 中使用', labelEn: 'Using in Claude Code' },
        { id: 'use-claude', label: '在 Claude.ai 中使用', labelEn: 'Using in Claude.ai' },
        { id: 'use-api', label: '在 API 中使用', labelEn: 'Using in API' },
      ],
    },
    {
      title: '创建 Skills',
      titleEn: 'Creating Skills',
      items: [
        { id: 'create', label: '创建自己的 Skill', labelEn: 'Creating Your Own Skill' },
        { id: 'best', label: '最佳实践', labelEn: 'Best Practices' },
      ],
    },
  ],
}

export default function SkillsPage() {
  const { t } = useLang()
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">AI Agent Skills</h1>
        <p className="page-desc">
          {t('Agent 技能是可被发现并按需加载的能力包，让智能体在真实工作中更可靠、更高效。', 'Agent Skills are discoverable, on-demand capability packs that make agents more reliable and efficient in real work.')}
        </p>
      </header>

      {/* WHAT */}
      <section id="what" className="section">
        <h2><span className="icon-lavender">🧩</span> {t('什么是 Skills？', 'What are Skills?')}</h2>
        <p>
          {t('Skills 是', 'Skills are')}<strong>{t('包含指令、脚本和资源的文件夹', 'folders containing instructions, scripts, and resources')}</strong>{t('，智能体会在需要时动态加载，用来提升在特定任务上的表现。', ' that agents dynamically load when needed to improve performance on specific tasks.')}
          {t('它们让 AI 能以', 'They enable AI to complete professional work in a')}<strong>{t('可重复、可审计', 'repeatable and auditable')}</strong>{t('的方式完成专业工作。', 'manner.')}
        </p>
        <div className="skills-highlight-box">
          <p>
            {t('智能体越来越强大，但常常缺少完成真实工作所需的上下文。Skills 通过提供可加载的流程知识，以及公司、团队、用户层面的专属上下文，让智能体在需要时按需调用，从而显著提升可靠性与准确性。', 'Agents are increasingly capable, but often lack the context needed to do real work reliably. Skills solve this by providing loadable procedural knowledge and company-, team-, and user-specific context that agents can call on demand, significantly improving reliability and accuracy.')}
          </p>
          <p className="skills-highlight-en">
            Agents are increasingly capable, but often don't have the context they need to do real work reliably. Skills solve this by giving agents access to procedural knowledge and company-, team-, and user-specific context they can load on demand. Agents with access to a set of skills can extend their capabilities based on the task they're working on.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="section">
        <h2><span className="icon-lavender">🎯</span> {t('为什么需要 Skills？', 'Why Skills?')}</h2>
        <div className="skill-grid">
          <div className="skill-card">
            <span className="skill-icon">📚</span>
            <h3>{t('补足上下文', 'Fill Context Gaps')}</h3>
            <p>{t('模型很强，但常常缺少业务流程、团队规范、用户偏好等"真实上下文"。Skills 可以按需加载这些内容。', 'Models are powerful but often lack "real context" — business processes, team conventions, user preferences. Skills load these on demand.')}</p>
            <span className="skill-tag">Context</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🔁</span>
            <h3>{t('复用能力', 'Reusable Capabilities')}</h3>
            <p>{t('把一次性经验沉淀成可复用能力，在不同项目、不同 Agent 中重复使用。', 'Turn one-off experience into reusable capabilities across different projects and agents.')}</p>
            <span className="skill-tag">Reusable</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🧭</span>
            <h3>{t('稳定流程', 'Stable Workflows')}</h3>
            <p>{t('将多步骤任务标准化，减少 AI 每次"即兴发挥"的不确定性。', 'Standardize multi-step tasks to reduce the uncertainty of AI improvisation each time.')}</p>
            <span className="skill-tag">Reliable</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🔗</span>
            <h3>{t('跨工具共享', 'Cross-Tool Sharing')}</h3>
            <p>{t('Skills 标准是开放的，可在多种支持技能的 Agent 产品中复用。', 'The Skills standard is open, enabling reuse across multiple Skills-compatible agent products.')}</p>
            <span className="skill-tag">Interoperable</span>
          </div>
        </div>
      </section>

      {/* ENABLE */}
      <section id="enable" className="section">
        <h2><span className="icon-lavender">🚀</span> {t('Skills 能实现什么？', 'What Can Skills Enable?')}</h2>
        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'var(--teal)' }}>
            <span className="skill-icon">⚖️</span>
            <h3>{t('领域专家能力', 'Domain Expertise')}</h3>
            <p>{t('把法律审阅流程、财务报表分析、合规检查等专业流程封装成可调用的技能。', 'Package professional processes like legal review, financial statement analysis, and compliance checks into callable skills.')}</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--sky)' }}>
            <span className="skill-icon">🛠️</span>
            <h3>{t('新功能扩展', 'New Feature Extensions')}</h3>
            <p>{t('让 Agent 具备生成 PPT、构建 MCP Server、测试 Web 应用等新能力。', 'Give agents new capabilities like generating PPTs, building MCP Servers, and testing web applications.')}</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--coral)' }}>
            <span className="skill-icon">✅</span>
            <h3>{t('可重复工作流', 'Repeatable Workflows')}</h3>
            <p>{t('把复杂任务拆成稳定的步骤，使结果可预期、可追踪。', 'Break complex tasks into stable steps, making results predictable and traceable.')}</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'var(--lavender)' }}>
            <span className="skill-icon">🌐</span>
            <h3>{t('跨产品复用', 'Cross-Product Reuse')}</h3>
            <p>{t('同一 Skill 能在多个兼容 Agent 中使用，减少重复开发成本。', 'The same Skill can be used across multiple compatible agents, reducing duplicate development costs.')}</p>
          </div>
        </div>
      </section>

      {/* STRUCTURE */}
      <section id="structure" className="section">
        <h2><span className="icon-lavender">🧱</span> {t('Skill 的结构是什么？', 'What is a Skill\'s Structure?')}</h2>
        <p>{t('最简单的 Skill 只需要一个文件夹和一个', 'The simplest Skill only needs a folder and a')} <code>SKILL.md</code> {t('文件：', 'file:')}</p>
        <div className="code-box">
          <div className="code-title">{t('SKILL.md（YAML Frontmatter）', 'SKILL.md (YAML Frontmatter)')}</div>
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
          {t('技能可以包含脚本、资源文件、参考数据等内容，用来支持更复杂的流程。', 'Skills can include scripts, resource files, reference data, and more to support complex workflows.')}
        </p>
      </section>

      {/* DISCOVER */}
      <section id="discover" className="section">
        <h2><span className="icon-lavender">🔍</span> {t('哪里找 Skills？', 'Where to Find Skills?')}</h2>
        <div className="skill-grid">
          <a href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer" className="skill-card" style={{ borderColor: 'var(--lavender)' }}>
            <span className="skill-icon">🐙</span>
            <h3>{t('Anthropic Skills 仓库', 'Anthropic Skills Repository')}</h3>
            <p>{t('官方示例技能集合，覆盖创意、开发、企业流程、文档处理等场景。', 'Official example skill collection covering creativity, development, enterprise workflows, document processing, and more.')}</p>
            <span className="skill-tag">Recommended</span>
          </a>
          <a href="https://agentskills.io" target="_blank" rel="noreferrer" className="skill-card" style={{ borderColor: 'var(--sky)' }}>
            <span className="skill-icon">📘</span>
            <h3>{t('Agent Skills 标准', 'Agent Skills Standard')}</h3>
            <p>{t('开放的 Skills 标准说明与生态入口，了解技能格式与演进方向。', 'Open Skills standard specification and ecosystem entry point — learn about skill formats and evolution.')}</p>
          </a>
          <div className="skill-card">
            <span className="skill-icon">🏢</span>
            <h3>{t('社区与团队内部', 'Community & Internal Teams')}</h3>
            <p>{t('很多团队会把私有技能放在内部仓库，沉淀业务流程与知识库。', 'Many teams store private skills in internal repositories to capture business processes and knowledge bases.')}</p>
          </div>
        </div>
      </section>

      {/* USE CLAUDE CODE */}
      <section id="use-code" className="section">
        <h2><span className="icon-lavender">⌨️</span> {t('在 Claude Code 中使用', 'Using in Claude Code')}</h2>
        <ol className="step-list">
          <li className="step-item step-lavender">
            <h4>{t('添加插件市场', 'Add Plugin Marketplace')}</h4>
            <div className="code-box"><pre style={{ color: '#d4d4d4' }}>/plugin marketplace add anthropics/skills</pre></div>
          </li>
          <li className="step-item step-lavender">
            <h4>{t('安装示例 Skill', 'Install Example Skills')}</h4>
            <div className="code-box"><pre style={{ color: '#d4d4d4' }}>{`/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills`}</pre></div>
          </li>
          <li className="step-item step-lavender">
            <h4>{t('直接使用', 'Use Directly')}</h4>
            <p>{t('安装后，直接在对话中提到技能即可触发，例如："使用 PDF skill 提取表单字段"。', 'After installation, simply mention the skill in conversation to trigger it, e.g., "Use the PDF skill to extract form fields".')}</p>
          </li>
        </ol>
      </section>

      {/* USE CLAUDE.AI */}
      <section id="use-claude" className="section">
        <h2><span className="icon-lavender">🤖</span> {t('在 Claude.ai 中使用', 'Using in Claude.ai')}</h2>
        <p>{t('Anthropic 的示例技能在 Claude.ai 的付费计划中可用。你也可以上传自定义技能包。', 'Anthropic\'s example skills are available on Claude.ai paid plans. You can also upload custom skill packages.')}</p>
        <div className="skills-tip-box">
          <p>
            {t('提示：使用技能时，直接告诉 Claude "使用某个技能完成任务"，并提供必要的输入文件或上下文。', 'Tip: When using skills, simply tell Claude to "use X skill to complete the task" and provide the necessary input files or context.')}
          </p>
        </div>
      </section>

      {/* USE API */}
      <section id="use-api" className="section">
        <h2><span className="icon-lavender">🔌</span> {t('在 API 中使用', 'Using in API')}</h2>
        <p>{t('Claude API 支持上传和调用自定义 Skills，让你的产品具备更强的领域能力。', 'Claude API supports uploading and invoking custom Skills, giving your product stronger domain capabilities.')}</p>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <li>{t('将 Skills 与业务流程绑定，保证输出一致性', 'Bind Skills with business workflows to ensure output consistency')}</li>
          <li>{t('把团队经验固化为标准化的指令包', 'Solidify team experience into standardized instruction packages')}</li>
          <li>{t('在多个 Agent 产品中复用同一套技能', 'Reuse the same skill set across multiple agent products')}</li>
        </ul>
      </section>

      {/* CREATE */}
      <section id="create" className="section">
        <h2><span className="icon-lavender">🛠️</span> {t('创建自己的 Skill', 'Creating Your Own Skill')}</h2>
        <ol className="step-list">
          <li className="step-item step-lavender">
            <h4>{t('明确场景', 'Define the Scenario')}</h4>
            <p>{t('选择一个重复出现的任务，比如"文档风格统一"、"SQL 查询检查"、"测试报告整理"。', 'Pick a recurring task, such as "document style standardization", "SQL query review", or "test report organization".')}</p>
          </li>
          <li className="step-item step-lavender">
            <h4>{t('编写 SKILL.md', 'Write SKILL.md')}</h4>
            <p>{t('在技能文件夹中编写详细的指令、示例和注意事项。', 'Write detailed instructions, examples, and notes in the skill folder.')}</p>
          </li>
          <li className="step-item step-lavender">
            <h4>{t('迭代验证', 'Iterate & Validate')}</h4>
            <p>{t('用真实任务验证输出效果，逐步改进指令和流程。', 'Validate output with real tasks and progressively improve instructions and workflows.')}</p>
          </li>
        </ol>
      </section>

      {/* BEST PRACTICES */}
      <section id="best" className="section">
        <h2><span className="icon-lavender">✅</span> {t('最佳实践', 'Best Practices')}</h2>
        <div className="skill-grid">
          <div className="skill-card">
            <h3>{t('写清楚触发条件', 'Clear Trigger Conditions')}</h3>
            <p>{t('技能应该在什么场景使用？什么时候不该使用？必须明确。', 'When should the skill be used? When should it NOT be used? Must be explicit.')}</p>
          </div>
          <div className="skill-card">
            <h3>{t('提供标准化示例', 'Provide Standardized Examples')}</h3>
            <p>{t('示例越具体，Agent 越容易稳定地产出正确结果。', 'The more specific the examples, the more reliably the agent produces correct results.')}</p>
          </div>
          <div className="skill-card">
            <h3>{t('加入验证步骤', 'Include Verification Steps')}</h3>
            <p>{t('让技能包含检查点，避免输出"看起来对但其实错"的结果。', 'Include checkpoints in skills to avoid results that "look right but are actually wrong".')}</p>
          </div>
          <div className="skill-card">
            <h3>{t('模块化拆分', 'Modular Decomposition')}</h3>
            <p>{t('复杂能力拆成多个小技能，组合调用更易维护。', 'Break complex capabilities into smaller skills — combined invocation is easier to maintain.')}</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
