import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { css } from '@emotion/react';
import { Empty, Spin, Typography } from 'antd';
import { useContext, useMemo } from 'react';
import { getStatusCodeReasonPhrase } from '../../helpers/utils/statusCodes';
import { getValueByPath } from '../../helpers/utils/locale';
import { GlobalContext, HttpContext } from '../../index';
const HttpResponseMeta = ({ response }) => {
    const { store } = useContext(HttpContext);
    const { store: globalStore } = useContext(GlobalContext);
    const t = (key) => getValueByPath(globalStore.locale.locale, key);
    const tabCss = css `
    color: #10b981;
    font-weight: bolder;
    margin-right: 14px;
    margin-left: 4px;
  `;
    const readableResponseSize = useMemo(() => {
        const size = response.meta.responseSize;
        if (size >= 100000)
            return (size / 1000000).toFixed(2) + ' MB';
        if (size >= 1000)
            return (size / 1000).toFixed(2) + ' KB';
        return undefined;
    }, [response]);
    return (_jsx("div", { css: css `
        padding: 16px 0 16px 0;
      `, children: response.type === 'null' ? (_jsx("div", { children: _jsx(Empty, { description: _jsx(Typography.Text, { type: 'secondary', children: "Enter the URL and click Send to get a response" }) }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { children: response.type === 'loading' ? (_jsx("div", { css: css `
                  margin: 20px 0;
                  margin-bottom: 20px;
                  padding: 30px 50px;
                  text-align: center;
                  border-radius: 4px;
                  height: 100%;
                `, children: _jsx(Spin, {}) })) : null }), _jsx("div", { children: response.type === 'success' ? (_jsxs("div", { children: [_jsxs("span", { children: [t('response.status'), ":", _jsxs("span", { css: tabCss, children: [`${response.statusCode}\xA0 • \xA0`, getStatusCodeReasonPhrase(response.statusCode)] })] }), _jsxs("span", { children: [t('response.time'), ":", _jsx("span", { css: tabCss, children: `${response.meta.responseDuration}ms` })] }), _jsxs("span", { children: [t('response.size'), ":", _jsx("span", { css: tabCss, children: readableResponseSize || `${response.meta.responseSize} B` })] })] })) : null })] })) }));
};
export default HttpResponseMeta;
