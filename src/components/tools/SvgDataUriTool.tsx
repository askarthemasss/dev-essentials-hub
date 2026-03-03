import { useState } from "react";
import DualPane from "./DualPane";
const SvgDataUriTool = () => {
  const [input, setInput] = useState("");
  const toDataUri = (s: string) => `data:image/svg+xml,${encodeURIComponent(s)}`;
  return <DualPane input={input} output={input ? toDataUri(input) : ""} onInputChange={setInput} inputPlaceholder="Paste SVG markup here…" outputLabel="Data URI" />;
};
export default SvgDataUriTool;
