import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const OgPreviewTool = () => {
  const [title, setTitle] = useState("My Page");
  const [description, setDescription] = useState("A short page description for social previews.");
  const [image, setImage] = useState("/og-image.png");
  const [url, setUrl] = useState("https://example.com");

  const output = [
    `<meta property="og:title" content="${escapeAttribute(title)}">`,
    `<meta property="og:description" content="${escapeAttribute(description)}">`,
    `<meta property="og:image" content="${escapeAttribute(image)}">`,
    `<meta property="og:url" content="${escapeAttribute(url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ].join("\n");

  const fields: Array<{ label: string; value: string; onChange: (value: string) => void }> = [
    { label: "Title", value: title, onChange: setTitle },
    { label: "Description", value: description, onChange: setDescription },
    { label: "Image URL", value: image, onChange: setImage },
    { label: "Page URL", value: url, onChange: setUrl },
  ];

  return (
    <div className="max-w-2xl space-y-4">
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.label}>
            <label htmlFor={`og-field-${index}`} className="mb-1 block font-mono text-xs text-muted-foreground">
              {field.label}
            </label>
            <Input
              id={`og-field-${index}`}
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              className="border-border bg-secondary font-mono text-sm"
            />
          </div>
        ))}
      </div>

      <div>
        <span className="mb-1 block font-mono text-xs text-muted-foreground">Preview</span>
        <div className="overflow-hidden rounded border border-border bg-card">
          {image.trim() ? (
            <img src={image} alt="" className="aspect-[1200/630] w-full bg-secondary object-cover" />
          ) : (
            <div className="flex aspect-[1200/630] w-full items-center justify-center bg-secondary font-mono text-xs text-muted-foreground">
              No image
            </div>
          )}
          <div className="space-y-1 border-t border-border p-3">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{url || "example.com"}</p>
            <p className="font-medium text-foreground">{title || "Untitled"}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      <Textarea
        value={output}
        readOnly
        rows={7}
        spellCheck={false}
        className="border-border bg-secondary font-mono text-xs"
        aria-label="Generated Open Graph tags"
      />

      <p className="text-xs text-muted-foreground">
        Social networks crop cards differently. Images should be at least 1200×630; relative paths resolve against the
        page that hosts the tags.
      </p>
    </div>
  );
};

export default OgPreviewTool;
