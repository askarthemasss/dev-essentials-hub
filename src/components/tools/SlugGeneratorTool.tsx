import { useState } from "react";
import DualPane from "./DualPane";
const SlugGeneratorTool = () => {
  const [input, setInput] = useState("");
  const slug = (s: string) => s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-");
  return <DualPane input={input} output={slug(input)} onInputChange={setInput} inputPlaceholder="Enter text to slugify…" />;
};
export default SlugGeneratorTool;
