"use client"
import { useRef } from "react";
import { FlowJsonEditor } from "./editor";
import { Preview } from "./previewer";
import { TestingSuiteLayout } from "./test-layout";
import type { editor } from "monaco-editor";


export const TestSuitePage = () => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const getEditorContent = () => {
    const value = editorRef.current?.getValue();
    return value;
  };
  
  return (
    <TestingSuiteLayout className="border border-gray-300 rounded-md p-1">
      <div className="flex flex-row  min-h-192">
        <article className="flex-1 flex flex-col justify-between">
          <header className="p-4 border-b">
            <p className="font-semibold text-lg">Flow JSON</p>
          </header>
          <FlowJsonEditor ref={editorRef} />
        </article>
        <article className="flex flex-1 relative w-full h-full">
          <Preview getEditorContent={getEditorContent} />
        </article>
      </div>
    </TestingSuiteLayout>
  );
};
