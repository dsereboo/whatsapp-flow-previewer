import { Button } from "../ui/button";
import { Field, FieldDescription } from "../ui/field";
import { FloatingInput, FloatingLabel } from "../ui/floating-input";
import { FlowComponent } from "./lib/flow";

interface Props {
  component: FlowComponent;
}

export const RenderFooter = (props: Props) => {
  const { component } = props;
  return (
    <Button className="absolute bottom-0 w-full rounded-full py-3 bg-[#1DAA61] hover:bg-[#268553]">
      {component.label}
    </Button>
  );
};
export const RenderComponent = (props: Props) => {
  const { component } = props;
  switch (component.type) {
    case "TextHeading":
      return (
        <h2 className="text-base font-bold text-gray-900">{component.text}</h2>
      );

    case "TextSubheading":
      return (
        <h3 className="text-sm font-semibold text-gray-800">
          {component.text}
        </h3>
      );

    case "TextBody":
      return <p className="text-sm text-gray-700">{component.text}</p>;

    case "TextCaption":
      return <p className="text-xs text-gray-500">{component.text}</p>;

    case "TextInput":
      return (
        <Field className="gap-0 clas">
          <div className="relative space-y-1 mt-2">
            <FloatingInput
              id="floating-customize"
              className=" rounded-sm p-5"
            />
            <FloatingLabel
              htmlFor="floating-customize"
              className="text-xs font-medium"
            >
              {component.label}
            </FloatingLabel>
          </div>
          <FieldDescription className="text-xs">
            {component["helper-text"]}
          </FieldDescription>
        </Field>

        // <div className="flex flex-col space-y-1">
        //   <input
        //     type={component["input-type"] === "passcode" ? "password" : "text"}
        //     placeholder={component["helper-text"]}
        //     className="border border-gray-300 rounded px-3 py-2 text-sm"
        //   />
        // </div>
      );

    case "Footer":
      return (
        <RenderFooter component={component} />
        // <button className="w-full bg-[#1DAA61] text-white text-sm font-semibold py-3 rounded-lg mt-auto">
        //   {component.label}
        // </button>
      );

    case "Dropdown":
      return <p className="text-xs">Dropdown</p>;

    case "RadioButtonsGroup":
      return (
        <div className="flex flex-col space-y-2">
          {component.label && (
            <label className="text-xs font-medium text-gray-600">
              {component.label}
            </label>
          )}
          {Array.isArray(component["data-source"]) &&
            component["data-source"].map((option) => (
              <label
                key={option.id}
                className="flex items-center space-x-2 text-sm"
              >
                <input type="radio" name={component.name} value={option.id} />
                <span>{option.title}</span>
              </label>
            ))}
        </div>
      );
    case "Form":
      return (
        <div className="flex flex-col space-y-4">
          {component.children?.map((child, i) => (
            <RenderComponent key={i} component={child} />
          ))}
        </div>
      );

    default:
      return null;
  }
};
