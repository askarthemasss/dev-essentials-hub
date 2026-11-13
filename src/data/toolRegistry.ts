import { lazy, type ComponentType, type LazyExoticComponent } from "react";

type ToolModule = { default: ComponentType };

/**
 * Every tool component must live at src/components/tools/<Name>Tool.tsx.
 * The file name is the component key: "JsonYamlTool" -> "jsonyaml". Tool IDs
 * are normalised the same way ("json-yaml" -> "jsonyaml"), so adding a tool
 * only requires the metadata entry in tools.ts plus the component file.
 */
const modules = import.meta.glob<ToolModule>("../components/tools/*Tool.tsx");

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const loaders = new Map<string, () => Promise<ToolModule>>();
for (const [path, loader] of Object.entries(modules)) {
  const filename = path.split("/").pop()?.replace(/\.tsx$/, "") ?? "";
  loaders.set(normalize(filename.replace(/Tool$/, "")), loader);
}

const components = new Map<string, LazyExoticComponent<ComponentType>>();

export function getToolComponent(toolId: string): LazyExoticComponent<ComponentType> | undefined {
  const key = normalize(toolId);
  const loader = loaders.get(key);
  if (!loader) return undefined;

  let component = components.get(key);
  if (!component) {
    component = lazy(loader);
    components.set(key, component);
  }
  return component;
}

/** Normalised ids that have a matching component file. Used by tests. */
export const toolComponentIds: ReadonlySet<string> = new Set(loaders.keys());
