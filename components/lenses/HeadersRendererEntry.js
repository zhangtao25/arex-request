import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { css } from '@emotion/react';
import { Col, Row } from 'antd';
const test = css `
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 6px;
`;
const LensesHeadersRendererEntry = ({ header }) => {
    return (_jsx("div", { children: _jsxs(Row, { children: [_jsx(Col, { className: 'gutter-row', span: 12, children: _jsx("div", { css: test, children: header.key }) }), _jsx(Col, { className: 'gutter-row', span: 12, children: _jsxs("div", { css: test, children: [" ", header.value] }) })] }) }));
};
export default LensesHeadersRendererEntry;
