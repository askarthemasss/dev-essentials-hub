import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
const ImageBase64Tool = () => {
  const [base64, setBase64] = useState("");
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBase64(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="text-sm text-muted-foreground" />
      {base64 && <>
        <img src={base64} alt="Preview" className="max-h-48 rounded" />
        <Textarea value={base64} readOnly className="min-h-[150px] font-mono text-xs bg-secondary border-border" />
      </>}
    </div>
  );
};
export default ImageBase64Tool;
