import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  CloudOff,
  Command,
  HardDrive,
  Keyboard,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { categories, tools } from "@/data/tools";
import { useSEO } from "@/hooks/useSEO";
import { openCommandPalette } from "@/lib/commandPalette";

const sections = [
  { id: "find-a-tool", label: "Find a tool" },
  { id: "work-with-a-tool", label: "Work with a tool" },
  { id: "keep-results", label: "Keep your place" },
  { id: "keyboard", label: "Keyboard shortcuts" },
  { id: "privacy", label: "Privacy" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

const helpLinkClass =
  "inline-flex items-center gap-1 rounded-sm text-xs font-medium text-primary underline decoration-primary/40 underline-offset-2 transition-colors duration-150 hover:text-foreground hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const proseLinkClass =
  "rounded-sm font-medium text-primary underline decoration-primary/40 underline-offset-2 transition-colors duration-150 hover:text-foreground hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[11px] text-foreground">
    {children}
  </kbd>
);

interface GuideSectionProps {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}

const GuideSection = ({ id, index, title, children }: GuideSectionProps) => (
  <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
    <div className="flex items-baseline gap-3 border-b border-border pb-3">
      <span className="font-mono text-[11px] tabular-nums text-primary">{index}</span>
      <h2 id={`${id}-heading`} className="font-mono text-xl font-bold text-foreground">
        {title}
      </h2>
    </div>
    <div className="mt-5 space-y-5 text-sm leading-relaxed text-muted-foreground">{children}</div>
  </section>
);

const anatomy = [
  {
    title: "Input",
    body: "Paste or type into the first field. Text fields accept long input and Unicode; file fields read the file locally.",
  },
  {
    title: "Options",
    body: "Labels sit above the control they describe. Defaults are safe, so change only the options the task needs.",
  },
  {
    title: "Result",
    body: "Some tools update as you type. Others wait for a clear action such as Format, Compare, Generate or Run.",
  },
  {
    title: "Copy",
    body: "Copy writes the result to your clipboard and announces success or failure. Long output can also be selected directly.",
  },
];

const privacyPoints = [
  {
    icon: ShieldCheck,
    title: "Tool input stays in the browser",
    body: "Input is processed with browser APIs. There is no upload endpoint, account system or remote storage.",
  },
  {
    icon: CloudOff,
    title: "No analytics or tracking",
    body: "There are no analytics scripts, tracking pixels, advertising SDKs or third-party requests for tool data.",
  },
  {
    icon: HardDrive,
    title: "Preferences are stored locally",
    body: "Favorites, recent tools and most-used counts live in this browser’s localStorage. They never sync to a server.",
  },
];

const shortcuts = [
  { keys: ["⌘", "K"], description: "Open quick search from any page. On Windows or Linux, use Ctrl K." },
  { keys: ["↑", "↓"], description: "Move through quick-search results." },
  { keys: ["Enter"], description: "Open the selected tool or page." },
  { keys: ["Esc"], description: "Close quick search and return focus to the trigger." },
  { keys: ["Tab", "Shift Tab"], description: "Move forward or backward through controls on a page." },
  { keys: ["Space", "Enter"], description: "Activate the focused button, link or summary." },
];

const troubleshooting = [
  {
    question: "The output is empty",
    answer:
      "Some tools wait for an action. Check for a button such as Format, Compare, Generate or Run below the fields.",
  },
  {
    question: "A field is outlined in red",
    answer:
      "Read the message next to the field. It names the invalid input and what to fix, then clears when the input becomes valid.",
  },
  {
    question: "Copy does nothing",
    answer:
      "Clipboard writes need permission. Grant clipboard access for this site, or select the output text and copy it manually.",
  },
  {
    question: "My favorites disappeared",
    answer:
      "Favorites are stored per browser and per site. Clearing site data, using private mode or switching devices starts with an empty list.",
  },
  {
    question: "A very large input is slow",
    answer:
      "Tools process input on the main thread. Split very large files or paste a representative sample when you only need to inspect the format.",
  },
];

const Usage = () => {
  useSEO(
    "How to Use DevToolbox — Shortcuts, Privacy and Tips",
    `Find tools, work with inputs and outputs, keep favorites, learn keyboard shortcuts and understand what stays in your browser across ${tools.length} developer tools.`,
    "/usage",
  );

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
      <section aria-labelledby="usage-heading" className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Usage" }]} />
          <div className="mt-6 max-w-3xl">
            <h1
              id="usage-heading"
              className="text-balance font-mono text-3xl font-bold leading-tight text-foreground sm:text-4xl"
            >
              How to use DevToolbox
            </h1>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              DevToolbox is a set of {tools.length} small, single-purpose tools. This guide covers
              finding one, reading its controls, keeping the result and what stays on your machine.
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              {tools.length} tools · {categories.length} categories · runs in your browser
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:py-12">
        <nav aria-labelledby="on-this-page-heading" className="lg:sticky lg:top-[76px] lg:self-start">
          <h2
            id="on-this-page-heading"
            className="font-mono text-xs font-medium text-muted-foreground"
          >
            On this page
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 lg:grid-cols-1">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="touch-target-y flex items-center gap-2 border-l border-border py-1.5 pl-3 text-sm text-muted-foreground transition-colors duration-150 hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="min-w-0 max-w-3xl space-y-12">
          <GuideSection id="find-a-tool" index="01" title="Find a tool">
            <p>There are three ways in, all pointing at the same catalogue.</p>
            <ol className="grid gap-5 sm:grid-cols-3">
              <li className="border-t border-border pt-4">
                <span className="font-mono text-[11px] text-muted-foreground">Search</span>
                <h3 className="mt-1.5 font-mono text-sm font-semibold text-foreground">
                  Use the directory
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Open the{" "}
                  <Link to="/tools" className={proseLinkClass}>
                    full directory
                  </Link>{" "}
                  and type in the search field. Results filter as you type, and the query stays in
                  the URL.
                </p>
              </li>
              <li className="border-t border-border pt-4">
                <span className="font-mono text-[11px] text-muted-foreground">Quick open</span>
                <h3 className="mt-1.5 font-mono text-sm font-semibold text-foreground">
                  Stay on the keyboard
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Press <Kbd>⌘ K</Kbd> or <Kbd>Ctrl K</Kbd> anywhere, type a tool name, then press{" "}
                  <Kbd>Enter</Kbd>.
                </p>
              </li>
              <li className="border-t border-border pt-4">
                <span className="font-mono text-[11px] text-muted-foreground">Categories</span>
                <h3 className="mt-1.5 font-mono text-sm font-semibold text-foreground">
                  Start from a group
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  The homepage index lists all {categories.length} categories with tool counts.
                  Choosing one opens the directory pre-filtered.
                </p>
              </li>
            </ol>
          </GuideSection>

          <GuideSection id="work-with-a-tool" index="02" title="Work with a tool">
            <p>A tool page has the same four parts, whichever tool you open.</p>
            <ol className="grid gap-5 sm:grid-cols-2">
              {anatomy.map((item, index) => (
                <li key={item.title} className="border-t border-border pt-4">
                  <span className="font-mono text-[11px] tabular-nums text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 font-mono text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ol>
            <aside className="flex gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-mono text-xs font-medium text-foreground">
                  Errors belong next to the field that caused them.
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  If a tool cannot parse input, it marks the field and explains what to fix instead
                  of writing an error into the output pane.
                </p>
              </div>
            </aside>
          </GuideSection>

          <GuideSection id="keep-results" index="03" title="Keep your place">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="border-t border-border pt-4">
                <h3 className="font-mono text-sm font-semibold text-foreground">Star a tool</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  The star on any tool card pins it to Favorites. The Favorites control at the top of
                  the directory shows only those tools.
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="font-mono text-sm font-semibold text-foreground">
                  Share a filtered view
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Search, category and favorites live in the URL. Copy the address bar to share a
                  filtered directory or bookmark it.
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="font-mono text-sm font-semibold text-foreground">Recent tools</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  The last five tools you open appear on the homepage. Most-used tools appear above
                  the directory when no filter is active.
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="font-mono text-sm font-semibold text-foreground">Clear local state</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Favorites, recents and counts are stored in this browser. Clear site data for this
                  domain to remove them.
                </p>
              </div>
            </div>
          </GuideSection>

          <GuideSection id="keyboard" index="04" title="Keyboard shortcuts">
            <p>
              Quick search is available from every page. The rest are standard browser and form
              behaviour.
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">DevToolbox keyboard shortcuts</caption>
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th scope="col" className="px-4 py-2.5 font-medium text-foreground">
                      Keys
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-medium text-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {shortcuts.map((shortcut) => (
                    <tr key={shortcut.description}>
                      <th scope="row" className="whitespace-nowrap px-4 py-3 align-top font-normal">
                        <span className="inline-flex flex-wrap items-center gap-1">
                          {shortcut.keys.map((key) => (
                            <Kbd key={key}>{key}</Kbd>
                          ))}
                        </span>
                      </th>
                      <td className="px-4 py-3 align-top text-muted-foreground">
                        {shortcut.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <Keyboard className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              On a Mac use ⌘. On Windows and Linux use Ctrl. Focus rings stay visible so you can
              follow the active control.
            </p>
          </GuideSection>

          <GuideSection id="privacy" index="05" title="Privacy">
            <div className="space-y-4">
              {privacyPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="flex gap-3 border-t border-border pt-4">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <div className="min-w-0">
                      <h3 className="font-mono text-sm font-semibold text-foreground">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {point.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              The page loads its two typefaces from Google Fonts. That request does not include tool
              input, results or preferences.
            </p>
          </GuideSection>

          <GuideSection id="troubleshooting" index="06" title="Troubleshooting">
            <div>
              {troubleshooting.map((item) => (
                <details key={item.question} className="group border-b border-border py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    {item.question}
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-2 pr-8 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </GuideSection>

          <section aria-labelledby="usage-cta-heading" className="rounded-lg border border-border bg-card p-6">
            <div className="sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <h2 id="usage-cta-heading" className="font-mono text-lg font-bold text-foreground">
                  Ready to open a tool?
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Start with the full index or jump straight to quick search.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0">
                <Button asChild>
                  <Link to="/tools">
                    Browse all {tools.length} tools
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button type="button" variant="outline" onClick={openCommandPalette}>
                  <Command className="h-4 w-4" aria-hidden="true" />
                  Quick open
                </Button>
              </div>
            </div>
          </section>

          <p className="text-xs text-muted-foreground">
            Still stuck? Open the{" "}
            <a
              href="https://github.com/askarthemasss/dev-essentials-hub/issues"
              className={helpLinkClass}
              target="_blank"
              rel="noreferrer"
            >
              issue tracker
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            .
          </p>
        </article>
      </div>
    </main>
  );
};

export default Usage;
