import { useEffect, useState } from 'react';

let subscriptions = [];
let state = false;

const setState = (newState) => {
  state = newState;

  // 逻辑
  const classNameDark = 'dark-mode';
  const classNameLight = 'light-mode';
  document.body.classList.add(newState ? classNameDark : classNameLight);
  document.body.classList.remove(newState ? classNameLight : classNameDark);

  subscriptions.forEach((subscription) => {
    subscription(state);
  });
};

const useDarkMode = () => {
  const [_, newSubscription] = useState(false);
  useEffect(() => {
    subscriptions.push(newSubscription);
    return () => {
      subscriptions = subscriptions.filter((item) => item !== newSubscription);
    };
  }, []);
  return {
    value: state,
    toggle: (current) => setState(current),
  };
};

export default useDarkMode;
