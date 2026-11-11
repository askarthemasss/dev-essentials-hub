import { useState } from "react";
import { format, type SqlLanguage } from "sql-formatter";
import DualPane from "./DualPane";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dialects: Array<{ label: string; value: SqlLanguage }> = [
  { label: "Standard SQL", value: "sql" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "MySQL", value: "mysql" },
  { label: "MariaDB", value: "mariadb" },
  { label: "SQLite", value: "sqlite" },
  { label: "SQL Server", value: "transactsql" },
  { label: "Oracle PL/SQL", value: "plsql" },
  { label: "BigQuery", value: "bigquery" },
  { label: "Snowflake", value: "snowflake" },
  { label: "ClickHouse", value: "clickhouse" },
];

const SqlFormatterTool = () => {
  const [input, setInput] = useState("");
  const [dialect, setDialect] = useState<SqlLanguage>("sql");

  let output = "";
  if (input.trim()) {
    try {
      output = format(input, { language: dialect, keywordCase: "upper", tabWidth: 2 });
    } catch (caught) {
      output = `Could not format this SQL: ${caught instanceof Error ? caught.message : "unknown syntax error"}`;
    }
  }

  return (
    <DualPane
      input={input}
      output={output}
      onInputChange={setInput}
      inputPlaceholder="Paste SQL here…"
      outputLabel="Formatted SQL"
      actions={
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">Dialect</span>
          <Select value={dialect} onValueChange={(value) => setDialect(value as SqlLanguage)}>
            <SelectTrigger className="w-48 border-border bg-secondary font-mono text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dialects.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    />
  );
};

export default SqlFormatterTool;
