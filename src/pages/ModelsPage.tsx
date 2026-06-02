import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/models.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandGradient: 'gradient-coral-amber',
  activeClass: 'active-coral',
  groups: [
    {
      title: 'Copilot CLI',
      items: [
        { id: 'copilot-byok', label: 'BYOK 概述' },
        { id: 'copilot-config', label: '环境变量配置' },
        { id: 'copilot-examples', label: '国内模型示例' },
      ],
    },
    {
      title: 'Claude Code',
      items: [
        { id: 'claude-custom', label: '自定义模型端点' },
        { id: 'claude-config', label: '环境变量配置' },
        { id: 'claude-examples', label: '国内模型示例' },
      ],
    },
    {
      title: '模型接入指南',
      items: [
        { id: 'deepseek', label: 'DeepSeek' },
        { id: 'zhipu', label: '智谱 AI (GLM)' },
        { id: 'qwen', label: '通义千问 (Qwen)' },
        { id: 'kimi', label: 'Kimi (Moonshot)' },
        { id: 'minimax', label: 'MiniMax' },
        { id: 'openrouter', label: 'OpenRouter 统一接入' },
      ],
    },
    {
      title: '实用技巧',
      items: [
        { id: 'tips', label: '最佳实践' },
        { id: 'comparison', label: '模型对比' },
      ],
    },
  ],
  backTo: { label: '返回首页', path: '/' },
}

