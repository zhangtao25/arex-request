import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useMount } from 'ahooks';
import { useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { GlobalContext, HttpContext } from '../..';
import FormHeader from './FormHeader';
import FormTable, { useColumns } from './FormTable';
import { getValueByPath } from '../../helpers/utils/locale';
const HttpParameters = () => {
    const { store, dispatch } = useContext(HttpContext);
    const t = (key) => getValueByPath(globalStore.locale.locale, key);
    const { dispatch: globalDispatch, store: globalStore } = useContext(GlobalContext);
    const [requestParams, setRequestParams] = useImmer([]);
    useMount(() => {
        setRequestParams(store.request.params.map((i) => ({
            ...i,
            id: String(Math.random()),
        })));
    });
    useEffect(() => {
        dispatch({
            type: 'request.params',
            payload: requestParams,
        });
        console.log(requestParams, 'req');
    }, [requestParams]);
    return (_jsxs("div", { children: [_jsx(FormHeader, { title: t('request.parameter_list'), update: setRequestParams }), _jsx(FormTable, { bordered: true, rowKey: 'id', size: 'small', pagination: false, dataSource: requestParams, columns: useColumns(setRequestParams, true) })] }));
};
export default HttpParameters;
