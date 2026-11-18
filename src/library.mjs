import { art, arrow, external, searchIcon } from './visuals.mjs';
import { categories, coverage, entries, series } from '../data/content.mjs';

const escapeAttribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const counts = Object.fromEntries(Object.keys(categories).map(category => [
  category, category === 'all' ? entries.length : entries.filter(entry => entry.category === category).length
]));

function entryRow(entry, index) {
  const search = [entry.title, entry.english, entry.summary, entry.definition, ...entry.tags];
  if (entry.episode) search.push(entry.episode, String(Number(entry.episode)), '999 个小技巧');
  const episodeLabel = entry.episode ? `<span class="issue-chip">${entry.source.episodeStatus === 'inferred' ? '约 ' : '#'}${entry.episode}</span>` : '';
  return `<article class="entry-card atlas-row" data-id="${entry.id}" data-category="${entry.category}"
    data-order="${index}" data-date="${entry.source.published}" data-search="${escapeAttribute(search.join(' ').toLowerCase())}">
    <a href="/entries/${entry.id}/" class="entry-link">
      <div class="row-preview">${art(entry.visual)}</div>
      <div class="row-title"><h3>${entry.title}</h3><span>${entry.english}</span></div>
      <p>${entry.summary}</p>
      <div class="row-meta"><span class="category-label category-${entry.category}">${categories[entry.category]}</span>${episodeLabel}</div>
      <span class="entry-arrow">${arrow}</span>
    </a>
  </article>`;
}

export const library = `<main id="main" class="atlas">
  <section class="atlas-intro" aria-labelledby="atlas-title">
    <div class="atlas-intro-copy">
      <span class="atlas-overline"><i></i> VIBE DESIGN / 知识库</span>
      <h1 id="atlas-title">界面设计<br><em>拆解档案<span>。</span></em></h1>
      <p>查术语、看风格、试技巧。每条都有原帖和可交给 AI 的资料。</p>
      <div class="atlas-actions"><a class="button atlas-primary" href="#library">浏览知识库 ${arrow}</a><a class="atlas-secondary" href="/ai/">给 AI 的资料 ${external}</a></div>
    </div>
    <a class="atlas-feature" href="/entries/scroll-cards/">
      <div class="atlas-feature-meta"><span>最新收录 · 019</span><span aria-hidden="true">↗</span></div>
      ${art('stack')}
      <div class="atlas-feature-title"><div><strong>卡片滚动叙事</strong><span>Scroll-driven cards</span></div><span>查看示例 ${arrow}</span></div>
    </a>
  </section>
  <section id="library" class="atlas-library" aria-labelledby="library-title">
    <aside class="atlas-rail">
      <h2 id="library-title">知识库索引</h2>
      <div class="category-tabs" role="group" aria-label="按分类筛选">
        ${Object.entries(categories).map(([id,label])=>`<button type="button" data-category-filter="${id}" aria-pressed="${id === 'all'}">${label}<span>${counts[id]}</span></button>`).join('')}
      </div>
      <a class="rail-series" href="/series/"><span>《999 个小技巧》</span><span>001–019 ${external}</span></a>
      <a class="rail-sources" href="/about/#sources">来源与覆盖范围 ${external}</a>
    </aside>
    <div class="atlas-results">
      <form class="search-form" role="search">
        <div class="search-box">${searchIcon}<input id="search" type="search" aria-label="搜索设计知识" placeholder="搜圆角、动效、Tooltip 或期号…" autocomplete="off" name="q"><span class="search-key" aria-hidden="true">/</span><button class="clear-search" type="button" aria-label="清空搜索" hidden>×</button></div>
      </form>
      <div class="results-info"><span id="result-count" role="status" aria-live="polite">${entries.length} 条设计笔记</span><label class="sort-label">排序 <select id="sort" aria-label="内容排序"><option value="curated">推荐顺序</option><option value="newest">原帖最新</option><option value="title">名称 A–Z</option></select></label></div>
      <div class="entries-grid atlas-rows">${entries.map(entryRow).join('')}</div>
      <div class="empty-state" hidden><h2>没有找到词条</h2><p>换一个关键词，或回到全部内容。</p><button class="button" id="reset-filters" type="button">查看全部笔记 ${arrow}</button></div>
    </div>
  </section>
</main>`;

