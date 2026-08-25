import { useEffect } from 'react';
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  escapeAttr,
} from '../../lib/seoConfig';

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => {
    if (value == null) el.removeAttribute(key);
    else el.setAttribute(key, value);
  });
  return el;
}

function upsertLink(rel, href, extra = {}) {
  let el = document.head.querySelector(`link[rel="${rel}"][data-seo="1"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('data-seo', '1');
    document.head.appendChild(el);
  }
  el.setAttribute('rel', rel);
  el.setAttribute('href', href);
  Object.entries(extra).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Client-side SEO head manager for SPA navigations.
 * Production also injects matching tags into initial HTML via the Express server.
 */
export default function SeoHead({
  title,
  description,
  path = '/',
  noindex = false,
  image = DEFAULT_OG_IMAGE,
  jsonLd = [],
  type = 'website',
}) {
  useEffect(() => {
    const fullTitle = title || SITE_NAME;
    const desc = description || '';
    const url = absoluteUrl(path);
    const robots = noindex ? 'noindex, nofollow, noarchive' : 'index, follow';

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', { name: 'description', content: desc });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: desc });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: desc,
    });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
    upsertLink('canonical', url);

    const list = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [];
    list.forEach((block, index) => {
      upsertJsonLd(`seo-jsonld-${index}`, block);
    });
    // Remove leftover JSON-LD nodes from previous routes
    document.querySelectorAll('script[id^="seo-jsonld-"]').forEach((node) => {
      const idx = Number(String(node.id).replace('seo-jsonld-', ''));
      if (Number.isFinite(idx) && idx >= list.length) node.remove();
    });
  }, [title, description, path, noindex, image, type, jsonLd]);

  return null;
}

/** Escape helper re-export for server templates */
export { escapeAttr, SITE_URL, absoluteUrl };
