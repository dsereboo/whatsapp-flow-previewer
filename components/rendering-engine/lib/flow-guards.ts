import { FlowLayout, FlowScreen,  FlowJSON, FlowComponent } from "./flow";


function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFlowComponent(value: unknown): value is FlowComponent {
  return isRecord(value) && typeof (value as Record<string, unknown>).type === "string";
}

function isFlowLayout(value: unknown): value is FlowLayout {
  return (
    isRecord(value) &&
    (value as Record<string, unknown>).type === "SingleColumnLayout" &&
    Array.isArray((value as Record<string, unknown>).children) &&
    ((value as Record<string, unknown>).children as unknown[]).every(isFlowComponent)
  );
}

function isFlowScreen(value: unknown): value is FlowScreen {
  return (
    isRecord(value) &&
    typeof (value as Record<string, unknown>).id === "string" &&
    typeof (value as Record<string, unknown>).title === "string" &&
    isFlowLayout((value as Record<string, unknown>).layout)
  );
}

export function isFlowJSON(value: unknown): value is FlowJSON {
  return (
    isRecord(value) &&
    typeof (value as Record<string, unknown>).version === "string" &&
    isRecord((value as Record<string, unknown>).routing_model) &&
    Array.isArray((value as Record<string, unknown>).screens) &&
    ((value as Record<string, unknown>).screens as unknown[]).every(isFlowScreen)
  );
}