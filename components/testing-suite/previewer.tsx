"use client";
import { useState } from "react";
import { PreviewHeader } from "./preview-header";
import { DrawerShell } from "../rendering-engine/drawer-shell";
import { RoutingModelControl } from "../rendering-engine/routing-model-control";
import { parseFlowJSON, ParseResult } from "../rendering-engine/lib/parse-flow";
import { RenderScreen } from "../rendering-engine/flow-screen";
import { FlowJSON, FlowScreen } from "../rendering-engine/lib/flow";
import { generateUID } from "@/utils";

interface PreviewProps {
  getEditorContent: () => string | undefined;
}

export const Preview = (props: PreviewProps) => {
  const { getEditorContent } = props;
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [renderState, setRenderState] = useState<FlowJSON | null>(null);
  const [currentScreen, setCurrentScreen] = useState<FlowScreen | null>(null);

  const handleRenderChain = () => {
    const result = parseFlowJSON(getEditorContent());
    setParseResult(result);
    if (result.status === "success") {
      setRenderState(result.data);
      setCurrentScreen({ ...result.data.screens[0], id: generateUID() });
    }
  };

  //when flow is invalid, renderer to display flow is invalid
  return (
    <div className="flex flex-col space-y-8 w-full">
      <PreviewHeader render={handleRenderChain} />
      <div className="flex flex-col  items-center space-y-8 min-h-100 2xl:h-[90vh] h-screen relative">
        <RoutingModelControl
          setCurrentScreen={setCurrentScreen}
          currentScreen={currentScreen}
          renderState={renderState}
        />
        <article
          ref={setContainer}
          className="flex  flex-col border-4 border-[#e6e6e6] rounded-lg 2xl:w-3/4 w-4/6 h-160 relative overflow-hidden"
        >
          <div className="bg-white flex flex-1 flex-row items-center p-4 rounded-t-lg space-x-6">
            <div className="bg-[#1DAA61] rounded-full flex flex-row justify-center items-center   h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 stroke-white   "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
            </div>
            <div className="bg-[#1DAA61] flex flex-row w-1/3 h-1 p-1 rounded-md"></div>
          </div>
          <div className="h-full bg-[#EFE9E0] py-3 px-2">
            <div className="flex flex-row justify-between mt-2">
              <div className="flex-2"></div>
              <div className="flex-3 w-full p-4 rounded-4xl bg-[#D9FDD3]">
                <div className="w-3/4 p-1 rounded-4xl bg-[#8e9299]"></div>
              </div>
            </div>
            <div className="">
              <DrawerShell
                parseResult={parseResult}
                title={currentScreen?.title ?? ""}
                portalRef={container}
              >
                {renderState !== null && currentScreen !== null ? (
                  <RenderScreen screen={currentScreen} />
                ) : (
                  <></>
                )}
              </DrawerShell>
            </div>
          </div>
          <div className="h-full flex-1 bg-[#EFE9E0]">
            <div className="bg-white p-5 rounded-4xl m-2"></div>
          </div>
        </article>
      </div>
    </div>
  );
};
