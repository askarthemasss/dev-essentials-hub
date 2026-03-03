import { useState } from "react";
import DualPane from "./DualPane";
const RemoveDuplicatesTool = () => {
  const [input, setInput] = useState("");
  const dedup = (s: string) => [...new Set(s.split("\n"))].join("\n");
  return <DualPane input={input} output={dedup(input)} onInputChange={setInput} />;
};
export default RemoveDuplicatesTool;
