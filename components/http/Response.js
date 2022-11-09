import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { css } from '@emotion/react';
import { useContext, useMemo } from 'react';
import ExtraResponseTabItemCompareResult from '../../extra/ExtraResponseTabItemCompareResult';
import { HttpContext } from '../..';
import LensesResponseBodyRenderer from '../lenses/ResponseBodyRenderer';
import HttpResponseMeta from './ResponseMeta';
const HttpResponse = ({ requestaxios }) => {
    const { store } = useContext(HttpContext);
    const hasResponse = useMemo(() => store.response.type === 'success' || store.response.type === 'fail', [store.response]);
    const loading = useMemo(() => store.response.type === null || store.response.type === 'loading', [store.response]);
    return (_jsx(_Fragment, { children: store.compareResponse.type !== 'null' ? (_jsx(ExtraResponseTabItemCompareResult, { responses: [JSON.parse(store.response.body), JSON.parse(store.compareResponse.body)], requestaxios: requestaxios })) : (_jsxs("div", { css: css `
            display: flex;
            flex-direction: column;
            height: 100%;
            padding-left: 16px;
            padding-right: 16px;
          `, children: [_jsx(HttpResponseMeta, { response: store.response }), !loading && hasResponse ? (_jsx(LensesResponseBodyRenderer, { response: store.response, testResult: store.testResult })) : null] })) }));
};
export default HttpResponse;
