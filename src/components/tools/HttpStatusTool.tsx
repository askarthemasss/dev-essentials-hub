import { useState } from "react";
import { Input } from "@/components/ui/input";
const codes = [
  {code:100,text:"Continue"},{code:101,text:"Switching Protocols"},{code:200,text:"OK"},{code:201,text:"Created"},{code:204,text:"No Content"},{code:301,text:"Moved Permanently"},{code:302,text:"Found"},{code:304,text:"Not Modified"},{code:400,text:"Bad Request"},{code:401,text:"Unauthorized"},{code:403,text:"Forbidden"},{code:404,text:"Not Found"},{code:405,text:"Method Not Allowed"},{code:408,text:"Request Timeout"},{code:409,text:"Conflict"},{code:410,text:"Gone"},{code:418,text:"I'm a Teapot"},{code:422,text:"Unprocessable Entity"},{code:429,text:"Too Many Requests"},{code:500,text:"Internal Server Error"},{code:501,text:"Not Implemented"},{code:502,text:"Bad Gateway"},{code:503,text:"Service Unavailable"},{code:504,text:"Gateway Timeout"},
];
const HttpStatusTool = () => {
  const [search, setSearch] = useState("");
  const filtered = codes.filter(c => c.code.toString().includes(search) || c.text.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search status codes…" className="font-mono bg-secondary border-border max-w-md" />
      <div className="space-y-1">{filtered.map(c => (
        <div key={c.code} className="flex items-center gap-3 rounded bg-secondary p-2 font-mono text-sm">
          <span className={`font-bold ${c.code < 300 ? "text-green-400" : c.code < 400 ? "text-blue-400" : c.code < 500 ? "text-yellow-400" : "text-red-400"}`}>{c.code}</span>
          <span>{c.text}</span>
        </div>
      ))}</div>
    </div>
  );
};
export default HttpStatusTool;
