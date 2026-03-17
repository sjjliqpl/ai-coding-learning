import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import '../styles/git.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandGradient: 'gradient-coral-amber',
  activeClass: 'active-coral',
  groups: [
    {
      title: '认识 Git',
      items: [
        { id: 'what', label: '什么是 Git' },
        { id: 'why', label: '为什么要用 Git' },
        { id: 'concepts', label: '核心概念' },
      ],
    },
    {
      title: '基本使用',
      items: [
        { id: 'install', label: '安装与配置' },
        { id: 'commands', label: '常用命令' },
        { id: 'workflow', label: '日常工作流' },
      ],
    },
    {
      title: 'GitHub',
      items: [
        { id: 'github', label: '什么是 GitHub' },
        { id: 'git-vs-github', label: 'Git vs GitHub' },
        { id: 'github-tips', label: 'GitHub 常用操作' },
      ],
    },
  ],
  backTo: { label: '返回首页', path: '/' },
}

export default function GitPage() {
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">Git & GitHub 入门</h1>
        <p className="page-desc">代码的"时光机"与"云备份"——即使从未学过编程，也能轻松上手</p>
      </header>

      {/* WHAT IS GIT */}
      <section id="what" className="section">
        <h2><span className="icon-coral">🕹️</span> 什么是 Git？</h2>
        <p>Git 是一个<strong>版本控制工具</strong>——它帮你记录文件的每一次修改，就像给你的代码配了一台"时光机"。</p>

        <div className="git-analogy">
          <div className="git-analogy-item">
            <span className="emoji">🎮</span>
            <span className="git-term">commit（提交）</span>
            <span className="analogy-text">游戏里的"存档点"。每次存档，失败了可以从这里重来。</span>
          </div>
          <div className="git-analogy-item">
            <span className="emoji">📂</span>
            <span className="git-term">repository（仓库）</span>
            <span className="analogy-text">存放你项目代码和所有历史记录的"文件夹"。</span>
          </div>
          <div className="git-analogy-item">
            <span className="emoji">🌿</span>
            <span className="git-term">branch（分支）</span>
            <span className="analogy-text">同时有多条平行时间线，互不影响地尝试不同方案。</span>
          </div>
          <div className="git-analogy-item">
            <span className="emoji">🔀</span>
            <span className="git-term">merge（合并）</span>
            <span className="analogy-text">把两条时间线合成一条，把改动整合到一起。</span>
          </div>
        </div>

        <div className="highlight-coral">
          <p>💡 <strong>一句话理解</strong>：Git 就像 Word 的"撤销"功能，但强大得多——它能让你回到任意一个历史版本，还能让多人同时修改同一份文档而不冲突。</p>
        </div>
      </section>

      {/* WHY GIT */}
      <section id="why" className="section">
        <h2><span className="icon-coral">❓</span> 为什么要用 Git？</h2>
        <p>即使你只是一个人做个小项目，Git 也能帮你解决这些问题：</p>

        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">😱</span>
            <h3>改坏了怎么办？</h3>
            <p>没有 Git：只能手动 Ctrl+Z，或者对着乱成一团的代码发呆。<br />有了 Git：一条命令恢复到任意之前的状态。</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">📦</span>
            <h3>代码安全备份</h3>
            <p>把代码推送到 GitHub（远程仓库），电脑坏了、换电脑了，代码都不会丢。</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">👥</span>
            <h3>多人协作</h3>
            <p>多人修改同一个项目时，Git 自动把各自的改动合并，不用手动复制粘贴。</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🤖</span>
            <h3>AI 编程必备</h3>
            <p>AI 可能改错代码。有了 Git，改错了随时回退；改对了随时保存这个"存档点"。</p>
          </div>
        </div>
      </section>

      {/* CONCEPTS */}
      <section id="concepts" className="section">
        <h2><span className="icon-coral">📖</span> 核心概念</h2>
        <p>只需要理解这几个概念，就能顺畅使用 Git：</p>

        <div className="agent-detail">
          <h3>Git 的工作流程</h3>
          <div className="git-flow">
            <div className="git-flow-node">
              <div className="git-flow-circle">📁</div>
              <div className="git-flow-label">工作区<br />（你的文件）</div>
            </div>
            <div className="git-flow-arrow">→</div>
            <div className="git-flow-node">
              <div className="git-flow-circle">📋</div>
              <div className="git-flow-label">暂存区<br />（准备提交）</div>
            </div>
            <div className="git-flow-arrow">→</div>
            <div className="git-flow-node">
              <div className="git-flow-circle">💾</div>
              <div className="git-flow-label">本地仓库<br />（历史记录）</div>
            </div>
            <div className="git-flow-arrow">→</div>
            <div className="git-flow-node">
              <div className="git-flow-circle">☁️</div>
              <div className="git-flow-label">远程仓库<br />（GitHub）</div>
            </div>
          </div>

          <div className="feature-grid" style={{ marginTop: '1rem' }}>
            <div className="feature-item">
              <h4>📁 工作区（Working Directory）</h4>
              <p>你电脑上的实际文件夹，你直接编辑的地方。</p>
            </div>
            <div className="feature-item">
              <h4>📋 暂存区（Staging Area）</h4>
              <p>像"购物车"——先把想要提交的改动"加入购物车"，再统一结账（提交）。</p>
            </div>
            <div className="feature-item">
              <h4>💾 本地仓库（Local Repository）</h4>
              <p>保存在你电脑上的历史记录数据库，就是 <code>.git</code> 隐藏文件夹。</p>
            </div>
            <div className="feature-item">
              <h4>☁️ 远程仓库（Remote Repository）</h4>
              <p>托管在 GitHub 等平台上的备份，也让其他人能下载你的代码。</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSTALL */}
      <section id="install" className="section">
        <h2><span className="icon-coral">📥</span> 安装与配置</h2>
        <ol className="step-list">
          <li className="step-item" style={{ ['--step-color' as string]: 'var(--coral)' }}>
            <h4>下载并安装 Git</h4>
            <p>访问 <a href="https://git-scm.com" target="_blank" rel="noreferrer">git-scm.com</a> 下载对应操作系统的安装包，一路"下一步"即可完成安装。</p>
            <div className="code-box">
              <div className="code-title">安装完成后，打开终端验证</div>
              <div className="cmd">git --version</div>
              <div className="comment"># 输出类似 git version 2.43.0 表示安装成功</div>
            </div>
          </li>
          <li className="step-item">
            <h4>配置用户信息</h4>
            <p>Git 需要知道你是谁，这样每次提交都会标记你的名字和邮箱。只需配置一次。</p>
            <div className="code-box">
              <div className="code-title">首次使用必做配置</div>
              <div className="cmd">git config --global user.name "你的名字"</div>
              <div className="cmd">git config --global user.email "your@email.com"</div>
            </div>
          </li>
          <li className="step-item">
            <h4>（可选）安装图形界面工具</h4>
            <p>如果不习惯命令行，可以使用图形界面工具来操作 Git，更直观易用：</p>
            <div className="feature-grid">
              <div className="feature-item">
                <h4>🖥️ GitHub Desktop</h4>
                <p>GitHub 官方出品，界面简洁，新手首选。免费下载：<a href="https://desktop.github.com" target="_blank" rel="noreferrer">desktop.github.com</a></p>
              </div>
              <div className="feature-item">
                <h4>🔷 Sourcetree</h4>
                <p>功能强大的免费 Git 图形客户端，可视化分支树非常直观。</p>
              </div>
            </div>
          </li>
        </ol>
      </section>

      {/* COMMANDS */}
      <section id="commands" className="section">
        <h2><span className="icon-coral">⌨️</span> 常用命令</h2>
        <p>90% 的情况只用到这几条命令，记住它们就够了：</p>

        <div className="git-cmd-grid">
          <div className="git-cmd-card">
            <h4>🆕 git init</h4>
            <p>在当前文件夹初始化一个新的 Git 仓库。</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git init</div>
              <div className="comment"># 当前目录变成 Git 仓库</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>📋 git add</h4>
            <p>把文件改动放入暂存区（加入"购物车"）。</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git add 文件名</div>
              <div className="cmd">git add .</div>
              <div className="comment"># . 表示所有改动的文件</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>💾 git commit</h4>
            <p>把暂存区的内容保存为一个"存档点"，附上说明信息。</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git commit -m "完成登录功能"</div>
              <div className="comment"># -m 后面是本次改动的描述</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>🔍 git status</h4>
            <p>查看当前有哪些文件被修改了、哪些在暂存区。</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git status</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>📜 git log</h4>
            <p>查看提交历史记录（所有"存档点"的列表）。</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git log --oneline</div>
              <div className="comment"># 简洁模式显示历史</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>⏪ git checkout / git restore</h4>
            <p>撤销文件改动，恢复到上一次提交时的状态。</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git restore 文件名</div>
              <div className="comment"># 放弃该文件的未提交修改</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>☁️ git push</h4>
            <p>把本地提交推送到 GitHub 等远程仓库（上传/备份）。</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git push origin main</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>⬇️ git pull</h4>
            <p>从远程仓库下载最新改动，同步到本地。</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git pull origin main</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>📥 git clone</h4>
            <p>下载（克隆）一个远程仓库到本地。</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git clone 仓库地址</div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="section">
        <h2><span className="icon-coral">🔄</span> 日常工作流</h2>
        <p>每天使用 Git 的典型流程，只需记住这个节奏：</p>

        <ol className="step-list">
          <li className="step-item">
            <h4>开始工作前——同步最新代码</h4>
            <div className="code-box">
              <div className="cmd">git pull origin main</div>
              <div className="comment"># 拉取同事或 AI 的最新改动</div>
            </div>
          </li>
          <li className="step-item">
            <h4>写代码、修改文件</h4>
            <p>正常开发，用你喜欢的编辑器修改文件。Git 会自动记录哪些文件发生了变化。</p>
          </li>
          <li className="step-item">
            <h4>查看改动了什么</h4>
            <div className="code-box">
              <div className="cmd">git status</div>
              <div className="comment"># 查看哪些文件改变了</div>
              <div className="cmd">git diff</div>
              <div className="comment"># 查看具体改了哪些行</div>
            </div>
          </li>
          <li className="step-item">
            <h4>把改动加入暂存区</h4>
            <div className="code-box">
              <div className="cmd">git add .</div>
              <div className="comment"># 把所有改动的文件加入暂存区</div>
            </div>
          </li>
          <li className="step-item">
            <h4>提交存档</h4>
            <div className="code-box">
              <div className="cmd">git commit -m "修复首页加载慢的问题"</div>
              <div className="comment"># 写清楚这次改了什么，方便以后查找</div>
            </div>
          </li>
          <li className="step-item">
            <h4>推送到 GitHub</h4>
            <div className="code-box">
              <div className="cmd">git push origin main</div>
              <div className="comment"># 上传到云端，安全备份</div>
            </div>
          </li>
        </ol>

        <div className="callout tip">
          <h4>💡 提交信息怎么写？</h4>
          <p>好的提交信息让你三个月后还能看懂。格式建议：<strong>动词 + 改了什么</strong>。例如：<br />
          ✅ "添加用户登录功能" &nbsp; ✅ "修复首页图片不显示的 Bug" &nbsp; ✅ "优化移动端样式"<br />
          ❌ "改了一些东西" &nbsp; ❌ "update" &nbsp; ❌ "aaa"</p>
        </div>
      </section>

      {/* GITHUB */}
      <section id="github" className="section">
        <h2><span className="icon-coral">🐙</span> 什么是 GitHub？</h2>
        <p>GitHub 是全球最大的<strong>代码托管平台</strong>，目前有超过 1 亿开发者在上面存放代码、分享项目、协作开发。</p>

        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'rgba(96,165,250,0.3)' }}>
            <span className="skill-icon">☁️</span>
            <h3>代码云备份</h3>
            <p>把本地 Git 仓库推送到 GitHub，电脑丢了、坏了，代码永远安全。</p>
            <span className="skill-tag">安全存储</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(96,165,250,0.3)' }}>
            <span className="skill-icon">🌍</span>
            <h3>开源社区</h3>
            <p>全世界的开发者把代码公开在 GitHub 上，你可以免费使用和学习。React、Vue 等都在这里。</p>
            <span className="skill-tag">开源生态</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(96,165,250,0.3)' }}>
            <span className="skill-icon">🤝</span>
            <h3>多人协作</h3>
            <p>通过 Pull Request（PR）和 Issues 协调团队开发，是企业项目管理的标准流程。</p>
            <span className="skill-tag">团队协作</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(96,165,250,0.3)' }}>
            <span className="skill-icon">🚀</span>
            <h3>自动部署</h3>
            <p>Vercel、Netlify 等平台连接 GitHub 后，每次推送代码自动触发部署，网站自动更新。</p>
            <span className="skill-tag">CI/CD</span>
          </div>
        </div>
      </section>

      {/* GIT VS GITHUB */}
      <section id="git-vs-github" className="section">
        <h2><span className="icon-coral">⚖️</span> Git 和 GitHub 的关系</h2>
        <p>这是很多新手容易混淆的地方，一张图说清楚：</p>

        <div className="git-vs">
          <div className="git-vs-box git-side">
            <div className="git-vs-title git-color">🔧 Git</div>
            <ul className="git-vs-list">
              <li>一个<strong>软件工具</strong>，安装在你电脑上</li>
              <li>负责<strong>追踪代码变化</strong>，本地管理版本</li>
              <li>完全<strong>离线</strong>也能用</li>
              <li>2005 年由 Linus Torvalds（Linux 之父）创建</li>
              <li>开源免费，官网：<a href="https://git-scm.com" target="_blank" rel="noreferrer">git-scm.com</a></li>
            </ul>
          </div>
          <div className="git-vs-sep">≠</div>
          <div className="git-vs-box github-side">
            <div className="git-vs-title github-color">🐙 GitHub</div>
            <ul className="git-vs-list">
              <li>一个<strong>网站平台</strong>，在浏览器里访问</li>
              <li>把 Git 仓库托管到<strong>云端</strong>，方便分享和协作</li>
              <li>需要<strong>联网</strong>才能使用</li>
              <li>2008 年上线，2018 年被微软收购</li>
              <li>基础功能免费，官网：<a href="https://github.com" target="_blank" rel="noreferrer">github.com</a></li>
            </ul>
          </div>
        </div>

        <div className="highlight-coral">
          <p>🎯 <strong>类比理解</strong>：Git 就像 Word（你电脑上安装的软件，用来编辑文档），GitHub 就像百度网盘（把文档上传到云端，方便备份和分享）。两者配合使用，但各自独立存在。除了 GitHub，还有 GitLab、Gitee（码云）等类似平台。</p>
        </div>
      </section>

      {/* GITHUB TIPS */}
      <section id="github-tips" className="section">
        <h2><span className="icon-coral">⭐</span> GitHub 常用操作</h2>

        <div className="agent-detail">
          <h3>创建第一个仓库</h3>
          <ol className="step-list" style={{ marginTop: '1rem' }}>
            <li className="step-item">
              <h4>注册并登录 GitHub</h4>
              <p>访问 <a href="https://github.com" target="_blank" rel="noreferrer">github.com</a>，注册一个免费账号。用邮箱注册即可，不需要手机号。</p>
            </li>
            <li className="step-item">
              <h4>创建新仓库</h4>
              <p>点击右上角 "+" → "New repository"，填写仓库名称，选择 Public（公开）或 Private（私有），点击创建。</p>
            </li>
            <li className="step-item">
              <h4>在本地登录 GitHub（安装 GitHub CLI）</h4>
              <p>访问 <a href="https://cli.github.com" target="_blank" rel="noreferrer">cli.github.com</a> 下载并安装 GitHub CLI 工具，然后在终端执行登录命令：</p>
              <div className="code-box">
                <div className="comment"># 安装完成后，执行以下命令登录 GitHub：</div>
                <div className="cmd">gh auth login</div>
                <div className="comment"># 按提示选择 GitHub.com，选择 HTTPS 协议，并通过浏览器或 Token 完成认证</div>
              </div>
            </li>
            <li className="step-item">
              <h4>连接本地仓库</h4>
              <div className="code-box">
                <div className="comment"># 在本地项目文件夹里执行：</div>
                <div className="cmd">git remote add origin https://github.com/你的用户名/仓库名.git</div>
                <div className="cmd">git push -u origin main</div>
              </div>
            </li>
          </ol>
        </div>

        <div className="feature-grid" style={{ marginTop: '2rem' }}>
          <div className="feature-item">
            <h4>⭐ Star（收藏）</h4>
            <p>点击仓库页面的 Star 按钮可以收藏感兴趣的项目，相当于给项目"点赞"。</p>
          </div>
          <div className="feature-item">
            <h4>🍴 Fork（派生）</h4>
            <p>把别人的仓库复制一份到自己账号，可以自由修改而不影响原仓库。</p>
          </div>
          <div className="feature-item">
            <h4>🐛 Issues（问题反馈）</h4>
            <p>在别人的项目上提 issue，反馈 Bug 或提功能需求，也是参与开源的方式。</p>
          </div>
          <div className="feature-item">
            <h4>📄 README</h4>
            <p>仓库里的 <code>README.md</code> 文件会自动显示在首页，用 Markdown 写项目介绍。</p>
          </div>
        </div>

        <div className="callout tip" style={{ marginTop: '2rem' }}>
          <h4>🤖 让 AI 帮你用 Git</h4>
          <p>不熟悉命令？把你的问题告诉 AI 就行，例如："我想撤销上一次提交怎么做？"、"我不小心把密码写进代码提交了，怎么处理？"。AI 会给出精确的命令和步骤，比查文档快多了。</p>
        </div>
      </section>
    </Layout>
  )
}
