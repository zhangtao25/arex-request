import { json } from '@codemirror/lang-json';
import { css } from '@emotion/react';
import { Button, message } from 'antd';
import { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useCodeMirror } from '../../helpers/editor/codemirror';
import { GlobalContext, HttpContext } from '../../index';
import useDarkMode from 'use-dark-mode';
const HttpRawBody = ({ cRef }) => {
  const rawBodyParameters = useRef(null);
  const { store: globalStore } = useContext(GlobalContext);
  const { store, dispatch } = useContext(HttpContext);
  const darkMode = useDarkMode();
  useCodeMirror({
    container: rawBodyParameters.current,
    value: store.request.body.body,
    height: '100%',
    extensions: [json()],
    theme: darkMode.value?'dark':'light',
    onChange: (val) => {
      dispatch({
        type: 'request.body.body',
        payload: val,
      });
    },
  });
  useImperativeHandle(cRef, () => {
    return {
      prettifyRequestBody: function () {
        prettifyRequestBody();
      },
    };
  });
  const prettifyRequestBody = () => {
    try {
      const jsonObj = JSON.parse(store.request.body.body);
      dispatch({
        type: 'request.body.body',
        payload: JSON.stringify(jsonObj, null, 2),
      });
    } catch (e) {
      message.error(e.message);
    }
  };
  return (
    <div
      css={css`
        flex: 1;
        overflow-y: auto;
      `}
    >
      <div ref={rawBodyParameters}></div>
    </div>
  );
};

export default HttpRawBody;
