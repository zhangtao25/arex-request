import { DownOutlined } from '@ant-design/icons';
import { css, ThemeProvider } from '@emotion/react';
import { Allotment } from 'allotment';
import { ConfigProvider, Tree } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import Http, { HttpProvider } from './lib';
import { AgentAxiosAndTest, AgentAxiosCompare } from './lib/helpers/request';
import { mockEnvironmentData, mockRetrieveData } from './mock';
import { Locale, Theme } from './lib/default';

const primaryColor = '#603be3';
const theme = {
  color: {
    primary: primaryColor,
    active: '#f5f5f5',
    success: '#66bb6a',
    info: '#29b6f6',
    warning: '#ffa726',
    error: '#f44336',
    text: {
      primary: 'rgba(0,0,0,0.9)',
      secondary: 'rgba(0,0,0,0.7)',
      disabled: 'rgba(0,0,0,0.3)',
      watermark: 'rgba(0,0,0,0.1)',
      highlight: primaryColor,
    },
    border: {
      primary: '#F0F0F0',
    },
    background: {
      primary: '#ffffff',
      active: '#fafafa',
      hover: '#eee',
    },
  },
};

const treeData: any[] = [];

Http.config({
  tabs: {
    extra: [
      {
        label: 'extraTab',
        key: 'extraTab',
        children: <div>extraTab content</div>,
      },
      {
        label: 'shouldBeFiltered',
        key: 'shouldBeFiltered',
        children: <div>This tab should be filtered</div>,
      },
    ],
    filter: (items) => items.key !== 'shouldBeFiltered',
  },
});

function App() {
  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <ThemeProvider theme={theme}>
          <HttpProvider
            theme={Theme.light}
            locale={Locale.en}
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
                />
              </Allotment.Pane>
            </Allotment>
          </HttpProvider>
        </ThemeProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
