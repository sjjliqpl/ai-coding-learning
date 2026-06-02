import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import { useLang } from '../i18n/LanguageContext'
import '../styles/models.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandGradient: 'gradient-coral-amber',
  activeClass: 'active-coral',
  groups: [
    {
      title: 'Copilot CLI',
      items: [
        { id: 'copilot-byok', label: 'BYOK 概述', labelEn: 'BYOK Overview' },
        { id: 'copilot-config', label: '环境变量配置', labelEn: 'Env Config' },
        { id: 'copilot-examples', label: '国内模型示例', labelEn: 'Model Examples' },
      ],
    },
    {
      title: 'Claude Code',
      items: [
        { id: 'claude-custom', label: '自定义模型端点', labelEn: 'Custom Endpoint' },
        { id: 'claude-config', label: '环境变量配置', labelEn: 'Env Config' },
        { id: 'claude-examples', label: '国内模型示例', labelEn: 'Model Examples' },
      ],
    },
    {
      title: '模型接入指南',
      titleEn: 'Provider Guides',
      items: [
        { id: 'deepseek', label: 'DeepSeek' },
        { id: 'zhipu', label: '智谱 AI (GLM)', labelEn: 'Zhipu AI (GLM)' },
        { id: 'qwen', label: '通义千问 (Qwen)', labelEn: 'Qwen' },
        { id: 'kimi', label: 'Kimi (Moonshot)' },
        { id: 'minimax', label: 'MiniMax' },
        { id: 'openrouter', label: 'OpenRouter 统一接入', labelEn: 'OpenRouter' },
      ],
    },
    {
      title: '实用技巧',
      titleEn: 'Tips',
      items: [
        { id: 'tips', label: '最佳实践', labelEn: 'Best Practices' },
        { id: 'comparison', label: '模型对比', labelEn: 'Comparison' },
      ],
    },
  ],
  backTo: { label: '返回首页', labelEn: 'Back to Home', path: '/' },
}

