export const Components = {
  TextHeading: "TextHeading",
  TextSubheading: "TextSubheading",
  TextBody: "TextBody",
  TextCaption: "TextCaption",
  TextInput: "TextInput",
  TextArea: "TextArea",
  RadioButtonsGroup: "RadioButtonsGroup",
  CheckboxGroup: "CheckboxGroup",
  Dropdown: "Dropdown",
  Footer: "Footer",
  Form: "Form",
  Image: "Image",
  EmbeddedLink: "EmbeddedLink",
  OptIn: "OptIn",
  DatePicker: "DatePicker",
} as const;

export type ComponentType = keyof typeof Components;

interface DisplayList {
  id: string; 
  title: string
}

export interface FlowComponent {
  type: ComponentType;
  name?: string;
  label?: string;
  text?: string;
  "input-type"?: string;
  required?: boolean;
  "min-chars"?: number;
  "max-chars"?: number;
  "helper-text"?: string;
  "data-source"?: string | Array<DisplayList>;
  "on-click-action"?: { name: string; payload: Record<string, unknown> };
  children?: Array<FlowComponent>;
}

export interface FlowLayout {
  type: "SingleColumnLayout";
  children: Array<FlowComponent>;
}

export interface FlowScreen {
  id: string;
  title: string;
  terminal?: boolean;
  refresh_on_back?: boolean;
  data?: Record<string, unknown>;
  layout: FlowLayout;
}

export interface FlowJSON {
  version: string;
  data_api_version: string;
  routing_model: Record<string, Array<string>>;
  screens: Array<FlowScreen>;
}
