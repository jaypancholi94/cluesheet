import { InputSelectorProps } from "@/components/input-selector";
import { CATEGORY, ROOMS, SUSPECTS, WEAPONS } from "@/constants";
import {
  initClueSheetData,
  resetClueSheetData,
  updateCrossedRow,
  updateFieldValue,
  updateLocalStorage,
} from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ValueProps = { [key: string]: string };
export type RowList = {
  label: string;
  isCircle: boolean;
  isCrossed: boolean;
  value: ValueProps[];
};
export interface ClueSheetState {
  suspectList: RowList[];
  weaponList: RowList[];
  roomList: RowList[];
}

const clueSheetSlice = createSlice({
  name: "clueSheet",
  initialState: initClueSheetData(),
  reducers: {
    resetClueSheet: (state) => {
      const { suspectList, weaponList, roomList } = resetClueSheetData();
      state.suspectList = suspectList;
      state.weaponList = weaponList;
      state.roomList = roomList;

      updateLocalStorage(
        "clueSheet",
        JSON.stringify({ suspectList, weaponList, roomList }),
      );
    },
    updateCrossedRowValue: (
      state,
      actions: PayloadAction<{
        category: (typeof CATEGORY)[keyof typeof CATEGORY];
        rowKey:
          | (typeof SUSPECTS)[number]
          | (typeof WEAPONS)[number]
          | (typeof ROOMS)[number];
        value: boolean;
      }>,
    ) => {
      const { suspectList, weaponList, roomList } = state;
      const { category, rowKey, value } = actions.payload;
      if (category === CATEGORY.suspects) {
        const _suspectList = updateCrossedRow(suspectList, rowKey, value);
        state.suspectList = _suspectList;
      }
      if (category === CATEGORY.weapons) {
        const _weaponList = updateCrossedRow(weaponList, rowKey, value);
        state.weaponList = _weaponList;
      }
      if (category === CATEGORY.rooms) {
        const _roomList = updateCrossedRow(roomList, rowKey, value);
        state.roomList = _roomList;
      }
      updateLocalStorage(
        "clueSheet",
        JSON.stringify({ suspectList, weaponList, roomList }),
      );
    },
    updateClueSheetValue: (
      state,
      actions: PayloadAction<InputSelectorProps>,
    ) => {
      const { value, rowKey, playerName, category } = actions.payload;
      const { suspectList, weaponList, roomList } = state;
      if (category === CATEGORY.suspects) {
        const _suspectList = updateFieldValue(
          suspectList,
          value,
          playerName,
          rowKey,
        );
        state.suspectList = _suspectList;
      }

      if (category === CATEGORY.weapons) {
        const _weaponList = updateFieldValue(
          weaponList,
          value,
          playerName,
          rowKey,
        );
        state.weaponList = _weaponList;
      }

      if (category === CATEGORY.rooms) {
        const _roomList = updateFieldValue(roomList, value, playerName, rowKey);
        state.roomList = _roomList;
      }

      updateLocalStorage(
        "clueSheet",
        JSON.stringify({ suspectList, weaponList, roomList }),
      );
    },
  },
});

export const { resetClueSheet, updateClueSheetValue, updateCrossedRowValue } =
  clueSheetSlice.actions;
export default clueSheetSlice.reducer;
