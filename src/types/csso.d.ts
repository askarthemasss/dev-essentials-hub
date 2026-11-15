declare module "csso" {
  interface MinifyOptions {
    restructure?: boolean;
    comments?: boolean | "exclamation";
    forceMediaMerge?: boolean;
    sourceMap?: boolean;
  }

  export function minify(
    source: string,
    options?: MinifyOptions
  ): { css: string; map?: unknown };
}
