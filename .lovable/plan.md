

# DevToolbox — 100+ Developer Tools App

## Overview
A dark-themed, terminal-inspired developer tools application with 100+ client-side tools organized in a filterable grid layout.

## Layout & Navigation
- **Top bar** with app logo ("DevToolbox"), global search bar, and a favorites counter
- **Category filter bar** below the top bar — horizontal scrollable chips for each category
- **Main area** — responsive grid of tool cards; clicking a card opens the tool in a full-page view with a back button
- **Favorites** — users can star tools, persisted in localStorage

## Visual Style
- Dark background with subtle borders, monospace fonts for headings
- Tool cards show an icon, name, short description, and category badge
- Accent color: electric blue/cyan on dark gray

## Tool Categories & Tools (100+ total)

### Encoders/Decoders (10)
Base64 Encode/Decode, URL Encode/Decode, HTML Entity Encode/Decode, JWT Decoder, Unicode Escape/Unescape

### Formatters (10)
JSON Formatter, XML Formatter, SQL Formatter, CSS Beautifier, HTML Beautifier, JavaScript Beautifier, YAML Formatter, TOML Formatter, Markdown Preview, CSV Viewer

### Generators (12)
UUID Generator, Password Generator, Lorem Ipsum Generator, Random Number Generator, Hash Generator (MD5/SHA), QR Code Generator, Slug Generator, Color Palette Generator, Regex Generator, Cron Expression Generator, Fake Data Generator, Timestamp Generator

### Converters (15)
JSON ↔ YAML, JSON ↔ CSV, JSON ↔ XML, Hex ↔ RGB Color, Unix Timestamp ↔ Date, Number Base Converter, Markdown ↔ HTML, PX ↔ REM Converter, Temperature Converter, Length/Weight/Volume Converter, Case Converter (camel/snake/kebab), Roman Numeral Converter, Binary ↔ Text, Octal ↔ Decimal, Angle Converter

### Text Tools (12)
Word Counter, Character Counter, Line Counter, Text Diff, Find & Replace, Sort Lines, Remove Duplicates, Reverse Text, Text to ASCII Art, String Escape/Unescape, Whitespace Remover, Text Case Changer

### CSS Tools (8)
CSS Gradient Generator, Box Shadow Generator, Border Radius Preview, Flexbox Playground, Grid Generator, CSS Minifier, CSS Units Converter, CSS Specificity Calculator

### Web Tools (8)
HTTP Status Code Reference, MIME Type Lookup, Meta Tag Generator, Open Graph Preview, Robots.txt Generator, Sitemap Generator, Favicon Generator, Viewport Size Checker

### Image/Media (5)
Image to Base64, SVG to Data URI, Color Picker, Image Dimension Viewer, Placeholder Image Generator

### Math/Calc (6)
Percentage Calculator, Aspect Ratio Calculator, Byte/Bit Calculator, Scientific Calculator, Bitwise Calculator, Matrix Calculator

### Networking (5)
IPv4/IPv6 Validator, Subnet Calculator, MAC Address Formatter, Port Number Reference, CIDR Calculator

### Security (5)
Password Strength Checker, CSP Header Generator, CORS Header Helper, HMAC Generator, Checksum Validator

### Miscellaneous (8)
Keyboard Shortcut Reference, Emoji Picker, ASCII Table, Git Cheatsheet, Regex Tester, Cron Schedule Viewer, Chmod Calculator, JSON Path Evaluator

**Total: 104 tools**

## Implementation Approach
- Each tool is a lightweight component with its own input/output areas
- Tools share common layouts (single input → output, dual pane, form-based)
- All processing happens client-side using JavaScript built-ins and lightweight utility functions
- Search filters tools by name, description, and category in real-time
- Tool state resets on navigation; no backend needed

