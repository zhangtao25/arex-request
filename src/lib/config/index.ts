import { TabsProps } from 'antd';

export let extraTabs: TabsProps['items'] = [];

type HttpProfile = {
  tabs?: {
    filter?: (items: TabsProps['items']) => TabsProps['items'];
    extra?: TabsProps['items'];
  };
};

const config = (profile: HttpProfile) => {
  if (profile.tabs.extra) {
    extraTabs = [...extraTabs, ...profile.tabs.extra];
  }
};

export default config;
