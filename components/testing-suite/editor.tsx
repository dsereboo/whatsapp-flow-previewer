"use client";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { whatsappFlowSchema } from "./editor-schema";

export const FlowJsonEditor = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;
    monaco.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      enableSchemaRequest: false,
      schemas: [
        {
          uri: "internal://whatsapp-flow-schema",
          fileMatch: ["*"],
          schema: whatsappFlowSchema,
        },
      ],
    });
  });
  return (
    <Editor
      height="90vh"
      language="json"
      options={{
        minimap: { enabled: false },
        stickyScroll: {
          enabled: false,
        },
        fontSize: 12,
        fontFamily: "monospace",
        lineNumbers: "on",
        scrollBeyondLastLine: false,
      }}
      defaultLanguage="json"
    />
  );
};