export const seriesPage = `<main id="main" class="prose-page series-page">
  <h1>999 个小技巧</h1>
  <p class="page-intro">按原帖期号查看每个主题。已找到第 001–019 期的对应帖子，其中 013 根据发布时间、相邻期数与公开整理推定。</p>
  <div class="series-list">
    ${series.map(issue => `<article class="series-row" id="issue-${issue.number}">
      <div class="series-number">${issue.number}${issue.source.episodeStatus === 'inferred' ? '<span>期号推定</span>' : ''}</div>
      <div><h2>${issue.title}</h2><div class="series-notes">${issue.entries.map(id => {
        const entry = entries.find(note => note.id === id);
        return `<a href="/entries/${id}/">${entry.title} ${arrow}</a>`;
      }).join('')}</div></div>
      <div class="series-origin"><time datetime="${issue.source.published}">${issue.source.published}</time>
        <a href="${issue.source.url}" target="_blank" rel="noopener noreferrer" aria-label="第 ${issue.number} 期原帖">原帖 ${external}</a></div>
    </article>`).join('')}
  </div>
  <p class="series-evidence">${series[12].source.episodeNote} <a href="${series[12].source.episodeEvidenceUrl}">查看交叉线索 ${external}</a></p>
  <div class="inline-code-links"><a href="/data/series.json">下载系列 JSON ${external}</a><a href="/about/#sources">查看来源与覆盖范围 ${external}</a></div>
</main>`;

export const coverageCopy = `<p>截至 ${coverage.retrievedAt}，读取了公开时间线 ${coverage.timelinePages} 页和独立收录索引 ${coverage.archivePages} 页，合并去重后得到 ${coverage.candidatePosts} 个候选帖子 ID。时间线镜像返回的帖子日期为 ${coverage.timelineFrom} 至 ${coverage.timelineTo}。索引也包含转发与重复发布。</p>
  <p>从中选出与设计知识相关的帖子，再通过 FxTwitter 核对作者、正文和日期。候选量是检索范围，收录量以本页已核对的来源列表为准。镜像会遗漏历史帖子，因此范围仍有边界。</p>`;

export function secondarySources(entry) {
  const links = entry.secondarySources.map(source => {
    const creator = source.originalCreator
      ? ` · <a href="${source.originalCreatorUrl}" target="_blank" rel="noopener noreferrer">案例原作者 ${source.originalCreator} ${external}</a>`
      : '';
    return `<p class="creator-credit"><a href="${source.url}" target="_blank" rel="noopener noreferrer">延伸来源 · ${source.title} ${external}</a>${creator}</p>`;
  });
  if (entry.source.episodeNote) links.push(`<p class="creator-credit">${entry.source.episodeNote}</p>`);
  return links.join('');
}

export function aboutPage(sources) {
  const posts = Object.values(sources).sort((a, b) => b.published.localeCompare(a.published));
  return `<main id="main" class="prose-page about-page">
    <h1>内容与来源</h1>
    <p class="page-intro">vibe-design 是给用户和 AI 的静态设计知识库。本站收录 ${entries.length} 条笔记，来自 ${posts.length} 篇 @Kubai087 公开帖子。</p>
    <section id="sources">
      <h2>这次查了哪些内容</h2>
      ${coverageCopy}
      <p>使用了 <a href="https://teapawt.org/Kubai087">公开时间线镜像</a>和<a href="https://tech.sinsc.com/media/rss-twitter-kubai087">收录索引</a>。解释、示例和提示词由本站撰写。</p>
      <div class="source-table">${posts.map(post => `<a href="${post.url}" target="_blank" rel="noopener noreferrer"><time datetime="${post.published}">${post.published}</time><span>${post.title}</span>${external}</a>`).join('')}</div>
    </section>
    <section>
      <h2>内容如何更新</h2>
      <p>维护源数据后重新生成 HTML、Markdown 和 JSON。搜索和示例在浏览器本地运行。最近整理于 ${coverage.retrievedAt}。</p>
      <div class="inline-code-links"><a href="/data/sources.json">下载来源清单 ${external}</a><a href="/ai/">查看 AI 读取方式 ${external}</a></div>
    </section>
  </main>`;
}
