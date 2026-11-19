import { mkdir, writeFile, cp, rm, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { entries, categories, sources, series, coverage, updated, origin as defaultOrigin } from '../data/content.mjs';
import { arrow, external, searchIcon } from '../src/visuals.mjs';
import { coverFor } from '../src/contact-media.mjs';
import { mediaFor } from '../src/contact-media.mjs';
import { detailBody } from '../src/contact-detail.mjs';
import { library, seriesPage, aboutPage } from '../src/library.mjs';
const root = fileURLToPath(new URL('..', import.meta.url));
const dist = path.join(root, 'dist');
const origin = (process.env.SITE_URL || defaultOrigin).replace(/\/$/, '');
const basePath = process.env.SITE_URL ? new URL(origin).pathname.replace(/\/$/, '') : '';
const localAsset = value => value?.startsWith('/') ? basePath + value : value;
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const searchDialog = `<dialog class="search-palette" aria-label="搜索设计笔记">
      <div class="palette-bar">${searchIcon}<input id="search" type="text" role="combobox" aria-label="搜索设计笔记" aria-expanded="true" aria-controls="palette-results" aria-autocomplete="list" autocomplete="off" placeholder="搜索笔记、术语或关键词"><button type="button" class="palette-close" aria-label="关闭搜索">Esc</button></div>
      <div id="palette-results" role="listbox" aria-label="匹配的笔记"></div><p class="palette-empty" hidden>没有找到匹配的笔记</p>
      <div class="palette-help"><span role="status"></span><span>↑ ↓ 选择　↵ 打开</span></div>
    </dialog>`;
const header = active => `<a class="skip-link" href="#main">跳到正文</a><header class="site-header"><a class="brand" href="/" aria-label="Vibe Design 首页"><img class="brand-icon" src="/vibe-design-icon-light.png" width="28" height="28" alt=""><span>Vibe Design</span></a><nav aria-label="主导航"><a href="/" ${active==='library'?'aria-current="page"':''}>首页</a><a href="/series/" ${active==='series'?'aria-current="page"':''}>书籍</a><a href="/about/" ${active==='about'?'aria-current="page"':''}>关于</a></nav><button class="global-search" type="button" aria-haspopup="dialog" aria-label="全站搜索">${searchIcon}</button></header>${searchDialog}`;
function page(title, body, active='library', description='给用户与 AI 的设计知识库。设计术语、设计风格、设计技巧，用清楚的解释和可操作示例，把感觉变成共同语言。', canonical='/') {
  const pageTitle = canonical === '/' && title === 'Vibe Design' ? title : title + ' · Vibe Design';
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#20211f"><title>${esc(pageTitle)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${origin}${canonical}"><meta property="og:title" content="${esc(pageTitle)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:locale" content="zh_CN"><link rel="icon" href="/vibe-design-icon.png?v=gecko-alpha" type="image/png"><link rel="icon" media="(prefers-color-scheme: dark)" href="/vibe-design-icon-light.png" type="image/png"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/contact.css">${canonical === '/' ? '<link rel="stylesheet" href="/contact-home.css">' : ''}<link rel="alternate" type="application/json" href="/data/entries.json" title="结构化知识库"><link rel="alternate" type="text/markdown" href="/llms-full.txt" title="完整 Markdown"><script type="module" src="/app.js"></script></head><body>${header(active)}${body}<div class="toast-message" role="status" aria-live="polite"></div></body></html>`.replace(/(\s(?:href|src|poster|data-preview-video)=")\/(?!\/)/g, (_, attr) => attr + basePath + '/');
}
function markdown(e) {
  return [`# ${e.title} / ${e.english}`,`ID: ${e.id}\n分类: ${categories[e.category]}\n标签: ${e.tags.join(', ')}`,e.summary,mediaFor(e).length ? '## 来源媒体\n'+mediaFor(e).map(m=>`- [${m.type==='video'?'视频':'图片'} · ${m.author}](${m.sourceUrl})`).join('\n') : '',`## 解释（本站整理）\n${e.definition}`,`## 适用场景\n${e.when}`,`## 怎么用\n${e.steps.map(s=>'- '+s).join('\n')}`,`## 应避免的问题\n${e.avoid}`,`## ${e.promptKind === 'editorial' ? '本站练习提示词' : '作者原帖指令与提示词'}（${e.promptAuthor}）\n${e.prompt}${e.promptSourceUrls.map(url => `\n\n提示词原文：${url}`).join('')}`,e.code?'## 代码示意\n```css\n'+e.code+'\n```':'',`## 来源\n- 原帖: ${e.source.url}\n- 作者: ${e.source.author} (${e.source.handle})\n- 发布: ${e.source.published}\n- 读取方式: ${e.source.verification}\n- 预览接口: ${e.source.retrievalUrl}\n${e.source.originalCreator?'- 案例原作者: '+e.source.originalCreator+'\n- 案例原帖: '+e.source.originalCreatorUrl+'\n':''}- 收录时间: ${updated}\n- ${e.source.note}${e.source.episodeNote?"\n- 期号说明: "+e.source.episodeNote:""}${e.secondarySources.length?"\n- 相关来源: "+e.secondarySources.map(source=>source.url).join(", "):""}`,`笔记解释由本站整理。`].filter(Boolean).join('\n\n')+'\n';
}
const about = aboutPage(sources);
await rm(dist,{recursive:true,force:true});
for(const folder of ['data','about','series']) await mkdir(path.join(dist,folder),{recursive:true});
const searchIndex = entries.map(entry => ({
  id:entry.id, title:entry.title, english:entry.english, cover:localAsset(coverFor(entry)?.url),
  keywords:[entry.title,entry.english,entry.summary,entry.definition,...entry.tags,
    ...(entry.episode ? [entry.episode,String(Number(entry.episode)),'999 个小技巧'] : [])].join(' ').toLowerCase()
}));
await writeFile(path.join(dist,'search-index.js'), 'export default ' + JSON.stringify(searchIndex) + ';');
await writeFile(path.join(dist,'index.html'),page('Vibe Design',library));
await writeFile(path.join(dist,'about/index.html'),page('关于这份设计手册',about,'about',undefined,'/about/'));
await writeFile(path.join(dist,'series/index.html'),page('书籍',seriesPage,'series',undefined,'/series/'));
await writeFile(path.join(dist,'data/series.json'),JSON.stringify({coverage,series},null,2));
await writeFile(path.join(dist,'data/sources.json'),JSON.stringify({coverage,sources:Object.values(sources)},null,2));
await writeFile(path.join(dist,'404.html'),page('没有找到这页笔记',`<main id="main" class="prose-page not-found"><span class="page-kicker">404 / A PAGE YET TO BE DESIGNED</span><h1>这里，还留着白。</h1><p class="page-intro">这条链接没有对应的笔记。回到知识库，试试搜索你想了解的内容。</p><a class="button" href="/">回到知识库 ${arrow}</a></main>`));
for(const e of entries){
 await mkdir(path.join(dist,'entries',e.id),{recursive:true});
 await writeFile(path.join(dist,'entries',e.id,'index.html'),page(e.title,detailBody(e),'library',e.summary,`/entries/${e.id}/`));
 await writeFile(path.join(dist,'entries',e.id,'index.md'),markdown(e));
 await writeFile(path.join(dist,'data',`${e.id}.json`),JSON.stringify(e,null,2));
}
await cp(path.join(root,'assets/source-media'),path.join(dist,'assets/source-media'),{recursive:true});
await writeFile(path.join(dist,'data/entries.json'),JSON.stringify({$schema:`${origin}/data/schema.json`,version:1,name:'Vibe Design',language:'zh-CN',updated,editorialPolicy:'解释由本站编写，提示词按条保留作者与出处。',entries},null,2));
for(const [from,to] of [['src/styles.css','styles.css'],['src/contact.css','contact.css'],['src/contact-home.css','contact-home.css'],['assets/film-cassette.webp','film-cassette.webp'],['src/app.js','app.js']]) await cp(path.join(root,from),path.join(dist,to));
const schema = JSON.parse(await readFile(path.join(root,'data/schema.json'), 'utf8'));
schema.$id = origin + '/data/schema.json';
await writeFile(path.join(dist,'data/schema.json'), JSON.stringify(schema, null, 2));
const media = JSON.parse(await readFile(path.join(root,'data/media.json'), 'utf8'));
await writeFile(path.join(dist,'data/media.json'), JSON.stringify(media, (_,value) =>
  typeof value === 'string' && value.startsWith('/assets/') ? localAsset(value) : value, 2));
await writeFile(path.join(dist,'llms.txt'),`# Vibe Design\n\n> 给用户与 AI 的静态设计知识库。${entries.length} 条笔记，选题来自 ${Object.keys(sources).length} 篇公开帖子。\n\n## 阅读约定\n- 正文是本站解释，非原帖逐字摘录。\n- 提示词按条标明作者和出处。\n- 引用保留 source.url 和 author；转引案例保留 originalCreator。\n- 原帖文本经公开预览接口读取，视频未独立核验。\n- 规则结合实际语义使用；浏览器能力用运行时检测。\n\n## 入口\n- [完整 Markdown](${origin}/llms-full.txt)\n- [JSON 数据](${origin}/data/entries.json)\n- [JSON Schema](${origin}/data/schema.json)\n- [来源与覆盖范围](${origin}/about/#sources)\n- [系列目录 JSON](${origin}/data/series.json)\n\n## 词条\n${entries.map(e=>`- [${e.title} / ${e.english}](${origin}/entries/${e.id}/index.md): ${e.summary}`).join('\n')}\n`);
await writeFile(path.join(dist,'llms-full.txt'),`# Vibe Design 完整设计笔记\n\n整理时间: ${updated}\n\n解释由本站编写。提示词作者按条标注。每条保留原帖与读取方式。请结合项目语义使用，不要将本文当作作者逐字表述。\n\n`+entries.map(markdown).join('\n---\n\n'));
await writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/','/about/','/series/',...entries.map(e=>`/entries/${e.id}/`)].map(p=>`<url><loc>${origin}${p}</loc><lastmod>${updated}</lastmod></url>`).join('')}</urlset>`);
await cp(path.join(root,'assets/vibe-design-icon.png'),path.join(dist,'vibe-design-icon.png'));
await cp(path.join(root,'assets/vibe-design-icon-light.png'),path.join(dist,'vibe-design-icon-light.png'));
console.log(`Built ${entries.length} entries, ${Object.keys(sources).length} sources, HTML + Markdown + JSON → dist/`);
