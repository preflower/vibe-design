import { arrow, external } from './visuals.mjs';
import { categories, entries, series, topics, topicHints } from '../data/content.mjs';
import { coverFor } from './contact-media.mjs';

const escapeAttribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const counts = Object.fromEntries(Object.keys(topics).map(topic => [
  topic, topic === 'all' ? entries.length : entries.filter(entry => entry.topic === topic).length
]));

const tasks = [
  { id:'direction', label:'确定视觉风格', hint:'比较拟物、玻璃与字符艺术', notes:[
    'skeuomorphism','liquid-glass','ascii'
  ] },
  { id:'build', label:'建立设计规范', hint:'统一字号、间距、圆角和组件用法', notes:[
    'mobile-web-adaptation','design-tokens','typography-scale','spacing-scale','nested-radius','continuous-corners','semantic-components','choice-controls','icon-states'
  ] },
  { id:'layout', label:'组织页面内容', hint:'排版、对齐、分组与章节导航', notes:[
    'bento-grid','typography-scale','spacing-scale','alignment','optical-alignment','mixed-typesetting',
    'progressive-disclosure','wiki-navigation'
  ] },
  { id:'controls', label:'设计组件与反馈', hint:'选用控件，处理等待、成功和失败', notes:[
    'semantic-components','choice-controls','overlay-choice','hover-timing','cascade-safe-zone','progressive-disclosure',
    'dot-grid-loading','empty-states','loading-states','optimistic-ui','toast','notification','onboarding-preview','drag-feedback','icon-states'
  ] },
  { id:'animate', label:'编排界面动效', hint:'找按压、展开、退场和滚动的参考', notes:[
    'tactile-buttons','book-reveal','drag-feedback','exit-motion','scroll-cards','ring-carousel','parallax-card','halo-ripple','continuity','motion-easing'
  ] },
  { id:'details', label:'打磨视觉细节', hint:'调整图标、材质和纹理', notes:[
    'optical-alignment','icon-simplification','tactile-buttons',
    'blurred-color-gradient','message-bubbles','holographic','glass-fallback','ordered-dither','graphic-halftone'
  ] }
];

const graphicNotes = new Set(['graphic-halftone','ascii','ordered-dither','mixed-typesetting','typography-scale','alignment','spacing-scale','optical-alignment','icon-simplification']);
const materialNotes = new Set(['holographic','liquid-glass','message-bubbles','glass-fallback','halo-ripple','skeuomorphism']);
// Retain the original group membership for bookmarked ?film= links.

function filmFrame(entry, index) {
  const cover = coverFor(entry);
  const topic = graphicNotes.has(entry.id) ? '图形与排版' : materialNotes.has(entry.id) ? '光与材质' : '界面与交互';
  const search = [entry.title, entry.english, entry.summary, entry.definition, ...entry.tags];
  if (entry.episode) search.push(entry.episode, String(Number(entry.episode)), '999 个小技巧');
  return `<figure class="cs-frame" data-entry="${entry.id}"${cover?.previewVideo ? ` data-preview-video="${escapeAttribute(cover.previewVideo)}"` : ''} data-topic="${entry.topic}" data-film-group="${topic}" data-category="${entry.category}" data-order="${index}" data-date="${entry.source.published}"
      data-english="${escapeAttribute(entry.english)}" data-search="${escapeAttribute(search.join(' ').toLowerCase())}">
    <a href="/entries/${entry.id}/" class="cs-image-link" aria-label="阅读《${entry.title}》">
      ${cover ? `<img src="${escapeAttribute(cover.url)}" alt="${escapeAttribute(cover.alt || entry.source.title)}" loading="${index < 3 ? 'eager' : 'lazy'}" decoding="async"><span class="cs-unavailable" hidden>预览图未能载入</span>` : `<span>${entry.english}</span>`}
    </a>
    <figcaption><div class="cs-caption"><span class="cs-number">${entry.number}</span><a class="cs-note-link" href="/entries/${entry.id}/">${entry.title}</a>
      <a class="cs-source-link" href="${escapeAttribute(cover?.sourceUrl || entry.source.url)}" target="_blank" rel="noopener noreferrer">原帖 ↗</a></div>
      <small class="cs-type">${entry.english} · 主题：${topics[entry.topic]} · 类型：${categories[entry.category]}${cover ? ' · ' + (cover.type === 'video' ? '视频' : '图片') : ''}</small><p class="cs-summary">${entry.summary}</p></figcaption></figure>`;
}