export default function ModelsPage() {
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">接入第三方模型</h1>
        <p className="page-desc">
          将 GitHub Copilot CLI 和 Claude Code 接入 DeepSeek、智谱 AI、通义千问、Kimi、MiniMax 等国内主流大模型，享受更低成本、更好中文支持的 AI 编程体验。
        </p>
      </header>

      {/* ======== COPILOT CLI BYOK ======== */}
      <section id="copilot-byok" className="section">
        <h2><span className="icon-coral">✈️</span> GitHub Copilot CLI · BYOK</h2>
        <p>
          自 <strong>2026 年 4 月</strong>起，GitHub Copilot CLI 正式支持 <strong>BYOK（Bring Your Own Key）</strong>，
          允许你使用自己的 LLM 提供商，包括 OpenAI 兼容的 API 端点、本地模型（Ollama、vLLM），
          以及任何支持 OpenAI Chat Completions 格式的第三方服务。
        </p>

        <div className="highlight-coral">
          <p>
            💡 <strong>核心优势</strong>：无需 GitHub 账号认证即可使用自己的 API Key；
            支持离线/气隙环境（设 <code>COPILOT_OFFLINE=true</code>）；
            配置错误时有明确的错误提示，不会静默回退到 GitHub 托管的模型。
          </p>
        </div>
      </section>

      <section id="copilot-config" className="section">
        <h2><span className="icon-coral">⚙️</span> Copilot CLI 环境变量配置</h2>
        <p>配置以下环境变量即可让 Copilot CLI 使用你的自定义模型：</p>

        <div className="code-box">
          <div className="code-title">必需的环境变量</div>
          <div><span className="kw-blue">export</span> <span className="cmd">COPILOT_PROVIDER_BASE_URL</span>=<span className="string">"https://api.deepseek.com/v1"</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">COPILOT_PROVIDER_API_KEY</span>=<span className="string">"sk-your-api-key"</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">COPILOT_MODEL</span>=<span className="string">"deepseek-chat"</span></div>
          <div style={{ marginTop: '.8rem' }}><span className="comment"># 可选配置</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">COPILOT_PROVIDER_TYPE</span>=<span className="string">"openai"</span>  <span className="comment"># openai | azure | anthropic，默认 openai</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">COPILOT_OFFLINE</span>=<span className="string">"true"</span>  <span className="comment"># 完全离线模式，不连接 GitHub 服务器</span></div>
        </div>

        <div className="env-table-wrapper">
          <table className="env-table">
            <thead>
              <tr>
                <th>环境变量</th>
                <th>必填</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>COPILOT_PROVIDER_BASE_URL</code></td>
                <td>✅ 是</td>
                <td>模型提供商的 API 基础地址</td>
              </tr>
              <tr>
                <td><code>COPILOT_PROVIDER_API_KEY</code></td>
                <td>✅ 是*</td>
                <td>你的 API Key（本地模型不需要）</td>
              </tr>
              <tr>
                <td><code>COPILOT_MODEL</code></td>
                <td>✅ 是</td>
                <td>模型标识符，如 <code>deepseek-chat</code></td>
              </tr>
              <tr>
                <td><code>COPILOT_PROVIDER_TYPE</code></td>
                <td>否</td>
                <td>提供商类型：<code>openai</code> / <code>azure</code> / <code>anthropic</code></td>
              </tr>
              <tr>
                <td><code>COPILOT_OFFLINE</code></td>
                <td>否</td>
                <td>设为 <code>true</code> 启用完全离线模式</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout tip">
          <h4>💡 模型要求</h4>
          <p>你使用的模型需要支持 <strong>流式输出（streaming）</strong> 和 <strong>工具调用（tool calling）</strong>。建议使用上下文窗口至少 128K tokens 的模型以获得最佳体验。</p>
        </div>
      </section>

      <section id="copilot-examples" className="section">
        <h2><span className="icon-coral">🧪</span> Copilot CLI 国内模型配置示例</h2>

        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🐋</span>
            <h3>DeepSeek</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://api.deepseek.com/v1"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"sk-xxx"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"deepseek-chat"</span></div>
            </div>
            <p style={{ fontSize: '.85rem', marginTop: '.8rem', color: 'var(--text-secondary)' }}>
              支持 OpenAI 兼容格式，性价比极高。也可使用 <code>deepseek-reasoner</code>（R1 推理模型）。
            </p>
            <span className="skill-tag">OpenAI 兼容</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🧠</span>
            <h3>智谱 AI (GLM)</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://open.bigmodel.cn/api/paas/v4"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"xxx"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"glm-4-plus"</span></div>
            </div>
            <p style={{ fontSize: '.85rem', marginTop: '.8rem', color: 'var(--text-secondary)' }}>
              OpenAI 兼容格式，中文能力出色。推荐使用 <code>glm-4-plus</code> 或 <code>glm-4-flash</code>。
            </p>
            <span className="skill-tag">OpenAI 兼容</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">☁️</span>
            <h3>通义千问 (Qwen)</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://dashscope.aliyuncs.com/compatible-mode/v1"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"sk-xxx"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"qwen-plus"</span></div>
            </div>
            <p style={{ fontSize: '.85rem', marginTop: '.8rem', color: 'var(--text-secondary)' }}>
              阿里云 DashScope 提供 <strong>兼容模式端点</strong>。可选 <code>qwen-turbo</code> / <code>qwen-plus</code> / <code>qwen-max</code>。
            </p>
            <span className="skill-tag">OpenAI 兼容</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🚀</span>
            <h3>Kimi (Moonshot)</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://api.moonshot.cn/v1"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"sk-xxx"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"moonshot-v1-8k"</span></div>
            </div>
            <p style={{ fontSize: '.85rem', marginTop: '.8rem', color: 'var(--text-secondary)' }}>
              OpenAI 兼容格式，超长上下文。可用 <code>moonshot-v1-8k</code> / <code>moonshot-v1-32k</code> / <code>moonshot-v1-128k</code>。
            </p>
            <span className="skill-tag">OpenAI 兼容</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">✨</span>
            <h3>MiniMax</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://api.minimax.chat/v1"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"xxx"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"abab6.5s-chat"</span></div>
            </div>
            <p style={{ fontSize: '.85rem', marginTop: '.8rem', color: 'var(--text-secondary)' }}>
              MiniMax ABAB 系列模型。推荐 <code>abab6.5s-chat</code>，响应速度快。
            </p>
            <span className="skill-tag">OpenAI 兼容</span>
          </div>
        </div>
      </section>

      {/* ======== CLAUDE CODE ======== */}
      <section id="claude-custom" className="section">
        <h2><span className="icon-coral">🧠</span> Claude Code · 自定义模型端点</h2>
        <p>
          Claude Code 通过 <strong>ANTHROPIC_BASE_URL</strong> 环境变量支持自定义 API 端点。
          你可以将请求指向任何兼容 Anthropic API 格式的第三方服务，或通过代理服务（如 OpenRouter）来使用其他模型。
        </p>

        <div className="highlight-coral">
          <p>
            💡 <strong>原理</strong>：设置 <code>ANTHROPIC_BASE_URL</code> 后，Claude Code 的所有 API 请求都会发送到你指定的端点。配合兼容 Anthropic API 格式的代理（如 OpenRouter、LiteLLM），你可以使用几乎任何主流模型。
          </p>
        </div>
      </section>

      <section id="claude-config" className="section">
        <h2><span className="icon-coral">⚙️</span> Claude Code 环境变量配置</h2>

        <div className="code-box">
          <div className="code-title">核心环境变量</div>
          <div><span className="kw-blue">export</span> <span className="cmd">ANTHROPIC_BASE_URL</span>=<span className="string">"https://openrouter.ai/api"</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">ANTHROPIC_API_KEY</span>=<span className="string">"sk-or-v1-xxx"</span></div>
          <div style={{ marginTop: '.8rem' }}><span className="comment"># 或者使用 LiteLLM 代理</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">ANTHROPIC_BASE_URL</span>=<span className="string">"http://localhost:4000"</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">ANTHROPIC_API_KEY</span>=<span className="string">"sk-litellm-key"</span></div>
        </div>

        <div className="env-table-wrapper">
          <table className="env-table">
            <thead>
              <tr>
                <th>环境变量</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>ANTHROPIC_BASE_URL</code></td>
                <td>自定义 API 端点地址</td>
              </tr>
              <tr>
                <td><code>ANTHROPIC_API_KEY</code></td>
                <td>你的 API Key</td>
              </tr>
              <tr>
                <td><code>ANTHROPIC_MODEL</code></td>
                <td>（可选）指定使用的模型名称</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout warn">
          <h4>⚠️ 注意事项</h4>
          <p>并非所有第三方端点都完整支持 Claude 的全部功能（如 extended thinking、tool use 等）。建议在正式使用前充分测试。使用 LiteLLM 或 OpenRouter 等成熟代理方案可以最大化兼容性。</p>
        </div>
      </section>

      <section id="claude-examples" className="section">
        <h2><span className="icon-coral">🧪</span> Claude Code 国内模型配置示例</h2>
        <p>通过 OpenRouter 或 LiteLLM 代理，Claude Code 可以无缝接入国内模型：</p>

        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🐋</span>
            <h3>DeepSeek via OpenRouter</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> ANTHROPIC_BASE_URL=<span className="string">"https://openrouter.ai/api"</span></div>
              <div><span className="kw-blue">export</span> ANTHROPIC_API_KEY=<span className="string">"sk-or-v1-xxx"</span></div>
              <div><span className="kw-blue">export</span> ANTHROPIC_MODEL=<span className="string">"deepseek/deepseek-chat"</span></div>
            </div>
            <span className="skill-tag">OpenRouter</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🧠</span>
            <h3>智谱 GLM via OpenRouter</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> ANTHROPIC_BASE_URL=<span className="string">"https://openrouter.ai/api"</span></div>
              <div><span className="kw-blue">export</span> ANTHROPIC_API_KEY=<span className="string">"sk-or-v1-xxx"</span></div>
              <div><span className="kw-blue">export</span> ANTHROPIC_MODEL=<span className="string">"zhipuai/glm-4-plus"</span></div>
            </div>
            <span className="skill-tag">OpenRouter</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">☁️</span>
            <h3>Qwen via OpenRouter</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> ANTHROPIC_BASE_URL=<span className="string">"https://openrouter.ai/api"</span></div>
              <div><span className="kw-blue">export</span> ANTHROPIC_API_KEY=<span className="string">"sk-or-v1-xxx"</span></div>
              <div><span className="kw-blue">export</span> ANTHROPIC_MODEL=<span className="string">"qwen/qwen-plus"</span></div>
            </div>
            <span className="skill-tag">OpenRouter</span>
          </div>
        </div>

        <div className="highlight-coral" style={{ marginTop: '2rem' }}>
          <p>
            🔧 <strong>自建 LiteLLM 代理方案</strong>：如果你的团队需要更灵活的控制，可以使用 LiteLLM 搭建本地代理，统一管理多个模型提供商的 API Key，并提供统一的 OpenAI / Anthropic 兼容端点。详见 <a href="https://docs.litellm.ai" target="_blank" rel="noreferrer">LiteLLM 文档</a>。
          </p>
        </div>
      </section>

      {/* ======== 模型接入指南 ======== */}
      <section id="deepseek" className="section">
        <h2><span className="icon-coral">🐋</span> DeepSeek</h2>
        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">🐋</div>
            <div>
              <h3>DeepSeek</h3>
              <div className="agent-tags">
                <span className="tag">OpenAI 兼容</span>
                <span className="tag">极高性价比</span>
                <span className="tag">中文优化</span>
                <span className="tag">开源模型</span>
              </div>
            </div>
          </div>

          <div className="env-table-wrapper">
            <table className="env-table">
              <tbody>
                <tr><td>API 地址</td><td><code>https://api.deepseek.com/v1</code></td></tr>
                <tr><td>获取 Key</td><td><a href="https://platform.deepseek.com" target="_blank" rel="noreferrer">platform.deepseek.com</a></td></tr>
                <tr><td>推荐模型</td><td><code>deepseek-chat</code>（通用）/ <code>deepseek-reasoner</code>（R1 推理）</td></tr>
                <tr><td>定价</td><td>¥1/百万输入 tokens，¥2/百万输出 tokens（极具竞争力）</td></tr>
                <tr><td>兼容格式</td><td>OpenAI Chat Completions API</td></tr>
              </tbody>
            </table>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>✅ Copilot CLI 直连</h4>
              <p>完全兼容 OpenAI API 格式，设置 <code>COPILOT_PROVIDER_BASE_URL</code> 即可。</p>
            </div>
            <div className="feature-item">
              <h4>✅ Claude Code 通过代理</h4>
              <p>通过 OpenRouter 或 LiteLLM 代理接入。</p>
            </div>
            <div className="feature-item">
              <h4>💡 推荐场景</h4>
              <p>日常编程辅助、代码生成、中文文档编写。性价比极高，适合个人开发者。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="zhipu" className="section">
        <h2><span className="icon-coral">🧠</span> 智谱 AI (GLM)</h2>
        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">🧠</div>
            <div>
              <h3>智谱 AI · ChatGLM</h3>
              <div className="agent-tags">
                <span className="tag">OpenAI 兼容</span>
                <span className="tag">中文领先</span>
                <span className="tag">多模态</span>
                <span className="tag">国产自研</span>
              </div>
            </div>
          </div>

          <div className="env-table-wrapper">
            <table className="env-table">
              <tbody>
                <tr><td>API 地址</td><td><code>https://open.bigmodel.cn/api/paas/v4</code></td></tr>
                <tr><td>获取 Key</td><td><a href="https://open.bigmodel.cn" target="_blank" rel="noreferrer">open.bigmodel.cn</a></td></tr>
                <tr><td>推荐模型</td><td><code>glm-4-plus</code> / <code>glm-4-flash</code>（快速版）</td></tr>
                <tr><td>定价</td><td>新用户有免费额度，付费按量计费</td></tr>
                <tr><td>兼容格式</td><td>OpenAI Chat Completions API</td></tr>
              </tbody>
            </table>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>✅ Copilot CLI 直连</h4>
              <p>OpenAI 兼容格式，直接设置环境变量即可使用。</p>
            </div>
            <div className="feature-item">
              <h4>💡 推荐场景</h4>
              <p>中文理解和生成能力出色，适合中文项目开发、文档生成。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="qwen" className="section">
        <h2><span className="icon-coral">☁️</span> 通义千问 (Qwen)</h2>
        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">☁️</div>
            <div>
              <h3>阿里云 · 通义千问</h3>
              <div className="agent-tags">
                <span className="tag">兼容模式</span>
                <span className="tag">阿里云生态</span>
                <span className="tag">多尺寸</span>
                <span className="tag">开源家族</span>
              </div>
            </div>
          </div>

          <div className="env-table-wrapper">
            <table className="env-table">
              <tbody>
                <tr><td>API 地址</td><td><code>https://dashscope.aliyuncs.com/compatible-mode/v1</code>（兼容模式）</td></tr>
                <tr><td>获取 Key</td><td><a href="https://dashscope.console.aliyun.com" target="_blank" rel="noreferrer">dashscope.console.aliyun.com</a></td></tr>
                <tr><td>推荐模型</td><td><code>qwen-plus</code> / <code>qwen-turbo</code> / <code>qwen-max</code></td></tr>
                <tr><td>定价</td><td>按量计费，价格透明</td></tr>
                <tr><td>兼容格式</td><td>OpenAI 兼容模式（DashScope Compatible Mode）</td></tr>
              </tbody>
            </table>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>✅ Copilot CLI 直连</h4>
              <p>使用 DashScope <strong>兼容模式端点</strong>（<code>/compatible-mode/v1</code>）即可直接接入。</p>
            </div>
            <div className="feature-item">
              <h4>💡 推荐场景</h4>
              <p>阿里云用户首选，生态整合好。开源模型可本地部署，数据安全有保障。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="kimi" className="section">
        <h2><span className="icon-coral">🚀</span> Kimi (Moonshot)</h2>
        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">🚀</div>
            <div>
              <h3>Moonshot AI · Kimi</h3>
              <div className="agent-tags">
                <span className="tag">OpenAI 兼容</span>
                <span className="tag">超长上下文</span>
                <span className="tag">128K tokens</span>
              </div>
            </div>
          </div>

          <div className="env-table-wrapper">
            <table className="env-table">
              <tbody>
                <tr><td>API 地址</td><td><code>https://api.moonshot.cn/v1</code></td></tr>
                <tr><td>获取 Key</td><td><a href="https://platform.moonshot.cn" target="_blank" rel="noreferrer">platform.moonshot.cn</a></td></tr>
                <tr><td>推荐模型</td><td><code>moonshot-v1-8k</code> / <code>moonshot-v1-32k</code> / <code>moonshot-v1-128k</code></td></tr>
                <tr><td>定价</td><td>按 tokens 计费</td></tr>
                <tr><td>兼容格式</td><td>OpenAI Chat Completions API</td></tr>
              </tbody>
            </table>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>✅ Copilot CLI 直连</h4>
              <p>完全兼容 OpenAI API 格式，直接设置环境变量即可使用。</p>
            </div>
            <div className="feature-item">
              <h4>💡 推荐场景</h4>
              <p>超长上下文（128K）适合处理大型代码库、长文档。输入大量代码时优势明显。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="minimax" className="section">
        <h2><span className="icon-coral">✨</span> MiniMax</h2>
        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">✨</div>
            <div>
              <h3>MiniMax · ABAB 系列</h3>
              <div className="agent-tags">
                <span className="tag">OpenAI 兼容</span>
                <span className="tag">响应快速</span>
                <span className="tag">多模态</span>
              </div>
            </div>
          </div>

          <div className="env-table-wrapper">
            <table className="env-table">
              <tbody>
                <tr><td>API 地址</td><td><code>https://api.minimax.chat/v1</code></td></tr>
                <tr><td>获取 Key</td><td><a href="https://platform.minimax.chat" target="_blank" rel="noreferrer">platform.minimax.chat</a></td></tr>
                <tr><td>推荐模型</td><td><code>abab6.5s-chat</code></td></tr>
                <tr><td>定价</td><td>按 tokens 计费</td></tr>
                <tr><td>兼容格式</td><td>OpenAI Chat Completions API</td></tr>
              </tbody>
            </table>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>✅ Copilot CLI 直连</h4>
              <p>OpenAI 兼容格式，直接设置环境变量即可使用。</p>
            </div>
            <div className="feature-item">
              <h4>💡 推荐场景</h4>
              <p>响应速度快，适合对延迟敏感的场景。ABAB 系列模型在中文对话方面表现优异。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="openrouter" className="section">
        <h2><span className="icon-coral">🔀</span> OpenRouter · 统一接入方案</h2>
        <p>
          <strong>OpenRouter</strong> 是一个 AI 模型聚合平台，提供统一的 OpenAI 兼容 API，
          让你用一个 API Key 就能访问 DeepSeek、Qwen、GLM、Claude、GPT 等 <strong>200+ 模型</strong>。
          这是最便捷的多模型接入方案，特别适合 Claude Code。
        </p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">🔀</div>
            <div>
              <h3>OpenRouter</h3>
              <div className="agent-tags">
                <span className="tag">统一 API</span>
                <span className="tag">200+ 模型</span>
                <span className="tag">按量付费</span>
                <span className="tag">无需多方注册</span>
              </div>
            </div>
          </div>

          <div className="code-box">
            <div className="code-title">Copilot CLI 配置</div>
            <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://openrouter.ai/api/v1"</span></div>
            <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"sk-or-v1-xxx"</span></div>
            <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"deepseek/deepseek-chat"</span></div>
            <div style={{ marginTop: '.8rem' }}><span className="comment"># Claude Code 同理，设置 ANTHROPIC_BASE_URL</span></div>
            <div><span className="kw-blue">export</span> ANTHROPIC_BASE_URL=<span className="string">"https://openrouter.ai/api"</span></div>
            <div><span className="kw-blue">export</span> ANTHROPIC_API_KEY=<span className="string">"sk-or-v1-xxx"</span></div>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>🔑 一个 Key 搞定所有</h4>
              <p>注册 <a href="https://openrouter.ai" target="_blank" rel="noreferrer">openrouter.ai</a>，一个 API Key 解锁 200+ 模型。</p>
            </div>
            <div className="feature-item">
              <h4>💰 按量付费</h4>
              <p>用多少付多少，没有月费，价格透明。</p>
            </div>
            <div className="feature-item">
              <h4>🔀 自动故障转移</h4>
              <p>一个模型不可用时自动切换到备选模型。</p>
            </div>
            <div className="feature-item">
              <h4>📊 用量监控</h4>
              <p>在 OpenRouter 控制台查看每个模型的调用量和费用。</p>
            </div>
          </div>

          <div className="env-table-wrapper" style={{ marginTop: '1.5rem' }}>
            <table className="env-table">
              <thead>
                <tr><th>国内模型</th><th>OpenRouter 模型 ID</th></tr>
              </thead>
              <tbody>
                <tr><td>DeepSeek V3</td><td><code>deepseek/deepseek-chat</code></td></tr>
                <tr><td>DeepSeek R1</td><td><code>deepseek/deepseek-r1</code></td></tr>
                <tr><td>智谱 GLM-4</td><td><code>zhipuai/glm-4-plus</code></td></tr>
                <tr><td>通义千问</td><td><code>qwen/qwen-plus</code></td></tr>
                <tr><td>Kimi</td><td><code>moonshotai/moonshot-v1-8k</code></td></tr>
                <tr><td>MiniMax</td><td><code>minimax/minimax-01</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ======== 实用技巧 ======== */}
      <section id="tips" className="section">
        <h2><span className="icon-coral">💡</span> 最佳实践</h2>

        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🔧</span>
            <h3>使用 alias 快速切换</h3>
            <p>在 <code>~/.zshrc</code> 中配置 alias，方便在不同模型间切换：</p>
            <div className="code-box" style={{ fontSize: '.75rem', marginTop: '.8rem' }}>
              <div><span className="comment"># 快速切换模型</span></div>
              <div><span className="kw-blue">alias</span> copilot-ds=<span className="string">"COPILOT_MODEL=deepseek-chat COPILOT_PROVIDER_BASE_URL=https://api.deepseek.com/v1 copilot"</span></div>
              <div><span className="kw-blue">alias</span> copilot-qw=<span className="string">"COPILOT_MODEL=qwen-plus COPILOT_PROVIDER_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1 copilot"</span></div>
            </div>
            <span className="skill-tag">效率技巧</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">📁</span>
            <h3>使用 .env 文件管理</h3>
            <p>在项目根目录创建 <code>.env</code> 文件集中管理 API Key，配合 <code>direnv</code> 或手动 <code>source</code> 加载。不同项目可以使用不同的模型配置。</p>
            <div className="code-box" style={{ fontSize: '.75rem', marginTop: '.8rem' }}>
              <div><span className="comment"># .env.copilot</span></div>
              <div>COPILOT_PROVIDER_BASE_URL=https://api.deepseek.com/v1</div>
              <div>COPILOT_PROVIDER_API_KEY=sk-xxx</div>
              <div>COPILOT_MODEL=deepseek-chat</div>
            </div>
            <span className="skill-tag">最佳实践</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🔄</span>
            <h3>按任务选择模型</h3>
            <p><strong>简单任务</strong>（语法修正、格式化）：用便宜的快速模型（DeepSeek Chat / Qwen Turbo）</p>
            <p style={{ marginTop: '.5rem' }}><strong>复杂任务</strong>（架构设计、大型重构）：用推理能力强的模型（DeepSeek R1 / Qwen Max）</p>
            <span className="skill-tag">省钱技巧</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🛡️</span>
            <h3>安全注意事项</h3>
            <p>❌ 不要把 API Key 硬编码在代码中<br />
              ❌ 不要把 <code>.env</code> 提交到 Git<br />
              ✅ 使用 <code>.gitignore</code> 排除敏感文件<br />
              ✅ 利用各平台的角色权限管理限制 Key 的访问范围</p>
            <span className="skill-tag">安全第一</span>
          </div>
        </div>
      </section>

      <section id="comparison" className="section">
        <h2><span className="icon-coral">📊</span> 国内模型对比</h2>

        <div className="env-table-wrapper">
          <table className="env-table">
            <thead>
              <tr>
                <th>模型</th>
                <th>提供商</th>
                <th>API 兼容</th>
                <th>上下文</th>
                <th>价格优势</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>DeepSeek V3</strong></td>
                <td>DeepSeek</td>
                <td>✅ OpenAI</td>
                <td>128K</td>
                <td>⭐⭐⭐⭐⭐</td>
                <td>性价比首选，通用编程</td>
              </tr>
              <tr>
                <td><strong>DeepSeek R1</strong></td>
                <td>DeepSeek</td>
                <td>✅ OpenAI</td>
                <td>128K</td>
                <td>⭐⭐⭐⭐</td>
                <td>复杂推理、架构设计</td>
              </tr>
              <tr>
                <td><strong>GLM-4 Plus</strong></td>
                <td>智谱 AI</td>
                <td>✅ OpenAI</td>
                <td>128K</td>
                <td>⭐⭐⭐</td>
                <td>中文理解、多模态</td>
              </tr>
              <tr>
                <td><strong>Qwen Plus</strong></td>
                <td>阿里云</td>
                <td>✅ 兼容模式</td>
                <td>131K</td>
                <td>⭐⭐⭐⭐</td>
                <td>中文生态、阿里云集成</td>
              </tr>
              <tr>
                <td><strong>Kimi (128K)</strong></td>
                <td>Moonshot</td>
                <td>✅ OpenAI</td>
                <td>128K</td>
                <td>⭐⭐⭐</td>
                <td>超长上下文、大型代码库</td>
              </tr>
              <tr>
                <td><strong>MiniMax ABAB</strong></td>
                <td>MiniMax</td>
                <td>✅ OpenAI</td>
                <td>8K-128K</td>
                <td>⭐⭐⭐</td>
                <td>快速响应、对话场景</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  )
}
