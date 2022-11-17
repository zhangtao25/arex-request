import { TabsProps } from 'antd';

export let extraTabs: TabsProps['items'] = [];

type HttpProfile = {
  tabs?: {
    filter?: (items: TabsProps['items']) => TabsProps['items'];
    extra?: TabsProps['items'];
  };
};

const config = (profile: HttpProfile) => {
  if (profile.tabs?.extra) {
    extraTabs = profile.tabs.extra.reduce((tabs, cur) => {
      if (!tabs.find((item) => item.key === cur.key)) {
        tabs.push(cur);
      }
      return tabs;
    }, extraTabs);
  }
};

export default config;
