import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";

type BaseImage = "node" | "python" | "go" | "rust" | "java" | "ruby" | "nginx" | "alpine";
const baseImages: Record<BaseImage, { from: string; install: string; cmd: string; user: string }> = {
  node: {
    from: "node:20-alpine",
    install: "npm ci",
    cmd: 'CMD ["node", "dist/index.js"]',
    user: "RUN addgroup -S appgroup && adduser -S appuser -G appgroup",
  },
  python: {
    from: "python:3.12-slim",
    install: "pip install --no-cache-dir -r requirements.txt",
    cmd: 'CMD ["python", "app.py"]',
    user: "RUN groupadd --system appgroup && useradd --system --gid appgroup --create-home appuser",
  },
  go: {
    from: "golang:1.22-alpine AS builder",
    install: "go mod download",
    cmd: 'CMD ["/app"]',
    user: "RUN addgroup -S appgroup && adduser -S appuser -G appgroup",
  },
  rust: {
    from: "rust:1.77-slim AS builder",
    install: "cargo build --release",
    cmd: 'CMD ["./target/release/app"]',
    user: "RUN groupadd --system appgroup && useradd --system --gid appgroup --create-home appuser",
  },
  java: {
    from: "eclipse-temurin:21-jdk-alpine AS builder",
    install: "./gradlew build",
    cmd: 'CMD ["java", "-jar", "app.jar"]',
    user: "RUN addgroup -S appgroup && adduser -S appuser -G appgroup",
  },
  ruby: {
    from: "ruby:3.3-alpine",
    install: "bundle install",
    cmd: 'CMD ["ruby", "app.rb"]',
    user: "RUN addgroup -S appgroup && adduser -S appuser -G appgroup",
  },
  nginx: {
    from: "nginx:alpine",
    install: "",
    cmd: 'CMD ["nginx", "-g", "daemon off;"]',
    user: "",
  },
  alpine: {
    from: "alpine:3.19",
    install: "",
    cmd: 'CMD ["/bin/sh"]',
    user: "RUN addgroup -S appgroup && adduser -S appuser -G appgroup",
  },
};

const DockerfileTool = () => {
  const [base, setBase] = useState<BaseImage>("node");
  const [workdir, setWorkdir] = useState("/app");
  const [port, setPort] = useState("3000");
  const [multiStage, setMultiStage] = useState(false);
  const [nonRoot, setNonRoot] = useState(true);

  const img = baseImages[base];
  let dockerfile = `FROM ${img.from}\n\nWORKDIR ${workdir}\n\n`;

  if (base === "node") {
    dockerfile += `COPY package*.json ./\nRUN ${img.install}\n\nCOPY . .\n`;
    if (multiStage) dockerfile += `RUN npm run build\n`;
  } else if (base === "python") {
    dockerfile += `COPY requirements.txt ./\nRUN ${img.install}\n\nCOPY . .\n`;
  } else if (base === "go") {
    dockerfile += `COPY go.* ./\nRUN ${img.install}\n\nCOPY . .\nRUN go build -o /app .\n`;
    if (multiStage) dockerfile += `\nFROM alpine:3.19\nCOPY --from=builder /app /app\n`;
  } else if (base === "nginx") {
    dockerfile += `COPY . /usr/share/nginx/html\n`;
  } else if (img.install) {
    dockerfile += `COPY . .\nRUN ${img.install}\n`;
  } else {
    dockerfile += `COPY . .\n`;
  }

  if (nonRoot && base !== "nginx") {
    dockerfile += `\n${img.user}\nUSER appuser\n`;
  }

  if (port) dockerfile += `\nEXPOSE ${port}\n`;
  dockerfile += `\n${img.cmd}\n`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="text-sm font-mono text-muted-foreground mb-1 block">Base Image</span>
          <Select value={base} onValueChange={(v) => setBase(v as BaseImage)}>
            <SelectTrigger aria-label="Base image" className="font-mono text-sm bg-secondary border-border"><SelectValue /></SelectTrigger>
            <SelectContent>{Object.keys(baseImages).map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <span className="text-sm font-mono text-muted-foreground mb-1 block">Port</span>
          <Input value={port} onChange={(e) => setPort(e.target.value)} aria-label="Application port" className="font-mono text-sm bg-secondary border-border" />
        </div>
      </div>
      <Input value={workdir} onChange={(e) => setWorkdir(e.target.value)} className="font-mono text-sm bg-secondary border-border" placeholder="WORKDIR" />
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-mono text-muted-foreground"><Switch checked={multiStage} onCheckedChange={setMultiStage} />Multi-stage</label>
        <label className="flex items-center gap-2 text-sm font-mono text-muted-foreground"><Switch checked={nonRoot} onCheckedChange={setNonRoot} />Non-root user</label>
      </div>
      <div className="relative">
        <Textarea value={dockerfile} readOnly rows={18} className="font-mono text-sm bg-secondary border-border" />
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(dockerfile)} aria-label="Copy Dockerfile"><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default DockerfileTool;
