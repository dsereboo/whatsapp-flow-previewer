import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { PreviewHeader } from "./preview-header";
import { DrawerShell } from "../rendering-engine/drawer-shell";

interface PreviewProps {
  getEditorContent: () => string | undefined;
}

export const Preview = (props: PreviewProps) => {
  const { getEditorContent } = props;
  const [container, setContainer] = useState<HTMLElement | null>(null);

  //get editor content
  //pass to rendering engine
  //pass to display component 

  return (
    <div className="flex flex-col space-y-8 w-full">
      <header className="flex flex-row p-4 items-center justify-between px-2 w-full">
        <p className="font-semibold text-lg">Preview</p>
        <div className="flex flex-row justify-between items-center space-x-4">
          <Button
            variant="default"
            size="default"
            className="bg-[#0a78be] rounded-sm hover:bg-[#085f95] "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>

            <p className="text-white font-semibold text-[16px]">Run</p>
          </Button>
          <p>OS and theme selector</p>
        </div>
      </header>
      <div className="flex flex-col justify-center items-center space-y-8 h-[90vh] relative">
        <p>control that is hidden when no routing model is found</p>
        <article
          ref={setContainer}
          className="flex  flex-col border-4 border-[#e6e6e6] rounded-lg w-90 h-160 relative overflow-hidden"
        >
          <div className="bg-white flex flex-1 flex-row items-baseline p-4 rounded-t-lg space-x-6">
            <div className=" flex flex-row justify-center items-center rounded-full bg-[#1DAA61] h-8 w-8">
              <p>i</p>
            </div>
            <span className="bg-[#1DAA61] flex flex-row w-1/3 h-1 p-1 rounded-md"></span>
          </div>
          <div className="h-full bg-[#EFE9E0] py-3 px-2">
            <div className="flex flex-row justify-between mt-2">
              <div className="flex-2"></div>
              <div className="flex-3 w-full p-4 rounded-4xl bg-[#D9FDD3]">
                <div className="w-3/4 p-1 rounded-4xl bg-[#8e9299]"></div>
              </div>
            </div>
            <div>
        <DrawerShell portalRef={container}/>
            </div>
          </div>
          <div className="h-fulln flex-1  bg-[#EFE9E0]">
            <div className="bg-white p-5 rounded-4xl m-2"></div>
          </div>
        </article>
      </div>
    </div>
  );
};
