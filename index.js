import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import 'allotment/dist/style.css';
import 'antd/dist/antd.css';
import { css } from '@emotion/react';
import { useMount } from 'ahooks';
import { Allotment } from 'allotment';
import _ from 'lodash-es';
import { createContext, useEffect, useImperativeHandle, useReducer } from 'react';
import HttpRequest from './components/http/Request';
import HttpRequestOptions from './components/http/RequestOptions';
import HttpResponse from './components/http/Response';
import TestResult from './components/http/TestResult';
import { defaultState, globalDefaultState, LocaleEnum } from './default';
import cn from './locales/cn.json';
import en from './locales/en.json';
import { themeMap } from './theme';
const localeMap = {
    cn: {
        type: 'cn',
        locale: cn,
    },
    en: {
        type: 'en',
        locale: en,
    },
};
export const HttpContext = createContext({});
export const GlobalContext = createContext({});
function reducer(state = defaultState, action) {
    const cloneState = JSON.parse(JSON.stringify(state));
    _.set(cloneState, action.type, action.payload);
    return cloneState;
}
const HttpProvider = ({ children = null, theme, locale = LocaleEnum.en, collectionTreeData = [], environment, }) => {
    const [store, dispatch] = useReducer(reducer, globalDefaultState);
    useEffect(() => {
        dispatch({
            type: 'locale',
            payload: localeMap[locale],
        });
    }, [locale]);
    useEffect(() => {
        dispatch({
            type: 'theme',
            payload: themeMap[theme],
        });
    }, [theme]);
    useEffect(() => {
        dispatch({
            type: 'environment',
            payload: environment,
        });
    }, [environment]);
    useEffect(() => {
        dispatch({
            type: 'collectionTreeData',
            payload: collectionTreeData,
        });
    }, [collectionTreeData]);
    // console.log({theme})
    return _jsx(GlobalContext.Provider, { value: { store, dispatch }, children: children });
};
// TODO
/*
1. ArexRequestComponent =》 HttpRequest
2. 核心props 全局props/locale、theme、collectionTreeData？，内部props/currentRequestId、onEdit、onSend,
3. 字典例如 onSend以后触发的函数名称，返回值里面需要包含{testResult,response}
4. 导出的方法
* */
const Http = ({ currentRequestId, onEdit, onSend, onSendCompare, cRef, requestaxios }) => {
    const [store, dispatch] = useReducer(reducer, {
        ...defaultState,
        request: {
            ...defaultState.request,
        },
    });
    useMount(() => {
        onEdit({
            type: 'retrieve',
            payload: {
                requestId: currentRequestId,
            },
        }).then((res) => {
            dispatch({
                type: 'request',
                payload: res,
            });
        });
    });
    // 需要将暴露的接口返回出去
    useImperativeHandle(cRef, () => {
        return {
            func: func,
            setValue(value) {
                dispatch({
                    type: 'request.mock',
                    payload: value,
                });
            },
        };
    });
    function func() {
        return store.request;
    }
    return (_jsx(HttpContext.Provider, { value: { store, dispatch }, children: store.request.method !== '' ? (_jsxs(Allotment, { css: css `
            height: calc(100vh - 118px);
          `, vertical: true, children: [_jsx(Allotment.Pane, { preferredSize: 400, children: _jsxs("div", { css: css `
                height: 100%;
                display: flex;
                flex-direction: column;
              `, children: [_jsx(HttpRequest, { currentRequestId: currentRequestId, onEdit: onEdit, onSend: onSend, onSendCompare: onSendCompare }), _jsx(HttpRequestOptions, { requestaxios: requestaxios })] }) }), _jsx(Allotment.Pane, { children: _jsx(HttpResponse, { requestaxios: requestaxios }) })] })) : null }));
};
export default Http;
export { HttpProvider };
export { TestResult };
