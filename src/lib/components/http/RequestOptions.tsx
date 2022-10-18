import { Tabs } from 'antd';
import {useContext, useEffect, useState} from 'react';

import HttpBody from './Body';
import HttpHeaders from './Headers';
import HttpRawBody from './RawBody';
import HttpTests from './Tests';
import HttpParameters from './Parameters';
import {HttpContext} from "../../index";
import {getValueByPath} from "../../helpers/utils/locale";
import {css} from "@emotion/react";
const { TabPane } = Tabs;
const HttpRequestOptions = ({ data }) => {
  const { store } = useContext(HttpContext);
  const t = (key) => getValueByPath(store.locale, key);
  const [activeKey, setActiveKey] = useState('0');



  const items = [
    { label: t('request.parameters'), key: '0', children: <HttpParameters /> }, // 务必填写 key
    // { label: 'form-data', key: '1', children: '内容 2' },
    // { label: 'x-www-form-urlencoded', key: '2', children: '内容 2' },
    { label: 'Headers', key: '1', children: <HttpHeaders data={data} /> },
    { label: 'Body', key: '3', children: <HttpBody data={data} /> },
    { label: 'Tests', key: '4', children: <HttpTests data={data} /> },

    // { label: 'binary', key: '4', children: '内容 2' },
  ];
  return (
    <div css={css`padding-left: 16px`}>
      <Tabs
        activeKey={activeKey}
        items={items}
        onChange={(val) => {
          setActiveKey(val);
          // console.log(val)
        }}
      ></Tabs>
    </div>
  );
};

export default HttpRequestOptions;
