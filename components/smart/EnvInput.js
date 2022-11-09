import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { hoverTooltip } from '@codemirror/view';
import { css } from '@emotion/react';
import { useContext, useRef } from 'react';
import { useEnvCodeMirror } from '../../helpers/editor/extensions/EnvCodeMirror';
import { getMarkFromToArr, HOPP_ENVIRONMENT_REGEX, } from '../../helpers/editor/extensions/HoppEnvironment';
import { GlobalContext, HttpContext } from '../../index';
const SmartEnvInput = ({ value, onChange }) => {
    const smartEnvInputRef = useRef(null);
    const { dispatch, store } = useContext(HttpContext);
    const { dispatch: globalDispatch, store: globalStore } = useContext(GlobalContext);
    useEnvCodeMirror({
        container: smartEnvInputRef.current,
        value: value,
        height: '30px',
        extensions: [
            [
                hoverTooltip((view, pos, side) => {
                    const { text } = view.state.doc.lineAt(pos);
                    const markArrs = getMarkFromToArr(text, HOPP_ENVIRONMENT_REGEX, globalStore.environment);
                    const index = markArrs.map((i) => pos < i.to && pos > i.from).findIndex((i) => i);
                    if (index === -1) {
                        return null;
                    }
                    return {
                        pos: pos,
                        end: pos,
                        above: true,
                        arrow: true,
                        create(view) {
                            const dom = document.createElement('div');
                            dom.innerHTML = `
              <span class="name">${markArrs[index].matchEnv.name}</span>
              <span class="value">${markArrs[index].matchEnv.value}</span>
              `;
                            dom.className = 'tooltip-theme1';
                            return { dom };
                        },
                    };
                }),
            ],
        ],
        onChange: (val) => {
            console.log({ val });
            dispatch({
                type: 'request.endpoint',
                payload: val,
            });
        },
        currentEnv: globalStore.environment,
        theme: globalStore.theme.type,
    });
    return (_jsx("div", { css: css `
        border: 1px solid ${globalStore.theme.theme.colors.primaryBorder};
        flex: 1;
        overflow: hidden;
      `, children: _jsx("div", { ref: smartEnvInputRef }) }));
};
export default SmartEnvInput;
