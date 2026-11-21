import { AlertCircle, Check, Copy } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useCopyFeedback } from "@/hooks/useCopyFeedback";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends Omit<ButtonProps, "children" | "onClick"> {
  value: string;
  /** Explicit action label, for example "Copy Dockerfile". */
  label: string;
  showLabel?: boolean;
  copiedLabel?: string;
  failedLabel?: string;
}

const CopyButton = ({
  value,
  label,
  showLabel = false,
  copiedLabel = "Copied",
  failedLabel = "Copy failed",
  variant = "ghost",
  size = "sm",
  className,
  disabled,
  ...props
}: CopyButtonProps) => {
  const { status, copy } = useCopyFeedback();
  const Icon = status === "copied" ? Check : status === "error" ? AlertCircle : Copy;
  const visibleText = status === "copied" ? copiedLabel : status === "error" ? failedLabel : "Copy";
  const announcement =
    status === "copied"
      ? `${copiedLabel}.`
      : status === "error"
        ? "Copy failed. Check clipboard permissions and try again."
        : "";
  // The visible label changes to "Copied" or "Copy failed". WCAG 2.5.3 requires
  // that visible text be part of the accessible name, so include it on state
  // changes instead of keeping a static label.
  const accessibleLabel = showLabel && status !== "idle" ? `${visibleText}. ${label}` : label;

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={disabled || !value}
      aria-label={accessibleLabel}
      title={status === "error" ? "Copy failed — check clipboard permissions and try again" : label}
      onClick={() => void copy(value)}
      className={cn("shrink-0", className)}
      {...props}
    >
      <Icon
        aria-hidden="true"
        className={cn("h-4 w-4", status === "error" && "text-danger")}
      />
      {showLabel && <span>{visibleText}</span>}
      <span className="sr-only" role="status">
        {announcement}
      </span>
    </Button>
  );
};

export default CopyButton;
