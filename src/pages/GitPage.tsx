import Layout from '../components/Layout'
import type { SidebarConfig } from '../components/Sidebar'
import { useLang } from '../i18n/LanguageContext'
import '../styles/git.css'

const sidebarConfig: SidebarConfig = {
  brandText: 'AI Coding Guide',
  brandTextEn: 'AI Coding Guide',
  brandGradient: 'gradient-coral-amber',
  activeClass: 'active-coral',
  groups: [
    {
      title: '认识 Git',
      titleEn: 'Understanding Git',
      items: [
        { id: 'what', label: '什么是 Git', labelEn: 'What is Git' },
        { id: 'why', label: '为什么要用 Git', labelEn: 'Why Git' },
        { id: 'concepts', label: '核心概念', labelEn: 'Core Concepts' },
      ],
    },
    {
      title: '基本使用',
      titleEn: 'Basic Usage',
      items: [
        { id: 'install', label: '安装与配置', labelEn: 'Install & Config' },
        { id: 'commands', label: '常用命令', labelEn: 'Common Commands' },
        { id: 'workflow', label: '日常工作流', labelEn: 'Daily Workflow' },
      ],
    },
    {
      title: 'GitHub',
      titleEn: 'GitHub',
      items: [
        { id: 'github', label: '什么是 GitHub', labelEn: 'What is GitHub' },
        { id: 'git-vs-github', label: 'Git vs GitHub', labelEn: 'Git vs GitHub' },
        { id: 'github-tips', label: 'GitHub 常用操作', labelEn: 'GitHub Operations' },
      ],
    },
  ],
  backTo: { label: '返回首页', labelEn: 'Back to Home', path: '/' },
}

