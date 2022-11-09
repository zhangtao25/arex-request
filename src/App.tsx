import { DownOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import {  ConfigProvider, Tree } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Http, { HttpProvider } from './lib';
import { AgentAxiosAndTest, AgentAxiosCompare } from './lib/helpers/request';
import { mockEnvironmentData, mockRetrieveData } from './mock';

const treeData: any[] = [];
function App() {
  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <HttpProvider
          theme={'light'}
          locale={'en'}
          collectionTreeData={[]}
          environment={mockEnvironmentData}
        >
          <div
            css={css`
              height: 48px;
              background-color: white;
              border-bottom: 1px solid darkgray;
            `}
          ></div>

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
                treeData={treeData}
              />
            </Allotment.Pane>

            <Allotment.Pane>
              <Http
                currentRequestId={'123'}
                onEdit={(e) => {
                  const nodeType = 1;
                  if (e.type === 'retrieve') {
                    return new Promise((resolve, reject) => {
                      resolve(mockRetrieveData);
                    });
                  } else if (e.type === 'update') {
                    if (nodeType === 1) {
                    } else if (nodeType === 2) {
                    }
                  }
                }}
                onSend={(e) => {
                  return AgentAxiosAndTest(e);
                }}
                onSendCompare={(e) => {
                  return AgentAxiosCompare(e);
                }}
                requestaxios={{}}
              />
            </Allotment.Pane>
          </Allotment>
        </HttpProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
