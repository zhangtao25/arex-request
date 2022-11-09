import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { List, Progress } from 'antd';
import { useContext } from 'react';
import { GlobalContext } from '../../index';
const TestError = styled.div `
  text-align: center;
  & > div:first-of-type {
  }
  & > div:nth-of-type(2) {
    margin-top: 10px;
  }
`;
const TestResult = ({ testResult }) => {
    const { store } = useContext(GlobalContext);
    console.log(store, 'store');
    return (_jsx("div", { children: true ? (testResult.children?.map((e, i) => (_jsx(List, { size: 'large', css: css `
              margin-bottom: 10px;
            `, header: _jsxs("div", { children: [_jsx("div", { css: css `
                    margin-top: -10px;
                    font-weight: bold;
                  `, children: e.descriptor }), _jsxs("div", { css: css `
                    margin-top: 10px;
                  `, children: [_jsx(Progress, { strokeColor: '#EF4444', width: 20, strokeWidth: 20, percent: 100, success: {
                                    percent: Math.round((e.expectResults.filter((i) => i.status === 'pass').length /
                                        e.expectResults.length) *
                                        100),
                                    strokeColor: '#10B981',
                                }, type: 'circle', showInfo: false }), _jsxs("span", { css: css `
                      margin-left: 10px;
                    `, children: [e.expectResults.length -
                                        e.expectResults.filter((i) => i.status === 'pass').length ? (_jsxs("span", { css: css `
                          color: #ef4444;
                        `, children: [e.expectResults.length -
                                                e.expectResults.filter((i) => i.status === 'pass').length, ' ', "failing,", ' '] })) : (_jsx(_Fragment, {})), e.expectResults.filter((i) => i.status === 'pass').length ? (_jsxs("span", { css: css `
                          color: #10b981;
                        `, children: [e.expectResults.filter((i) => i.status === 'pass').length, " successful,", ' '] })) : (_jsx(_Fragment, {})), "out of ", e.expectResults.length, " tests"] })] })] }), bordered: true, dataSource: e.expectResults, renderItem: (item, i) => (_jsxs(List.Item, { children: [item.status == 'pass' ? (_jsx(CheckOutlined, { css: css `
                      color: #10b981;
                      margin-right: 15px;
                    ` })) : (_jsx(CloseOutlined, { css: css `
                      color: #ef4444;
                      margin-right: 15px;
                    ` })), item.message, "\u2014\u2014", item.status == 'pass' ? 'testPassed' : 'testFailed'] }, i)) }, i)))) : (_jsxs(TestError, { children: [_jsx("img", { src: 'https://hoppscotch.io/images/states/light/youre_lost.svg' }), _jsx("div", { children: "Could not execute post-request script" }), _jsx("div", { children: "There seems to be an error with test script. Please fix the errors and run tests again" })] })) }));
};
export default TestResult;
