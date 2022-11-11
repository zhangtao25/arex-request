import { Switch } from 'antd';
import useDarkMode from 'use-dark-mode';

const AppHeader = () => {
  const darkMode = useDarkMode(true);
  return (
    <div>
      {JSON.stringify(darkMode)}
      <button type='button' onClick={darkMode.disable}>
        ☀
      </button>
      <Switch checked={darkMode.value} onChange={darkMode.toggle} />
      <button type='button' onClick={darkMode.enable}>
        ☾
      </button>
    </div>
  );
};

export default AppHeader;
