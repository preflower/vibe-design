# Vibe Design

[在线预览](https://preflower.github.io/vite-design/)

静态设计知识库，面向用户与 AI。使用原生 HTML、CSS 与 JavaScript，Node.js 在构建时生成独立词条页；零第三方运行时或构建依赖。

## 本地运行

使用现代 Node.js（建议 22 或更新版本）。不需要安装依赖。

```sh
npm run dev
```

本地开发时，打开终端输出的地址。修改 `src/` 或 `data/` 后自动重新构建，刷新浏览器即可看到结果。

## 构建与验证

```sh
npm run build
npm run check
```

验证覆盖内容唯一性、关联词条、来源 URL、HTML 内部链接，以及 HTML 使用的源数据和 Markdown/JSON 导出的一致性。输出 `dist/` 可直接用于任意静态托管，不需要服务器执行 JavaScript，不需要 SPA 路由回退。

## 内容维护

- `data/content.mjs`：整合词条与来源，定义分类和关联。
- `data/sources.mjs`：31 篇核对过的原帖元数据、系列对应关系及检索覆盖范围。
- `data/expanded.mjs`：新版新增词条。
- `data/schema.json`：机器可读数据的 JSON Schema。
- `data/media.json` 和 `assets/source-media/`：来源媒体与归属、原始照片、视频封面及播放用的原始 MP4。
- `src/contact-media.mjs` 和 `src/contact-detail.mjs`：按来源解析媒体与生成详情页。
- `src/styles.css`：基础布局；接触印样的页面样式位于 `src/contact.css` 与 `src/contact-home.css`。
- `src/app.js`：本地搜索、分类、排序、复制及精选印样的筛选和尺寸切换。
- `scripts/build.mjs`：生成网站、Markdown、JSON、sitemap 与 AI 索引。

新增内容时，先读取公开原帖并核对作者、日期和引用关系，再写独立解释、适用条件与实践步骤。保留稳定 ID；已有 ID 不随标题修改而改变。`promptAuthor` 与 `promptSourceUrls` 记录提示词作者及具体来源帖或回复。

目前是手动维护的静态快照，没有自动抓取、后台服务、分析脚本或定时任务。搜索内容仅在浏览器处理，不发送到任何远端。

## 给 AI 的入口

- `/llms.txt`：说明与词条索引。
- `/llms-full.txt`：完整 Markdown，可下载用于离线上下文。
- `/data/entries.json`：全部结构化词条。
- `/series/`：系列目录，可直接打开原帖。
- `/data/series.json`：系列目录与期号说明。
- `/data/sources.json`：原帖清单及检索范围。
- `/data/schema.json`：数据结构。
- `/entries/{id}/index.md`：单条 Markdown。
- `/data/{id}.json`：单条 JSON。

以上路径均相对于在线站点首页。推送到 `main` 后，GitHub Actions 自动构建、检查并发布到 GitHub Pages。

## 来源与创作范围

新版 37 条笔记选题来自 31 篇 @Kubai087 公开帖子。2026-11-18 分页读取了公开时间线镜像 31 页和独立索引 10 页，合并去重后得到 523 个候选帖子 ID。时间线镜像返回的帖子日期是 2026-02-12 至 2026-11-18。选中的原帖经 FxTwitter 逐条核对正文、作者和日期。013 期号由发布时间、相邻期数和公开整理推定。镜像存在缺口，收录不覆盖完整账号历史。

首页印样取自来源帖的照片或视频封面。详情使用原色照片及原帖视频，各媒体单独标明发布者与来源。视频由本站提供经过完整性验证的原始 MP4。解释由本站整理。作者公开给出的提示词使用原文并标注出处，本站补充的提示词单独标为练习。涉及引用作品时保留已知原作者，如 Levi Kline 与 @imperry。本项目并非原作者官方网站，也未获官方背书。
