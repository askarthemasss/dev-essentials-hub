import {
  Code, Hash, Shuffle, Type, Paintbrush, Globe, Calculator, Cpu,
  Binary, Link, FileCode, Key, Fingerprint,
  FileJson, FileText, FileCode2, Palette, AlignJustify, Table2,
  Dice5, KeyRound, TextCursorInput, Percent, QrCode, CaseSensitive, Clock, User, Calendar,
  ArrowLeftRight, Thermometer, Ruler, Columns, Scale,
  Replace, ArrowUpDown, Trash2, Undo2, Terminal,
  Square, Circle, LayoutGrid, Minimize2, Grid3x3,
  Server, FileSearch, Tags, Eye, Bot, Map, Star, Monitor,
  ImageIcon, PenTool, Pipette, Maximize2, Frame,
  Ratio, HardDrive,
  Network, Scan, Usb, Radio, CircleDot,
  ShieldCheck, ShieldAlert, ShieldQuestion, KeySquare, CheckCircle,
  Keyboard, Smile, TableProperties, GitBranch, Regex, Settings, Brackets,
  Contrast, Braces, Lock, FileX, StretchHorizontal, Scissors, FileCode as FileCodeAlt,
  GitCompare, TimerReset, LinkIcon, Hexagon, Database, Container, ServerCog,
  Filter, Waypoints, Webhook, TestTube, Bug, Workflow,
} from "lucide-react";

export type ToolCategory =
  | "Encoders/Decoders"
  | "Formatters"
  | "Generators"
  | "Converters"
  | "Text Tools"
  | "CSS Tools"
  | "Web Tools"
  | "Image/Media"
  | "Math/Calc"
  | "Networking"
  | "Security"
  | "Miscellaneous";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: any;
}

export const categories: ToolCategory[] = [
  "Encoders/Decoders", "Formatters", "Generators", "Converters",
  "Text Tools", "CSS Tools", "Web Tools", "Image/Media",
  "Math/Calc", "Networking", "Security", "Miscellaneous",
];

