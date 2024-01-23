import React, { Dispatch, createContext, useReducer, Reducer } from "react";

import { Action, State, reducer } from "./reducer";

const initialState: State = {
  accounts: {},
  vestings: {},
};

type StateContextType = [State, Dispatch<Action>];

export const StateContext = createContext([
  initialState,
  () => {},
] as StateContextType);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
