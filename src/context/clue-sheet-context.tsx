import { createContext } from "react";

type ClueSheetContextType = { something: string };
export const ClueSheetContext = createContext<ClueSheetContextType | null>(
  null,
);
export const ClueSheetProvider = ({ children }: { children: ReactNode }) => {
  return <></>;
};
