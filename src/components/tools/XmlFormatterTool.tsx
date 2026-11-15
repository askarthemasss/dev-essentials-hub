import { useState } from "react";
import DualPane from "./DualPane";
import { formatXml } from "@/lib/xml";

const XmlFormatterTool = () => {
  const [input, setInput] = useState("");
  return <DualPane input={input} output={input ? formatXml(input) : ""} onInputChange={setInput} inputPlaceholder="Paste XML here…" />;
};
export default XmlFormatterTool;
