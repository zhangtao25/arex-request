import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { useContext, useRef, useState } from 'react';
import { useCodeMirror } from '../../helpers/editor/codemirror';
import { getValueByPath } from '../../helpers/utils/locale';
import { GlobalContext, HttpContext } from '../../index';
export const ResponseTestHeader = styled.div `
  display: flex;
  justify-content: space-between;
  & > span:first-of-type {
    font-size: 13px;
    line-height: 32px;
    font-weight: 500;
    color: #9d9d9d;
  }
`;
export const ResponseTestWrapper = styled.div `
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  flex: 1;
  & > div:last-of-type {
    width: 35%;
    text-align: left;
    border-left: 1px solid #eee;
    padding-left: 20px;
    & > span:first-of-type {
    }
    & > div:nth-of-type(2) {
      margin-top: 15px;
      margin-bottom: 10px;
    }
    & > span:nth-of-type(n + 2) {
      display: inline-block;
      color: #10b981;
      cursor: pointer;
      font-weight: bold;
      margin-left: 18px;
      margin-top: 10px;
      &:hover {
        color: #059669;
        transform: translateX(6px);
        transition: all 0.2s ease 0s;
      }
    }
  }
`;
const HttpTests = ({ getTestVal, OldTestVal }) => {
    const { store, dispatch } = useContext(HttpContext);
    const { store: globalStore } = useContext(GlobalContext);
    const t = (key) => getValueByPath(globalStore.locale.locale, key);
    const [TestVal, setTestVal] = useState('');
    const [isLineWrapping, setIsLineWrapping] = useState(true);
    const codeSnippet = [
        {
            name: 'Response: Status code is 200',
            text: `
// Check status code is 200
arex.test("Status code is 200", ()=> {
    arex.expect(arex.response.status).toBe(200);
});
`,
        },
    ];
    const codeCm = useRef(null);
    useCodeMirror({
        container: codeCm.current,
        value: store.request.testScript,
        height: '100%',
        extensions: [javascript()],
        theme: globalStore.theme.type,
        onChange: (val) => {
            dispatch({
                type: 'request.testScript',
                payload: val,
            });
        },
    });
    const addTest = (text) => {
        // console.log(store.request.testScript + text,'store.request.testScript + text')
        dispatch({
            type: 'request.testScript',
            payload: store.request.testScript + text,
        });
    };
    const feedLine = () => {
        setIsLineWrapping(!isLineWrapping);
    };
    return (_jsxs("div", { css: css `
        height: 100%;
        display: flex;
        flex-direction: column;
      `, children: [_jsxs(ResponseTestHeader, { children: [_jsx("span", { children: t('preRequest.javascript_code') }), _jsx("div", {})] }), _jsxs(ResponseTestWrapper, { children: [_jsx("div", { ref: codeCm, style: { width: '65%' } }), _jsxs("div", { children: [_jsx("div", { children: "Test scripts are written in JavaScript, and are run after the response is received." }), _jsx(Button, { type: 'text', onClick: () => window.open('https://docs.hoppscotch.io/features/tests'), children: "Read documentation" }), _jsx("div", { children: "Snippets" }), codeSnippet.map((e, i) => (_jsx(Button, { type: 'text', onClick: () => addTest(e.text), children: e.name }, i)))] })] })] }));
};
export default HttpTests;
