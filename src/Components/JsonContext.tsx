import { createContext, useContext, useState } from "react";

import type {JsonSchema} from "./types/JsonSchema";


interface JsonIF {
  json: JsonSchema | null;
  setJson: React.Dispatch<React.SetStateAction<any | null>>;
};

const JsonContext = createContext<JsonIF | null>(null);

export function JsonProvider({ children }: {children: React.ReactNode}) {
  const [json, setJson] = useState<any | null>(null);

  return (
  <JsonContext.Provider value={{json: json, setJson: setJson}}>
    {children}
  </JsonContext.Provider>
  );
}

export function useJson() {
  const ctx = useContext(JsonContext);
  if (!ctx) throw new Error("useJsonContext has to be used inside <JsonProvider>")
  return ctx.json;
}

export function useSetJson() {
  const ctx = useContext(JsonContext);
  if (!ctx) throw new Error("useJsonContext has to be used inside <JsonProvider>")
  return ctx.setJson;
}
