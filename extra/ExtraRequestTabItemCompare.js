import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { Input, Select } from 'antd';
import { useContext } from 'react';
// import { HttpContext } from '../../index';
import styled from '@emotion/styled';
import { HttpContext } from '../index';
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
  .ant-btn-group,
  .ant-btn {
    margin-left: 16px;
  }
`;
// compareEndpoint: '',
//   compareMethod: '',
const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const ExtraRequestTabItemCompare = () => {
    const { store, dispatch } = useContext(HttpContext);
    return (_jsxs(HeaderWrapper, { children: [_jsx(Select, { value: store.request.compareMethod, options: methods.map((i) => ({ value: i, lable: i })), onChange: (value) => {
                    dispatch({
                        type: 'request.compareMethod',
                        payload: value,
                    });
                } }), _jsx(Input, { placeholder: 'Basic usage', value: store.request.compareEndpoint, onChange: ({ target: { value } }) => {
                    dispatch({
                        type: 'request.compareEndpoint',
                        payload: value,
                    });
                } })] }));
};
export default ExtraRequestTabItemCompare;
