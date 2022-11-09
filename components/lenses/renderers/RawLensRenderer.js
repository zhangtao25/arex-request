import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { EditorView } from '@codemirror/view';
import { useContext, useRef } from 'react';
import { useCodeMirror } from '../../../helpers/editor/codemirror';
import { GlobalContext } from '../../../index';
const RawLensRenderer = ({ response }) => {
    const { store: globalStore } = useContext(GlobalContext);
    const jsonResponse = useRef(null);
    useCodeMirror({
        container: jsonResponse.current,
        value: response.body,
        height: '300px',
        extensions: [EditorView.lineWrapping],
        lineWrapping: true,
        theme: globalStore.theme.type,
    });
    return (_jsx("div", { children: _jsx("div", { ref: jsonResponse }) }));
};
export default RawLensRenderer;
