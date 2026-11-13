import { marked } from "marked";
import DOMPurify from "dompurify";
import TurndownService from "turndown";

marked.setOptions({
  gfm: true,
  breaks: true,
});

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A") {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  }
});

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.remove(["script", "style", "noscript"]);

export function markdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

export function markdownToSafeHtml(markdown: string): string {
  return DOMPurify.sanitize(markdownToHtml(markdown), {
    USE_PROFILES: { html: true },
  });
}

/**
 * Converts an HTML string to Markdown. The HTML is parsed into an inert
 * document (no scripts run, no resources load) before Turndown reads it.
 */
export function htmlToMarkdown(html: string): string {
  const document = new DOMParser().parseFromString(html, "text/html");
  return turndown.turndown(document.body).trim();
}
