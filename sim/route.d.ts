export type ToolName =
  | "check_link"
  | "explain_transaction"
  | "safety_tip"
  | "clean_up_steps"
  | "check_scam";

export interface ToolCall {
  name: ToolName;
  arguments: Record<string, string>;
}

export function route(utterance: string): ToolCall;

export interface LastAnswer {
  tool: ToolName;
  target?: string;
  spoken: string;
}

export type FollowUp = { kind: "repeat" } | { kind: "stop" } | { kind: "call"; call: ToolCall };

export function followUp(utterance: string, last: LastAnswer | null): FollowUp | null;
