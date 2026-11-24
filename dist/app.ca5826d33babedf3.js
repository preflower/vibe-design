import searchIndex from './search-index.332469f3c2039199.js';
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
// Project rows of the photographed label onto the turning barrel. The back
// uses bare metal sampled from above the label; the end caps keep their outline.
function rollingBarrel(gate) {
  const shell = $('.cs-cassette-front', gate);
  const photo = $('img', shell);
  if (!photo.naturalWidth) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.className = 'cs-turning-label';
  canvas.width = Math.min(photo.naturalWidth, 1024);
  canvas.height = 180;
  shell.append(canvas);
  const angles = Array.from({length:canvas.height}, (_, row) =>
    Math.asin(2 * (row + .5) / canvas.height - 1));
  // A periodic strip keeps both edges of the photographed face continuous
  // with the metal back as either edge turns towards the camera.
  const texture = document.createElement('canvas');
  texture.width = canvas.width;
  texture.height = 720;
  const source = texture.getContext('2d');
  const turn = 2 * Math.PI;
  const stripe = (y, row) => source.drawImage(photo, photo.naturalWidth * .064,
    y * photo.naturalHeight, photo.naturalWidth * .789, 1, 0, row, texture.width, 1);
  for (let row = 0; row < texture.height; row++) {
    const a = row / texture.height * turn;
    const edge = .095 + .895 * (.5 + .5 * Math.sin(a));
    stripe(edge, row);
    if (Math.cos(a) < 0) {
      const blend = Math.min(1, -Math.cos(a) * 3);
      source.globalAlpha = blend * blend * (3 - 2 * blend);
      stripe(.18 + .035 * Math.sin(a), row);
      source.globalAlpha = 1;
    }
  }
  return {
    draw(angle) {
      for (let row = 0; row < angles.length; row++) {
        const phase = (angles[row] - angle) / turn;
        const y = (phase - Math.floor(phase)) * (texture.height - 1);
        ctx.drawImage(texture, 0, y, texture.width, 1, 0, row, canvas.width, 1);
      }
      canvas.style.opacity = Math.min(1, Math.abs(angle) / .14);
    },
    remove() { canvas.remove(); }
  };
}

