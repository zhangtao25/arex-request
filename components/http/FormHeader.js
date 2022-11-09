import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Tooltip } from 'antd';
import { useContext } from 'react';
import { getValueByPath } from '../../helpers/utils/locale';
import { GlobalContext, HttpContext } from '../../index';
export const FormHeaderWrapper = styled.div `
  display: flex;
  justify-content: space-between;
  position: relative;
  .ant-btn-sm {
    margin: 4px 0;
  }
  & > span:first-of-type {
    font-size: 13px;
    line-height: 32px;
    font-weight: 500;
    color: #9d9d9d;
  }
`;
const FormHeader = (props) => {
    const { store } = useContext(HttpContext);
    const { store: globalStore } = useContext(GlobalContext);
    const t = (key) => getValueByPath(globalStore.locale.locale, key);
    const handleAddParam = () => {
        const newValue = {
            key: '',
            value: '',
            active: true,
            id: String(Math.random()),
        };
        props.update((state) => {
            state.push(newValue);
        });
    };
    const handleClearAllParams = () => props.update([]);
    return (_jsxs(FormHeaderWrapper, { children: [_jsx("span", { children: props.title }), _jsxs("div", { children: [_jsx(Tooltip, { title: t('action.clear_all'), children: _jsx(Button, { type: 'text', icon: _jsx(DeleteOutlined, {}), onClick: handleClearAllParams }) }), _jsx(Tooltip, { title: t('add.new'), children: _jsx(Button, { type: 'text', icon: _jsx(PlusOutlined, {}), onClick: handleAddParam }) })] })] }));
};
export default FormHeader;
