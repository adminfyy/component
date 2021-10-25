import React from "react";

interface IContext {
  subscribe: Function;
  unsubscribe: Function;
  getParent: Function;
}
export const StickContext = React.createContext<IContext>({
  subscribe: () => false,
  unsubscribe: () => false,
  getParent: () => false,
});

export default StickContext;