// Sample the live strip through a cylindrical lens at the gate. The map
// is cached by lens size; its strength follows the tension of the moving strip.
function mountFilmTransport(roll, playEntrance) {
  const film = $('.cs-film', roll);
  const gate = $('.cs-cartridge', roll);
  const lens = $('.cs-bend', gate);
  const filter = $('#cs-film-curve', gate);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');

  const displacement = $('feDisplacementMap', filter);
  let lensHeight = 0;
  let tension = 0;
  let previousPosition = 0;
  let previousTime = 0;
  let scheduled = 0;
  let advanceEntrance;
  let nextExposure = 0;
  const frames = $$('.cs-frame', film);
  if (!motion.matches) for (const frame of frames) frame.dataset.exposure = 'latent';

  function exposeNext(time) {
    if (motion.matches) return false;
    const lip = Math.min(innerHeight, gate.getBoundingClientRect().top) - 12;
    for (const frame of film.querySelectorAll('.cs-frame[data-exposure="latent"]:not([hidden])')) {
      const rect = frame.getBoundingClientRect();
      if (rect.top >= lip) break;
      if (rect.bottom <= 0) continue;
      if (time >= nextExposure) {
        const image = $('.cs-image-link img', frame);
        if (image && !image.complete) {
          image.loading = 'eager';
          return false;
        }
        frame.dataset.exposure = 'developing';
        nextExposure = time + 90;
      }
      return true;
    }
    return false;
  }
  function finishExposure(frame) {
    delete frame.dataset.exposure;
  }
  for (const event of ['animationend','animationcancel']) {
    film.addEventListener(event, e => {
      if (e.animationName === 'film-exposure') finishExposure(e.target.closest('.cs-frame'));
    });
  }
  film.addEventListener('focusin', event => {
    const frame = event.target.closest('.cs-frame');
    if (frame) finishExposure(frame);
  });
  film.addEventListener('load', wake, true);
  film.addEventListener('error', wake, true);
  film.addEventListener('archivechange', wake);

  const light = document.createElement('canvas');
  light.width = 96;
  light.height = 72;
  lens.append(light);
  const paint = light.getContext('2d');
  const field = paint.createImageData(light.width, light.height);
  const sinArc = Math.sin(1.18);
  let lastStrength = -1;

  function shade() {
    const strength = 1 + .55 * tension;
    displacement.setAttribute('scale', String(lensHeight * strength));
    if (Math.abs(lastStrength - strength) < .002) return;
    lastStrength = strength;
    // The displacement map stretches each row by the derivative of its
    // arc length. Recover its surface normal to reflect a broad studio light.
    for (let y = 0; y < light.height; y++) {
      const depth = (y + .5) / light.height;
      const stretch = 1 / Math.sqrt(1 - (depth * sinArc) ** 2);
      const cosine = 1 / (1 + strength * (stretch - 1));
      const reflectedAngle = 2 * Math.acos(cosine);
      const contact = .86 * depth ** 10;
      for (let x = 0; x < light.width; x++) {
        const u = (x + .5) / light.width;
        const across = (u - .24) / .44;
        const along = (reflectedAngle - .90 - .34 * u) / .42;
        const reflection = .29 * Math.exp(-across * across - along * along);
        const shadow = contact + (1 - contact) * .43 * (1 - cosine);
        // Composite the reflected light over the shaded print in one layer.
        const alpha = shadow + reflection * (1 - shadow);
        const value = Math.round(246 * reflection / Math.max(.0001, alpha));
        const i = 4 * (y * light.width + x);
        field.data[i] = field.data[i+1] = field.data[i+2] = value;
        field.data[i+3] = Math.round(255 * alpha);
      }
    }
    paint.putImageData(field, 0, 0);
  }
  function feedPosition() {
    return gate.getBoundingClientRect().top - film.getBoundingClientRect().top;
  }
  function update(time) {
    scheduled = 0;
    advanceEntrance?.(time);
    const exposing = exposeNext(time);
    const position = feedPosition();
    const elapsed = Math.max(1, time - previousTime);
    const speed = (position - previousPosition) / Math.min(64, elapsed);
    previousPosition = position;
    previousTime = time;
    const target = motion.matches ? 0 : Math.tanh(speed / .85);
    const response = target === 0 ? 160 : 70;
    tension += (target - tension) * (1 - Math.exp(-Math.min(elapsed,64) / response));
    if (Math.abs(tension) < .002 && target === 0) tension = 0;
    shade();
    if (!motion.matches && (target || tension || advanceEntrance || exposing)) wake();
  }
  function wake() {
    if (!scheduled) scheduled = requestAnimationFrame(update);
  }

  function calibrate() {
    const height = lens.offsetHeight;
    if (!height) return;
    const arcHeight = height * .72;
    const radius = arcHeight / Math.sin(1.18);
    const scale = height;
    const map = document.createElement('canvas');
    map.width = 1;
    map.height = height;
    const context = map.getContext('2d');
    const pixels = context.createImageData(1, height);
    for (let y = 0; y < height; y++) {
      const projected = Math.min(y + .5, arcHeight);
      const travel = radius * Math.asin(projected / radius);
      pixels.data.set([128, Math.round(127.5 + 255*(travel-projected)/scale), 0, 255], y*4);
    }
    context.putImageData(pixels, 0, 0);
    $('feImage', filter).setAttribute('href', map.toDataURL());
    lensHeight = height;
    shade();
    lens.classList.add('is-ready');
  }
  calibrate();
  new ResizeObserver(calibrate).observe(lens);

  new ResizeObserver(wake).observe(roll);
  window.addEventListener('resize', wake);
  previousPosition = feedPosition();
  previousTime = performance.now();
  window.addEventListener('scroll', wake, {passive:true});
  motion.addEventListener('change', () => {
    tension = 0;
    shade();
    if (motion.matches) frames.forEach(finishExposure);
  });
  wake();

  const navigation = performance.getEntriesByType('navigation')[0];
  if (!playEntrance || motion.matches || location.hash || scrollY || navigation?.type === 'back_forward') return;
  const feed = $('.cs-feed', roll);
  const startOfFilm = feed.getBoundingClientRect().top;
  const rest = gate.getBoundingClientRect();
  if (startOfFilm >= rest.top) return;
  const barrel = rollingBarrel(gate);
  const start = -rest.height;
  const distance = rest.top - start;
  // Integrate a smooth velocity ramp. The roll cruises through the leader;
  // the leader's position controls only clipping, never the barrel's speed.
  const accelerate = 260;
  const brake = 510;
  const duration = 1800;
  const cruiseSpeed = distance / (duration - (accelerate + brake) / 2);
  const rampDistance = t => t ** 3 * (1 - t / 2);
  const started = performance.now();
  // Clip in each block's own coordinates so the wipe also covers navigation
  // outside the archive, without putting a layer in front of the cassette.
  const revealBlocks = $$('.site-header, .cs-controls').map(element => ({
    element, bounds:element.getBoundingClientRect()
  }));
  const interrupt = new AbortController();
  roll.classList.add('is-rolling-in');

  function finishEntrance() {
    advanceEntrance = null;
    interrupt.abort();
    gate.style.removeProperty('transform');
    for (const {element} of revealBlocks) element.style.removeProperty('clip-path');
    lens.style.removeProperty('clip-path');
    roll.classList.remove('is-rolling-in', 'film-attached');
    barrel?.remove();
    wake();
  }
  advanceEntrance = time => {
    const elapsed = Math.max(0, Math.min(duration, time - started - 80));
    const remaining = duration - elapsed;
    let y = start + cruiseSpeed * (elapsed - accelerate / 2);
    if (elapsed < accelerate) {
      y = start + cruiseSpeed * accelerate * rampDistance(elapsed / accelerate);
    } else if (remaining < brake) {
      y = rest.top - cruiseSpeed * brake * rampDistance(remaining / brake);
    }
    gate.style.transform = 'translateY(' + (y - rest.top) + 'px)';
    const edge = y + rest.height * .0242;
    for (const {element, bounds} of revealBlocks) {
      element.style.clipPath = edge >= bounds.bottom ? '' :
        'inset(0 0 calc(100% - ' + Math.max(0, edge - bounds.top) + 'px) 0)';
    }
    // Pin the leader at its final position. Only the length behind the
    // moving mouth is visible, including a small overlap under the velvet.
    const length = Math.max(0, edge - startOfFilm);
    roll.classList.toggle('film-attached', length > 0);
    lens.style.clipPath = length >= lensHeight ? '' :
      'inset(max(0px, calc(72% - ' + length + 'px)) 0 0)';
    // The cassette backing masks the strip throughout motion and at rest.
    barrel?.draw((y - rest.top) / (rest.height * .45));
    if (remaining === 0) finishEntrance();
  };
  advanceEntrance(started);
  previousPosition = feedPosition();
  wake();
  for (const event of ['wheel','touchstart','keydown','resize','scroll']) {
    window.addEventListener(event, finishEntrance, {once:true, passive:true, signal:interrupt.signal});
  }
  motion.addEventListener('change', finishEntrance, {signal:interrupt.signal});
}

