import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { mediaFor } from '../src/contact-media.mjs';
import { fileURLToPath } from 'node:url';
import { entries, series, sources, topics } from '../data/content.mjs';
const root=fileURLToPath(new URL('../dist',import.meta.url));
const ids=new Set(entries.map(e=>e.id));
assert.equal(ids.size,entries.length,'Duplicate IDs');
const sourceIds = new Set(Object.values(sources).map(source => source.id));
assert.equal(sourceIds.size, Object.keys(sources).length, 'Duplicate post IDs');
const exportedSeries = JSON.parse(await readFile(path.join(root, 'data/series.json'), 'utf8'));
assert.deepEqual(exportedSeries.series, series);
for (const issue of series) {
 assert.ok(sourceIds.has(issue.source.id), `Unknown source for issue ${issue.number}`);
 for (const id of issue.entries) {
  const entry = entries.find(note => note.id === id);
  assert.ok(entry && entry.episode === issue.number && entry.source.id === issue.source.id, `Episode source mismatch for ${id}`);
 }
}
const dataset=JSON.parse(await readFile(path.join(root,'data/entries.json'),'utf8'));
assert.deepEqual(dataset.entries,entries,'Machine data differs from source');
for(const entry of entries){
 assert.ok(entry.topic !== 'all' && Object.hasOwn(topics,entry.topic), `Missing or invalid topic: ${entry.id}`);
 assert.match(entry.source.url,/^https:\/\/x\.com\/Kubai087\/status\/\d+$/);
 assert.ok(entry.prompt.trim());
 if(entry.promptKind==='editorial')assert.equal(entry.promptAuthor,'vibe-design');
 else {
  assert.equal(entry.promptAuthor,entry.source.handle);
  assert.ok(entry.promptSourceUrls.length>0);
 }

 assert.ok(entry.steps.length>0);
 for(const id of entry.related)assert.ok(ids.has(id),`Broken related ID ${id}`);
 const md=await readFile(path.join(root,`entries/${entry.id}/index.md`),'utf8');
 assert.ok(md.includes(entry.prompt)&&md.includes(entry.source.url));
 assert.deepEqual(JSON.parse(await readFile(path.join(root,`data/${entry.id}.json`),'utf8')),entry);
 const detail=await readFile(path.join(root,`entries/${entry.id}/index.html`),'utf8');
 for(const media of mediaFor(entry)){
  assert.ok(detail.includes(media.sourceUrl),`Missing attribution: ${entry.id}`);
  assert.ok(detail.includes(media.poster),`Missing source image: ${entry.id}`);
  if(media.type==='video')assert.ok(detail.includes(media.localVideo || media.url),`Missing source video: ${entry.id}`);
 }
 assert.ok(!detail.includes('data-demo='),`Unexpected recreated demo: ${entry.id}`);

}
async function files(folder){const result=[];for(const item of await readdir(folder,{withFileTypes:true})){const p=path.join(folder,item.name);if(item.isDirectory())result.push(...await files(p));else result.push(p);}return result;}
const basePath = process.env.SITE_URL ? new URL(process.env.SITE_URL).pathname.replace(/\/$/, '') : '';
let links=0;
for(const file of await files(root)){
 if(!/\.(html|json|md|txt|css|js|svg|xml)$/.test(file))continue;
 const text=await readFile(file,'utf8');
 assert.ok(!text.includes('{{'+'SECRET_'),`Placeholder in ${file}`);
 if(!file.endsWith('.html'))continue;
 assert.ok(text.includes('lang="zh-CN"')&&/<h1(?:\s|>)/.test(text),'Missing document semantics');
 for(const match of text.matchAll(/(?:href|src|poster)="(\/[^"#]*)(?:#[^"]*)?"/g)){
  const url=new URL(match[1],'http://local');assert.ok(url.pathname.startsWith(basePath+'/'), 'Link outside site: '+url.pathname);
  let local=path.join(root,decodeURIComponent(url.pathname.slice(basePath.length)));
  if((await stat(local)).isDirectory())local=path.join(local,'index.html');
  assert.ok((await stat(local)).isFile(),`Broken link ${match[1]} in ${file}`);links++;
 }
}
console.log(`Verified ${entries.length} entries, matching Markdown/JSON, source attribution and ${links} local links.`);