export default function ModelsPage() {
  const { t } = useLang()

  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">{t('接入第三方模型', 'Third-Party Model Integration')}</h1>
        <p className="page-desc">
          {t(
            '将 GitHub Copilot CLI 和 Claude Code 接入 DeepSeek、智谱 AI、通义千问、Kimi、MiniMax 等国内主流大模型，享受更低成本、更好中文支持的 AI 编程体验。',
            'Connect GitHub Copilot CLI and Claude Code to DeepSeek, Zhipu AI, Qwen, Kimi, MiniMax, and other leading Chinese LLMs for lower costs and better AI coding experience.'
          )}
        </p>
      </header>

      {/* ======== COPILOT CLI BYOK ======== */}
      <section id="copilot-byok" className="section">
        <h2><span className="icon-coral">✈️</span> {t('GitHub Copilot CLI · BYOK', 'GitHub Copilot CLI · BYOK')}</h2>
        <p>
          {t(
            '自 <strong>2026 年 4 月</strong>起，GitHub Copilot CLI 正式支持 <strong>BYOK（Bring Your Own Key）</strong>，允许你使用自己的 LLM 提供商，包括 OpenAI 兼容的 API 端点、本地模型（Ollama、vLLM），以及任何支持 OpenAI Chat Completions 格式的第三方服务。',
            'Since <strong>April 2026</strong>, GitHub Copilot CLI officially supports <strong>BYOK (Bring Your Own Key)</strong>, allowing you to use your own LLM provider, including OpenAI-compatible API endpoints, local models (Ollama, vLLM), and any third-party service supporting the OpenAI Chat Completions format.'
          )}
        </p>

        <div className="highlight-coral">
          <p>
            💡 <strong>{t('核心优势', 'Key Advantage')}</strong>：{t(
              '无需 GitHub 账号认证即可使用自己的 API Key；支持离线/气隙环境（设 <code>COPILOT_OFFLINE=true</code>）；配置错误时有明确的错误提示，不会静默回退到 GitHub 托管的模型。',
              'No GitHub account authentication required to use your own API Key; supports offline/air-gapped environments (set <code>COPILOT_OFFLINE=true</code>); clear error messages on misconfiguration without silently falling back to GitHub-hosted models.'
            )}
          </p>
        </div>
      </section>

      <section id="copilot-config" className="section">
        <h2><span className="icon-coral">⚙️</span> {t('Copilot CLI 环境变量配置', 'Copilot CLI Environment Variables')}</h2>
        <p>{t('配置以下环境变量即可让 Copilot CLI 使用你的自定义模型：', 'Configure the following environment variables to let Copilot CLI use your custom model:')}</p>

        <div className="code-box">
          <div className="code-title">{t('必需的环境变量', 'Required Environment Variables')}</div>
          <div><span className="kw-blue">export</span> <span className="cmd">COPILOT_PROVIDER_BASE_URL</span>=<span className="string">"https://api.deepseek.com/v1"</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">COPILOT_PROVIDER_API_KEY</span>=<span className="string">"sk-your-api-key"</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">COPILOT_MODEL</span>=<span className="string">"deepseek-chat"</span></div>
          <div style={{ marginTop: '.8rem' }}><span className="comment">{t('# 可选配置', '# Optional config')}</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">COPILOT_PROVIDER_TYPE</span>=<span className="string">"openai"</span>  <span className="comment">{t('# openai | azure | anthropic，默认 openai', '# openai | azure | anthropic, default: openai')}</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">COPILOT_OFFLINE</span>=<span className="string">"true"</span>  <span className="comment">{t('# 完全离线模式，不连接 GitHub 服务器', '# Complete offline mode, no connection to GitHub servers')}</span></div>
        </div>

        <div className="env-table-wrapper">
          <table className="env-table">
            <thead>
              <tr>
                <th>{t('环境变量', 'Variable')}</th>
                <th>{t('必填', 'Required')}</th>
                <th>{t('说明', 'Description')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>COPILOT_PROVIDER_BASE_URL</code></td>
                <td>✅ {t('是', 'Yes')}</td>
                <td>{t('模型提供商的 API 基础地址', 'API base URL of the model provider')}</td>
              </tr>
              <tr>
                <td><code>COPILOT_PROVIDER_API_KEY</code></td>
                <td>✅ {t('是*', 'Yes*')}</td>
                <td>{t('你的 API Key（本地模型不需要）', 'Your API key (not needed for local models)')}</td>
              </tr>
              <tr>
                <td><code>COPILOT_MODEL</code></td>
                <td>✅ {t('是', 'Yes')}</td>
                <td>{t('模型标识符，如', 'Model identifier, e.g.')} <code>deepseek-chat</code></td>
              </tr>
              <tr>
                <td><code>COPILOT_PROVIDER_TYPE</code></td>
                <td>{t('否', 'No')}</td>
                <td>{t('提供商类型：', 'Provider type: ')}<code>openai</code> / <code>azure</code> / <code>anthropic</code></td>
              </tr>
              <tr>
                <td><code>COPILOT_OFFLINE</code></td>
                <td>{t('否', 'No')}</td>
                <td>{t('设为', 'Set to')} <code>true</code> {t('启用完全离线模式', 'to enable complete offline mode')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout tip">
          <h4>💡 {t('模型要求', 'Model Requirements')}</h4>
          <p>{t('你使用的模型需要支持 <strong>流式输出（streaming）</strong> 和 <strong>工具调用（tool calling）</strong>。建议使用上下文窗口至少 128K tokens 的模型以获得最佳体验。', 'Your model must support <strong>streaming</strong> and <strong>tool calling</strong>. A context window of at least 128K tokens is recommended for the best experience.')}</p>
        </div>
      </section>

      <section id="copilot-examples" className="section">
        <h2><span className="icon-coral">🧪</span> {t('Copilot CLI 国内模型配置示例', 'Copilot CLI Chinese Model Examples')}</h2>

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
              {t('支持 OpenAI 兼容格式，性价比极高。最新旗舰模型为', 'OpenAI compatible format, great value. Latest flagship:')} <code>deepseek-v4</code>{t('，也推荐', ', also recommended:')} <code>deepseek-chat</code> {t('（V3）和', ' (V3) and ')} <code>deepseek-reasoner</code>{t('（R1 推理模型）。', ' (R1 reasoning model).')}
            </p>
            <span className="skill-tag">{t('OpenAI 兼容', 'OpenAI Compatible')}</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🧠</span>
            <h3>智谱 AI (GLM)</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://open.bigmodel.cn/api/paas/v4"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"xxx"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"glm-5"</span></div>
            </div>
            <p style={{ fontSize: '.85rem', marginTop: '.8rem', color: 'var(--text-secondary)' }}>
              {t('OpenAI 兼容格式，中文能力出色。最新旗舰', 'OpenAI compatible format, excellent Chinese capability. Latest flagship:')} <code>glm-5</code>{t('（744B 参数 MoE），也推荐', ' (744B MoE), also recommended:')} <code>glm-4-plus</code>。
            </p>
            <span className="skill-tag">{t('OpenAI 兼容', 'OpenAI Compatible')}</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">☁️</span>
            <h3>通义千问 (Qwen)</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://dashscope.aliyuncs.com/compatible-mode/v1"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"sk-xxx"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"qwen3.7-max"</span></div>
            </div>
            <p style={{ fontSize: '.85rem', marginTop: '.8rem', color: 'var(--text-secondary)' }}>
              {t('阿里云 DashScope 提供 <strong>兼容模式端点</strong>。最新旗舰', 'Alibaba Cloud DashScope provides <strong>compatible mode endpoint</strong>. Latest flagship:')} <code>qwen3.7-max</code>{t('（1M 上下文），可选', ' (1M context), options:')} <code>qwen-plus</code> / <code>qwen-max</code>。
            </p>
            <span className="skill-tag">{t('OpenAI 兼容', 'OpenAI Compatible')}</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🚀</span>
            <h3>Kimi (Moonshot)</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://api.moonshot.cn/v1"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"sk-xxx"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"kimi-k2.6"</span></div>
            </div>
            <p style={{ fontSize: '.85rem', marginTop: '.8rem', color: 'var(--text-secondary)' }}>
              {t('OpenAI 兼容格式，超长上下文。最新旗舰', 'OpenAI compatible format, ultra-long context. Latest flagship:')} <code>kimi-k2.6</code>{t('（1T MoE，256K 上下文，Agent Swarm），也支持', ' (1T MoE, 256K context, Agent Swarm), also supports:')} <code>moonshot-v1-128k</code>。
            </p>
            <span className="skill-tag">{t('OpenAI 兼容', 'OpenAI Compatible')}</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">✨</span>
            <h3>MiniMax</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://api.minimax.chat/v1"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"xxx"</span></div>
              <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"minimax-m3"</span></div>
            </div>
            <p style={{ fontSize: '.85rem', marginTop: '.8rem', color: 'var(--text-secondary)' }}>
              {t('MiniMax 最新旗舰 M3 模型（1M 上下文，多模态）。推荐', 'MiniMax latest flagship M3 model (1M context, multimodal). Recommended:')} <code>minimax-m3</code>{t('，也支持', ', also supports:')} <code>abab6.5s-chat</code>。
            </p>
            <span className="skill-tag">{t('OpenAI 兼容', 'OpenAI Compatible')}</span>
          </div>
        </div>
      </section>

      {/* ======== CLAUDE CODE ======== */}
      <section id="claude-custom" className="section">
        <h2><span className="icon-coral">🧠</span> {t('Claude Code · 自定义模型端点', 'Claude Code · Custom Model Endpoint')}</h2>
        <p>
          {t(
            'Claude Code 通过 <strong>ANTHROPIC_BASE_URL</strong> 环境变量支持自定义 API 端点。你可以将请求指向任何兼容 Anthropic API 格式的第三方服务，或通过代理服务（如 OpenRouter）来使用其他模型。',
            'Claude Code supports custom API endpoints via the <strong>ANTHROPIC_BASE_URL</strong> environment variable. You can direct requests to any third-party service compatible with the Anthropic API format, or use proxy services (such as OpenRouter) to access other models.'
          )}
        </p>

        <div className="highlight-coral">
          <p>
            💡 <strong>{t('原理', 'How It Works')}</strong>：{t(
              '设置 <code>ANTHROPIC_BASE_URL</code> 后，Claude Code 的所有 API 请求都会发送到你指定的端点。配合兼容 Anthropic API 格式的代理（如 OpenRouter、LiteLLM），你可以使用几乎任何主流模型。',
              'After setting <code>ANTHROPIC_BASE_URL</code>, all Claude Code API requests are sent to your specified endpoint. With proxies compatible with the Anthropic API format (such as OpenRouter, LiteLLM), you can use almost any mainstream model.'
            )}
          </p>
        </div>
      </section>

      <section id="claude-config" className="section">
        <h2><span className="icon-coral">⚙️</span> {t('Claude Code 环境变量配置', 'Claude Code Environment Variables')}</h2>

        <div className="code-box">
          <div className="code-title">{t('核心环境变量', 'Core Environment Variables')}</div>
          <div><span className="kw-blue">export</span> <span className="cmd">ANTHROPIC_BASE_URL</span>=<span className="string">"https://openrouter.ai/api"</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">ANTHROPIC_API_KEY</span>=<span className="string">"sk-or-v1-xxx"</span></div>
          <div style={{ marginTop: '.8rem' }}><span className="comment">{t('# 或者使用 LiteLLM 代理', '# Or use LiteLLM proxy')}</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">ANTHROPIC_BASE_URL</span>=<span className="string">"http://localhost:4000"</span></div>
          <div><span className="kw-blue">export</span> <span className="cmd">ANTHROPIC_API_KEY</span>=<span className="string">"sk-litellm-key"</span></div>
        </div>

        <div className="env-table-wrapper">
          <table className="env-table">
            <thead>
              <tr>
                <th>{t('环境变量', 'Variable')}</th>
                <th>{t('说明', 'Description')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>ANTHROPIC_BASE_URL</code></td>
                <td>{t('自定义 API 端点地址', 'Custom API endpoint address')}</td>
              </tr>
              <tr>
                <td><code>ANTHROPIC_API_KEY</code></td>
                <td>{t('你的 API Key', 'Your API Key')}</td>
              </tr>
              <tr>
                <td><code>ANTHROPIC_MODEL</code></td>
                <td>{t('（可选）指定使用的模型名称', '(Optional) Specify model name')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout warn">
          <h4>⚠️ {t('注意事项', 'Important Notes')}</h4>
          <p>{t('并非所有第三方端点都完整支持 Claude 的全部功能（如 extended thinking、tool use 等）。建议在正式使用前充分测试。使用 LiteLLM 或 OpenRouter 等成熟代理方案可以最大化兼容性。', 'Not all third-party endpoints fully support all Claude features (such as extended thinking, tool use, etc.). Thorough testing is recommended before production use. Using mature proxy solutions like LiteLLM or OpenRouter maximizes compatibility.')}</p>
        </div>
      </section>

      <section id="claude-examples" className="section">
        <h2><span className="icon-coral">🧪</span> {t('Claude Code 国内模型配置示例', 'Claude Code Chinese Model Examples')}</h2>
        <p>{t('通过 OpenRouter 或 LiteLLM 代理，Claude Code 可以无缝接入国内模型：', 'Through OpenRouter or LiteLLM proxy, Claude Code can seamlessly connect to Chinese models:')}</p>

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
            <h3>GLM-5 via OpenRouter</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> ANTHROPIC_BASE_URL=<span className="string">"https://openrouter.ai/api"</span></div>
              <div><span className="kw-blue">export</span> ANTHROPIC_API_KEY=<span className="string">"sk-or-v1-xxx"</span></div>
              <div><span className="kw-blue">export</span> ANTHROPIC_MODEL=<span className="string">"zhipuai/glm-5"</span></div>
            </div>
            <span className="skill-tag">OpenRouter</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">☁️</span>
            <h3>Qwen via OpenRouter</h3>
            <div className="code-box" style={{ fontSize: '.78rem' }}>
              <div><span className="kw-blue">export</span> ANTHROPIC_BASE_URL=<span className="string">"https://openrouter.ai/api"</span></div>
              <div><span className="kw-blue">export</span> ANTHROPIC_API_KEY=<span className="string">"sk-or-v1-xxx"</span></div>
              <div><span className="kw-blue">export</span> ANTHROPIC_MODEL=<span className="string">"qwen/qwen3.7-max"</span></div>
            </div>
            <span className="skill-tag">OpenRouter</span>
          </div>
        </div>

        <div className="highlight-coral" style={{ marginTop: '2rem' }}>
          <p>
            🔧 <strong>{t('自建 LiteLLM 代理方案', 'Self-Hosted LiteLLM Proxy')}</strong>：{t('如果你的团队需要更灵活的控制，可以使用 LiteLLM 搭建本地代理，统一管理多个模型提供商的 API Key，并提供统一的 OpenAI / Anthropic 兼容端点。详见', 'If your team needs more flexible control, use LiteLLM to build a local proxy, centrally manage API keys from multiple model providers, and offer a unified OpenAI / Anthropic compatible endpoint. See')} <a href="https://docs.litellm.ai" target="_blank" rel="noreferrer">{t('LiteLLM 文档', 'LiteLLM Docs')}</a>。
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
                <span className="tag">{t('OpenAI 兼容', 'OpenAI Compatible')}</span>
                <span className="tag">{t('极高性价比', 'Great Value')}</span>
                <span className="tag">{t('中文优化', 'Chinese Optimized')}</span>
                <span className="tag">{t('开源模型', 'Open Source')}</span>
              </div>
            </div>
          </div>

          <div className="env-table-wrapper">
            <table className="env-table">
              <tbody>
                <tr><td>{t('API 地址', 'API Address')}</td><td><code>https://api.deepseek.com/v1</code></td></tr>
                <tr><td>{t('获取 Key', 'Get Key')}</td><td><a href="https://platform.deepseek.com" target="_blank" rel="noreferrer">platform.deepseek.com</a></td></tr>
                <tr><td>{t('推荐模型', 'Recommended Model')}</td><td><code>deepseek-v4</code>{t('（最新旗舰）', ' (Latest flagship)')} / <code>deepseek-chat</code>{t('（V3 通用）', ' (V3 General)')} / <code>deepseek-reasoner</code>{t('（R1 推理）', ' (R1 Reasoning)')}</td></tr>
                <tr><td>{t('定价', 'Pricing')}</td><td>{t('¥1/百万输入 tokens，¥2/百万输出 tokens（极具竞争力）', '¥1/M input tokens, ¥2/M output tokens (extremely competitive)')}</td></tr>
                <tr><td>{t('兼容格式', 'Compatible Format')}</td><td>OpenAI Chat Completions API</td></tr>
              </tbody>
            </table>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>✅ {t('Copilot CLI 直连', 'Direct Copilot CLI Connection')}</h4>
              <p>{t('完全兼容 OpenAI API 格式，设置', 'Fully compatible with OpenAI API format, set')} <code>COPILOT_PROVIDER_BASE_URL</code> {t('即可。', ' and you\'re ready.')}</p>
            </div>
            <div className="feature-item">
              <h4>✅ {t('Claude Code 通过代理', 'Claude Code via Proxy')}</h4>
              <p>{t('通过 OpenRouter 或 LiteLLM 代理接入。', 'Connect via OpenRouter or LiteLLM proxy.')}</p>
            </div>
            <div className="feature-item">
              <h4>💡 {t('推荐场景', 'Recommended Use Cases')}</h4>
              <p>{t('日常编程辅助、代码生成、中文文档编写。性价比极高，适合个人开发者。', 'Daily coding assistance, code generation, Chinese documentation. Great value, ideal for individual developers.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="zhipu" className="section">
        <h2><span className="icon-coral">🧠</span> {t('智谱 AI (GLM)', 'Zhipu AI (GLM)')}</h2>
        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">🧠</div>
            <div>
              <h3>智谱 AI · ChatGLM</h3>
              <div className="agent-tags">
                <span className="tag">{t('OpenAI 兼容', 'OpenAI Compatible')}</span>
                <span className="tag">{t('中文领先', 'Chinese Leader')}</span>
                <span className="tag">{t('多模态', 'Multimodal')}</span>
                <span className="tag">{t('国产自研', 'Domestic R&D')}</span>
              </div>
            </div>
          </div>

          <div className="env-table-wrapper">
            <table className="env-table">
              <tbody>
                <tr><td>{t('API 地址', 'API Address')}</td><td><code>https://open.bigmodel.cn/api/paas/v4</code></td></tr>
                <tr><td>{t('获取 Key', 'Get Key')}</td><td><a href="https://open.bigmodel.cn" target="_blank" rel="noreferrer">open.bigmodel.cn</a></td></tr>
                <tr><td>{t('推荐模型', 'Recommended Model')}</td><td><code>glm-5</code>{t('（最新旗舰 744B MoE）', ' (Latest flagship 744B MoE)')} / <code>glm-4-plus</code></td></tr>
                <tr><td>{t('定价', 'Pricing')}</td><td>{t('新用户有免费额度，付费按量计费', 'Free quota for new users, pay-as-you-go pricing')}</td></tr>
                <tr><td>{t('兼容格式', 'Compatible Format')}</td><td>OpenAI Chat Completions API</td></tr>
              </tbody>
            </table>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>✅ {t('Copilot CLI 直连', 'Direct Copilot CLI Connection')}</h4>
              <p>{t('OpenAI 兼容格式，直接设置环境变量即可使用。', 'OpenAI compatible format, just set environment variables and use directly.')}</p>
            </div>
            <div className="feature-item">
              <h4>💡 {t('推荐场景', 'Recommended Use Cases')}</h4>
              <p>{t('中文理解和生成能力出色，适合中文项目开发、文档生成。', 'Excellent Chinese understanding and generation capabilities, ideal for Chinese project development and documentation.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="qwen" className="section">
        <h2><span className="icon-coral">☁️</span> {t('通义千问 (Qwen)', 'Qwen (Tongyi Qianwen)')}</h2>
        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">☁️</div>
            <div>
              <h3>阿里云 · 通义千问</h3>
              <div className="agent-tags">
                <span className="tag">{t('兼容模式', 'Compat Mode')}</span>
                <span className="tag">{t('阿里云生态', 'Alibaba Cloud')}</span>
                <span className="tag">{t('多尺寸', 'Multi-Size')}</span>
                <span className="tag">{t('开源家族', 'Open Source Family')}</span>
              </div>
            </div>
          </div>

          <div className="env-table-wrapper">
            <table className="env-table">
              <tbody>
                <tr><td>{t('API 地址', 'API Address')}</td><td><code>https://dashscope.aliyuncs.com/compatible-mode/v1</code>{t('（兼容模式）', ' (Compatible Mode)')}</td></tr>
                <tr><td>{t('获取 Key', 'Get Key')}</td><td><a href="https://dashscope.console.aliyun.com" target="_blank" rel="noreferrer">dashscope.console.aliyun.com</a></td></tr>
                <tr><td>{t('推荐模型', 'Recommended Model')}</td><td><code>qwen3.7-max</code>{t('（最新旗舰 1M 上下文）', ' (Latest flagship 1M context)')} / <code>qwen-plus</code> / <code>qwen-max</code></td></tr>
                <tr><td>{t('定价', 'Pricing')}</td><td>{t('按量计费，价格透明', 'Pay-as-you-go, transparent pricing')}</td></tr>
                <tr><td>{t('兼容格式', 'Compatible Format')}</td><td>{t('OpenAI 兼容模式（DashScope Compatible Mode）', 'OpenAI Compatible Mode (DashScope Compatible Mode)')}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>✅ {t('Copilot CLI 直连', 'Direct Copilot CLI Connection')}</h4>
              <p>{t('使用 DashScope <strong>兼容模式端点</strong>（', 'Use DashScope <strong>compatible mode endpoint</strong> (')}<code>/compatible-mode/v1</code>{t('）即可直接接入。', ') for direct connection.')}</p>
            </div>
            <div className="feature-item">
              <h4>💡 {t('推荐场景', 'Recommended Use Cases')}</h4>
              <p>{t('阿里云用户首选，生态整合好。开源模型可本地部署，数据安全有保障。', 'Top choice for Alibaba Cloud users, great ecosystem integration. Open source models can be deployed locally for data security.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="kimi" className="section">
        <h2><span className="icon-coral">🚀</span> {t('Kimi (Moonshot)', 'Kimi (Moonshot)')}</h2>
        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">🚀</div>
            <div>
              <h3>Moonshot AI · Kimi</h3>
              <div className="agent-tags">
                <span className="tag">{t('OpenAI 兼容', 'OpenAI Compatible')}</span>
                <span className="tag">{t('超长上下文', 'Ultra-Long Context')}</span>
                <span className="tag">128K tokens</span>
              </div>
            </div>
          </div>

          <div className="env-table-wrapper">
            <table className="env-table">
              <tbody>
                <tr><td>{t('API 地址', 'API Address')}</td><td><code>https://api.moonshot.cn/v1</code></td></tr>
                <tr><td>{t('获取 Key', 'Get Key')}</td><td><a href="https://platform.moonshot.cn" target="_blank" rel="noreferrer">platform.moonshot.cn</a></td></tr>
                <tr><td>{t('推荐模型', 'Recommended Model')}</td><td><code>kimi-k2.6</code>{t('（最新旗舰 1T MoE）', ' (Latest flagship 1T MoE)')} / <code>moonshot-v1-128k</code></td></tr>
                <tr><td>{t('定价', 'Pricing')}</td><td>{t('按 tokens 计费', 'Per-token pricing')}</td></tr>
                <tr><td>{t('兼容格式', 'Compatible Format')}</td><td>OpenAI Chat Completions API</td></tr>
              </tbody>
            </table>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>✅ {t('Copilot CLI 直连', 'Direct Copilot CLI Connection')}</h4>
              <p>{t('完全兼容 OpenAI API 格式，直接设置环境变量即可使用。', 'Fully compatible with OpenAI API format, just set environment variables.')}</p>
            </div>
            <div className="feature-item">
              <h4>💡 {t('推荐场景', 'Recommended Use Cases')}</h4>
              <p>{t('超长上下文（128K）适合处理大型代码库、长文档。输入大量代码时优势明显。', 'Ultra-long context (128K) ideal for large codebases and long documents. Significant advantage when inputting large amounts of code.')}</p>
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
                <span className="tag">{t('OpenAI 兼容', 'OpenAI Compatible')}</span>
                <span className="tag">{t('响应快速', 'Fast Response')}</span>
                <span className="tag">{t('多模态', 'Multimodal')}</span>
              </div>
            </div>
          </div>

          <div className="env-table-wrapper">
            <table className="env-table">
              <tbody>
                <tr><td>{t('API 地址', 'API Address')}</td><td><code>https://api.minimax.chat/v1</code></td></tr>
                <tr><td>{t('获取 Key', 'Get Key')}</td><td><a href="https://platform.minimax.chat" target="_blank" rel="noreferrer">platform.minimax.chat</a></td></tr>
                <tr><td>{t('推荐模型', 'Recommended Model')}</td><td><code>minimax-m3</code>{t('（最新旗舰 1M 上下文多模态）', ' (Latest flagship 1M context multimodal)')} / <code>abab6.5s-chat</code></td></tr>
                <tr><td>{t('定价', 'Pricing')}</td><td>{t('按 tokens 计费', 'Per-token pricing')}</td></tr>
                <tr><td>{t('兼容格式', 'Compatible Format')}</td><td>OpenAI Chat Completions API</td></tr>
              </tbody>
            </table>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>✅ {t('Copilot CLI 直连', 'Direct Copilot CLI Connection')}</h4>
              <p>{t('OpenAI 兼容格式，直接设置环境变量即可使用。', 'OpenAI compatible format, just set environment variables.')}</p>
            </div>
            <div className="feature-item">
              <h4>💡 {t('推荐场景', 'Recommended Use Cases')}</h4>
              <p>{t('响应速度快，适合对延迟敏感的场景。ABAB 系列模型在中文对话方面表现优异。', 'Fast response speed, ideal for latency-sensitive scenarios. ABAB series models excel in Chinese conversation.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="openrouter" className="section">
        <h2><span className="icon-coral">🔀</span> {t('OpenRouter · 统一接入方案', 'OpenRouter · Unified Access')}</h2>
        <p>
          {t(
            '<strong>OpenRouter</strong> 是一个 AI 模型聚合平台，提供统一的 OpenAI 兼容 API，让你用一个 API Key 就能访问 DeepSeek、Qwen、GLM、Claude、GPT 等 <strong>200+ 模型</strong>。这是最便捷的多模型接入方案，特别适合 Claude Code。',
            '<strong>OpenRouter</strong> is an AI model aggregation platform providing a unified OpenAI compatible API, letting you access <strong>200+ models</strong> including DeepSeek, Qwen, GLM, Claude, GPT with a single API Key. This is the most convenient multi-model access solution, especially for Claude Code.'
          )}
        </p>

        <div className="agent-detail">
          <div className="agent-header">
            <div className="agent-icon">🔀</div>
            <div>
              <h3>OpenRouter</h3>
              <div className="agent-tags">
                <span className="tag">{t('统一 API', 'Unified API')}</span>
                <span className="tag">200+ {t('模型', 'Models')}</span>
                <span className="tag">{t('按量付费', 'Pay-as-you-go')}</span>
                <span className="tag">{t('无需多方注册', 'No Multi-Registration')}</span>
              </div>
            </div>
          </div>

          <div className="code-box">
            <div className="code-title">{t('Copilot CLI 配置', 'Copilot CLI Config')}</div>
            <div><span className="kw-blue">export</span> COPILOT_PROVIDER_BASE_URL=<span className="string">"https://openrouter.ai/api/v1"</span></div>
            <div><span className="kw-blue">export</span> COPILOT_PROVIDER_API_KEY=<span className="string">"sk-or-v1-xxx"</span></div>
            <div><span className="kw-blue">export</span> COPILOT_MODEL=<span className="string">"deepseek/deepseek-chat"</span></div>
            <div style={{ marginTop: '.8rem' }}><span className="comment">{t('# Claude Code 同理，设置 ANTHROPIC_BASE_URL', '# For Claude Code, set ANTHROPIC_BASE_URL similarly')}</span></div>
            <div><span className="kw-blue">export</span> ANTHROPIC_BASE_URL=<span className="string">"https://openrouter.ai/api"</span></div>
            <div><span className="kw-blue">export</span> ANTHROPIC_API_KEY=<span className="string">"sk-or-v1-xxx"</span></div>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <h4>🔑 {t('一个 Key 搞定所有', 'One Key for Everything')}</h4>
              <p>{t('注册', 'Register at')} <a href="https://openrouter.ai" target="_blank" rel="noreferrer">openrouter.ai</a>{t('，一个 API Key 解锁 200+ 模型。', ', one API Key unlocks 200+ models.')}</p>
            </div>
            <div className="feature-item">
              <h4>💰 {t('按量付费', 'Pay-as-you-go')}</h4>
              <p>{t('用多少付多少，没有月费，价格透明。', 'Pay only for what you use, no monthly fees, transparent pricing.')}</p>
            </div>
            <div className="feature-item">
              <h4>🔀 {t('自动故障转移', 'Auto Failover')}</h4>
              <p>{t('一个模型不可用时自动切换到备选模型。', 'Automatically switches to a backup model when one is unavailable.')}</p>
            </div>
            <div className="feature-item">
              <h4>📊 {t('用量监控', 'Usage Monitoring')}</h4>
              <p>{t('在 OpenRouter 控制台查看每个模型的调用量和费用。', 'View call volume and cost for each model in the OpenRouter console.')}</p>
            </div>
          </div>

          <div className="env-table-wrapper" style={{ marginTop: '1.5rem' }}>
            <table className="env-table">
              <thead>
                <tr><th>{t('国内模型', 'Chinese Model')}</th><th>OpenRouter {t('模型 ID', 'Model ID')}</th></tr>
              </thead>
              <tbody>
                <tr><td>DeepSeek V4</td><td><code>deepseek/deepseek-chat</code></td></tr>
                <tr><td>DeepSeek R1</td><td><code>deepseek/deepseek-r1</code></td></tr>
                <tr><td>智谱 GLM-5</td><td><code>zhipuai/glm-5</code></td></tr>
                <tr><td>通义千问 3.7</td><td><code>qwen/qwen3.7-max</code></td></tr>
                <tr><td>Kimi K2.6</td><td><code>moonshotai/kimi-k2.6</code></td></tr>
                <tr><td>MiniMax M3</td><td><code>minimax/minimax-m3</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ======== 实用技巧 ======== */}
      <section id="tips" className="section">
        <h2><span className="icon-coral">💡</span> {t('最佳实践', 'Best Practices')}</h2>

        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🔧</span>
            <h3>{t('使用 alias 快速切换', 'Quick Switch with Alias')}</h3>
            <p>{t('在', 'In')} <code>~/.zshrc</code> {t('中配置 alias，方便在不同模型间切换：', ' configure aliases to easily switch between models:')}</p>
            <div className="code-box" style={{ fontSize: '.75rem', marginTop: '.8rem' }}>
              <div><span className="comment">{t('# 快速切换模型', '# Quick model switch')}</span></div>
              <div><span className="kw-blue">alias</span> copilot-ds=<span className="string">"COPILOT_MODEL=deepseek-chat COPILOT_PROVIDER_BASE_URL=https://api.deepseek.com/v1 copilot"</span></div>
              <div><span className="kw-blue">alias</span> copilot-qw=<span className="string">"COPILOT_MODEL=qwen-plus COPILOT_PROVIDER_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1 copilot"</span></div>
            </div>
            <span className="skill-tag">{t('效率技巧', 'Efficiency Tips')}</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">📁</span>
            <h3>{t('使用 .env 文件管理', 'Manage with .env Files')}</h3>
            <p>{t('在项目根目录创建', 'Create a')} <code>.env</code> {t('文件集中管理 API Key，配合', ' file in the project root to centrally manage API Keys, with')} <code>direnv</code> {t('或手动', ' or manual')} <code>source</code> {t('加载。不同项目可以使用不同的模型配置。', ' to load. Different projects can use different model configurations.')}</p>
            <div className="code-box" style={{ fontSize: '.75rem', marginTop: '.8rem' }}>
              <div><span className="comment">{t('# .env.copilot', '# .env.copilot')}</span></div>
              <div>COPILOT_PROVIDER_BASE_URL=https://api.deepseek.com/v1</div>
              <div>COPILOT_PROVIDER_API_KEY=sk-xxx</div>
              <div>COPILOT_MODEL=deepseek-chat</div>
            </div>
            <span className="skill-tag">{t('最佳实践', 'Best Practice')}</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🔄</span>
            <h3>{t('按任务选择模型', 'Choose Models by Task')}</h3>
            <p><strong>{t('简单任务', 'Simple Tasks')}</strong>{t('（语法修正、格式化）：用便宜的快速模型（DeepSeek Chat / Qwen Turbo）', ' (syntax fixes, formatting): Use cheap fast models (DeepSeek Chat / Qwen Turbo)')}</p>
            <p style={{ marginTop: '.5rem' }}><strong>{t('复杂任务', 'Complex Tasks')}</strong>{t('（架构设计、大型重构）：用推理能力强的模型（DeepSeek R1 / Qwen Max）', ' (architecture design, large refactoring): Use strong reasoning models (DeepSeek R1 / Qwen Max)')}</p>
            <span className="skill-tag">{t('省钱技巧', 'Money-Saving Tips')}</span>
          </div>

          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🛡️</span>
            <h3>{t('安全注意事项', 'Security Notes')}</h3>
            <p>{t('❌ 不要把 API Key 硬编码在代码中', '❌ Don\'t hardcode API Keys in code')}<br />
              {t('❌ 不要把', '❌ Don\'t commit')} <code>.env</code> {t('提交到 Git', ' to Git')}<br />
              {t('✅ 使用', '✅ Use')} <code>.gitignore</code> {t('排除敏感文件', ' to exclude sensitive files')}<br />
              {t('✅ 利用各平台的角色权限管理限制 Key 的访问范围', '✅ Use platform role-based permissions to limit Key access scope')}</p>
            <span className="skill-tag">{t('安全第一', 'Security First')}</span>
          </div>
        </div>
      </section>

      <section id="comparison" className="section">
        <h2><span className="icon-coral">📊</span> {t('国内模型对比', 'Model Comparison')}</h2>

        <div className="env-table-wrapper">
          <table className="env-table">
            <thead>
              <tr>
                <th>{t('模型', 'Model')}</th>
                <th>{t('提供商', 'Provider')}</th>
                <th>{t('API 兼容', 'API Compat')}</th>
                <th>{t('上下文', 'Context')}</th>
                <th>{t('价格优势', 'Price Rating')}</th>
                <th>{t('适用场景', 'Use Case')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>DeepSeek V4</strong></td>
                <td>DeepSeek</td>
                <td>✅ OpenAI</td>
                <td>128K</td>
                <td>⭐⭐⭐⭐⭐</td>
                <td>{t('最新旗舰，性价比首选', 'Latest flagship, best value')}</td>
              </tr>
              <tr>
                <td><strong>DeepSeek R1</strong></td>
                <td>DeepSeek</td>
                <td>✅ OpenAI</td>
                <td>128K</td>
                <td>⭐⭐⭐⭐</td>
                <td>{t('复杂推理、架构设计', 'Complex reasoning, architecture design')}</td>
              </tr>
              <tr>
                <td><strong>GLM-5</strong></td>
                <td>{t('智谱 AI', 'Zhipu AI')}</td>
                <td>✅ OpenAI</td>
                <td>200K</td>
                <td>⭐⭐⭐⭐</td>
                <td>{t('744B MoE、开源', '744B MoE, open-source')}</td>
              </tr>
              <tr>
                <td><strong>Qwen 3.7 Max</strong></td>
                <td>{t('阿里云', 'Alibaba Cloud')}</td>
                <td>✅ {t('兼容模式', 'Compat Mode')}</td>
                <td>1M</td>
                <td>⭐⭐⭐⭐</td>
                <td>{t('最新旗舰 Agent 模型', 'Latest flagship Agent model')}</td>
              </tr>
              <tr>
                <td><strong>Kimi K2.6</strong></td>
                <td>Moonshot</td>
                <td>✅ OpenAI</td>
                <td>256K</td>
                <td>⭐⭐⭐⭐</td>
                <td>{t('1T MoE Agent Swarm', '1T MoE Agent Swarm')}</td>
              </tr>
              <tr>
                <td><strong>MiniMax M3</strong></td>
                <td>MiniMax</td>
                <td>✅ OpenAI</td>
                <td>1M</td>
                <td>⭐⭐⭐⭐</td>
                <td>{t('1M 上下文多模态', '1M context multimodal')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  )
}
