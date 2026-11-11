import { useEffect, useState } from "react";
import * as QRCode from "qrcode";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const QrCodeTool = () => {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!text) {
      setDataUrl("");
      setError("");
      return;
    }

    let active = true;
    setError("");

    void QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#0e1117", light: "#ffffff" },
    })
      .then((url) => {
        if (active) setDataUrl(url);
      })
      .catch((caught: unknown) => {
        if (active) {
          setDataUrl("");
          setError(caught instanceof Error ? caught.message : "Could not generate this QR code");
        }
      });

    return () => {
      active = false;
    };
  }, [text, size]);

  return (
    <div className="max-w-lg space-y-4">
      <div>
        <label htmlFor="qr-content" className="mb-1 block font-mono text-xs text-muted-foreground">
          Text or URL
        </label>
        <Textarea
          id="qr-content"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
          className="border-border bg-secondary font-mono text-sm"
          placeholder="Enter text or a URL…"
        />
      </div>

      <div className="w-40">
        <label htmlFor="qr-size" className="mb-1 block font-mono text-xs text-muted-foreground">
          Size (px)
        </label>
        <Input
          id="qr-size"
          type="number"
          min={128}
          max={1024}
          step={8}
          value={size}
          onChange={(event) => {
            const next = Number(event.target.value);
            setSize(Number.isFinite(next) ? Math.min(1024, Math.max(128, next)) : 256);
          }}
          className="border-border bg-secondary font-mono"
        />
      </div>

      {error && (
        <p role="alert" className="font-mono text-sm text-destructive">
          {error}
        </p>
      )}

      {dataUrl && (
        <div className="space-y-3">
          <div className="flex justify-center rounded border border-border bg-white p-4">
            <img src={dataUrl} alt={`QR code for ${text}`} width={size} height={size} className="max-w-full" />
          </div>
          <Button asChild variant="outline">
            <a href={dataUrl} download="qr-code.png">
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Download PNG
            </a>
          </Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        The QR code is rendered locally with an error-correction level of M. Nothing is uploaded.
      </p>
    </div>
  );
};

export default QrCodeTool;
