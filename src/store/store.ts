import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './reducers/player-slice';
import TableReducer from './reducers/clue-sheet-slice';

const store = configureStore({
  reducer: { player: playerReducer, table: TableReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
