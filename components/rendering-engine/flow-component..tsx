import { FlowComponent } from "./lib/flow";

interface Props {
component: FlowComponent
}
export function RenderComponent(props:Props) {
    const{component} = props
  switch (component.type) {
    case "TextHeading":
      return <h2 className="text-base font-bold text-gray-900">{component.text}</h2>;

    case "TextSubheading":
      return <h3 className="text-sm font-semibold text-gray-800">{component.text}</h3>;

    case "TextBody":
      return <p className="text-sm text-gray-700">{component.text}</p>;

    case "TextCaption":
      return <p className="text-xs text-gray-500">{component.text}</p>;

    case "TextInput":
      return (
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-600">{component.label}</label>
          <input
            type={component["input-type"] === "passcode" ? "password" : "text"}
            placeholder={component["helper-text"]}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
      );

    case "RadioButtonsGroup":
      return (
        <div className="flex flex-col space-y-2">
          {component.label && (
            <label className="text-xs font-medium text-gray-600">{component.label}</label>
          )}
          {Array.isArray(component["data-source"]) &&
            component["data-source"].map((option) => (
              <label key={option.id} className="flex items-center space-x-2 text-sm">
                <input type="radio" name={component.name} value={option.id} />
                <span>{option.title}</span>
              </label>
            ))}
        </div>
      );

    case "Footer":
      return (
        <button className="w-full bg-[#1DAA61] text-white text-sm font-semibold py-3 rounded-lg mt-auto">
          {component.label}
        </button>
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
}