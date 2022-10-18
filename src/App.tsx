import { DownOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import { Button, ConfigProvider, Tree } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { useState } from 'react';

import EvaRequestComponent from './lib';

const treeData: any[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

function App() {
  const [locale, setLocale] = useState('en');

  const onSelect: any['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  function createRequestService() {}

  function updateRequestService() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(123);
      }, 300);
    });
  }

  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <div
          css={css`
            height: 48px;
            background-color: white;
            border-bottom: 1px solid darkgray;
          `}
        >
          <Button
            onClick={() => {
              setLocale(locale === 'cn' ? 'en' : 'cn');
            }}
          >
            按钮
          </Button>
        </div>

        <Allotment
          css={css`
            height: calc(100vh - 48px);
          `}
        >
          <Allotment.Pane preferredSize={400}>
            <Tree
              showLine
              switcherIcon={<DownOutlined />}
              defaultExpandedKeys={['0-0-0']}
              onSelect={onSelect}
              treeData={treeData}
            />
          </Allotment.Pane>

          <Allotment.Pane>
            <EvaRequestComponent
              locale={locale}
              updateRequest={updateRequestService}
              createRequest={createRequestService}
            />
          </Allotment.Pane>
        </Allotment>
      </ConfigProvider>
    </div>
  );
}

export default App;
