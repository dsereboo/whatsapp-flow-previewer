import { Button } from "../ui/button";
import { ThemeAndOS } from "./os-theme-selector";

interface Props {
  render: () => void;
}
export const PreviewHeader = (props: Props) => {
  const { render } = props;

  return (
    <header className="flex flex-row p-4 items-center justify-between px-2 w-full">
      <p className="font-semibold text-lg">Preview</p>
      <div className="flex flex-row justify-between items-center space-x-4">
        <Button
          variant="default"
          size="default"
          onClick={render}
          className="bg-[#0a78be] rounded-sm hover:bg-[#085f95] hover:cursor-pointer"
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
        <ThemeAndOS />
      </div>
    </header>
  );
};
