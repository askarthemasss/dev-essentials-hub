import { useState, useEffect } from "react";
const ViewportCheckerTool = () => {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => { const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight }); window.addEventListener("resize", handler); return () => window.removeEventListener("resize", handler); }, []);
  const breakpoint = size.w < 640 ? "sm" : size.w < 768 ? "md" : size.w < 1024 ? "lg" : size.w < 1280 ? "xl" : "2xl";
  return (
    <div className="space-y-4 max-w-md">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded bg-secondary p-4 text-center"><div className="text-3xl font-bold font-mono">{size.w}</div><div className="text-xs text-muted-foreground">Width (px)</div></div>
        <div className="rounded bg-secondary p-4 text-center"><div className="text-3xl font-bold font-mono">{size.h}</div><div className="text-xs text-muted-foreground">Height (px)</div></div>
      </div>
      <div className="rounded bg-secondary p-3 font-mono text-center">Tailwind breakpoint: <span className="text-primary font-bold">{breakpoint}</span></div>
      <div className="rounded bg-secondary p-3 font-mono text-sm text-center">Aspect ratio: {(size.w / size.h).toFixed(2)}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm text-center">DPR: {window.devicePixelRatio}</div>
    </div>
  );
};
export default ViewportCheckerTool;
