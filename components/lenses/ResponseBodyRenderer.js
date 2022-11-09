import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { css } from '@emotion/react';
import { Tabs } from 'antd';
import TestResult from '../http/TestResult';
import LensesHeadersRenderer from './HeadersRenderer';
import JSONLensRenderer from './renderers/JSONLensRenderer';
import RawLensRenderer from './renderers/RawLensRenderer';
const LensesResponseBodyRenderer = ({ response, testResult, }) => {
    const items = [
        {
            label: 'JSON',
            key: '0',
            children: _jsx(JSONLensRenderer, { response: response }),
        },
        {
            label: 'Raw',
            key: '1',
            children: _jsx(RawLensRenderer, { response: response }),
        },
        {
            label: 'Headers',
            key: '2',
            children: _jsx(LensesHeadersRenderer, { headers: response.headers }),
        },
        {
            label: 'Result',
            key: '3',
            children: _jsx(TestResult, { testResult: testResult }),
        },
    ];
    console.log(response, 'response');
    return (_jsx("div", { css: css `
        flex: 1;
        .ant-tabs-content-holder {
          height: 100px;
        }
      `, children: _jsx(Tabs, { style: { height: '100%' }, items: items }) }));
};
export default LensesResponseBodyRenderer;
