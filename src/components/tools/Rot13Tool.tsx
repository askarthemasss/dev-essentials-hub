import { useState } from "react";
import DualPane from "./DualPane";

const Rot13Tool = () => {
  const [input, setInput] = useState("");
  const rot13 = (s: string) => s.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < "n" ? 13 : -13)));
  return <DualPane input={input} output={rot13(input)} onInputChange={setInput} />;
};
export default Rot13Tool;
