import React from "react";
import { createContext, FC, useEffect, useReducer } from 'react';

import { defaultState, globalDefaultState, LocaleEnum } from '../lib/default';
function reducer(state: any = defaultState, action: { type: string; payload: any }) {
  return state;
}
const HttpContext = createContext({});
const GlobalContext = createContext({});
const TestProvider: FC<any> = ({
  children = null,
  theme,
  locale = LocaleEnum.en,
  collectionTreeData = [],
  environment,
}) => {
  const [store, dispatch] = useReducer(reducer, globalDefaultState);
  console.log({theme,locale})
  return <GlobalContext.Provider value={{ store, dispatch }}>{children}</GlobalContext.Provider>;
};
const Test123 = () => {
  const [store, dispatch] = useReducer(reducer, {
    ...defaultState,
  });
  return (
    <HttpContext.Provider value={{ store, dispatch }}>
      <div>123</div>
    </HttpContext.Provider>
  );
};

export default Test123;

export { TestProvider };
