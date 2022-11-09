import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useImmer } from 'use-immer';
import FormHeader from './FormHeader';
import FormTable, { useColumns } from './FormTable';
import { useContext, useEffect } from 'react';
import { useMount } from 'ahooks';
import { GlobalContext, HttpContext } from '../..';
import { getValueByPath } from '../../helpers/utils/locale';
const HttpHeaders = () => {
    const { store, dispatch } = useContext(HttpContext);
    const [requestHeaders, setRequestHeaders] = useImmer([]);
    const t = (key) => getValueByPath(globalStore.locale.locale, key);
    const { dispatch: globalDispatch, store: globalStore } = useContext(GlobalContext);
    useMount(() => {
        setRequestHeaders(store.request.headers.map((i) => ({
            ...i,
            id: String(Math.random()),
        })));
    });
    useEffect(() => {
        dispatch({
            type: 'request.headers',
            payload: requestHeaders,
        });
    }, [requestHeaders]);
    return (_jsxs("div", { children: [_jsx(FormHeader, { update: setRequestHeaders, title: t('request.header_list') }), _jsx(FormTable, { bordered: true, size: 'small', rowKey: 'id', pagination: false, dataSource: requestHeaders, columns: useColumns(setRequestHeaders, true) })] }));
};
export default HttpHeaders;
