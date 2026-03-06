import { isFlowJSON } from "./flow-guards";
import type { FlowJSON } from "./flow";

export type ParseResult =
  | { status: "success"; data: FlowJSON }
  | { status: "error"; message: string }
  | { status: "idle" };

export function parseFlowJSON(raw: string | undefined): ParseResult {
  if (!raw || raw.trim() === "") return { status: "idle" };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isFlowJSON(parsed)) {
      return { status: "error", message: "Invalid WhatsApp Flow structure" };
    }
    return { status: "success", data: parsed };
  } catch {
    return { status: "error", message: "Invalid JSON — check for syntax errors" };
  }
}