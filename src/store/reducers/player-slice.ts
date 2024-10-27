import { getPlayerLocalStorage, updateLocalStorage } from '@/lib/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayerState {
  names: string[];
}

const playerSlice = createSlice({
  name: 'player',
  initialState: getPlayerLocalStorage(),
  reducers: {
    updatePlayer: (state, action: PayloadAction<{ names: string[] }>) => {
      const { names } = action.payload;

      state.names = names;
      updateLocalStorage('player', JSON.stringify({ names }));
    },
  },
});

export const { updatePlayer } = playerSlice.actions;
export default playerSlice.reducer;
