import { DownOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import { Button, ConfigProvider, Tabs, Tree } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { useState } from 'react';

import ArexRequestComponent from './lib';
import { useMount } from 'ahooks';

const mockReqData = {
  endpoint: '',
  testScript: ``,
  method: 'GET',
  params: [],
  headers: [],
  body: {
    body: '',
    contentType: '',
  },
};

export function treeFindPath(tree: any, func: any, path: any = []): any {
  if (!tree) {
    return [];
  }
  for (const data of tree) {
    // 假设满足条件,直接放到数组里
    path.push({
      title: data.title,
      key: data.key,
      nodeType: data.nodeType,
    });
    if (func(data)) {
      return path;
    }
    if (data.children) {
      const res = treeFindPath(data.children, func, path);
      if (res.length) {
        return res;
      }
    }
    path.pop();
  }
  return [];
}

export function treeFind(tree: any, func: any): any {
  for (const data of tree) {
    //相当于func = node => node.id == '2-1'
    if (func(data)) {
      return data;
    }
    if (data.children) {
      const res = treeFind(data.children, func);
      if (res) {
        return res;
      }
    }
  }
  return null;
}

// const treeData: any[] = [];

function getCollectionTreeData() {
  return new Promise((resolve, reject) => {
    const res = JSON.parse(localStorage.getItem('file'));
    resolve(arrToTree(res));
  });
}

function findRequestById(id) {
  return new Promise((resolve, reject) => {
    const res = JSON.parse(localStorage.getItem('request'));
    resolve(res.find((r) => r.id === id) || mockReqData);
  });
}

function updateRequestById(req) {
  return new Promise((resolve, reject) => {
    console.log(req, 'req');
    resolve('ok');
  });
}

function arrToTree(arr: any, pid = '') {
  const newArr: any = [];
  arr.forEach((item: any) => {
    if (item.pid === pid) {
      newArr.push({
        ...item,
        key: String(item.id),
        title: item.name,
        children: arrToTree(arr, item.id),
      });
    }
  });
  return newArr;
}

function App() {
  const [treeData, setTreeData] = useState([]);
  const [locale, setLocale] = useState('en');
  const [pages, setPages] = useState<{ label: string; key: string }[]>([{
    key:'633ac99c3dfa7510a140c53f',
    label:'账号密码登陆'
  }]);
  const onSelect: any['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    setPages([
      ...pages,
      {
        label: treeFind(treeData, (node) => node.key === selectedKeys[0]).title,
        key: selectedKeys[0],
      },
    ]);
  };

  useMount(() => {
    getCollectionTreeData().then((res) => {
      setTreeData(res);
    });
  });

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
            {locale === 'cn' ? 'en' : 'cn'}
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
              defaultExpandedKeys={[]}
              onSelect={onSelect}
              treeData={treeData}
            />
          </Allotment.Pane>

          <Allotment.Pane>
            <Tabs
              items={pages.map((page) => ({
                key: page.key,
                label: page.label,
                children: (
                  <ArexRequestComponent
                    locale={locale}
                    currentRequestId={page.key}
                    collectionTreeData={treeData}
                    envData={[]}
                    currentEnvId={'aa'}
                    onEdit={(e) => {
                      console.log(e, 'e');
                      if (e.type === 'retrieve') {
                        return findRequestById(e.payload.requestId);
                      } else if (e.type === 'update') {
                        return updateRequestById(e.payload);
                      }
                    }}
                  />
                ),
              }))}
            />
          </Allotment.Pane>
        </Allotment>
      </ConfigProvider>
    </div>
  );
}

export default App;
