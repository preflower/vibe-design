const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let toastTimer;
function announce(message) {
  const toast = $('.toast-message');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
}
const input = $('#search');
if (input) {
  const grid = $('.entries-grid');
  const cards = $$('.entry-card', grid);
  const filters = $$('[data-category-filter]');
  const sort = $('#sort');
  let category = 'all';
  function update(sync = true) {
    const terms = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let total = 0;
    for (const card of cards) {
      const match = (category === 'all' || card.dataset.category === category) && terms.every(t => card.dataset.search.includes(t));
      card.hidden = !match;
      if (match) total++;
    }
    const ordered = [...cards].sort((a,b) => sort.value === 'newest' ? b.dataset.date.localeCompare(a.dataset.date) || Number(a.dataset.order)-Number(b.dataset.order) : sort.value === 'title' ? $('h2>span',a).textContent.localeCompare($('h2>span',b).textContent,'en') : Number(a.dataset.order)-Number(b.dataset.order));
    ordered.forEach(card => grid.append(card));
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.categoryFilter === category)));
    grid.classList.toggle('is-filtered', category !== 'all' || terms.length > 0 || sort.value !== 'curated');
    $('#result-count').textContent = `${total} 条设计笔记${terms.length ? ' · 搜索结果' : ''}`;
    $('.empty-state').hidden = total !== 0;
    $('.clear-search').hidden = input.value.length === 0;
    $('.search-key').hidden = input.value.length > 0;
    if (sync) {
      const url = new URL(location.href);
      for (const key of ['q','category','sort']) url.searchParams.delete(key);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim());
      if (category !== 'all') url.searchParams.set('category', category);
      if (sort.value !== 'curated') url.searchParams.set('sort', sort.value);
      history.replaceState(null,'',url.pathname + url.search + url.hash);
    }
  }
  function readUrl() {
    const params = new URLSearchParams(location.search);
    input.value = params.get('q') || '';
    category = ['term','style','technique'].includes(params.get('category')) ? params.get('category') : 'all';
    sort.value = ['newest','title'].includes(params.get('sort')) ? params.get('sort') : 'curated';
    update(false);
  }
  input.addEventListener('input', () => update());
  $('.search-form').addEventListener('submit', event => { event.preventDefault(); update(); });
  filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.categoryFilter; update(); }));
  sort.addEventListener('change', () => update());
  $('.clear-search').addEventListener('click', () => { input.value=''; update(); input.focus(); });
  $('#reset-filters').addEventListener('click', () => { input.value=''; category='all'; sort.value='curated'; update(); input.focus(); });
  document.addEventListener('keydown', event => {
    const editing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
    if (event.key === '/' && !editing && !event.metaKey && !event.ctrlKey && !event.altKey) { event.preventDefault(); input.focus(); }
    if (event.key === 'Escape' && document.activeElement === input) { input.value=''; update(); }
  });
  window.addEventListener('popstate', readUrl);
  readUrl();
}
$$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  const target = document.getElementById(button.dataset.copy);
  try {
    await navigator.clipboard.writeText(target.textContent.trim());
    announce('已复制，可以交给你的 AI 了。');
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(target);
    selection.removeAllRanges(); selection.addRange(range);
    announce('浏览器未允许自动复制，已选中文本，请手动复制。');
  }
}));
function ascii(density) {
  const chars = ' .:+*#%@'; let out = '';
  for (let y=-9;y<=9;y++) {
    for (let x=-20;x<=20;x++) {
      const d=(x/19)**2+(y/9)**2;
      const v=d<1?Math.max(1,Math.round((1-Math.sqrt(d))*4+((x+y)/7+4)%3)):0;
      out+=chars[Math.min(7,Math.round(v*density))];
    }
    out+='\n';
  }
  return out;
}
$$('[data-demo]').forEach(demo => {
  const type = demo.dataset.demo;
  const stage = $('.art', demo);
  const status = $('[data-demo-status]', demo);
  const live = $('[data-demo-announcement]', demo);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const range = $('[data-demo-range]', demo);
  if (range) range.addEventListener('input', () => {
    const value = Number(range.value);
    const output = $('output', demo);
    if (type === 'radius') {
      $('.radius-outer',demo).style.padding = `${value}px`;
      $('.radius-inner',demo).style.borderRadius = `${32-value}px`;
      $('.inner-measure',demo).textContent=`r ${32-value}`;
      $('.radius-dot',demo).style.left=`${32-value}px`;
      $('.radius-dot',demo).style.top=`${32-value}px`;
      $('.radius-gap',demo).textContent=value;
      output.textContent=`${value}px`;
    } else if (type === 'spacing') {
      $$('.space-diagram>div',demo).forEach((row,i) => { const n = value*(i+1); row.style.setProperty('--n',`${n}px`); $('code',row).textContent=String(n).padStart(2,'0'); });
      output.textContent=`${value}px`;
    } else if (type === 'type') {
      $('.type-big',demo).style.fontSize=`${value}px`;
      output.textContent=`${value}px`;
    } else if (type === 'ascii') {
      $('.ascii-art',demo).textContent=ascii(value/10);
      output.textContent=`${(value/10).toFixed(1)}×`;
    }
  });
  $$('[data-color]',demo).forEach(button => button.addEventListener('click', () => {
    const colors = {purple:'oklch(.51 .17 293)',green:'oklch(.48 .08 160)',orange:'oklch(.6 .13 45)'};
    stage.style.setProperty('--demo-color',colors[button.dataset.color]);
    $$('.color-choice',demo).forEach(b => b.setAttribute('aria-pressed',String(b===button)));
    live.textContent=`action 变量已切换为${button.getAttribute('aria-label').slice(2)}`;
  }));
  if (type === 'corners') {
    const supports = CSS.supports('corner-shape','superellipse(1.25)');
    $('[data-support-note]',demo).textContent=supports?'当前浏览器支持连续圆角，可对比两种轮廓。':'当前浏览器不支持 corner-shape，右侧已回退为普通圆角。';
  }
  $$('[data-demo-action]',demo).forEach(button => {
    const action=button.dataset.demoAction;
    if(action==='toggle') button.setAttribute('aria-pressed','false');
    button.addEventListener('click', () => {
      if (action === 'toast') { announce('更改已保存。'); return; }
      if (action === 'notification') {
        const hidden=demo.dataset.noticeHidden!=='true';
        demo.dataset.noticeHidden=String(hidden);
        button.textContent=hidden?'重新显示通知':'关闭通知';
        live.textContent=hidden?'通知已关闭。':'通知已显示，并将保持到你主动关闭。'; return;
      }
      if (action === 'holo') {
        const turned=demo.dataset.turned!=='true'; demo.dataset.turned=String(turned);
        const card=$('.holo-card',demo);
        card.style.transform=turned?'rotate(8deg) rotateY(12deg) rotateX(-8deg)':'rotate(-12deg) rotateY(-10deg) rotateX(9deg)';
        card.style.setProperty('--hx',turned?'80%':'30%');
        card.style.setProperty('--hy',turned?'70%':'20%');
        live.textContent='已切换卡片观察角度。'; return;
      }
      if(action==='up'||action==='down'){ moveItem(action==='up'?-1:1); return; }
      const active=demo.dataset.active!=='true'; demo.dataset.active=String(active);
      button.setAttribute('aria-pressed',String(active));
      if(type==='alignment'){button.textContent=active?'恢复统一对齐':'对比：取消对齐';status.textContent=active?'当前：边缘错开':'当前：统一左对齐';}
      else if(type==='book'){button.textContent=active?'合上这本小书':'翻开这本小书';status.textContent=reduced.matches&&active?'已开启；减少动态模式保留静态封面':active?'当前：翻开':'当前：合上';}
      else if(type==='skeuo'){button.textContent=active?'松开控件':'按下控件';status.textContent=active?'当前：按下状态':'当前：抬起状态';}
      else{button.textContent=active?'收起菜单':'展开菜单';status.textContent=active?'当前：展开':'当前：收起';}
      live.textContent=status?.textContent||'示例状态已更新。';
    });
  });
  if(type==='semantic') $('[data-native-switch]',demo).addEventListener('change', event => {
    demo.dataset.switchOff=String(!event.target.checked);
    live.textContent=event.target.checked?'演示状态：更新提醒已开启。':'演示状态：更新提醒已关闭。';
  });
  if(type==='holo') {
    const card=$('.holo-card',demo); let rect; let frame;
    stage.addEventListener('pointerenter',()=>{rect=stage.getBoundingClientRect();});
    stage.addEventListener('pointermove',event=>{
      if(reduced.matches||event.pointerType==='touch'||!rect)return;
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        const x=Math.min(1,Math.max(0,(event.clientX-rect.left)/rect.width));
        const y=Math.min(1,Math.max(0,(event.clientY-rect.top)/rect.height));
        card.style.transform=`rotate(-5deg) rotateY(${(x-.5)*24}deg) rotateX(${(.5-y)*24}deg)`;
        card.style.setProperty('--hx',`${x*100}%`);card.style.setProperty('--hy',`${y*100}%`);
      });
    });
    stage.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);card.style.transform='';});
  }
  function refreshSort(selectedText) {
    const select=$('#sort-item',demo);if(!select)return;
    const rows=$$('.drag-stack>div',demo);
    select.replaceChildren(...rows.map((row,i)=>new Option($('span',row).textContent,String(i))));
    const selected=rows.findIndex(row=>$('span',row).textContent===selectedText);
    select.value=String(Math.max(0,selected));
    rows.forEach((row,i)=>{$('small',row).textContent=String(i+1).padStart(2,'0');row.classList.toggle('picked',i===Number(select.value));});
    $('[data-demo-action=up]',demo).disabled=Number(select.value)===0;
    $('[data-demo-action=down]',demo).disabled=Number(select.value)===rows.length-1;
  }
  function moveItem(delta) {
    const select=$('#sort-item',demo),rows=$$('.drag-stack>div',demo),index=Number(select.value),next=index+delta;
    if(next<0||next>=rows.length)return;
    const row=rows[index],text=$('span',row).textContent;
    if(delta<0)rows[next].before(row);else rows[next].after(row);
    refreshSort(text);live.textContent=`${text}已移动到第 ${next+1} 位。`;
  }
  if(type==='drag') {
    const stack=$('.drag-stack',demo),select=$('#sort-item',demo); let dragging;
    $$('.drag-stack>div',demo).forEach(row=>{
      row.draggable=true;
      row.addEventListener('dragstart',event=>{dragging=row;event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',$('span',row).textContent);});
      row.addEventListener('dragover',event=>{event.preventDefault();event.dataTransfer.dropEffect='move';});
      row.addEventListener('drop',event=>{event.preventDefault();if(!dragging||dragging===row)return;const rows=[...stack.children];if(rows.indexOf(dragging)<rows.indexOf(row))row.after(dragging);else row.before(dragging);const text=$('span',dragging).textContent;refreshSort(text);live.textContent=`${text}已移动到第 ${select.selectedIndex+1} 位。`;dragging=null;});
      row.addEventListener('dragend',()=>{dragging=null;});
    });
    select.addEventListener('change',()=>refreshSort(select.selectedOptions[0].textContent));
    refreshSort('整理想法');
  }
});
