import { InputSelectorProps } from "@/components/input-selector";
import { FIELD_VALUE, ROOMS, SUSPECTS, WEAPONS } from "@/constants";
import {
  ClueSheetState,
  RowList,
  ValueProps,
} from "@/store/reducers/clue-sheet-slice";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const updateLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn("Local Storage is not available", { details: e });
  }
};

export const getPlayerLocalStorage = () => {
  try {
    const data = localStorage.getItem("player");
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn("Local Storage is not available", { details: e });
  }
  return { names: [] };
};

export const generateList = (names: string[], rows: string[]): RowList[] => {
  const returnTable = rows.map((row) => {
    const value = names.map((name: string) => ({
      [name]: FIELD_VALUE.empty,
    })) as ValueProps[];
    return { label: row, value, isCircle: false, isCrossed: false };
  });
  return returnTable;
};

export const resetClueSheetData = () => {
  const names = getPlayerLocalStorage().names;

  let tableData = {
    suspectList: [],
    weaponList: [],
    roomList: [],
  } as ClueSheetState;

  if (names.length === 0) {
    return tableData;
  }

  tableData = {
    ...tableData,
    suspectList: generateList(names, SUSPECTS),
    weaponList: generateList(names, WEAPONS),
    roomList: generateList(names, ROOMS),
  };
  return tableData;
};

export const initClueSheetData = () => {
  try {
    const data = localStorage.getItem("clueSheet");
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn("Local Storage is not available", { details: e });
  }
  return resetClueSheetData();
};

export const updateFieldValue = (
  state: RowList[],
  value: InputSelectorProps["value"],
  playerName: InputSelectorProps["playerName"],
  rowKey: InputSelectorProps["rowKey"],
) => {
  let rowList = [...state];
  rowList = rowList.map((row) => {
    if (row.label === rowKey) {
      const _value = [...row.value];
      _value.forEach((item) => {
        if (item[playerName]) {
          item[playerName] = value;
        }
      });
      return { ...row, value: _value };
    }
    return row;
  });
  return rowList;
};
export const updateCrossedRow = (
  state: RowList[],
  rowKey: InputSelectorProps["rowKey"],
  value: boolean,
) => {
  let rowList = [...state];
  rowList = rowList.map((row) => {
    if (row.label === rowKey) {
      return { ...row, isCrossed: value };
    }

    return row;
  });
  return rowList;
};
