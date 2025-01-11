import { createContext, type Dispatch, type SetStateAction } from "react";

export const ColorSchemeContext = createContext<{
  onChange: Dispatch<SetStateAction<"dark" | "light">>;
  colorScheme: string;
}>({ colorScheme: "light", onChange: () => {} });
