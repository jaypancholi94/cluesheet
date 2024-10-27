export type Marking = "-" | "x" | "?" | "o";

export type DataRow = { label: string; values: { [key: string]: Marking } };
