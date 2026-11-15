import React, { useId, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface DualPaneProps {
  inputLabel?: string;
  outputLabel?: string;
  inputPlaceholder?: string;
  input: string;
  output: string;
  onInputChange: (v: string) => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const DualPane: React.FC<DualPaneProps> = ({
  inputLabel = "Input",
  outputLabel = "Output",
  inputPlaceholder = "Paste your text here…",
  input,
  output,
  onInputChange,
  actions,
  children,
}) => {
  const [copied, setCopied] = useState(false);
  const inputId = useId();
  const outputId = useId();

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      {children}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={inputId} className="text-xs font-medium text-muted-foreground font-mono">{inputLabel}</label>
          <Textarea
            id={inputId}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={inputPlaceholder}
            className="min-h-[300px] font-mono text-sm bg-secondary border-border"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor={outputId} className="text-xs font-medium text-muted-foreground font-mono">{outputLabel}</label>
            <Button variant="ghost" size="sm" onClick={copy} className="h-7 text-xs" aria-label={`Copy ${outputLabel.toLowerCase()} to clipboard`}>
              {copied ? <Check className="h-3 w-3" aria-hidden="true" /> : <Copy className="h-3 w-3" aria-hidden="true" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea
            id={outputId}
            value={output}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-secondary border-border"
          />
        </div>
      </div>
    </div>
  );
};

export default DualPane;
