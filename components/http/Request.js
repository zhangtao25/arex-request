import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { DownOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Breadcrumb, Button, Dropdown, Menu, Select } from 'antd';
import { useContext } from 'react';
import { treeFindPath } from '../../helpers/collection/util';
import { getValueByPath } from '../../helpers/utils/locale';
import { GlobalContext, HttpContext } from '../../index';
import SmartEnvInput from '../smart/EnvInput';
const HeaderWrapper = styled.div `
  display: flex;

  .ant-select > .ant-select-selector {
    width: 120px;
    left: 1px;
    border-radius: 2px 0 0 2px;
    .ant-select-selection-item {
      font-weight: 500;
    }
  }
  .ant-input {
    border-radius: 0 2px 2px 0;
  }
`;
const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const HttpRequest = ({ currentRequestId, onEdit, onSend, onSendCompare }) => {
    const { store, dispatch } = useContext(HttpContext);
    const { dispatch: globalDispatch, store: globalStore } = useContext(GlobalContext);
    console.log(globalStore.locale, 'globalStore.locale');
    const t = (key) => getValueByPath(globalStore.locale.locale, key);
    const onMenuClick = (e) => {
        handleRequest({ type: 'compare' });
    };
    const menu = (_jsx(Menu, { onClick: onMenuClick, items: [
            {
                key: '1',
                label: 'Send Compare',
            },
        ] }));
    const handleRequest = ({ type }) => {
        const urlPretreatment = (url) => {
            // 正则匹配{{}}
            const editorValueMatch = url.match(/\{\{(.+?)\}\}/g) || [''];
            let replaceVar = editorValueMatch[0];
            const env = globalStore.environment?.keyValues || [];
            for (let i = 0; i < env.length; i++) {
                if (env[i].key === editorValueMatch[0].replace('{{', '').replace('}}', '')) {
                    replaceVar = env[i].value;
                }
            }
            return url.replace(editorValueMatch[0], replaceVar);
        };
        console.log(store.request.endpoint, 'store.request.endpoint', urlPretreatment(store.request.endpoint));
        // return
        dispatch({
            type: 'response.type',
            payload: 'loading',
        });
        const start = new Date().getTime();
        console.log(store.request);
        if (type === 'compare') {
            console.log('company？');
            onSendCompare({
                request: {
                    ...store.request,
                    endpoint: urlPretreatment(store.request.endpoint),
                },
            }).then((agentAxiosCompareResponse) => {
                dispatch({
                    type: 'response.type',
                    payload: 'success',
                });
                dispatch({
                    type: 'response.body',
                    payload: JSON.stringify(agentAxiosCompareResponse.response.data),
                });
                dispatch({
                    type: 'compareResponse.type',
                    payload: 'success',
                });
                dispatch({
                    type: 'compareResponse.body',
                    payload: JSON.stringify(agentAxiosCompareResponse.compareResponse.data),
                });
            });
        }
        else {
            console.log('norm');
            // 还原null
            dispatch({
                type: 'compareResponse.type',
                payload: 'null',
            });
            onSend({
                request: {
                    ...store.request,
                    endpoint: urlPretreatment(store.request.endpoint),
                },
            }).then((agentAxiosAndTest) => {
                dispatch({
                    type: 'response.type',
                    payload: 'success',
                });
                dispatch({
                    type: 'response.body',
                    payload: JSON.stringify(agentAxiosAndTest.response.data),
                });
                dispatch({
                    type: 'testResult',
                    payload: agentAxiosAndTest.testResult,
                });
                dispatch({
                    type: 'response.headers',
                    payload: agentAxiosAndTest.response.headers,
                });
                dispatch({
                    type: 'response.meta',
                    payload: {
                        responseSize: JSON.stringify(agentAxiosAndTest.response.data).length,
                        responseDuration: new Date().getTime() - start,
                    },
                });
                dispatch({
                    type: 'response.statusCode',
                    payload: agentAxiosAndTest.response.status,
                });
            });
        }
    };
    return (_jsxs("div", { css: css `
        padding: 16px;
      `, children: [_jsxs("div", { css: css `
          display: flex;
          justify-content: space-between;
        `, children: [_jsx(Breadcrumb, { style: { paddingBottom: '14px' }, children: treeFindPath(globalStore.collectionTreeData, (node) => node.key === currentRequestId).map((i, index) => (_jsx(Breadcrumb.Item, { children: i.title }, index))) }), _jsx("div", { children: _jsx(Button, { onClick: () => {
                                onEdit({
                                    type: 'update',
                                    payload: {
                                        ...store.request,
                                    },
                                });
                            }, children: t('action.save') }) })] }), _jsxs(HeaderWrapper, { children: [_jsx(Select, { value: store.request.method, options: methods.map((i) => ({ value: i, lable: i })), onChange: (value) => {
                            dispatch({
                                type: 'request.method',
                                payload: value,
                            });
                        } }), _jsx(SmartEnvInput, { value: store.request.endpoint, onChange: () => {
                            // console.log('http://127.0.0.1:5173/arex-request/');
                        } }), _jsx("div", { css: css `
            margin: 0 0px 0 14px;
          `, children: _jsx(Dropdown.Button, { type: 'primary', onClick: () => handleRequest({ type: null }), overlay: menu, icon: _jsx(DownOutlined, {}), children: t('action.send') }) })] })] }));
};
export default HttpRequest;
