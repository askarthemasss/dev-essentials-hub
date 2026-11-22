import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  title: string;
  action?: ReactNode;
  className?: string;
}

/** Editorial rule-and-label heading used by the homepage and directory. */
const SectionHeading = ({ id, title, action, className }: SectionHeadingProps) => (
  <div
    className={cn(
      "mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3",
      className,
    )}
  >
    <h2 id={id} className="font-mono text-base font-bold text-foreground">
      {title}
    </h2>
    {action}
  </div>
);

export default SectionHeading;
