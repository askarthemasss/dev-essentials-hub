import { useState } from "react";
const ImageDimensionsTool = () => {
  const [dims, setDims] = useState<{w:number,h:number,name:string,size:number}|null>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => setDims({ w: img.width, h: img.height, name: file.name, size: file.size });
    img.src = URL.createObjectURL(file);
  };
  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="text-sm text-muted-foreground" />
      {dims && (
        <div className="space-y-2 max-w-md">
          <div className="rounded bg-secondary p-3 font-mono text-sm">File: {dims.name}</div>
          <div className="rounded bg-secondary p-3 font-mono text-sm">Dimensions: {dims.w} × {dims.h} px</div>
          <div className="rounded bg-secondary p-3 font-mono text-sm">Size: {(dims.size / 1024).toFixed(1)} KB</div>
          <div className="rounded bg-secondary p-3 font-mono text-sm">Aspect ratio: {(dims.w / dims.h).toFixed(2)}</div>
        </div>
      )}
    </div>
  );
};
export default ImageDimensionsTool;
