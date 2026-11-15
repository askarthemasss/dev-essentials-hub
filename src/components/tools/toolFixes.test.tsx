import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import AngleConverterTool from "./AngleConverterTool";
import Base64Tool from "./Base64Tool";
import CharCounterTool from "./CharCounterTool";
import GridGeneratorTool from "./GridGeneratorTool";
import HtmlEntityTool from "./HtmlEntityTool";
import JsonXmlTool from "./JsonXmlTool";
import JsonYamlTool from "./JsonYamlTool";
import MatrixCalcTool from "./MatrixCalcTool";
import MorseCodeTool from "./MorseCodeTool";
import TimestampDiffTool from "./TimestampDiffTool";
import WordCounterTool from "./WordCounterTool";
import XmlFormatterTool from "./XmlFormatterTool";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const textareas = () => screen.getAllByRole("textbox") as HTMLTextAreaElement[];

describe("tool behaviour fixes", () => {
  it("carries Base64 output into the input when switching direction", () => {
    render(<Base64Tool />);
    const [input] = textareas();

    fireEvent.change(input, { target: { value: "hello" } });
    expect(textareas()[1]).toHaveValue("aGVsbG8=");

    fireEvent.click(screen.getByRole("button", { name: "Decode" }));

    expect(textareas()[0]).toHaveValue("aGVsbG8=");
    expect(textareas()[1]).toHaveValue("hello");
  });

  it("does not carry a Base64 error into the new input", () => {
    render(<Base64Tool />);
    fireEvent.click(screen.getByRole("button", { name: "Decode" }));

    fireEvent.change(textareas()[0], { target: { value: "a" } });
    expect(textareas()[1]).toHaveValue("Error: Invalid input");

    fireEvent.click(screen.getByRole("button", { name: "Encode" }));

    expect(textareas()[0]).toHaveValue("a");
    expect(textareas()[1]).toHaveValue("YQ==");
  });

  it("formats XML with a greater-than sign in an attribute", () => {
    render(<XmlFormatterTool />);
    fireEvent.change(textareas()[0], {
      target: { value: '<root><node title="a > b">value</node><item/></root>' },
    });

    expect(textareas()[1]).toHaveValue(
      ["<root>", '  <node title="a > b">value</node>', "  <item/>", "</root>"].join("\n")
    );
  });

  it("carries JSON/YAML output into the new input", () => {
    render(<JsonYamlTool />);
    const [input] = textareas();

    fireEvent.change(input, { target: { value: '{"name":"Alice"}' } });
    fireEvent.click(screen.getByRole("button", { name: "YAML → JSON" }));

    expect(textareas()[0].value).toContain("name: Alice");
    expect(JSON.parse(textareas()[1].value)).toEqual({ name: "Alice" });
  });

  it("carries JSON/XML output into the new input", () => {
    render(<JsonXmlTool />);
    const [input] = textareas();

    fireEvent.change(input, { target: { value: '{"user":{"name":"Alice"}}' } });
    fireEvent.click(screen.getByRole("button", { name: "XML → JSON" }));

    expect(textareas()[0].value).toContain("<user>");
    expect(JSON.parse(textareas()[1].value)).toEqual({
      root: { user: { name: "Alice" } },
    });
  });

  it("decodes HTML entities without stripping tags", () => {
    render(<HtmlEntityTool />);
    fireEvent.click(screen.getByRole("button", { name: "Decode" }));

    fireEvent.change(textareas()[0], {
      target: { value: "&lt;b&gt;hi&lt;/b&gt; &amp; bye" },
    });

    expect(textareas()[1]).toHaveValue("<b>hi</b> & bye");
  });

  it("round-trips Morse code and tolerates extra spaces", () => {
    render(<MorseCodeTool />);
    fireEvent.change(textareas()[0], { target: { value: "SOS" } });
    expect(textareas()[1]).toHaveValue("... --- ...");

    fireEvent.click(screen.getByRole("button", { name: "From Morse" }));
    expect(textareas()[0]).toHaveValue("... --- ...");
    expect(textareas()[1]).toHaveValue("SOS");

    fireEvent.change(textareas()[0], { target: { value: "...   ---   ..." } });
    expect(textareas()[1]).toHaveValue("SOS");
  });

  it("counts emoji as a single character", () => {
    render(<CharCounterTool />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "a👍" } });

    expect(screen.getByText("With spaces").previousElementSibling).toHaveTextContent("2");
    expect(screen.getByText("Without spaces").previousElementSibling).toHaveTextContent("2");
  });

  it("counts grapheme clusters in the word counter", () => {
    render(<WordCounterTool />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "👨‍👩‍👧‍👦" },
    });

    expect(screen.getByText("Characters").previousElementSibling).toHaveTextContent("1");
  });

  it("allows negative and decimal matrix values", () => {
    render(<MatrixCalcTool />);
    fireEvent.change(screen.getByLabelText("Row 1, column 1"), {
      target: { value: "-2" },
    });
    fireEvent.change(screen.getByLabelText("Row 1, column 2"), {
      target: { value: "0.5" },
    });
    fireEvent.change(screen.getByLabelText("Row 2, column 1"), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText("Row 2, column 2"), {
      target: { value: "3" },
    });

    expect(screen.getByText("Determinant: -8")).toBeInTheDocument();
  });

  it("shows a placeholder instead of NaN for invalid numbers", () => {
    render(<AngleConverterTool />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });

    expect(screen.getByText("Radians: —")).toBeInTheDocument();
    expect(screen.getByText("Gradians: —")).toBeInTheDocument();
  });

  it("clamps the CSS grid preview to valid values", () => {
    render(<GridGeneratorTool />);
    const [columns] = screen.getAllByRole("spinbutton");

    fireEvent.change(columns, { target: { value: "0" } });

    expect(screen.getByText(/repeat\(1, 1fr\)/)).toBeInTheDocument();
  });

  it("seeds datetime-local inputs from local time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 2, 3, 4));

    const { container } = render(<TimestampDiffTool />);
    const inputs = container.querySelectorAll<HTMLInputElement>('input[type="datetime-local"]');

    expect(inputs[0]).toHaveValue("2024-01-02T03:04");
    expect(inputs[1]).toHaveValue("2024-01-09T03:04");
  });
});
