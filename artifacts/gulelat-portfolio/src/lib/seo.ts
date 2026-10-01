type PageMetadata = {
  title: string;
  description: string;
  canonicalPath?: string;
  index: boolean;
};

function setMeta(selector: string, content: string | undefined) {
  const meta = document.querySelector<HTMLMetaElement>(selector);
  if (!meta) return;
  if (content === undefined) {
    meta.removeAttribute('content');
    return;
  }
  meta.content = content;
}

export function setPageMetadata({
  title,
  description,
  canonicalPath,
  index,
}: PageMetadata) {
  document.title = title;
  setMeta('meta[name="description"]', description);
  setMeta('meta[name="robots"]', index ? 'index, follow' : 'noindex, nofollow');
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', description);

  const canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  const ogImage = '/og-image.png';
  const isPublicHost =
    !window.location.hostname.endsWith('.replit.dev') &&
    !window.location.hostname.endsWith('.repl.co') &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1';

  if (canonical && canonicalPath) {
    canonical.href = isPublicHost
      ? new URL(canonicalPath, window.location.origin).href
      : canonicalPath;
  } else if (canonical) {
    canonical.remove();
  }

  if (canonicalPath) {
    setMeta(
      'meta[property="og:url"]',
      isPublicHost
        ? new URL(canonicalPath, window.location.origin).href
        : canonicalPath,
    );
  } else {
    setMeta('meta[property="og:url"]', undefined);
  }

  const shareImageUrl = isPublicHost
    ? new URL(ogImage, window.location.origin).href
    : ogImage;
  setMeta('meta[property="og:image"]', shareImageUrl);
  setMeta('meta[name="twitter:image"]', shareImageUrl);
}