import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { tools } from "@/data/tools";
import ToolLayout from "@/components/ToolLayout";
import { addRecentTool } from "@/hooks/useRecentTools";

// Lazy load all tool components
const toolComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
  "base64": React.lazy(() => import("@/components/tools/Base64Tool")),
  "url-encode": React.lazy(() => import("@/components/tools/UrlEncodeTool")),
  "html-entity": React.lazy(() => import("@/components/tools/HtmlEntityTool")),
  "jwt-decoder": React.lazy(() => import("@/components/tools/JwtDecoderTool")),
  "unicode-escape": React.lazy(() => import("@/components/tools/UnicodeEscapeTool")),
  "hex-encode": React.lazy(() => import("@/components/tools/HexEncodeTool")),
  "rot13": React.lazy(() => import("@/components/tools/Rot13Tool")),
  "morse-code": React.lazy(() => import("@/components/tools/MorseCodeTool")),
  "punycode": React.lazy(() => import("@/components/tools/PunycodeTool")),
  "base32": React.lazy(() => import("@/components/tools/Base32Tool")),
  "json-formatter": React.lazy(() => import("@/components/tools/JsonFormatterTool")),
  "xml-formatter": React.lazy(() => import("@/components/tools/XmlFormatterTool")),
  "sql-formatter": React.lazy(() => import("@/components/tools/SqlFormatterTool")),
  "css-beautifier": React.lazy(() => import("@/components/tools/CssBeautifierTool")),
  "html-beautifier": React.lazy(() => import("@/components/tools/HtmlBeautifierTool")),
  "js-beautifier": React.lazy(() => import("@/components/tools/JsBeautifierTool")),
  "yaml-formatter": React.lazy(() => import("@/components/tools/YamlFormatterTool")),
  "toml-formatter": React.lazy(() => import("@/components/tools/TomlFormatterTool")),
  "markdown-preview": React.lazy(() => import("@/components/tools/MarkdownPreviewTool")),
  "csv-viewer": React.lazy(() => import("@/components/tools/CsvViewerTool")),
  "uuid-generator": React.lazy(() => import("@/components/tools/UuidGeneratorTool")),
  "password-generator": React.lazy(() => import("@/components/tools/PasswordGeneratorTool")),
  "lorem-ipsum": React.lazy(() => import("@/components/tools/LoremIpsumTool")),
  "random-number": React.lazy(() => import("@/components/tools/RandomNumberTool")),
  "hash-generator": React.lazy(() => import("@/components/tools/HashGeneratorTool")),
  "qr-code": React.lazy(() => import("@/components/tools/QrCodeTool")),
  "slug-generator": React.lazy(() => import("@/components/tools/SlugGeneratorTool")),
  "color-palette": React.lazy(() => import("@/components/tools/ColorPaletteTool")),
  "regex-generator": React.lazy(() => import("@/components/tools/RegexGeneratorTool")),
  "cron-generator": React.lazy(() => import("@/components/tools/CronGeneratorTool")),
  "fake-data": React.lazy(() => import("@/components/tools/FakeDataTool")),
  "timestamp-generator": React.lazy(() => import("@/components/tools/TimestampGeneratorTool")),
  "json-yaml": React.lazy(() => import("@/components/tools/JsonYamlTool")),
  "json-csv": React.lazy(() => import("@/components/tools/JsonCsvTool")),
  "json-xml": React.lazy(() => import("@/components/tools/JsonXmlTool")),
  "hex-rgb": React.lazy(() => import("@/components/tools/HexRgbTool")),
  "unix-timestamp": React.lazy(() => import("@/components/tools/UnixTimestampTool")),
  "number-base": React.lazy(() => import("@/components/tools/NumberBaseTool")),
  "markdown-html": React.lazy(() => import("@/components/tools/MarkdownHtmlTool")),
  "px-rem": React.lazy(() => import("@/components/tools/PxRemTool")),
  "temperature": React.lazy(() => import("@/components/tools/TemperatureTool")),
  "length-weight": React.lazy(() => import("@/components/tools/LengthWeightTool")),
  "case-converter": React.lazy(() => import("@/components/tools/CaseConverterTool")),
  "roman-numeral": React.lazy(() => import("@/components/tools/RomanNumeralTool")),
  "binary-text": React.lazy(() => import("@/components/tools/BinaryTextTool")),
  "octal-decimal": React.lazy(() => import("@/components/tools/OctalDecimalTool")),
  "angle-converter": React.lazy(() => import("@/components/tools/AngleConverterTool")),
  "word-counter": React.lazy(() => import("@/components/tools/WordCounterTool")),
  "char-counter": React.lazy(() => import("@/components/tools/CharCounterTool")),
  "line-counter": React.lazy(() => import("@/components/tools/LineCounterTool")),
  "text-diff": React.lazy(() => import("@/components/tools/TextDiffTool")),
  "find-replace": React.lazy(() => import("@/components/tools/FindReplaceTool")),
  "sort-lines": React.lazy(() => import("@/components/tools/SortLinesTool")),
  "remove-duplicates": React.lazy(() => import("@/components/tools/RemoveDuplicatesTool")),
  "reverse-text": React.lazy(() => import("@/components/tools/ReverseTextTool")),
  "ascii-art": React.lazy(() => import("@/components/tools/AsciiArtTool")),
  "string-escape": React.lazy(() => import("@/components/tools/StringEscapeTool")),
  "whitespace-remover": React.lazy(() => import("@/components/tools/WhitespaceRemoverTool")),
  "text-case-changer": React.lazy(() => import("@/components/tools/TextCaseChangerTool")),
  "css-gradient": React.lazy(() => import("@/components/tools/CssGradientTool")),
  "box-shadow": React.lazy(() => import("@/components/tools/BoxShadowTool")),
  "border-radius": React.lazy(() => import("@/components/tools/BorderRadiusTool")),
  "flexbox-playground": React.lazy(() => import("@/components/tools/FlexboxPlaygroundTool")),
  "grid-generator": React.lazy(() => import("@/components/tools/GridGeneratorTool")),
  "css-minifier": React.lazy(() => import("@/components/tools/CssMinifierTool")),
  "css-units": React.lazy(() => import("@/components/tools/CssUnitsTool")),
  "css-specificity": React.lazy(() => import("@/components/tools/CssSpecificityTool")),
  "http-status": React.lazy(() => import("@/components/tools/HttpStatusTool")),
  "mime-types": React.lazy(() => import("@/components/tools/MimeTypesTool")),
  "meta-tag": React.lazy(() => import("@/components/tools/MetaTagTool")),
  "og-preview": React.lazy(() => import("@/components/tools/OgPreviewTool")),
  "robots-txt": React.lazy(() => import("@/components/tools/RobotsTxtTool")),
  "sitemap": React.lazy(() => import("@/components/tools/SitemapTool")),
  "favicon": React.lazy(() => import("@/components/tools/FaviconTool")),
  "viewport-checker": React.lazy(() => import("@/components/tools/ViewportCheckerTool")),
  "image-base64": React.lazy(() => import("@/components/tools/ImageBase64Tool")),
  "svg-data-uri": React.lazy(() => import("@/components/tools/SvgDataUriTool")),
  "color-picker": React.lazy(() => import("@/components/tools/ColorPickerTool")),
  "image-dimensions": React.lazy(() => import("@/components/tools/ImageDimensionsTool")),
  "placeholder-image": React.lazy(() => import("@/components/tools/PlaceholderImageTool")),
  "percentage-calc": React.lazy(() => import("@/components/tools/PercentageCalcTool")),
  "aspect-ratio": React.lazy(() => import("@/components/tools/AspectRatioTool")),
  "byte-calc": React.lazy(() => import("@/components/tools/ByteCalcTool")),
  "scientific-calc": React.lazy(() => import("@/components/tools/ScientificCalcTool")),
  "bitwise-calc": React.lazy(() => import("@/components/tools/BitwiseCalcTool")),
  "matrix-calc": React.lazy(() => import("@/components/tools/MatrixCalcTool")),
  "ip-validator": React.lazy(() => import("@/components/tools/IpValidatorTool")),
  "subnet-calc": React.lazy(() => import("@/components/tools/SubnetCalcTool")),
  "mac-formatter": React.lazy(() => import("@/components/tools/MacFormatterTool")),
  "port-reference": React.lazy(() => import("@/components/tools/PortReferenceTool")),
  "cidr-calc": React.lazy(() => import("@/components/tools/CidrCalcTool")),
  "password-strength": React.lazy(() => import("@/components/tools/PasswordStrengthTool")),
  "csp-generator": React.lazy(() => import("@/components/tools/CspGeneratorTool")),
  "cors-helper": React.lazy(() => import("@/components/tools/CorsHelperTool")),
  "hmac-generator": React.lazy(() => import("@/components/tools/HmacGeneratorTool")),
  "checksum-validator": React.lazy(() => import("@/components/tools/ChecksumValidatorTool")),
  "keyboard-shortcuts": React.lazy(() => import("@/components/tools/KeyboardShortcutsTool")),
  "emoji-picker": React.lazy(() => import("@/components/tools/EmojiPickerTool")),
  "ascii-table": React.lazy(() => import("@/components/tools/AsciiTableTool")),
  "git-cheatsheet": React.lazy(() => import("@/components/tools/GitCheatsheetTool")),
  "regex-tester": React.lazy(() => import("@/components/tools/RegexTesterTool")),
  "cron-viewer": React.lazy(() => import("@/components/tools/CronViewerTool")),
  "chmod-calc": React.lazy(() => import("@/components/tools/ChmodCalcTool")),
  "jsonpath": React.lazy(() => import("@/components/tools/JsonPathTool")),
  "color-contrast": React.lazy(() => import("@/components/tools/ColorContrastTool")),
  "json-schema": React.lazy(() => import("@/components/tools/JsonSchemaTool")),
  "jwt-generator": React.lazy(() => import("@/components/tools/JwtGeneratorTool")),
  "gitignore-gen": React.lazy(() => import("@/components/tools/GitignoreGenTool")),
  "md-table": React.lazy(() => import("@/components/tools/MdTableTool")),
  "js-minifier": React.lazy(() => import("@/components/tools/JsMinifierTool")),
  "html-minifier": React.lazy(() => import("@/components/tools/HtmlMinifierTool")),
  "json-diff": React.lazy(() => import("@/components/tools/JsonDiffTool")),
  "timestamp-diff": React.lazy(() => import("@/components/tools/TimestampDiffTool")),
  "url-parser": React.lazy(() => import("@/components/tools/UrlParserTool")),
  "css-clip-path": React.lazy(() => import("@/components/tools/CssClipPathTool")),
  "svg-path-viewer": React.lazy(() => import("@/components/tools/SvgPathViewerTool")),
  "hex-dump": React.lazy(() => import("@/components/tools/HexDumpTool")),
  "yaml-validator": React.lazy(() => import("@/components/tools/YamlValidatorTool")),
  "regex-explainer": React.lazy(() => import("@/components/tools/RegexExplainerTool")),
  "base58": React.lazy(() => import("@/components/tools/Base58Tool")),
  "docker-compose": React.lazy(() => import("@/components/tools/DockerComposeTool")),
  "nginx-config": React.lazy(() => import("@/components/tools/NginxConfigTool")),
  "json-to-ts": React.lazy(() => import("@/components/tools/JsonToTsTool")),
  "env-generator": React.lazy(() => import("@/components/tools/EnvGeneratorTool")),
};

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = tools.find((t) => t.id === toolId);

  useEffect(() => {
    if (toolId) addRecentTool(toolId);
  }, [toolId]);

  if (!tool || !toolId) return <Navigate to="/" replace />;

  const Component = toolComponents[toolId];
  if (!Component) return <Navigate to="/" replace />;

  return (
    <div className="dark">
      <ToolLayout title={tool.name} description={tool.description}>
        <React.Suspense fallback={<div className="flex items-center justify-center py-20 text-muted-foreground font-mono text-sm">Loading tool…</div>}>
          <Component />
        </React.Suspense>
      </ToolLayout>
    </div>
  );
};

export default ToolPage;