export const tools: Tool[] = [
  // Encoders/Decoders (10)
  { id: "base64", name: "Base64 Encode/Decode", description: "Encode or decode Base64 strings", category: "Encoders/Decoders", icon: Binary },
  { id: "url-encode", name: "URL Encode/Decode", description: "Encode or decode URL components", category: "Encoders/Decoders", icon: Link },
  { id: "html-entity", name: "HTML Entity Encode/Decode", description: "Convert HTML entities", category: "Encoders/Decoders", icon: FileCode },
  { id: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JWT tokens", category: "Encoders/Decoders", icon: Key },
  { id: "unicode-escape", name: "Unicode Escape/Unescape", description: "Escape or unescape Unicode characters", category: "Encoders/Decoders", icon: Type },
  { id: "hex-encode", name: "Hex Encode/Decode", description: "Convert text to/from hexadecimal", category: "Encoders/Decoders", icon: Hash },
  { id: "rot13", name: "ROT13 Encoder", description: "Apply ROT13 cipher to text", category: "Encoders/Decoders", icon: Shuffle },
  { id: "morse-code", name: "Morse Code Translator", description: "Translate text to/from Morse code", category: "Encoders/Decoders", icon: Radio },
  { id: "punycode", name: "Punycode Converter", description: "Convert international domain names", category: "Encoders/Decoders", icon: Globe },
  { id: "base32", name: "Base32 Encode/Decode", description: "Encode or decode Base32 strings", category: "Encoders/Decoders", icon: Binary },

  // Formatters (10)
  { id: "json-formatter", name: "JSON Formatter", description: "Format and validate JSON data", category: "Formatters", icon: FileJson },
  { id: "xml-formatter", name: "XML Formatter", description: "Pretty-print XML documents", category: "Formatters", icon: FileCode },
  { id: "sql-formatter", name: "SQL Formatter", description: "Format SQL queries", category: "Formatters", icon: Table2 },
  { id: "css-beautifier", name: "CSS Beautifier", description: "Beautify CSS stylesheets", category: "Formatters", icon: Paintbrush },
  { id: "html-beautifier", name: "HTML Beautifier", description: "Format HTML markup", category: "Formatters", icon: FileCode2 },
  { id: "js-beautifier", name: "JavaScript Beautifier", description: "Beautify JavaScript code", category: "Formatters", icon: Code },
  { id: "yaml-formatter", name: "YAML Formatter", description: "Format YAML documents", category: "Formatters", icon: FileText },
  { id: "toml-formatter", name: "TOML Formatter", description: "Format TOML config files", category: "Formatters", icon: FileText },
  { id: "markdown-preview", name: "Markdown Preview", description: "Preview Markdown as HTML", category: "Formatters", icon: FileText },
  { id: "csv-viewer", name: "CSV Viewer", description: "View CSV data in a table", category: "Formatters", icon: Table2 },

  // Generators (12)
  { id: "uuid-generator", name: "UUID Generator", description: "Generate random UUIDs (v4)", category: "Generators", icon: Fingerprint },
  { id: "password-generator", name: "Password Generator", description: "Generate secure passwords", category: "Generators", icon: KeyRound },
  { id: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate placeholder text", category: "Generators", icon: TextCursorInput },
  { id: "random-number", name: "Random Number Generator", description: "Generate random numbers in range", category: "Generators", icon: Dice5 },
  { id: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256 hashes", category: "Generators", icon: Hash },
  { id: "qr-code", name: "QR Code Generator", description: "Create QR codes from text/URLs", category: "Generators", icon: QrCode },
  { id: "slug-generator", name: "Slug Generator", description: "Convert text to URL-friendly slugs", category: "Generators", icon: Link },
  { id: "color-palette", name: "Color Palette Generator", description: "Generate color palettes", category: "Generators", icon: Palette },
  { id: "regex-generator", name: "Regex Generator", description: "Build regular expressions", category: "Generators", icon: Regex },
  { id: "cron-generator", name: "Cron Expression Generator", description: "Build cron schedule expressions", category: "Generators", icon: Clock },
  { id: "fake-data", name: "Fake Data Generator", description: "Generate fake names, emails, etc.", category: "Generators", icon: User },
  { id: "timestamp-generator", name: "Timestamp Generator", description: "Generate timestamps in formats", category: "Generators", icon: Calendar },

  // Converters (15)
  { id: "json-yaml", name: "JSON ↔ YAML", description: "Convert between JSON and YAML", category: "Converters", icon: ArrowLeftRight },
  { id: "json-csv", name: "JSON ↔ CSV", description: "Convert between JSON and CSV", category: "Converters", icon: ArrowLeftRight },
  { id: "json-xml", name: "JSON ↔ XML", description: "Convert between JSON and XML", category: "Converters", icon: ArrowLeftRight },
  { id: "hex-rgb", name: "Hex ↔ RGB Color", description: "Convert hex colors to RGB and back", category: "Converters", icon: Palette },
  { id: "unix-timestamp", name: "Unix Timestamp ↔ Date", description: "Convert Unix timestamps to dates", category: "Converters", icon: Clock },
  { id: "number-base", name: "Number Base Converter", description: "Convert between binary, octal, decimal, hex", category: "Converters", icon: Hash },
  { id: "markdown-html", name: "Markdown ↔ HTML", description: "Convert Markdown to HTML and back", category: "Converters", icon: FileCode },
  { id: "px-rem", name: "PX ↔ REM Converter", description: "Convert between pixels and rem units", category: "Converters", icon: Ruler },
  { id: "temperature", name: "Temperature Converter", description: "Convert between °C, °F, K", category: "Converters", icon: Thermometer },
  { id: "length-weight", name: "Length/Weight/Volume", description: "Convert measurement units", category: "Converters", icon: Scale },
  { id: "case-converter", name: "Case Converter", description: "Convert camelCase, snake_case, kebab-case", category: "Converters", icon: CaseSensitive },
  { id: "roman-numeral", name: "Roman Numeral Converter", description: "Convert to/from Roman numerals", category: "Converters", icon: Hash },
  { id: "binary-text", name: "Binary ↔ Text", description: "Convert binary to text and back", category: "Converters", icon: Binary },
  { id: "octal-decimal", name: "Octal ↔ Decimal", description: "Convert between octal and decimal", category: "Converters", icon: Hash },
  { id: "angle-converter", name: "Angle Converter", description: "Convert degrees, radians, gradians", category: "Converters", icon: Circle },

  // Text Tools (12)
  { id: "word-counter", name: "Word Counter", description: "Count words, characters, sentences", category: "Text Tools", icon: Type },
  { id: "char-counter", name: "Character Counter", description: "Count characters with/without spaces", category: "Text Tools", icon: Hash },
  { id: "line-counter", name: "Line Counter", description: "Count lines in text", category: "Text Tools", icon: AlignJustify },
  { id: "text-diff", name: "Text Diff", description: "Compare two texts and show differences", category: "Text Tools", icon: Columns },
  { id: "find-replace", name: "Find & Replace", description: "Find and replace text patterns", category: "Text Tools", icon: Replace },
  { id: "sort-lines", name: "Sort Lines", description: "Sort lines alphabetically or numerically", category: "Text Tools", icon: ArrowUpDown },
  { id: "remove-duplicates", name: "Remove Duplicates", description: "Remove duplicate lines from text", category: "Text Tools", icon: Trash2 },
  { id: "reverse-text", name: "Reverse Text", description: "Reverse characters or lines", category: "Text Tools", icon: Undo2 },
  { id: "ascii-art", name: "Text to ASCII Art", description: "Convert text into ASCII art", category: "Text Tools", icon: Terminal },
  { id: "string-escape", name: "String Escape/Unescape", description: "Escape special characters in strings", category: "Text Tools", icon: Code },
  { id: "whitespace-remover", name: "Whitespace Remover", description: "Remove extra whitespace", category: "Text Tools", icon: Minimize2 },
  { id: "text-case-changer", name: "Text Case Changer", description: "Change text to upper, lower, title case", category: "Text Tools", icon: CaseSensitive },

  // CSS Tools (8)
  { id: "css-gradient", name: "CSS Gradient Generator", description: "Create CSS gradient backgrounds", category: "CSS Tools", icon: Paintbrush },
  { id: "box-shadow", name: "Box Shadow Generator", description: "Generate CSS box-shadow values", category: "CSS Tools", icon: Square },
  { id: "border-radius", name: "Border Radius Preview", description: "Preview border-radius values", category: "CSS Tools", icon: Circle },
  { id: "flexbox-playground", name: "Flexbox Playground", description: "Interactive flexbox layout builder", category: "CSS Tools", icon: LayoutGrid },
  { id: "grid-generator", name: "Grid Generator", description: "Generate CSS grid layouts", category: "CSS Tools", icon: Grid3x3 },
  { id: "css-minifier", name: "CSS Minifier", description: "Minify CSS stylesheets", category: "CSS Tools", icon: Minimize2 },
  { id: "css-units", name: "CSS Units Converter", description: "Convert between CSS units", category: "CSS Tools", icon: Ruler },
  { id: "css-specificity", name: "CSS Specificity Calculator", description: "Calculate CSS selector specificity", category: "CSS Tools", icon: Calculator },

  // Web Tools (8)
  { id: "http-status", name: "HTTP Status Codes", description: "Reference for HTTP status codes", category: "Web Tools", icon: Server },
  { id: "mime-types", name: "MIME Type Lookup", description: "Look up MIME types by extension", category: "Web Tools", icon: FileSearch },
  { id: "meta-tag", name: "Meta Tag Generator", description: "Generate HTML meta tags", category: "Web Tools", icon: Tags },
  { id: "og-preview", name: "Open Graph Preview", description: "Preview Open Graph meta tags", category: "Web Tools", icon: Eye },
  { id: "robots-txt", name: "Robots.txt Generator", description: "Generate robots.txt files", category: "Web Tools", icon: Bot },
  { id: "sitemap", name: "Sitemap Generator", description: "Generate XML sitemaps", category: "Web Tools", icon: Map },
  { id: "favicon", name: "Favicon Generator", description: "Generate favicon markup", category: "Web Tools", icon: Star },
  { id: "viewport-checker", name: "Viewport Size Checker", description: "Check current viewport dimensions", category: "Web Tools", icon: Monitor },

  // Image/Media (5)
  { id: "image-base64", name: "Image to Base64", description: "Convert images to Base64 strings", category: "Image/Media", icon: ImageIcon },
  { id: "svg-data-uri", name: "SVG to Data URI", description: "Convert SVGs to data URIs", category: "Image/Media", icon: PenTool },
  { id: "color-picker", name: "Color Picker", description: "Pick and convert colors", category: "Image/Media", icon: Pipette },
  { id: "image-dimensions", name: "Image Dimension Viewer", description: "View image width and height", category: "Image/Media", icon: Maximize2 },
  { id: "placeholder-image", name: "Placeholder Image", description: "Generate placeholder images", category: "Image/Media", icon: Frame },

  // Math/Calc (6)
  { id: "percentage-calc", name: "Percentage Calculator", description: "Calculate percentages easily", category: "Math/Calc", icon: Percent },
  { id: "aspect-ratio", name: "Aspect Ratio Calculator", description: "Calculate aspect ratios", category: "Math/Calc", icon: Ratio },
  { id: "byte-calc", name: "Byte/Bit Calculator", description: "Convert between bytes, KB, MB, GB", category: "Math/Calc", icon: HardDrive },
  { id: "scientific-calc", name: "Scientific Calculator", description: "Full scientific calculator", category: "Math/Calc", icon: Calculator },
  { id: "bitwise-calc", name: "Bitwise Calculator", description: "Perform bitwise operations", category: "Math/Calc", icon: Cpu },
  { id: "matrix-calc", name: "Matrix Calculator", description: "Matrix operations and transformations", category: "Math/Calc", icon: Grid3x3 },

  // Networking (5)
  { id: "ip-validator", name: "IPv4/IPv6 Validator", description: "Validate IP addresses", category: "Networking", icon: Network },
  { id: "subnet-calc", name: "Subnet Calculator", description: "Calculate subnet masks and ranges", category: "Networking", icon: Scan },
  { id: "mac-formatter", name: "MAC Address Formatter", description: "Format MAC addresses", category: "Networking", icon: Usb },
  { id: "port-reference", name: "Port Number Reference", description: "Common port numbers reference", category: "Networking", icon: Radio },
  { id: "cidr-calc", name: "CIDR Calculator", description: "Calculate CIDR ranges", category: "Networking", icon: CircleDot },

  // Security (5)
  { id: "password-strength", name: "Password Strength Checker", description: "Check password strength", category: "Security", icon: ShieldCheck },
  { id: "csp-generator", name: "CSP Header Generator", description: "Generate Content Security Policy headers", category: "Security", icon: ShieldAlert },
  { id: "cors-helper", name: "CORS Header Helper", description: "Configure CORS headers", category: "Security", icon: ShieldQuestion },
  { id: "hmac-generator", name: "HMAC Generator", description: "Generate HMAC signatures", category: "Security", icon: KeySquare },
  { id: "checksum-validator", name: "Checksum Validator", description: "Validate file checksums", category: "Security", icon: CheckCircle },

  // Miscellaneous (8)
  { id: "keyboard-shortcuts", name: "Keyboard Shortcuts", description: "Common keyboard shortcuts reference", category: "Miscellaneous", icon: Keyboard },
  { id: "emoji-picker", name: "Emoji Picker", description: "Search and copy emojis", category: "Miscellaneous", icon: Smile },
  { id: "ascii-table", name: "ASCII Table", description: "Full ASCII character reference", category: "Miscellaneous", icon: TableProperties },
  { id: "git-cheatsheet", name: "Git Cheatsheet", description: "Common Git commands reference", category: "Miscellaneous", icon: GitBranch },
  { id: "regex-tester", name: "Regex Tester", description: "Test regular expressions", category: "Miscellaneous", icon: Regex },
  { id: "cron-viewer", name: "Cron Schedule Viewer", description: "Visualize cron schedules", category: "Miscellaneous", icon: Clock },
  { id: "chmod-calc", name: "Chmod Calculator", description: "Calculate file permissions", category: "Miscellaneous", icon: Settings },
  { id: "jsonpath", name: "JSON Path Evaluator", description: "Evaluate JSONPath expressions", category: "Miscellaneous", icon: Brackets },
];
