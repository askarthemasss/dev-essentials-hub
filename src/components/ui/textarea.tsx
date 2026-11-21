import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  // A read-only field without any explicit name still needs one. An `id`
  // signals that a visible <label htmlFor> owns the name; adding an aria-label
  // here would override that visible label.
  const hasExplicitName = Boolean(props["aria-label"] || props["aria-labelledby"] || props.id);
  return (
    <textarea
      aria-label={props.readOnly && !hasExplicitName ? "Output" : undefined}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-danger aria-invalid:focus-visible:ring-danger",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
