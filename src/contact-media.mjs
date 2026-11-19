import sourceMedia from '../data/media.json' with { type: 'json' };

/** Return assets from the main source first, then any supporting posts. */
export function mediaFor(entry) {
  const sources = [entry.source, ...(entry.secondarySources || [])];
  const seen = new Set();
  const items = [];
  for (const source of sources) {
    for (const media of sourceMedia[source?.id] || []) {
      if (seen.has(media.url)) continue;
      seen.add(media.url);
      items.push(media);
    }
  }
  return items;
}

/** The cover URL always names a local still image, including video posters. */
export function coverFor(entry) {
  const media = mediaFor(entry);
  const first = media[0];
  if (!first) return null;
  return {
    url: first.poster,
    type: first.type,
    previewVideo: media.find(item => item.type === 'video')?.localVideo,
    sourceUrl: first.sourceUrl,
    author: first.author,
    alt: first.alt
  };
}
