import { Dispatch, SetStateAction, useState } from "react";
import { Field } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { FlowJSON, FlowScreen } from "./lib/flow";

interface Props {
  renderState: FlowJSON | null;
  currentScreen: FlowScreen | null;
  setCurrentScreen: Dispatch<SetStateAction<FlowScreen | null>>;
}

export const RoutingModelControl = (props: Props) => {
  const { renderState, currentScreen, setCurrentScreen } = props;

  //derived state
  const handleSelect = (value: string) => {
    setValue(value);
    let newScreen =
      renderState?.screens.filter((screen) => screen.id === value)[0] ?? null;
    setCurrentScreen(newScreen);
  };

  const [value, setValue] = useState("");
  //source state from where?

  return (
    <>
      {renderState?.screens && renderState?.screens?.length > 1 ? (
        <Field className="w-7/12">
          <Select
            defaultValue={currentScreen?.title}
            value={value}
            onValueChange={handleSelect}
          >
            <SelectTrigger className="rounded-sm px-3 py-5 border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" className="mt-1">
              <SelectGroup>
                {renderState?.screens.map((screen) => {
                  return (
                    <SelectItem className="p-3" value={screen.id}>
                      {screen.title}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      ) : (
        <></>
      )}
    </>
  );
};
