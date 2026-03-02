"use client";
import Editor, { useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useEffect, useRef } from "react";
import { whatsappFlowSchemaV2 } from "./editor-shema.v2";

interface FlowEditorProps {
  ref: React.RefObject<editor.IStandaloneCodeEditor | null>;
}

export const FlowJsonEditor = (props: FlowEditorProps) => {
  const { ref: editorRef } = props;
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
          schema: whatsappFlowSchemaV2,
        },
      ],
    });
  }, [monaco]);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      height="90%"
      language="json"
      onMount={handleEditorDidMount}
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
