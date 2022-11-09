import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { CopyOutlined } from '@ant-design/icons';
import { json } from '@codemirror/lang-json';
import { css } from '@emotion/react';
import { message, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { useContext, useRef } from 'react';
import { useCodeMirror } from '../../../helpers/editor/codemirror';
import { GlobalContext, HttpContext } from '../../../index';
function coppyUrl(url) {
    copy(url);
    message.success('copy success🎉');
}
const JSONLensRenderer = ({ response }) => {
    const { store } = useContext(HttpContext);
    const { store: globalStore } = useContext(GlobalContext);
    const jsonResponse = useRef(null);
    const jsonObj = JSON.parse(response.body || '{}');
    useCodeMirror({
        container: jsonResponse.current,
        value: JSON.stringify(jsonObj, null, 2),
        height: '100%',
        extensions: [json()],
        theme: globalStore.theme.type,
    });
    return (_jsxs("div", { css: css `
        display: flex;
        flex-direction: column;
        height: 100%;
      `, children: [_jsxs("div", { css: css `
          display: flex;
          justify-content: space-between;
        `, children: [_jsx("span", { children: "Response Body" }), _jsx("div", { children: _jsx("div", { children: _jsx(Tooltip, { title: 'Copy', placement: 'left', children: _jsx("a", { css: css `
                  padding: 8px;
                  display: block;
                `, onClick: () => coppyUrl(JSON.stringify(jsonObj, null, 2)), children: _jsx(CopyOutlined, {}) }) }) }) })] }), _jsx("div", { css: css `
          overflow-y: auto;
        `, children: _jsx("div", { ref: jsonResponse }) })] }));
};
export default JSONLensRenderer;
