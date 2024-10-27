"use client";

import { Provider } from "react-redux";
import store from "./store";
import { memo } from "react";

type ReduxProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider: React.FC<ReduxProviderProps> = memo(({ children }) => {
  return <Provider store={store}>{children}</Provider>;
});

ReduxProvider.displayName = "ReduxProvider";
export default ReduxProvider;
