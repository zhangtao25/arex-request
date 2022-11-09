import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { css } from '@emotion/react';
import { Radio } from 'antd';
import { useContext, useRef, useState } from 'react';
import RawBody from './RawBody';
import { GlobalContext, HttpContext } from '../../index';
import { getValueByPath } from '../../helpers/utils/locale';
const HttpBody = () => {
    const { store, dispatch } = useContext(HttpContext);
    const { store: globalStore } = useContext(GlobalContext);
    const t = (key) => getValueByPath(globalStore.locale.locale, key);
    const [value1, setValue1] = useState('application/json');
    const plainOptions = ['application/json'];
    const onChange1 = ({ target: { value } }) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };
    const rawBodyRef = useRef(null);
    return (_jsxs("div", { css: css `
        height: 100%;
        display: flex;
        flex-direction: column;
      `, children: [_jsxs("div", { css: css `
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        `, children: [_jsx(Radio.Group, { options: plainOptions, onChange: onChange1, value: value1 }), _jsx("div", { children: _jsx("a", { onClick: () => rawBodyRef.current.prettifyRequestBody(), children: t('action.prettify') }) })] }), _jsx(RawBody, { cRef: rawBodyRef })] }));
};
export default HttpBody;
