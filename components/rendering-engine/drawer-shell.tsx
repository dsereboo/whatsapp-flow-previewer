import { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EllipsisVertical } from "lucide-react";

interface Props {
  title: string;
  portalRef: HTMLElement | null;
}
export const DrawerShell = (props: PropsWithChildren<Props>) => {
  const { portalRef, title, children } = props;
  //read from top level state
  //show creen title
  // const containerRef = useRef<HTMLElement>(null);
  const [drawerToggle, setDrawerToggle] = useState(false);

  return (
    <div className="h-full w-full">
      <Drawer
        open={drawerToggle}
        onOpenChange={setDrawerToggle}
        dismissible={false}
      >
        <DrawerTrigger
          className="w-2/3 mt-4"
          onClick={() => setDrawerToggle(true)}
        >
          <div className="bg-white  max-w-[320px] w-full px-2 py-3 rounded-b-md rounded-tr-md space-y-1">
            <div className="w-3/4 p-1 rounded-4xl bg-[#cbcbcb]"></div>
            <div className="w-2/4 p-1 rounded-4xl bg-[#cbcbcb]"></div>
            <div className="bg-white text-center mt-4">
              <div className="bg-white"></div>
              <p className="text-sm font-medium text-[#007BFC]">
                Preview Flow
              </p>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent
          container={portalRef}
          className="absolute inset-x-0 bottom-0 -top-14 min-h-[95%]"
        >
          <DrawerHeader className="border-b p-2">
            <div className="flex flex-row justify-between items-center">
              <DrawerClose onClick={() => setDrawerToggle(false)}>
                <Button variant="default" size="icon" className="bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                      className="stroke-black"
                    />
                  </svg>
                </Button>
              </DrawerClose>
              <p>{title}</p>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <EllipsisVertical />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-40">
                    <p>Help</p>
                    <p>Report</p>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </DrawerHeader>
          <div className="px-6 overflow-y-auto no-scrollbar">{children}</div>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
