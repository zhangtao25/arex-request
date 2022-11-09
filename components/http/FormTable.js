import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { CheckCircleOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Input, Space, Table, Tooltip } from 'antd';
import { useContext } from 'react';
import { GlobalContext, HttpContext } from '../../index';
import { getValueByPath } from '../../helpers/utils/locale';
const FormTable = styled(Table) `
  .ant-table-thead {
    display: ${(props) => (props.showHeader ? 'table-header-group' : 'none')};
  }
  .ant-table-cell {
    padding: ${(props) => (props.showHeader ? '4px 11px !important' : '0 1px !important')};
  }
`;
export const useColumns = (paramsUpdater, editable) => {
    const { store } = useContext(HttpContext);
    const { store: globalStore } = useContext(GlobalContext);
    const t = (key) => getValueByPath(globalStore.locale.locale, key);
    const handleChange = (i, attr, value) => {
        paramsUpdater &&
            paramsUpdater((params) => {
                params[i][attr] = value;
            });
    };
    const handleDisable = (i) => {
        paramsUpdater &&
            paramsUpdater((params) => {
                params[i].active = !params[i].active;
            });
    };
    const keyValueColumns = [
        {
            title: t('count.key'),
            dataIndex: 'key',
            key: 'key',
            render: editable
                ? (text, record, i) => (_jsx(Input, { value: text, bordered: false, placeholder: t('count.key'), disabled: !record.active, onChange: (e) => handleChange(i, 'key', e.target.value) }))
                : undefined,
        },
        {
            title: t('count.value'),
            dataIndex: 'value',
            key: 'value',
            render: editable
                ? (text, record, i) => (_jsx(Input, { value: text, bordered: false, placeholder: t('count.value'), disabled: !record.active, onChange: (e) => handleChange(i, 'value', e.target.value) }))
                : undefined,
        },
    ];
    return editable
        ? [
            ...keyValueColumns,
            {
                title: '操作',
                key: 'actions',
                width: 72,
                align: 'center',
                className: 'actions',
                render: (text, record, i) => (_jsxs(Space, { children: [_jsx(Tooltip, { title: record.active ? t('action.turn_off') : t('action.turn_on'), children: _jsx(Button, { style: { color: '#10b981' }, type: 'text', size: 'small', icon: record.active ? _jsx(CheckCircleOutlined, {}) : _jsx(StopOutlined, {}), onClick: () => handleDisable(i) }) }), _jsx(Tooltip, { title: t('remove'), children: _jsx(Button, { style: { color: '#ef4444' }, type: 'text', size: 'small', icon: _jsx(DeleteOutlined, {}), onClick: () => paramsUpdater?.((params) => {
                                    params.splice(i, 1);
                                }) }) })] })),
            },
        ]
        : keyValueColumns;
};
export default FormTable;
