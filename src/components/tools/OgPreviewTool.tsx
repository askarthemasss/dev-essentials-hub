import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CopyButton from "@/components/CopyButton";

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
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [image]);

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
          <div key={field.label} className="space-y-1.5">
            <label
              htmlFor={`og-field-${index}`}
              className="block text-sm font-medium text-foreground"
            >
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

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Preview</p>
        <div className="overflow-hidden rounded-md border border-border bg-card">
          {image.trim() && !imageFailed ? (
            <img
              src={image}
              alt={title ? `Social preview image for ${title}` : "Social preview image"}
              width={1200}
              height={630}
              decoding="async"
              onError={() => setImageFailed(true)}
              className="aspect-[1200/630] w-full bg-secondary object-cover"
            />
          ) : (
            <div
              role="status"
              className="flex aspect-[1200/630] w-full flex-col items-center justify-center gap-2 bg-secondary px-6 text-center"
            >
              <ImageOff className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
              <p className="font-mono text-xs text-muted-foreground">
                {imageFailed
                  ? "Image could not load. Check the URL or use an absolute https:// address."
                  : "Add an image URL to preview the card."}
              </p>
            </div>
          )}
          <div className="space-y-1 border-t border-border p-3">
            <p className="break-all font-mono text-xs text-muted-foreground">
              {url || "example.com"}
            </p>
            <p className="font-medium text-foreground">{title || "Untitled"}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="og-output" className="text-sm font-medium text-foreground">
            Generated tags
          </label>
          <CopyButton value={output} label="Copy Open Graph tags" showLabel />
        </div>
        <Textarea
          id="og-output"
          value={output}
          readOnly
          rows={7}
          spellCheck={false}
          className="border-border bg-secondary font-mono text-xs"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Social networks crop cards differently. Images should be at least 1200×630; relative paths
        resolve against the page that hosts the tags.
      </p>
    </div>
  );
};

export default OgPreviewTool;