export default function GitPage() {
  const { t } = useLang()
  return (
    <Layout sidebar={sidebarConfig}>
      <header className="page-header">
        <h1 className="page-title">{t('Git & GitHub 入门', 'Git & GitHub Guide')}</h1>
        <p className="page-desc">{t('代码的"时光机"与"云备份"——即使从未学过编程，也能轻松上手', 'Code\'s "time machine" and "cloud backup" — easy to learn even if you\'ve never coded before')}</p>
      </header>

      {/* WHAT IS GIT */}
      <section id="what" className="section">
        <h2><span className="icon-coral">🕹️</span> {t('什么是 Git？', 'What is Git?')}</h2>
        <p>{t('Git 是一个', 'Git is a')}<strong>{t('版本控制工具', 'version control tool')}</strong>{t('——它帮你记录文件的每一次修改，就像给你的代码配了一台"时光机"。', ' — it records every file change, like giving your code a "time machine".')}</p>

        <div className="git-analogy">
          <div className="git-analogy-item">
            <span className="emoji">🎮</span>
            <span className="git-term">{t('commit（提交）', 'commit')}</span>
            <span className="analogy-text">{t('游戏里的"存档点"。每次存档，失败了可以从这里重来。', 'Like a "save point" in a game. Save your progress and reload from here if things go wrong.')}</span>
          </div>
          <div className="git-analogy-item">
            <span className="emoji">📂</span>
            <span className="git-term">{t('repository（仓库）', 'repository')}</span>
            <span className="analogy-text">{t('存放你项目代码和所有历史记录的"文件夹"。', 'A "folder" that stores your project code and all its history.')}</span>
          </div>
          <div className="git-analogy-item">
            <span className="emoji">🌿</span>
            <span className="git-term">{t('branch（分支）', 'branch')}</span>
            <span className="analogy-text">{t('同时有多条平行时间线，互不影响地尝试不同方案。', 'Multiple parallel timelines — try different approaches without interfering with each other.')}</span>
          </div>
          <div className="git-analogy-item">
            <span className="emoji">🔀</span>
            <span className="git-term">{t('merge（合并）', 'merge')}</span>
            <span className="analogy-text">{t('把两条时间线合成一条，把改动整合到一起。', 'Combine two timelines into one, merging changes together.')}</span>
          </div>
        </div>

        <div className="highlight-coral">
          <p>{t('💡 ', '💡 ')}<strong>{t('一句话理解', 'In a Nutshell')}</strong>{t('：Git 就像 Word 的"撤销"功能，但强大得多——它能让你回到任意一个历史版本，还能让多人同时修改同一份文档而不冲突。', ': Git is like Word\'s "undo" feature, but far more powerful — it lets you go back to any historical version and allows multiple people to edit the same document without conflicts.')}</p>
        </div>
      </section>

      {/* WHY GIT */}
      <section id="why" className="section">
        <h2><span className="icon-coral">❓</span> {t('为什么要用 Git？', 'Why Git?')}</h2>
        <p>{t('即使你只是一个人做个小项目，Git 也能帮你解决这些问题：', 'Even for a solo small project, Git helps you solve these problems:')}</p>

        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">😱</span>
            <h3>{t('改坏了怎么办？', 'Made a Mistake?')}</h3>
            <p>{t('没有 Git：只能手动 Ctrl+Z，或者对着乱成一团的代码发呆。', 'Without Git: just Ctrl+Z manually, or stare helplessly at messy code.')}<br />{t('有了 Git：一条命令恢复到任意之前的状态。', 'With Git: one command restores any previous state.')}</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">📦</span>
            <h3>{t('代码安全备份', 'Safe Code Backup')}</h3>
            <p>{t('把代码推送到 GitHub（远程仓库），电脑坏了、换电脑了，代码都不会丢。', 'Push code to GitHub (remote repository). Your code won\'t be lost even if your computer crashes or you switch devices.')}</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">👥</span>
            <h3>{t('多人协作', 'Team Collaboration')}</h3>
            <p>{t('多人修改同一个项目时，Git 自动把各自的改动合并，不用手动复制粘贴。', 'When multiple people edit the same project, Git automatically merges changes — no manual copy-paste needed.')}</p>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(238,108,77,0.3)' }}>
            <span className="skill-icon">🤖</span>
            <h3>{t('AI 编程必备', 'Essential for AI Coding')}</h3>
            <p>{t('AI 可能改错代码。有了 Git，改错了随时回退；改对了随时保存这个"存档点"。', 'AI can make mistakes. With Git, you can roll back anytime it goes wrong and save a "checkpoint" when it goes right.')}</p>
          </div>
        </div>
      </section>

      {/* CONCEPTS */}
      <section id="concepts" className="section">
        <h2><span className="icon-coral">📖</span> {t('核心概念', 'Core Concepts')}</h2>
        <p>{t('只需要理解这几个概念，就能顺畅使用 Git：', 'Master just these concepts to use Git smoothly:')}</p>

        <div className="agent-detail">
          <h3>{t('Git 的工作流程', 'Git Workflow')}</h3>
          <div className="git-flow">
            <div className="git-flow-node">
              <div className="git-flow-circle">📁</div>
              <div className="git-flow-label">{t('工作区', 'Working\nDirectory')}<br />{t('（你的文件）', '(Your Files)')}</div>
            </div>
            <div className="git-flow-arrow">→</div>
            <div className="git-flow-node">
              <div className="git-flow-circle">📋</div>
              <div className="git-flow-label">{t('暂存区', 'Staging\nArea')}<br />{t('（准备提交）', '(Ready to Commit)')}</div>
            </div>
            <div className="git-flow-arrow">→</div>
            <div className="git-flow-node">
              <div className="git-flow-circle">💾</div>
              <div className="git-flow-label">{t('本地仓库', 'Local\nRepository')}<br />{t('（历史记录）', '(History)')}</div>
            </div>
            <div className="git-flow-arrow">→</div>
            <div className="git-flow-node">
              <div className="git-flow-circle">☁️</div>
              <div className="git-flow-label">{t('远程仓库', 'Remote\nRepository')}<br />{t('（GitHub）', '(GitHub)')}</div>
            </div>
          </div>

          <div className="feature-grid" style={{ marginTop: '1rem' }}>
            <div className="feature-item">
              <h4>{t('📁 工作区（Working Directory）', '📁 Working Directory')}</h4>
              <p>{t('你电脑上的实际文件夹，你直接编辑的地方。', 'The actual folder on your computer — where you directly edit files.')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('📋 暂存区（Staging Area）', '📋 Staging Area')}</h4>
              <p>{t('像"购物车"——先把想要提交的改动"加入购物车"，再统一结账（提交）。', 'Like a "shopping cart" — add the changes you want to commit to the cart first, then check out (commit) all at once.')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('💾 本地仓库（Local Repository）', '💾 Local Repository')}</h4>
              <p>{t('保存在你电脑上的历史记录数据库，就是', 'A history database stored on your computer — that\'s the')} <code>.git</code> {t('隐藏文件夹。', 'hidden folder.')}</p>
            </div>
            <div className="feature-item">
              <h4>{t('☁️ 远程仓库（Remote Repository）', '☁️ Remote Repository')}</h4>
              <p>{t('托管在 GitHub 等平台上的备份，也让其他人能下载你的代码。', 'A backup hosted on platforms like GitHub — it also lets others download your code.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSTALL */}
      <section id="install" className="section">
        <h2><span className="icon-coral">📥</span> {t('安装与配置', 'Install & Config')}</h2>
        <ol className="step-list">
          <li className="step-item" style={{ ['--step-color' as string]: 'var(--coral)' }}>
            <h4>{t('下载并安装 Git', 'Download & Install Git')}</h4>
            <p>{t('访问', 'Visit')} <a href="https://git-scm.com" target="_blank" rel="noreferrer">git-scm.com</a> {t('下载对应操作系统的安装包，一路"下一步"即可完成安装。', 'to download the installer for your OS. Just click "Next" through the wizard to complete installation.')}</p>
            <div className="code-box">
              <div className="code-title">{t('安装完成后，打开终端验证', 'After installation, verify in terminal')}</div>
              <div className="cmd">git --version</div>
              <div className="comment">{t('# 输出类似 git version 2.43.0 表示安装成功', '# Output like git version 2.43.0 means success')}</div>
            </div>
          </li>
          <li className="step-item">
            <h4>{t('配置用户信息', 'Configure User Info')}</h4>
            <p>{t('Git 需要知道你是谁，这样每次提交都会标记你的名字和邮箱。只需配置一次。', 'Git needs to know who you are, so every commit is tagged with your name and email. Configure once.')}</p>
            <div className="code-box">
              <div className="code-title">{t('首次使用必做配置', 'Required First-Time Config')}</div>
              <div className="cmd">git config --global user.name "{t('你的名字', 'Your Name')}"</div>
              <div className="cmd">git config --global user.email "your@email.com"</div>
            </div>
          </li>
          <li className="step-item">
            <h4>{t('（可选）安装图形界面工具', '(Optional) Install GUI Tools')}</h4>
            <p>{t('如果不习惯命令行，可以使用图形界面工具来操作 Git，更直观易用：', 'If you\'re not comfortable with the command line, use GUI tools to operate Git — more intuitive:')}</p>
            <div className="feature-grid">
              <div className="feature-item">
                <h4>🖥️ GitHub Desktop</h4>
                <p>{t('GitHub 官方出品，界面简洁，新手首选。免费下载：', 'GitHub\'s official tool — clean interface, beginner-friendly. Free download: ')}<a href="https://desktop.github.com" target="_blank" rel="noreferrer">desktop.github.com</a></p>
              </div>
              <div className="feature-item">
                <h4>🔷 Sourcetree</h4>
                <p>{t('功能强大的免费 Git 图形客户端，可视化分支树非常直观。', 'Powerful free Git GUI client with intuitive branch tree visualization.')}</p>
              </div>
            </div>
          </li>
        </ol>
      </section>

      {/* COMMANDS */}
      <section id="commands" className="section">
        <h2><span className="icon-coral">⌨️</span> {t('常用命令', 'Common Commands')}</h2>
        <p>{t('90% 的情况只用到这几条命令，记住它们就够了：', '90% of the time you only need these commands. Memorize them and you\'re set:')}</p>

        <div className="git-cmd-grid">
          <div className="git-cmd-card">
            <h4>🆕 git init</h4>
            <p>{t('在当前文件夹初始化一个新的 Git 仓库。', 'Initialize a new Git repository in the current folder.')}</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git init</div>
              <div className="comment">{t('# 当前目录变成 Git 仓库', '# Current directory becomes a Git repository')}</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>📋 git add</h4>
            <p>{t('把文件改动放入暂存区（加入"购物车"）。', 'Add file changes to the staging area (add to "shopping cart").')}</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git add 文件名</div>
              <div className="cmd">git add .</div>
              <div className="comment">{t('# . 表示所有改动的文件', '# . means all changed files')}</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>💾 git commit</h4>
            <p>{t('把暂存区的内容保存为一个"存档点"，附上说明信息。', 'Save staging area content as a "checkpoint" with a description.')}</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git commit -m "{t('完成登录功能', 'Complete login feature')}"</div>
              <div className="comment">{t('# -m 后面是本次改动的描述', '# -m is followed by a description of this change')}</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>🔍 git status</h4>
            <p>{t('查看当前有哪些文件被修改了、哪些在暂存区。', 'See which files have been modified and which are in the staging area.')}</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git status</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>📜 git log</h4>
            <p>{t('查看提交历史记录（所有"存档点"的列表）。', 'View commit history (a list of all "checkpoints").')}</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git log --oneline</div>
              <div className="comment">{t('# 简洁模式显示历史', '# Compact history view')}</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>⏪ git checkout / git restore</h4>
            <p>{t('撤销文件改动，恢复到上一次提交时的状态。', 'Undo file changes, restoring to the last committed state.')}</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git restore 文件名</div>
              <div className="comment">{t('# 放弃该文件的未提交修改', '# Discard uncommitted changes in this file')}</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>☁️ git push</h4>
            <p>{t('把本地提交推送到 GitHub 等远程仓库（上传/备份）。', 'Push local commits to remote repositories like GitHub (upload/backup).')}</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git push origin main</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>⬇️ git pull</h4>
            <p>{t('从远程仓库下载最新改动，同步到本地。', 'Download latest changes from remote repository and sync locally.')}</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git pull origin main</div>
            </div>
          </div>
          <div className="git-cmd-card">
            <h4>📥 git clone</h4>
            <p>{t('下载（克隆）一个远程仓库到本地。', 'Download (clone) a remote repository to your local machine.')}</p>
            <div className="code-box" style={{ margin: 0 }}>
              <div className="cmd">git clone {t('仓库地址', 'repository-url')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="section">
        <h2><span className="icon-coral">🔄</span> {t('日常工作流', 'Daily Workflow')}</h2>
        <p>{t('每天使用 Git 的典型流程，只需记住这个节奏：', 'A typical daily Git workflow. Just remember this rhythm:')}</p>

        <ol className="step-list">
          <li className="step-item">
            <h4>{t('开始工作前——同步最新代码', 'Before Work — Sync Latest Code')}</h4>
            <div className="code-box">
              <div className="cmd">git pull origin main</div>
              <div className="comment">{t('# 拉取同事或 AI 的最新改动', '# Pull latest changes from teammates or AI')}</div>
            </div>
          </li>
          <li className="step-item">
            <h4>{t('写代码、修改文件', 'Write Code, Edit Files')}</h4>
            <p>{t('正常开发，用你喜欢的编辑器修改文件。Git 会自动记录哪些文件发生了变化。', 'Develop as usual using your favorite editor. Git automatically tracks which files changed.')}</p>
          </li>
          <li className="step-item">
            <h4>{t('查看改动了什么', 'Check What Changed')}</h4>
            <div className="code-box">
              <div className="cmd">git status</div>
              <div className="comment">{t('# 查看哪些文件改变了', '# See which files changed')}</div>
              <div className="cmd">git diff</div>
              <div className="comment">{t('# 查看具体改了哪些行', '# See exactly which lines changed')}</div>
            </div>
          </li>
          <li className="step-item">
            <h4>{t('把改动加入暂存区', 'Stage Your Changes')}</h4>
            <div className="code-box">
              <div className="cmd">git add .</div>
              <div className="comment">{t('# 把所有改动的文件加入暂存区', '# Stage all changed files')}</div>
            </div>
          </li>
          <li className="step-item">
            <h4>{t('提交存档', 'Commit as Checkpoint')}</h4>
            <div className="code-box">
              <div className="cmd">git commit -m "{t('修复首页加载慢的问题', 'Fix slow homepage loading')}"</div>
              <div className="comment">{t('# 写清楚这次改了什么，方便以后查找', '# Describe what you changed for easier lookup later')}</div>
            </div>
          </li>
          <li className="step-item">
            <h4>{t('推送到 GitHub', 'Push to GitHub')}</h4>
            <div className="code-box">
              <div className="cmd">git push origin main</div>
              <div className="comment">{t('# 上传到云端，安全备份', '# Upload to the cloud for safe backup')}</div>
            </div>
          </li>
        </ol>

        <div className="callout tip">
          <h4>{t('💡 提交信息怎么写？', '💡 How to Write Commit Messages?')}</h4>
          <p>{t('好的提交信息让你三个月后还能看懂。格式建议：', 'Good commit messages stay understandable months later. Suggested format: ')}<strong>{t('动词 + 改了什么', 'Verb + What Changed')}</strong>{t('。例如：', '. E.g.: ')}<br />
          ✅ "{t('添加用户登录功能', 'Add user login feature')}" &nbsp; ✅ "{t('修复首页图片不显示的 Bug', 'Fix homepage image not displaying bug')}" &nbsp; ✅ "{t('优化移动端样式', 'Optimize mobile styles')}"<br />
          ❌ "{t('改了一些东西', 'Changed some stuff')}" &nbsp; ❌ "update" &nbsp; ❌ "aaa"</p>
        </div>
      </section>

      {/* GITHUB */}
      <section id="github" className="section">
        <h2><span className="icon-coral">🐙</span> {t('什么是 GitHub？', 'What is GitHub?')}</h2>
        <p>{t('GitHub 是全球最大的', 'GitHub is the world\'s largest')}<strong>{t('代码托管平台', 'code hosting platform')}</strong>{t('，目前有超过 1 亿开发者在上面存放代码、分享项目、协作开发。', ', with over 100 million developers storing code, sharing projects, and collaborating.')}</p>

        <div className="skill-grid">
          <div className="skill-card" style={{ borderColor: 'rgba(96,165,250,0.3)' }}>
            <span className="skill-icon">☁️</span>
            <h3>{t('代码云备份', 'Cloud Code Backup')}</h3>
            <p>{t('把本地 Git 仓库推送到 GitHub，电脑丢了、坏了，代码永远安全。', 'Push local Git repos to GitHub — your code stays safe even if your computer is lost or broken.')}</p>
            <span className="skill-tag">{t('安全存储', 'Safe Storage')}</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(96,165,250,0.3)' }}>
            <span className="skill-icon">🌍</span>
            <h3>{t('开源社区', 'Open Source Community')}</h3>
            <p>{t('全世界的开发者把代码公开在 GitHub 上，你可以免费使用和学习。React、Vue 等都在这里。', 'Developers worldwide share code publicly on GitHub — free to use and learn from. React, Vue, and more are all here.')}</p>
            <span className="skill-tag">{t('开源生态', 'Open Source')}</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(96,165,250,0.3)' }}>
            <span className="skill-icon">🤝</span>
            <h3>{t('多人协作', 'Team Collaboration')}</h3>
            <p>{t('通过 Pull Request（PR）和 Issues 协调团队开发，是企业项目管理的标准流程。', 'Coordinate team development through Pull Requests (PR) and Issues — the standard workflow for enterprise project management.')}</p>
            <span className="skill-tag">{t('团队协作', 'Collaboration')}</span>
          </div>
          <div className="skill-card" style={{ borderColor: 'rgba(96,165,250,0.3)' }}>
            <span className="skill-icon">🚀</span>
            <h3>{t('自动部署', 'Auto Deploy')}</h3>
            <p>{t('Vercel、Netlify 等平台连接 GitHub 后，每次推送代码自动触发部署，网站自动更新。', 'Connect GitHub to platforms like Vercel and Netlify — every push automatically triggers deployment, updating your site.')}</p>
            <span className="skill-tag">CI/CD</span>
          </div>
        </div>
      </section>

      {/* GIT VS GITHUB */}
      <section id="git-vs-github" className="section">
        <h2><span className="icon-coral">⚖️</span> {t('Git 和 GitHub 的关系', 'Git vs GitHub Relationship')}</h2>
        <p>{t('这是很多新手容易混淆的地方，一张图说清楚：', 'A common point of confusion for beginners — let\'s clarify:')}</p>

        <div className="git-vs">
          <div className="git-vs-box git-side">
            <div className="git-vs-title git-color">🔧 Git</div>
            <ul className="git-vs-list">
              <li>{t('一个', 'A ')}<strong>{t('软件工具', 'software tool')}</strong>{t('，安装在你电脑上', ' installed on your computer')}</li>
              <li>{t('负责', 'Responsible for ')}<strong>{t('追踪代码变化', 'tracking code changes')}</strong>{t('，本地管理版本', ' — manages versions locally')}</li>
              <li>{t('完全', 'Fully ')}<strong>{t('离线', 'offline')}</strong>{t('也能用', ' capable')}</li>
              <li>{t('2005 年由 Linus Torvalds（Linux 之父）创建', 'Created in 2005 by Linus Torvalds (creator of Linux)')}</li>
              <li>{t('开源免费，官网：', 'Free and open source. Website: ')}<a href="https://git-scm.com" target="_blank" rel="noreferrer">git-scm.com</a></li>
            </ul>
          </div>
          <div className="git-vs-sep">≠</div>
          <div className="git-vs-box github-side">
            <div className="git-vs-title github-color">🐙 GitHub</div>
            <ul className="git-vs-list">
              <li>{t('一个', 'A ')}<strong>{t('网站平台', 'website platform')}</strong>{t('，在浏览器里访问', ', accessed in a browser')}</li>
              <li>{t('把 Git 仓库托管到', 'Hosts Git repositories in the ')}<strong>{t('云端', 'cloud')}</strong>{t('，方便分享和协作', ' for easy sharing and collaboration')}</li>
              <li>{t('需要', 'Requires ')}<strong>{t('联网', 'internet')}</strong>{t('才能使用', '')}</li>
              <li>{t('2008 年上线，2018 年被微软收购', 'Launched in 2008, acquired by Microsoft in 2018')}</li>
              <li>{t('基础功能免费，官网：', 'Basic features are free. Website: ')}<a href="https://github.com" target="_blank" rel="noreferrer">github.com</a></li>
            </ul>
          </div>
        </div>

        <div className="highlight-coral">
          <p>{t('🎯 ', '🎯 ')}<strong>{t('类比理解', 'Analogy')}</strong>{t('：Git 就像 Word（你电脑上安装的软件，用来编辑文档），GitHub 就像百度网盘（把文档上传到云端，方便备份和分享）。两者配合使用，但各自独立存在。除了 GitHub，还有 GitLab、Gitee（码云）等类似平台。', ': Git is like Word (software installed on your computer for editing documents), and GitHub is like Google Drive (upload documents to the cloud for backup and sharing). They work together but exist independently. Besides GitHub, there are also GitLab, Gitee, and similar platforms.')}</p>
        </div>
      </section>

      {/* GITHUB TIPS */}
      <section id="github-tips" className="section">
        <h2><span className="icon-coral">⭐</span> {t('GitHub 常用操作', 'GitHub Operations')}</h2>

        <div className="agent-detail">
          <h3>{t('创建第一个仓库', 'Creating Your First Repository')}</h3>
          <ol className="step-list" style={{ marginTop: '1rem' }}>
            <li className="step-item">
              <h4>{t('注册并登录 GitHub', 'Sign Up & Log In to GitHub')}</h4>
              <p>{t('访问', 'Visit')} <a href="https://github.com" target="_blank" rel="noreferrer">github.com</a>{t('，注册一个免费账号。用邮箱注册即可，不需要手机号。', ' to create a free account. Just use your email — no phone number needed.')}</p>
            </li>
            <li className="step-item">
              <h4>{t('创建新仓库', 'Create a New Repository')}</h4>
              <p>{t('点击右上角 "+" → "New repository"，填写仓库名称，选择 Public（公开）或 Private（私有），点击创建。', 'Click "+" in the top right → "New repository", fill in the repo name, choose Public or Private, and click create.')}</p>
            </li>
            <li className="step-item">
              <h4>{t('在本地登录 GitHub（安装 GitHub CLI）', 'Log In Locally (Install GitHub CLI)')}</h4>
              <p>{t('访问', 'Visit')} <a href="https://cli.github.com" target="_blank" rel="noreferrer">cli.github.com</a> {t('下载并安装 GitHub CLI 工具，然后在终端执行登录命令：', 'to download and install GitHub CLI, then run the login command in terminal:')}</p>
              <div className="code-box">
                <div className="comment">{t('# 安装完成后，执行以下命令登录 GitHub：', '# After installation, run the following command to log in:')}</div>
                <div className="cmd">gh auth login</div>
                <div className="comment">{t('# 按提示选择 GitHub.com，选择 HTTPS 协议，并通过浏览器或 Token 完成认证', '# Follow prompts: choose GitHub.com, select HTTPS, and authenticate via browser or token')}</div>
              </div>
            </li>
            <li className="step-item">
              <h4>{t('连接本地仓库', 'Connect Local Repository')}</h4>
              <div className="code-box">
                <div className="comment">{t('# 在本地项目文件夹里执行：', '# Run in your local project folder:')}</div>
                <div className="cmd">git remote add origin https://github.com/{t('你的用户名', 'your-username')}/{t('仓库名', 'repo-name')}.git</div>
                <div className="cmd">git push -u origin main</div>
              </div>
            </li>
          </ol>
        </div>

        <div className="feature-grid" style={{ marginTop: '2rem' }}>
          <div className="feature-item">
            <h4>{t('⭐ Star（收藏）', '⭐ Star (Bookmark)')}</h4>
            <p>{t('点击仓库页面的 Star 按钮可以收藏感兴趣的项目，相当于给项目"点赞"。', 'Click the Star button on a repository page to bookmark interesting projects — like giving a "like".')}</p>
          </div>
          <div className="feature-item">
            <h4>{t('🍴 Fork（派生）', '🍴 Fork')}</h4>
            <p>{t('把别人的仓库复制一份到自己账号，可以自由修改而不影响原仓库。', 'Copy someone else\'s repository to your own account — freely modify without affecting the original.')}</p>
          </div>
          <div className="feature-item">
            <h4>{t('🐛 Issues（问题反馈）', '🐛 Issues')}</h4>
            <p>{t('在别人的项目上提 issue，反馈 Bug 或提功能需求，也是参与开源的方式。', 'Open issues on other projects to report bugs or request features — a way to participate in open source.')}</p>
          </div>
          <div className="feature-item">
            <h4>{t('📄 README', '📄 README')}</h4>
            <p>{t('仓库里的', 'The')} <code>README.md</code> {t('文件会自动显示在首页，用 Markdown 写项目介绍。', 'file in your repo is displayed on the homepage. Use Markdown to introduce your project.')}</p>
          </div>
        </div>

        <div className="callout tip" style={{ marginTop: '2rem' }}>
          <h4>{t('🤖 让 AI 帮你用 Git', '🤖 Let AI Help You with Git')}</h4>
          <p>{t('不熟悉命令？把你的问题告诉 AI 就行，例如："我想撤销上一次提交怎么做？"、"我不小心把密码写进代码提交了，怎么处理？"。AI 会给出精确的命令和步骤，比查文档快多了。', 'Unfamiliar with commands? Just tell AI your problem, e.g., "How do I undo my last commit?" or "I accidentally committed my password into the code, how do I fix it?" AI will give you precise commands and steps — much faster than reading docs.')}</p>
        </div>
      </section>
    </Layout>
  )
}
