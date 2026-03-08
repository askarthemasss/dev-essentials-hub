import { useEffect } from "react";

/**
 * Hook to set document title and meta description for SEO.
 * Call on each page/tool to update head tags dynamically.
 */
export function useSEO(title: string, description: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const prevDesc = meta?.content || "";
    if (meta) meta.content = description;

    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    if (ogTitle) ogTitle.content = title;

    let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    if (ogDesc) ogDesc.content = description;

    return () => {
      document.title = prev;
      if (meta) meta.content = prevDesc;
    };
  }, [title, description]);
}