export const library = `<main id="main" class="contact-home">
  <section id="library" aria-label="设计笔记"><div class="cs-controls"><div class="cs-heading"><div><h1 lang="en">Vibe Design</h1><p class="cs-intro">从真实界面学设计，查看原帖示例和可复制的提示词。</p></div>
</div>
    <div class="cs-task-list" role="group" aria-label="按开发任务浏览">
      <button type="button" data-task="all" aria-pressed="true">全部笔记</button>
      ${tasks.map(task => `<button type="button" data-task="${task.id}" data-notes="${task.notes.join(' ')}" aria-pressed="false"><strong>${task.label}</strong><small>${task.hint}</small></button>`).join('')}
    </div>
    <div class="cs-bar"><div class="cs-filters" role="group" aria-label="按主题筛选">
      ${Object.entries(topics).map(([id,label])=>`<button type="button" data-topic-filter="${id}"${topicHints[id] ? ` title="${topicHints[id]}"` : ''} aria-pressed="${id==='all'}">${id === 'all' ? '全部主题' : label} <small>${counts[id]}</small></button>`).join('')}</div>
      <div class="cs-view">
      <select id="sort" aria-label="笔记排序"><option value="curated">编排顺序</option><option value="newest">按原帖日期</option><option value="title">英文名称</option></select>
      <button type="button" data-film-size="standard" aria-pressed="true">标准</button><button type="button" data-film-size="large" aria-pressed="false">放大</button></div></div>
    <div id="result-count" role="status">${entries.length} 条设计笔记</div></div>
    <div class="cs-roll"><div class="cs-feed"><div class="cs-film" data-size="standard"><div class="cs-gallery">${entries.map(filmFrame).join('')}</div>
      <div class="cs-empty" hidden><p>没有符合条件的笔记。</p><button id="reset-filters" type="button">查看全部笔记</button></div></div></div>
    <div class="cs-cartridge" aria-hidden="true"><svg class="cs-optics" width="0" height="0" aria-hidden="true"><defs>
      <filter id="cs-film-curve" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feImage preserveAspectRatio="none" result="coordinates"/>
        <feDisplacementMap in="SourceGraphic" in2="coordinates" xChannelSelector="R" yChannelSelector="G"/>
      </filter></defs></svg><div class="cs-bend"></div><div class="cs-cassette-front"><img src="/film-cassette.webp" alt="" width="1536" height="856" decoding="sync"></div></div></div></section></main>`;

export const seriesPage = `<main id="main" class="prose-page series-page">
  <h1>书籍</h1>
  <div class="book-shelf"><details class="series-book">
    <summary aria-label="《999 个小技巧》目录">
      <span class="book-cover"><span class="book-face">
        <span class="book-imprint"><img src="/vibe-design-icon.png" alt="">Vibe Design</span>
        <strong class="book-title"><span>999</span>个小技巧</strong>
        <span class="book-range">第 ${series[0].number}—${series.at(-1).number} 期</span>
      </span><span class="book-inside" aria-hidden="true"><img src="/vibe-design-icon.png" alt="">Vibe Design</span></span>
      <span class="book-action"><span class="when-closed">展开目录</span><span class="when-open">收起目录</span><b aria-hidden="true"></b></span>
    </summary>
  <div class="book-paper" role="region" aria-label="999 个小技巧目录" tabindex="0"><h2 class="book-contents-title">目录</h2>
  <div class="series-list">
    ${series.map(issue => `<article class="series-row" id="issue-${issue.number}">
      <div class="series-number">${issue.number}</div>
      <div><h2>${issue.title}</h2><div class="series-notes">${issue.entries.map(id => {
        const entry = entries.find(note => note.id === id);
        return `<a href="/entries/${id}/">${entry.title} ${arrow}</a>`;
      }).join('')}</div></div>
      <div class="series-origin"><time datetime="${issue.source.published}">${issue.source.published}</time>
        <a href="${issue.source.url}" target="_blank" rel="noopener noreferrer" aria-label="第 ${issue.number} 期原帖">原帖 ${external}</a></div>
    </article>`).join('')}
  </div>
  <div class="inline-code-links"><a href="/data/series.json">下载系列 JSON ${external}</a><a href="/about/#sources">查看原帖来源 ${external}</a></div>
  </div></details></div>
  <dialog class="book-reader" aria-label="阅读《999 个小技巧》"></dialog>
</main>`;

export function secondarySources(entry) {
  const links = entry.secondarySources.map(source => {
    const creator = source.originalCreator
      ? ` · <a href="${source.originalCreatorUrl}" target="_blank" rel="noopener noreferrer">案例原作者 ${source.originalCreator} ${external}</a>`
      : '';
    return `<p class="creator-credit"><a href="${source.url}" target="_blank" rel="noopener noreferrer">延伸来源 · ${source.title} ${external}</a>${creator}</p>`;
  });
  return links.join('');
}

export function aboutPage(sources) {
  const posts = Object.values(sources).sort((a, b) => b.published.localeCompare(a.published));
  return `<main id="main" class="prose-page about-page">
    <h1 id="sources">原帖来源</h1>
      <div class="source-table">${posts.map(post => `<a href="${post.url}" target="_blank" rel="noopener noreferrer"><time datetime="${post.published}">${post.published}</time><span>${post.title}</span>${external}</a>`).join('')}</div>
  </main>`;
}
