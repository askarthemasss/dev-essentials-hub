import { useState } from "react";
import DualPane from "./DualPane";

const keywords = new Set(["SELECT","FROM","WHERE","AND","OR","INSERT","INTO","VALUES","UPDATE","SET","DELETE","CREATE","TABLE","ALTER","DROP","JOIN","LEFT","RIGHT","INNER","OUTER","ON","GROUP","BY","ORDER","HAVING","LIMIT","OFFSET","UNION","AS","IN","NOT","NULL","IS","BETWEEN","LIKE","EXISTS","CASE","WHEN","THEN","ELSE","END","DISTINCT","COUNT","SUM","AVG","MIN","MAX"]);

const formatSql = (sql: string): string => {
  const newlineBefore = new Set(["SELECT","FROM","WHERE","AND","OR","JOIN","LEFT","RIGHT","INNER","OUTER","GROUP","ORDER","HAVING","LIMIT","UNION","INSERT","UPDATE","DELETE","SET","VALUES"]);
  return sql.replace(/\s+/g, " ").split(/\b/).map(t => {
    const upper = t.trim().toUpperCase();
    if (newlineBefore.has(upper)) return "\n" + upper;
    if (keywords.has(upper)) return upper;
    return t;
  }).join("").trim();
};

const SqlFormatterTool = () => {
  const [input, setInput] = useState("");
  return <DualPane input={input} output={input ? formatSql(input) : ""} onInputChange={setInput} inputPlaceholder="Paste SQL here…" />;
};
export default SqlFormatterTool;
