import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const firstNames = ["Alice","Bob","Charlie","Diana","Eve","Frank","Grace","Henry","Iris","Jack"];
const lastNames = ["Smith","Johnson","Brown","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin"];
const domains = ["gmail.com","yahoo.com","outlook.com","example.com"];
const FakeDataTool = () => {
  const [count, setCount] = useState(5);
  const [data, setData] = useState<any[]>([]);
  const gen = () => setData(Array.from({ length: count }, () => {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    return { name: `${fn} ${ln}`, email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`, age: 18 + Math.floor(Math.random() * 50), phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}` };
  }));
  return (
    <div className="space-y-4">
      <div className="flex gap-2"><Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-24 font-mono bg-secondary border-border" /><Button onClick={gen}>Generate</Button></div>
      {data.length > 0 && <pre className="rounded bg-secondary p-3 font-mono text-sm overflow-auto max-h-[400px]">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};
export default FakeDataTool;
