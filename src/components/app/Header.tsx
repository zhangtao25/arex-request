import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import useDarkMode from 'use-dark-style';
const Wrapper = styled.div`
  height: 47px;
  border-bottom: 1px solid ${(props) => props.theme.color.border.primary};
  display: flex;
  transition: border-bottom 0.3s ease;
`;
const AppHeader = () => {
  const darkMode = useDarkMode(true);
  const { t, i18n } = useTranslation();
  return (
    <Wrapper>
      <div>
        {JSON.stringify(darkMode.value)}
        <button type='button'>☀</button>
        <Switch checked={darkMode.value} onChange={darkMode.toggle} />
        <button type='button'>☾</button>
      </div>

      <div>
        <Select
          onSelect={(val) => {
            localStorage.setItem('locale', val);
            i18n.changeLanguage(val);
          }}
          value={localStorage.getItem('locale') || 'en'}
          options={[
            {
              value: 'en',
              label: 'English',
            },
            {
              value: 'cn',
              label: '简体中文',
            },
            {
              value: 'ja',
              label: '日本語',
            },
            {
              value: 'ko',
              label: '한국어',
            },
          ]}
        ></Select>
      </div>
    </Wrapper>
  );
};

export default AppHeader;
