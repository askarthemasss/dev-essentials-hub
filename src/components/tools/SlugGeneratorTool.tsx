import { useState } from "react";
import DualPane from "./DualPane";
import { slugify } from "@/lib/encoding";

const SlugGeneratorTool = () => {
  const [input, setInput] = useState("");
  return <DualPane input={input} output={slugify(input)} onInputChange={setInput} inputPlaceholder="Enter text to slugify…" />;
};
export default SlugGeneratorTool;
