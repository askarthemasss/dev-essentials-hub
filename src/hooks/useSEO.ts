import { useEffect } from "react";
import { SITE_URL } from "@/lib/site";

function setMeta(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = content;
}

/**
 * Keeps the document metadata in sync during client-side navigation.
 * Static, per-route copies of these tags are generated at build time by
 * scripts/generate-seo.mjs so crawlers and social scrapers see them too.
 */
export function useSEO(title: string, description: string, path?: string) {
  useEffect(() => {
    const canonicalPath = path ?? window.location.pathname;
    const url = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath.replace(/\/+$/, "")}`;
    const previous = {
      title: document.title,
      description: document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
      canonical: document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
      ogTitle: document.head.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content ?? "",
      ogDescription: document.head.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content ?? "",
      ogUrl: document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content ?? "",
      twitterTitle: document.head.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.content ?? "",
      twitterDescription:
        document.head.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.content ?? "",
    };

    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;

    return () => {
      document.title = previous.title;
      setMeta('meta[name="description"]', previous.description);
      setMeta('meta[property="og:title"]', previous.ogTitle);
      setMeta('meta[property="og:description"]', previous.ogDescription);
      setMeta('meta[property="og:url"]', previous.ogUrl);
      setMeta('meta[name="twitter:title"]', previous.twitterTitle);
      setMeta('meta[name="twitter:description"]', previous.twitterDescription);
      if (canonical) canonical.href = previous.canonical;
    };
  }, [title, description, path]);
}
