import React, { useId } from "react";
import { Textarea } from "@/components/ui/textarea";
import CopyButton from "@/components/CopyButton";

interface DualPaneProps {
  inputLabel?: string;
  outputLabel?: string;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
  input: string;
  output: string;
  onInputChange: (v: string) => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  error?: string;
}

const DualPane: React.FC<DualPaneProps> = ({
  inputLabel = "Input",
  outputLabel = "Output",
  inputPlaceholder = "Paste your text here…",
  outputPlaceholder = "Output appears here…",
  input,
  output,
  onInputChange,
  actions,
  children,
  error,
}) => {
  const inputId = useId();
  const outputId = useId();
  const errorId = useId();

  return (
    <div className="space-y-4">
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      {children}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {inputLabel}
          </label>
          <Textarea
            id={inputId}
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder={inputPlaceholder}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className="min-h-[220px] border-border bg-secondary font-mono text-sm md:min-h-[300px]"
          />
          {error && (
            <p id={errorId} role="alert" className="font-mono text-xs text-danger">
              {error}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor={outputId} className="block text-sm font-medium text-foreground">
              {outputLabel}
            </label>
            <CopyButton
              value={output}
              label={`Copy ${outputLabel.toLowerCase()} to clipboard`}
              showLabel
              className="h-9 text-xs"
            />
          </div>
          <Textarea
            id={outputId}
            value={output}
            readOnly
            placeholder={outputPlaceholder}
            spellCheck={false}
            className="min-h-[220px] border-border bg-secondary font-mono text-sm md:min-h-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default DualPane;
