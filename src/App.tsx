import { DownOutlined } from '@ant-design/icons';
import { css, ThemeProvider } from '@emotion/react';
import { Allotment } from 'allotment';
import { ConfigProvider, Switch, theme, Tree } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
const { darkAlgorithm } = theme;

import useDarkMode from 'use-dark-mode';

import AppHeader from './components/app/Header';
import Http, { HttpProvider } from './lib';
import { AgentAxiosAndTest, AgentAxiosCompare } from './lib/helpers/request';
import { mockEnvironmentData, mockRetrieveData } from './mock';

const primaryColor = '#603be3';
const theme1 = {
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
function App() {
  const darkMode = useDarkMode();
  return (
    <div>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
          algorithm: darkMode.value ? [darkAlgorithm] : [],
        }}
      >
        <ThemeProvider theme={theme1}>
          <HttpProvider
            theme={'dark'}
            locale={'en'}
            collectionTreeData={[]}
            environment={mockEnvironmentData}
          >
            <AppHeader></AppHeader>

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
        </ThemeProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
