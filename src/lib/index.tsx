import { useMount } from 'ahooks';
import { Button } from 'antd';

const HttpProvider = ({ children }) => {
  useMount(() => {
    console.log(123);
  });
  return <div>{children}</div>;
};
const Http = () => {
  return (
    <div>
      <Button>测试</Button>
    </div>
  );
};
export default Http;

export { HttpProvider };
