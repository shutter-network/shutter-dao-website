import { Dispatch, useContext } from "react";
import { StateContext } from "./provider";
import { Action, State } from "./reducer";
// Create a custom hook to use the state context
export const useStateValue = (): [State, Dispatch<Action>] =>
  useContext(StateContext);
