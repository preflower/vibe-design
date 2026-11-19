import { topics, categories, entries, updated } from '../data/content.mjs';
import { mediaFor } from './contact-media.mjs';
import { secondarySources } from './library.mjs';

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const noteLink = entry => `<a href="/entries/${entry.id}/"><span>${entry.title}</span><small lang="en">${entry.english}</small></a>`;

function sourceFrame(item, entry, index, total) {
  const video = item.type === 'video';
  const description = item.alt || entry.title + ' · 来源媒体';
  const picture = video
    ? `<video controls playsinline preload="none" aria-label="${escape(description)}"${item.poster ? ` poster="${escape(item.poster)}"` : ''}><source src="${escape(item.localVideo || item.url)}" type="video/mp4"></video>`
    : `<a href="${escape(item.url)}" aria-label="查看完整图片：${escape(description)}"><img src="${escape(item.poster || item.url)}" alt="${escape(description)}" loading="${index ? 'lazy' : 'eager'}"></a>`;
  return `<figure class="source-frame"><div class="media-window">${picture}</div><figcaption><span>${video ? '原帖视频' : '原帖图片'}${total > 1 ? ` · ${index + 1}/${total}` : ''}</span><span class="media-credit">${escape(item.author || entry.source.handle)} · <a href="${escape(item.sourceUrl)}">查看来源帖 ↗</a></span></figcaption></figure>`;
}

export function detailBody(entry) {
  const media = mediaFor(entry);
  const related = entry.related.map(id => entries.find(note => note.id === id)).filter(Boolean);
  const next = entries[(entries.indexOf(entry) + 1) % entries.length];
  return `<main class="film-note" id="main"><nav class="film-trail" aria-label="面包屑"><a href="/">设计笔记</a> / <a href="/?topic=${entry.topic}">${topics[entry.topic]}</a></nav>
  <section class="film-lead${media.length ? '' : ' text-lead'}"><header class="film-title"><p class="film-id"><b>${entry.number}</b> / ${String(entries.length).padStart(2,'0')} · 类型：${categories[entry.category]}</p><h1>${entry.title}</h1><i lang="en">${entry.english}</i><p class="abstract">${entry.summary}</p>
  <div class="film-tags">${entry.tags.map(tag => `<a href="/?q=${encodeURIComponent(tag)}"># ${tag}</a>`).join('')}</div>${entry.episode ? `<a class="film-issue" href="/series/#issue-${entry.episode}">《999 个小技巧》${entry.source.episodeStatus === 'inferred' ? '约 ' : ''}第 ${entry.episode} 期 ↗</a>` : ''}</header>
  ${media.length ? `<div class="film-strip">${media.map((item,index)=>sourceFrame(item,entry,index,media.length)).join('')}</div>` : ''}</section>
  <div class="film-reading"><aside><nav aria-label="本篇目录"><a href="#definition">概念与场景</a><a href="#practice">实践步骤</a><a href="#prompt">提示词</a><a href="#source">来源</a></nav><div class="film-formats"><a href="/entries/${entry.id}/index.md">Markdown ↗</a><a href="/data/${entry.id}.json">JSON ↗</a></div></aside>
  <article><section id="definition"><h2>概念与场景</h2><p>${entry.definition}</p><h3>适用场景</h3><p>${entry.when}</p></section>
  <section id="practice"><h2>实践步骤</h2><ol>${entry.steps.map(step=>`<li>${step}</li>`).join('')}</ol>${entry.code ? `<pre><code>${escape(entry.code)}</code></pre>` : ''}<h3>常见误区</h3><p>${entry.avoid}</p></section>
  <section id="prompt"><div class="film-actions"><h2>${entry.promptKind === 'original' ? '作者原版提示词' : entry.promptKind === 'instructions' ? '作者原帖指令' : '本站练习提示词'}</h2><button type="button" data-copy="prompt-text">复制提示词</button></div><pre class="copy-prompt" id="prompt-text" tabindex="0">${escape(entry.prompt)}</pre><small>${escape(entry.promptAuthor)} ${entry.promptSourceUrls.map((url,index)=>`<a href="${escape(url)}">查看原文${entry.promptSourceUrls.length>1 ? index+1 : ''} ↗</a>`).join(' · ')}</small></section>
  <section id="source"><h2>来源</h2><a class="film-origin" href="${escape(entry.source.url)}">${entry.source.title} ↗</a><p>${entry.source.author} · ${entry.source.handle} · ${entry.source.published}</p>
  ${entry.source.originalCreator ? `<p>案例原作者 <a href="${escape(entry.source.originalCreatorUrl)}">${entry.source.originalCreator} ↗</a></p>` : ''}${secondarySources(entry)}<small>${entry.source.verification} · 整理于 ${updated}</small></section></article></div>
  <section class="film-related"><h2>相关笔记</h2><div>${related.map(noteLink).join('')}</div></section><a class="film-next" href="/entries/${next.id}/">下一篇 · ${next.title} →</a></main>`;
}
