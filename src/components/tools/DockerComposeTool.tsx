import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Copy, Plus, Trash2 } from "lucide-react";

interface Service { name: string; image: string; ports: string; envVars: string[]; volumes: string[]; restart: string }

const defaultService: Service = { name: "app", image: "node:18-alpine", ports: "3000:3000", envVars: [], volumes: [], restart: "unless-stopped" };

const DockerComposeTool = () => {
  const [services, setServices] = useState<Service[]>([{ ...defaultService }]);
  const [version, setVersion] = useState("3.8");

  const updateService = (idx: number, key: keyof Service, val: any) => {
    setServices((prev) => prev.map((s, i) => i === idx ? { ...s, [key]: val } : s));
  };

  const addService = () => setServices((prev) => [...prev, { ...defaultService, name: `service${prev.length + 1}` }]);
  const removeService = (idx: number) => setServices((prev) => prev.filter((_, i) => i !== idx));

  const generate = () => {
    let yml = `version: "${version}"\n\nservices:\n`;
    for (const s of services) {
      yml += `  ${s.name}:\n    image: ${s.image}\n`;
      if (s.ports) yml += `    ports:\n      - "${s.ports}"\n`;
      if (s.envVars.length > 0) {
        yml += `    environment:\n`;
        s.envVars.forEach((e) => { yml += `      - ${e}\n`; });
      }
      if (s.volumes.length > 0) {
        yml += `    volumes:\n`;
        s.volumes.forEach((v) => { yml += `      - ${v}\n`; });
      }
      yml += `    restart: ${s.restart}\n\n`;
    }
    return yml;
  };

  const output = generate();

  return (
    <div className="space-y-4">
      {services.map((s, idx) => (
        <div key={idx} className="rounded-lg border border-border bg-secondary/50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-sm font-bold text-foreground">Service #{idx + 1}</h3>
            {services.length > 1 && <Button size="icon" variant="ghost" onClick={() => removeService(idx)}><Trash2 className="h-4 w-4" /></Button>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input value={s.name} onChange={(e) => updateService(idx, "name", e.target.value)} placeholder="Service name" className="font-mono text-sm bg-secondary border-border" />
            <Input value={s.image} onChange={(e) => updateService(idx, "image", e.target.value)} placeholder="Image" className="font-mono text-sm bg-secondary border-border" />
            <Input value={s.ports} onChange={(e) => updateService(idx, "ports", e.target.value)} placeholder="Ports (3000:3000)" className="font-mono text-sm bg-secondary border-border" />
            <Input value={s.restart} onChange={(e) => updateService(idx, "restart", e.target.value)} placeholder="Restart policy" className="font-mono text-sm bg-secondary border-border" />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addService}><Plus className="h-4 w-4 mr-1" />Add Service</Button>
      <div className="relative">
        <Textarea value={output} readOnly rows={16} className="font-mono text-sm bg-secondary border-border" />
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default DockerComposeTool;
