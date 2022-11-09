import { jsxs as _jsxs, jsx as _jsx } from "@emotion/react/jsx-runtime";
// @ts-nocheck
import { css } from '@emotion/react';
import { useMount } from 'ahooks';
import { Card, Col, Divider, Input, Row } from 'antd';
import { useState } from 'react';
// import { tryParseJsonString } from '../../../../helpers/utils';
// import request from '../../../../../helpers/api/axios';
// import { tryParseJsonString } from '../../../../../helpers/utils';
// import request from '../../api/axios';
// import { tryParseJsonString } from '../../helpers/utils';
const tryPrettierJsonString = (jsonString, errorTip) => {
    try {
        return JSON.stringify(JSON.parse(jsonString), null, 2);
    }
    catch (e) {
        errorTip && message.warn(errorTip);
        return jsonString;
    }
};
const ExtraRequestTabItemMock = ({ recordId, requestaxios }) => {
    const [dataSource, setDataSource] = useState([]);
    useMount(() => {
        requestaxios
            .post(`/storage/frontEnd/record/queryFixedRecord`, {
            recordId: recordId,
            categoryTypes: 0,
        })
            .then((res) => {
            const record = [];
            Object.keys(res.recordResult).forEach((item) => {
                const getRequestKey = {
                    '4': {
                        operation: 'clusterName',
                        request: 'redisKey',
                        response: 'response',
                    },
                    '5': {
                        operation: 'clazzName',
                        request: 'operationKey',
                        response: 'response',
                    },
                    '6': {
                        operation: 'service',
                        request: 'request',
                        response: 'response',
                    },
                    '7': {
                        operation: 'expCode',
                        request: 'version',
                        response: 'response',
                    },
                    '13': {
                        operation: 'url',
                        request: 'request',
                        response: 'response',
                    },
                    '14': {
                        operation: 'dbName',
                        request: 'sql',
                        response: 'response',
                    },
                    '15': {
                        operation: 'path',
                        request: 'request',
                        response: 'response',
                    },
                };
                for (let i = 0; i < res.recordResult[item].length; i++) {
                    const recordResult = tryParseJsonString(res.recordResult[item][i]);
                    record.push({
                        key: item,
                        ...recordResult,
                        request: recordResult[getRequestKey[item].request],
                        operation: recordResult[getRequestKey[item].operation],
                        requestKey: getRequestKey[item].request,
                        operationKey: getRequestKey[item].operation,
                    });
                }
            });
            setDataSource(record);
        });
    });
    return (_jsxs("div", { css: css `
        max-height: 500px;
        overflow-y: auto;
      `, children: [JSON.stringify(dataSource.appId), dataSource.map((i) => {
                return (_jsxs(Card, { style: { margin: '0 0 10px 0' }, children: [_jsxs("p", { css: css `
                font-weight: bolder;
                margin-bottom: 10px;
                font-size: 18px;
              `, children: [i.operationKey, ":", i.operation] }), _jsx(Divider, {}), _jsxs(Row, { gutter: 16, children: [_jsxs(Col, { span: 12, style: { display: 'flex', flexDirection: 'column' }, children: [_jsx("div", { css: css `
                    font-weight: bolder;
                    margin-bottom: 10px;
                    font-size: 16px;
                  `, children: i.requestKey }), _jsx(Input.TextArea, { style: { height: '100%', minHeight: '200px', flex: '1' }, readOnly: true, autoSize: true, value: i.request })] }), _jsxs(Col, { span: 12, children: [_jsx("div", { css: css `
                    font-weight: bolder;
                    margin-bottom: 10px;
                    font-size: 16px;
                  `, children: "response" }), _jsx(Input.TextArea, { style: { height: '100%' }, readOnly: true, autoSize: true, value: i.response })] })] })] }));
            })] }));
};
export default ExtraRequestTabItemMock;
