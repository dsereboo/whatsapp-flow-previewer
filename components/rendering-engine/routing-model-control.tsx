import { Field, FieldGroup } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";

interface Props {
   
}

export const RoutingModelControl = (props:Props) => {
    const {} = props
    //source state from where?
  return (
    <>
        <FieldGroup className="w-7/12">
      <Field >
      <Select defaultValue="BALANCE_CHECK_ENTER_SCREEN">
          <SelectTrigger    className="rounded-sm px-3 py-5 border-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position= "popper"

            className="mt-1"
          >
            <SelectGroup>
                   
              <SelectItem value="apple">
          apples
              </SelectItem>
              <SelectItem value="BALANCE_CHECK_ENTER_SCREEN">BALANCE_CHECK_ENTER_SCREEN</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
          </Field>
    </FieldGroup>
    </>
  );
};
