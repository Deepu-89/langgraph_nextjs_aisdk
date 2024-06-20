"use server";

import { agentExecutor } from "@/ai/graph";
import { processFile } from "@/app/agent";
import { streamRunnableUI } from "./server";
import { ReactNode } from "react";
import { createAI, getAIState, getMutableAIState } from "ai/rsc";

async function agent(inputs: {
  input: string;
  chat_history: [role: string, content: string][];
  file?: {
    base64: string;
    extension: string;
  };
}) {
  "use server";
  const processedInputs = processFile(inputs);

  const ais = getAIState();

  const history = getMutableAIState();
  console.log("aistate", ais, "history", history);

  return streamRunnableUI(agentExecutor(), processedInputs);
}

// Define the AI state and UI state types
export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
};
const initialAIState: ServerMessage[] = [{ role: "user", content: "asasas" }];
const initialUIState: ClientMessage[] = [];
// Create the AI provider with the initial states and allowed actions
export const AI = createAI({
  initialAIState,
  initialUIState,
  actions: {
    agent,
  },
});
