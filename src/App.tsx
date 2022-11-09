import { DownOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import {  ConfigProvider, Tree } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Http, { HttpProvider } from './lib';
import { AgentAxiosAndTest, AgentAxiosCompare } from './lib/helpers/request';
import { mockEnvironmentData, mockRetrieveData } from './mock';
import Test123, {TestProvider} from "./lib2";

const treeData: any[] = [];
function App() {
  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <TestProvider
          theme={'light'}
          locale={'en'}
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
              <Test123></Test123>
            </Allotment.Pane>
          </Allotment>
        </TestProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
