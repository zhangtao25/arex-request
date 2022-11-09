import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { css } from '@emotion/react';
import { Tabs, Tag } from 'antd';
import { useContext, useState } from 'react';
import ExtraRequestTabItemCompare from '../../extra/ExtraRequestTabItemCompare';
import ExtraRequestTabItemMock from '../../extra/ExtraRequestTabItemMock';
import { getValueByPath } from '../../helpers/utils/locale';
import { GlobalContext, HttpContext } from '../../index';
import HttpBody from './Body';
import HttpHeaders from './Headers';
import HttpParameters from './Parameters';
import HttpTests from './Tests';
const HttpRequestOptions = ({ requestaxios }) => {
    const { store } = useContext(HttpContext);
    const t = (key) => getValueByPath(globalStore.locale.locale, key);
    const [activeKey, setActiveKey] = useState('3');
    const { dispatch: globalDispatch, store: globalStore } = useContext(GlobalContext);
    const items = [
        {
            label: (_jsxs("div", { children: [t('tab.parameters'), ' ', _jsx(Tag, { css: css `
              display: ${store.request.params.length > 0 ? 'inline-block' : 'none'};
            `, children: store.request.params.length })] })),
            key: '0',
            children: _jsx(HttpParameters, {}),
        },
        {
            label: (_jsxs("div", { children: [t('tab.headers'), ' ', _jsx(Tag, { css: css `
              display: ${store.request.headers.length > 0 ? 'inline-block' : 'none'};
            `, children: store.request.headers.length })] })),
            key: '1',
            children: _jsx(HttpHeaders, {}),
        },
        { label: t('tab.body'), key: '3', children: _jsx(HttpBody, {}) },
        { label: t('tab.tests'), key: '4', children: _jsx(HttpTests, {}) },
        { label: 'Compare', key: '5', children: _jsx(ExtraRequestTabItemCompare, { requestaxios: requestaxios }) },
        {
            label: 'Mock',
            key: '6',
            children: _jsx(ExtraRequestTabItemMock, { recordId: store.request.recordId }),
        },
    ].filter((i) => !(i.key === '6' && !store.request.recordId));
    return (_jsx("div", { css: css `
        //相当于最小高度
        padding-left: 16px;
        padding-right: 16px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .ant-tabs-content-holder {
          height: 100px;
        }
      `, children: _jsx(Tabs, { style: { height: '100%' }, activeKey: activeKey, items: items, onChange: (val) => {
                setActiveKey(val);
            } }) }));
};
export default HttpRequestOptions;
