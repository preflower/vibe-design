# vibe-design

静态设计知识库，面向用户与 AI。使用原生 HTML、CSS 与 JavaScript，Node.js 在构建时生成独立词条页；零第三方运行时或构建依赖。

## 本地运行

使用现代 Node.js（建议 22 或更新版本）。不需要安装依赖。

```sh
npm run dev
```

预览：http://127.0.0.1:4173 。修改 `src/` 或 `data/` 后自动重新构建，刷新浏览器即可看到结果。

## 构建与验证

```sh
npm run build
npm run check
```

验证覆盖内容唯一性、关联词条、来源 URL、HTML 内部链接，以及 HTML 使用的源数据和 Markdown/JSON 导出的一致性。输出 `dist/` 可直接用于任意静态托管，不需要服务器执行 JavaScript，不需要 SPA 路由回退。

## 内容维护

- `data/content.mjs`：唯一内容源，定义词条、来源和关联。
- `data/schema.json`：机器可读数据的 JSON Schema。
- `src/visuals.mjs`：本站编写的 HTML/CSS 示意图与交互控件。
- `src/styles.css`：设计变量、布局、图示与响应式样式。
- `src/app.js`：本地搜索、分类、排序、复制与交互示例。
- `scripts/build.mjs`：生成网站、Markdown、JSON、sitemap 与 AI 索引。

新增内容时，先读取公开原帖并核对作者、日期和引用关系，再写独立解释、适用条件与实践步骤。保留稳定 ID；已有 ID 不随标题修改而改变。`promptAuthor` 说明本站提示词的作者，不能将其误标为原帖 Prompt。

目前是手动维护的静态快照，没有自动抓取、后台服务、分析脚本或定时任务。搜索内容仅在浏览器处理，不发送到任何远端。

## 给 AI 的入口

- `/llms.txt`：说明与词条索引。
- `/llms-full.txt`：完整 Markdown，可下载用于离线上下文。
- `/data/entries.json`：全部结构化词条。
- `/data/schema.json`：数据结构。
- `/entries/{id}/index.md`：单条 Markdown。
- `/data/{id}.json`：单条 JSON。

当前 Sites 部署默认私有。外部 AI 无登录能力时，请使用下载的文件。部署到其他域名时，先更新 `data/content.mjs` 中的 `origin`，以及 `data/schema.json` 的 `$id`，再重新构建。

## 来源与创作范围

首批 16 条笔记选题来自 10 篇 @Kubai087 公开帖子。通过公开收录索引发现链接，再通过 FxTwitter 公开帖子预览读取文本。X 直连受限；没有声称读取完整时间线，也没有独立核验视频。

本站没有复制完整帖子、原帖提示词或媒体文件，图示由本站用 HTML/CSS 绘制。定义和实践提示词属于二次整理。涉及引用作品时保留已知原作者，如 Levi Kline 与 @imperry。本项目并非原作者官方网站，也未获官方背书。