const grid = $('.cs-gallery');
if (grid) {
  let archiveQuery = '';
  const notes = $$('[data-entry]', grid);
  const topicButtons = $$('[data-topic-filter]');
  const taskButtons = $$('[data-task]');
  const paths = new Map(taskButtons.map(button => [button.dataset.task, (button.dataset.notes || '').split(' ')]));
  let task = 'all';
  let topic = 'all';
  let oldGroup = '';
  const sizeButtons = $$('[data-film-size]');
  const sort = $('#sort');
  let category = 'all';
  let size = 'standard';

  let activeVideo = null;

  function stopPreview() {
    if (!activeVideo) return;
    const video = activeVideo;
    activeVideo = null;
    video.pause();
    video.remove();
    video.removeAttribute('src');
    video.load();
  }

  for (const card of notes.filter(note => note.dataset.previewVideo)) {
    card.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'mouse' || document.hidden) return;
      stopPreview();
      const video = document.createElement('video');
      activeVideo = video;
      video.className = 'cs-hover-video';
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.setAttribute('aria-hidden', 'true');
      video.addEventListener('playing', () => video.classList.add('is-playing'), { once:true });
      video.src = card.dataset.previewVideo;
      $('.cs-image-link', card).append(video);
      video.play().catch(() => {
        if (video === activeVideo) stopPreview();
      });
    });
    card.addEventListener('pointerleave', () => {
      if (card.contains(activeVideo)) stopPreview();
    });
  }
  window.addEventListener('pagehide', stopPreview);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopPreview();
  });

  function markSelected(buttons, attribute, selected) {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset[attribute] === selected)));
  }

  function refreshFilm() {
    $('.cs-film').dataset.size = size;
    markSelected(sizeButtons, 'filmSize', size);
  }

  function refreshArchive() {
    stopPreview();
    const terms = archiveQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const counts = {all:0};
    let total = 0;
    for (const note of notes) {
      const inTask = task === 'all' || paths.get(task).includes(note.dataset.entry);
      if (inTask) {
        counts.all++;
        counts[note.dataset.topic] = (counts[note.dataset.topic] || 0) + 1;
      }
      note.hidden = !inTask || (category !== 'all' && note.dataset.category !== category) ||
        (oldGroup && note.dataset.filmGroup !== oldGroup) ||
        (topic !== 'all' && note.dataset.topic !== topic) ||
        !terms.every(term => note.dataset.search.includes(term));
      if (!note.hidden) total++;
    }
    for (const button of topicButtons) {
      const count = counts[button.dataset.topicFilter] || 0;
      button.hidden = !count && button.dataset.topicFilter !== topic;
      $('small', button).textContent = count;
    }
    markSelected(taskButtons, 'task', task);
    markSelected(topicButtons, 'topicFilter', category === 'all' && !oldGroup ? topic : '');
    const hint = topicButtons.find(button => button.dataset.topicFilter === topic)?.title;
    $('#result-count').textContent = `${total} 条设计笔记${terms.length ? ' · 搜索结果' : ''}${hint ? ' · ' + hint : ''}`;
    $('.cs-empty').hidden = total !== 0;
    grid.dispatchEvent(new Event('archivechange', {bubbles:true}));
  }

  function sortNotes() {
    const ordered = [...notes].sort((a, b) => {
      if (sort.value === 'newest') return b.dataset.date.localeCompare(a.dataset.date) || Number(a.dataset.order) - Number(b.dataset.order);
      if (sort.value === 'title') return a.dataset.english.localeCompare(b.dataset.english, 'en');
      if (task !== 'all') {
        const order = paths.get(task);
        return order.indexOf(a.dataset.entry) - order.indexOf(b.dataset.entry);
      }
      return Number(a.dataset.order) - Number(b.dataset.order);
    });
    grid.replaceChildren(...ordered);
  }

  function saveUrl() {
    const url = new URL(location.href);
    const values = {
      task: task === 'all' ? '' : task, q: archiveQuery.trim(), category: category === 'all' ? '' : category, sort: sort.value === 'curated' ? '' : sort.value,
      film: oldGroup, topic: topic === 'all' ? '' : topic, size: size === 'standard' ? '' : size
    };
    for (const [name, value] of Object.entries(values)) {
      if (value) url.searchParams.set(name, value);
      else url.searchParams.delete(name);
    }
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  function readUrl() {
    const params = new URLSearchParams(location.search);
    const legacyFeedback = params.get('task') === 'feedback';
    const requestedTask = legacyFeedback ? 'controls' : params.get('task');
    task = paths.has(requestedTask) ? requestedTask : 'all';
    archiveQuery = params.get('q') || '';
    category = notes.some(note => note.dataset.category === params.get('category')) ? params.get('category') : 'all';
    sort.value = ['newest', 'title'].includes(params.get('sort')) ? params.get('sort') : 'curated';
    const legacyTopics = { '印刷':'图形与排版', '形体':'界面与交互' };
    const requestedTopic = params.get('film');
    oldGroup = legacyTopics[requestedTopic] || requestedTopic || '';
    if (!notes.some(note => note.dataset.filmGroup === oldGroup)) oldGroup = '';
    const requestedFilter = params.get('topic') || (legacyFeedback ? 'feedback' : 'all');
    topic = topicButtons.some(b => b.dataset.topicFilter === requestedFilter) ? requestedFilter : 'all';
    size = params.get('size') === 'large' ? 'large' : 'standard';
    sortNotes();
    refreshFilm();
    refreshArchive();
  }

  function applySearch() { refreshArchive(); saveUrl(); }
  function applyFilm() { refreshFilm(); saveUrl(); }
  sizeButtons.forEach(button => button.addEventListener('click', () => { size = button.dataset.filmSize; applyFilm(); }));
  taskButtons.forEach(button => button.addEventListener('click', () => {
    task = button.dataset.task;
    topic = 'all'; category = 'all'; oldGroup = ''; archiveQuery = ''; sort.value = 'curated';
    sortNotes(); applySearch();
  }));
  topicButtons.forEach(button => button.addEventListener('click', () => {
    category = 'all'; oldGroup = ''; topic = button.dataset.topicFilter; applySearch();
  }));
  sort.addEventListener('change', () => { sortNotes(); applySearch(); });
  $('#reset-filters').addEventListener('click', () => {
    task = 'all'; archiveQuery = ''; category = 'all'; oldGroup = ''; topic = 'all'; sort.value = 'curated';
    sortNotes(); applySearch(); topicButtons[0].focus();
  });
  $$('.cs-image-link img').forEach(img => {
    const showMissing = () => { img.hidden = true; img.nextElementSibling.hidden = false; };
    img.addEventListener('error', showMissing);
    if (img.complete && !img.naturalWidth) showMissing();
  });
  window.addEventListener('popstate', readUrl);
  readUrl();
  async function revealHome() {
    const root = document.documentElement;
    const gate = $('.cs-cassette-front img');
    const covers = $$('.cs-frame:not([hidden]) .cs-image-link img', grid).filter(img => {
      const rect = img.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < innerHeight;
    });
    for (const img of covers) img.loading = 'eager';
    await Promise.allSettled([gate, ...covers].map(img => img.decode()));
    requestAnimationFrame(() => {
      const pending = root.classList.contains('home-pending');
      root.classList.remove('home-pending');
      mountFilmTransport($('.cs-roll'), pending);
    });
  }
  revealHome();
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

const seriesBook = $('.series-book');
if (seriesBook) {
  const shelf = seriesBook.parentElement;
  const reader = $('.book-reader');
  const trigger = $('summary', seriesBook);
  let revision = 0;

  async function turn(open, issue) {
    const current = ++revision;
    if (!reader.open) {
      const box = seriesBook.getBoundingClientRect();
      shelf.style.height = shelf.offsetHeight + 'px';
      for (const [key,value] of Object.entries({x:box.x,y:box.y,w:box.width,h:box.height})) {
        reader.style.setProperty('--shelf-' + key, value + 'px');
      }
      reader.append(seriesBook);
      seriesBook.open = false;
      reader.showModal();
      seriesBook.getBoundingClientRect(); // Commit the shelf pose before the first turn.
    }
    reader.toggleAttribute('data-reading', open);
    seriesBook.open = open;
    const animations = seriesBook.getAnimations({subtree:true});
    await Promise.allSettled(animations.map(animation => animation.finished));
    if (revision !== current) return;
    if (!open) {
      reader.close();
      shelf.append(seriesBook);
      shelf.style.removeProperty('height');
      trigger.focus({preventScroll:true});
    } else if (issue) {
      const paper = $('.book-paper', seriesBook);
      paper.scrollTop += issue.getBoundingClientRect().top - paper.getBoundingClientRect().top - 16;
    }
  }
  trigger.addEventListener('click', event => {
    event.preventDefault();
    turn(!reader.hasAttribute('data-reading'));
  });
  reader.addEventListener('cancel', event => { event.preventDefault(); turn(false); });
  reader.addEventListener('click', event => { if (event.target === reader) turn(false); });
  function revealIssue() {
    const issue = document.getElementById(location.hash.slice(1));
    if (issue?.matches('.series-row') && seriesBook.contains(issue)) turn(true, issue);
  }
  window.addEventListener('hashchange', revealIssue);
  revealIssue();
}

function mountGlobalSearch() {
  const input = $('#search');
  const palette = $('.search-palette');
  const results = $('#palette-results');
  const trigger = $('.global-search');
  let selected = 0;
  function selectResult(index) {
    const rows = [...results.children];
    if (!rows.length) { input.removeAttribute('aria-activedescendant'); return; }
    selected = (index + rows.length) % rows.length;
    rows.forEach((row,i) => row.setAttribute('aria-selected',String(i === selected)));
    input.setAttribute('aria-activedescendant', rows[selected].id);
    rows[selected].scrollIntoView({block:'nearest',behavior:'instant'});
  }
  function renderResults() {
    const query = input.value.trim().toLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    const matches = searchIndex.filter(note => terms.every(term => note.keywords.includes(term)));
    const score = note => {
      const names = [note.title.toLowerCase(), note.english.toLowerCase()];
      if (names.includes(query)) return 3;
      if (names.some(name => name.startsWith(query))) return 2;
      return Number(names.some(name => name.includes(query)));
    };
    if (query) matches.sort((a,b) => score(b)-score(a));
    results.replaceChildren(...matches.map(note => {
      const link = document.createElement('a');
      link.href = new URL('entries/' + note.id + '/', import.meta.url).href;
      link.textContent = note.title;
      link.className = 'palette-result';
      link.id = 'hit-' + note.id;
      link.tabIndex = -1;
      link.setAttribute('role','option');
      if (note.cover) {
        const thumb = document.createElement('img');
        thumb.loading = 'lazy'; thumb.src = note.cover; thumb.alt = '';
        link.prepend(thumb);
      }
      const english = document.createElement('small');
      english.textContent = note.english;
      link.append(english);
      return link;
    }));
    $('.palette-empty').hidden = matches.length > 0;
    $('.palette-help [role=status]').textContent = matches.length + ' 条笔记';
    results.scrollTop = 0;
    selectResult(0);
  }
  function openPalette() {
    if (!palette.open) palette.showModal();
    input.focus(); input.select(); renderResults();
  }
  trigger.addEventListener('click',openPalette);
  $('.palette-close').addEventListener('click',() => palette.close());
  palette.addEventListener('click',event => {
    if (event.target !== palette) return;
    const rect = palette.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) palette.close();
  });
  input.addEventListener('input',renderResults);
  document.addEventListener('keydown',event => {
    if (event.isComposing || event.keyCode === 229) return;
    const editing = event.target.matches('input,textarea,select,[contenteditable=true]');
    if (((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') ||
        (event.key === '/' && !editing && !event.altKey && !event.ctrlKey && !event.metaKey)) {
      event.preventDefault(); openPalette(); return;
    }
    if (!palette.open || event.target !== input) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); selectResult(selected + (event.key === 'ArrowDown' ? 1 : -1));
    } else if (event.key === 'Enter') {
      event.preventDefault(); results.children[selected]?.click();
    }
  });
}
mountGlobalSearch();
