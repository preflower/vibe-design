export const arrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const external = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const searchIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.6"/><path d="m16 16 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
export const logo = '<svg class="brand-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 8h7l5 16L21 8h7L17 28h-3L4 8Z" fill="currentColor"/><path d="m7 4 2 3M25 4l-2 3M16 1v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
export function asciiArt(density = 1) {
  const chars = ' .:+*#%@'; let out = '';
  for (let y = -9; y <= 9; y++) {
    for (let x = -20; x <= 20; x++) {
      const d = (x / 19) ** 2 + (y / 9) ** 2;
      const v = d < 1 ? Math.max(1, Math.round((1 - Math.sqrt(d)) * 4 + ((x + y) / 7 + 4) % 3)) : 0;
      out += chars[Math.min(7, Math.round(v * density))];
    }
    out += '\n';
  }
  return out;
}
function ditherPattern() {
  const bayer = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
  return Array.from({ length: 20 }, (_, y) =>
    Array.from({ length: 32 }, (_, x) => {
      const radius = Math.hypot((x - 15) / 18, (y - 9) / 11);
      const value = Math.max(0, 1 - radius);
      return `<i${value > (bayer[y % 4][x % 4] + .5) / 16 ? " data-on" : ""}></i>`;
    }).join("")
  ).join("");
}
const dither = ditherPattern();
const newArt = {
  tactile: '<div class="tactile-sample"><span>主要操作</span><span>次要操作</span></div>',
  cascade: '<div class="cascade-sample"><div><span>移动至</span><span>复制</span></div><i>↗</i><div><span>工作区</span><span>收藏夹</span></div></div>',
  halftone: '<div class="halftone-sample"><i></i></div>',
  stack: '<div class="stack-art"><div class="stack-card">OUT</div><div class="stack-card">MOVE</div><div class="stack-card">SCROLL STUDY<span>STACK.</span><i>↓</i></div></div>',
  dither: `<div class="dither-sample">${dither}</div>`,
  glass: '<i class="glass-bead"></i><div class="glass-sample">GLASS</div>',
  easing: '<div class="easing-sample"><div class="easing-track">Linear<i></i></div><div class="easing-track">Ease out<i></i></div><div class="easing-track">In / out<i></i></div></div>',
  bubbles: '<div class="bubbles-sample"><i>试试换一种材质</i><i>对比文字和背景</i><i>保留可读性</i></div>',
  halo: '<div class="halo-sample"></div>',
  leaving: '<div class="leaving-sample"><i></i><i></i><i></i></div>',
  loading: '<div class="loading-sample"><i></i><i></i><i></i><i></i></div>',
  optical: '<div class="optical-sample"><span><i>▶</i>几何中心</span><span><i>▶</i>光学修正</span></div>',
  wiki: '<div class="wiki-sample"><span></span><span></span><span></span></div>',
  overlay: '<div class="overlay-sample"><span>Tooltip</span><span>Popover</span><span>Drawer</span><span>Dialog</span></div>',
  bento: '<div class="bento-sample"><i></i><i></i><i></i><i></i></div>'
};
const demoCaptions = {
  tactile: '用相同的光源和不同的表面高度区分操作层级。',
  cascade: '有色三角表示从最近指针位置通向子菜单的区域。',
  halftone: '点径与覆盖面积随视觉区域变化，用点阵表现明暗。',
  dither: '点阵模拟了有限色阶下的亮暗过渡。',
  glass: '示意叠色、高光与背景模糊。浏览器支持不足时使用实体填充。',
  bubbles: '三条消息演示了气泡形状、对齐与文字对比。',
  halo: '静态示意。外圈表示从触发点向周围扩散的高光。',
  leaving: '中间卡片即将离场，留下的位置由相邻卡片填补。',
  loading: '骨架屏使用与最终内容相近的结构，减少原位替换时的跳动。',
  optical: '对比图形的几何中心与小幅偏移后的视觉位置。',
  wiki: '左侧导航、中间正文、右侧页内目录。',
  overlay: '四种常见浮层，含义取决于内容和焦点行为。',
  bento: '共用网格里，主要功能块占用更多空间。'
};
export function art(type) {
  const arts = {
    radius: '<div class="radius-outer"><span class="measure outer-measure">R 32</span><div class="radius-inner"><span class="radius-dot"></span><span class="radius-formula">r = R − p</span><span class="measure inner-measure">r 20</span></div><span class="radius-gap">12</span></div><span class="art-caption">同一个圆心，恰好的距离。</span>',
    tokens: '<div class="token-sheet"><div><i class="swatch purple"></i><code>color.action</code><span>紫罗兰</span></div><div><i class="swatch peach"></i><code>color.accent</code><span>杏桃</span></div><div><i class="swatch paper"></i><code>color.surface</code><span>纸白</span></div></div><span class="floating-label">one decision, everywhere.</span>',
    skeuo: '<div class="physical-player"><div class="player-top"><span>DAYLIGHT</span><span>•••</span></div><div class="player-body"><div class="knob"><div class="knob-center"><i></i></div></div><div class="player-track"><span>Take it slow.</span><small>Sound of a quiet morning</small><div class="track-line"><i></i></div></div></div><div class="player-bottom"><span>01:24</span><span>Ⅱ</span><span>03:56</span></div></div>',
    corners: '<div class="corner-pair"><div><i class="normal-corner"></i><span>圆弧</span></div><div><i class="continuous-corner"></i><span>连续曲率</span></div></div>',
    spacing: '<div class="space-diagram"><div style="--n:8px"><code>08</code><i></i><b></b></div><div style="--n:16px"><code>16</code><i></i><b></b></div><div style="--n:24px"><code>24</code><i></i><b></b></div><div style="--n:32px"><code>32</code><i></i><b></b></div></div><span class="art-caption">距离，是关系的一部分。</span>',
    continuity: '<div class="morph-demo"><div class="morph-button"><span>+</span></div><div class="morph-menu"><span>新建笔记</span><span>导入文件</span><span>创建文件夹</span></div></div><span class="art-caption">一个对象，两个状态。</span>',
    toast: '<div class="ghost-window"><i></i><i></i><i></i><div class="ghost-lines"></div></div><div class="sample-toast"><i>✓</i><span>更改已保存</span><small>刚刚</small></div>',
    notification: '<div class="notice-shadow"></div><div class="sample-notification"><i>↗</i><div><strong>你的导出已准备好</strong><span>design-notes.pdf</span><small>刚刚 · 文件导出</small></div><b>1</b></div>',
    holo: '<div class="holo-card"><span class="holo-wordmark">vibe.</span><div class="holo-orb"></div><span class="holo-bottom">A LITTLE MORE FEELING.<b>NO. 0001</b></span></div>',
    ascii: `<pre class="ascii-art">${asciiArt()}</pre><span class="art-caption mono">. : + * # % @</span>`,
    alignment: '<div class="alignment-sheet"><span class="align-line"></span><div><i></i><span>让信息找到</span></div><div><i></i><strong>共同的起点。</strong></div><div><i></i><small>A little order goes a long way.</small></div></div>',
    type: '<div class="type-sheet"><span class="type-big">Aa<span>字</span></span><div><span>清晰，从层级开始。</span><small>Hierarchy makes room for meaning.</small></div><i>12 / 16 / 24 / 40</i></div>',
    disclosure: '<div class="disclosure-sheet"><div><span>先看到重要的事</span><b>↓</b></div><div class="disclosed">需要的时候，再多了解一点。<br><small>Details, when you need them.</small></div></div>',
    drag: '<div class="drag-stack"><div><i>⠿</i><span>发现灵感</span><small>01</small></div><div class="picked"><i>⠿</i><span>整理想法</span><small>02</small></div><div><i>⠿</i><span>开始创造</span><small>03</small></div></div>',
    book: '<div class="little-book"><div class="book-page page-3"></div><div class="book-page page-2"></div><div class="book-page page-1"></div><div class="book-cover"><small>FIELD NOTES / 016</small><strong>Things<br>worth<br>noticing.</strong><span>设计里的小心思 ↗</span></div></div>',
    semantic: '<div class="semantic-sheet"><div><span>去一个地方</span><span class="semantic-link">阅读指南 ↗</span></div><div><span>做一件事情</span><span class="semantic-button">开始创作</span></div><div><span>改变一个状态</span><span class="semantic-switch"><i></i></span></div></div>'
  };
  return `<div class="art art-${type}" aria-hidden="true">${newArt[type] || arts[type] || ''}</div>`;
}
export function demo(entry) {
  let control = '';
  const button = (text, action = 'toggle') => `<button class="button small" data-demo-action="${action}" type="button">${text}</button>`;
  if (entry.visual === 'stack') control = '<label>卡片展开程度 <input type="range" min="0" max="100" value="0" data-demo-range="stack"><output>0%</output></label>';
  else if (entry.visual === 'easing') control = button('比较缓动曲线', 'easing');
  else if (demoCaptions[entry.visual]) control = `<p class="demo-caption">${demoCaptions[entry.visual]}</p>`;
  else if (entry.visual === 'radius') control = '<label>内缩距离 <input type="range" min="4" max="24" step="4" value="12" data-demo-range="radius"><output>12px</output></label>';
  else if (entry.visual === 'spacing') control = '<label>基础间距 <input type="range" min="4" max="12" step="2" value="8" data-demo-range="spacing"><output>8px</output></label>';
  else if (entry.visual === 'ascii') control = '<label>字符密度 <input type="range" min="5" max="15" value="10" data-demo-range="ascii"><output>1.0×</output></label>';
  else if (entry.visual === 'type') control = '<label>标题大小 <input type="range" min="40" max="88" step="4" value="68" data-demo-range="type"><output>68px</output></label>';
  else if (entry.visual === 'tokens') control = '<span>切换 action 变量</span><div class="color-choices"><button class="color-choice" data-color="purple" aria-label="使用紫色" aria-pressed="true"></button><button class="color-choice green" data-color="green" aria-label="使用绿色" aria-pressed="false"></button><button class="color-choice orange" data-color="orange" aria-label="使用橙色" aria-pressed="false"></button></div>';
  else if (entry.visual === 'corners') control = '<p class="support-note" data-support-note>不支持时保留普通圆角；两个轮廓可能相同。</p>';
  else if (entry.visual === 'toast') control = button('模拟保存反馈', 'toast');
  else if (entry.visual === 'notification') control = button('关闭通知', 'notification') + '<span>通知会保留，直到你主动关闭。</span>';
  else if (entry.visual === 'holo') control = button('切换观察角度', 'holo') + '<span>也可以把指针移到卡片上。</span>';
  else if (entry.visual === 'alignment') control = button('对比：取消对齐') + '<span data-demo-status>当前：统一左对齐</span>';
  else if (entry.visual === 'drag') control = '<label for="sort-item">移动项目</label><select id="sort-item"><option value="0">发现灵感</option><option value="1" selected>整理想法</option><option value="2">开始创造</option></select>' + button('上移 ↑', 'up') + button('下移 ↓', 'down');
  else if (entry.visual === 'disclosure') control = '<details><summary>为什么这样组织信息？</summary><p>关键内容先保持可见。只有在需要了解背景时，才展开补充说明。</p></details>';
  else if (entry.visual === 'semantic') control = '<label class="native-switch"><input type="checkbox" role="switch" checked data-native-switch> 接收更新提醒（仅演示）</label>';
  else if (entry.visual === 'skeuo') control = button('按下控件') + '<span data-demo-status>当前：抬起状态</span>';
  else if (entry.visual === 'book') control = button('翻开这本小书') + '<span data-demo-status>当前：合上</span>';
  else control = button('展开菜单') + '<span data-demo-status>当前：收起</span>';
  return `<section class="live-demo" data-demo="${entry.visual}" aria-label="${entry.title}交互示例">${art(entry.visual)}<div class="demo-controls">${control}</div><div class="sr-only" aria-live="polite" data-demo-announcement></div></section>`;
}
