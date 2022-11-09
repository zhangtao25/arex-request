import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { json } from '@codemirror/lang-json';
import { css } from '@emotion/react';
import { message } from 'antd';
import { useContext, useImperativeHandle, useRef } from 'react';
import { useCodeMirror } from '../../helpers/editor/codemirror';
import { GlobalContext, HttpContext } from '../../index';
const HttpRawBody = ({ cRef }) => {
    const rawBodyParameters = useRef(null);
    const { store: globalStore } = useContext(GlobalContext);
    const { store, dispatch } = useContext(HttpContext);
    useCodeMirror({
        container: rawBodyParameters.current,
        value: store.request.body.body,
        height: '100%',
        extensions: [json()],
        theme: globalStore.theme.type,
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
        }
        catch (e) {
            message.error(e.message);
        }
    };
    return (_jsx("div", { css: css `
        flex: 1;
        overflow-y: auto;
      `, children: _jsx("div", { ref: rawBodyParameters }) }));
};
export default HttpRawBody;
