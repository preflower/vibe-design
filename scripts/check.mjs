import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { entries, series, sources } from '../data/content.mjs';
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
 assert.match(entry.source.url,/^https:\/\/x\.com\/Kubai087\/status\/\d+$/);
 assert.equal(entry.promptAuthor,'vibe-design');
 assert.ok(entry.steps.length>0);
 for(const id of entry.related)assert.ok(ids.has(id),`Broken related ID ${id}`);
 const md=await readFile(path.join(root,`entries/${entry.id}/index.md`),'utf8');
 assert.ok(md.includes(entry.prompt)&&md.includes(entry.source.url));
 assert.deepEqual(JSON.parse(await readFile(path.join(root,`data/${entry.id}.json`),'utf8')),entry);
}
async function files(folder){const result=[];for(const item of await readdir(folder,{withFileTypes:true})){const p=path.join(folder,item.name);if(item.isDirectory())result.push(...await files(p));else result.push(p);}return result;}
let links=0;
for(const file of await files(root)){
 const text=await readFile(file,'utf8');
 assert.ok(!text.includes('{{'+'SECRET_'),`Placeholder in ${file}`);
 if(!file.endsWith('.html'))continue;
 assert.ok(text.includes('lang="zh-CN"')&&/<h1(?:\s|>)/.test(text),'Missing document semantics');
 for(const match of text.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){
  const url=new URL(match[1],'http://local');let local=path.join(root,decodeURIComponent(url.pathname));
  if((await stat(local)).isDirectory())local=path.join(local,'index.html');
  assert.ok((await stat(local)).isFile(),`Broken link ${match[1]} in ${file}`);links++;
 }
}
console.log(`Verified ${entries.length} entries, matching Markdown/JSON, source attribution and ${links} local links.`);
