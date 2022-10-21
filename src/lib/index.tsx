import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import HttpRequest from './components/http/Request';
import 'allotment/dist/style.css';
import 'antd/dist/antd.css';
import HttpRequestOptions from './components/http/RequestOptions';
import { createContext, FC, useEffect, useReducer } from 'react';
import _ from 'lodash-es';
import HttpResponse from './components/http/Response';
import en from './locales/en.json';
import cn from './locales/cn.json';

const localeObj = {
  en,
  cn,
};

export const HttpContext = createContext({});

const defaultState = {
  request: {
    preRequestScript: '',
    v: '',
    headers: [],
    name: '',
    body: {
      contentType: 'application/json',
      body: '',
    },
    testScript: '',
    method: '',
    auth: {
      authURL: 'http://petstore.swagger.io/api/oauth/dialog',
      oidcDiscoveryURL: '',
      accessTokenURL: '',
      clientID: '',
      scope: 'write:pets read:pets',
      token: '',
      authType: 'oauth-2',
      authActive: true,
    },
    endpoint: '',
    params: [],
  },
  response: {
    type: 'success',
    headers: [],
    statusCode: 200,
    body: '',
    meta: {
      responseSize: 0,
      responseDuration: 1,
    },
    error: {
      name: '',
      message: '',
      stack: '',
    },
  },
  testResult: {

  },
  locale: en,
};
// settestResult.age
// function reducer(state = defaultState, action) {
//
//   // TODO 优化一下
//   // p({
//   // payload:'zhi'
//   //  path:'testResult.age'
//   // })
//   function underline(str) {
//     return str.replace(/\B([A-Z])/g, '_$1').toLowerCase();
//   }
//   const clonestate = JSON.parse(JSON.stringify(state));
//
//   const arr = underline(action.type).split('_');
//
//   _.set(clonestate, arr.slice(1, arr.length).join('.'), action.payload);
//   return clonestate;
// }

function reducer(state = defaultState, action) {

  // TODO 优化一下
  // p({
  // payload:'zhi'
  //  path:'testResult.age'
  // })

  const clonestate = JSON.parse(JSON.stringify(state));


  _.set(clonestate, action.type, action.payload);
  // console.log({clonestate},action)
  return clonestate;
}

interface EvaRequestComponentProps {
  locale: any;
  updateRequest:any
  createRequest:any
}

const EvaRequestComponent: FC<EvaRequestComponentProps> = ({ locale,updateRequest }, context) => {
  // console.log(props,'props',context,'context')

  const [store, dispatch] = useReducer(reducer, defaultState); //创建reducer

  const data = {
    _id: '633ac99c3dfa7510a140c53c',
    endpoint: 'http://qingkong.rico.org.cn/api/cov/calendar',
    testScript: `

// Check status code is 200
pw.test("Status code is 200", ()=> {
    pw.expect(pw.response.body[0].id).toBe(1);
});`,
    method: 'GET',
    params: [
      { key: 'name', value: 'zt', active: true },
      { key: 'age', value: '18', active: true },
    ],
    headers: [],
    body: {
      body: '{\n  "username": "zt",\n  "password":"zt"\n}',
      contentType: '',
      _id: '633ac99c3dfa7510a140c53d',
    },
    createdAt: '2022-10-03T11:38:04.592Z',
    __v: 0,
  };

  useEffect(() => {
    dispatch({
      type: 'locale',
      payload: localeObj[locale],
    });

    dispatch({
      type: 'request',
      payload: data,
    });
  }, [locale]);

  return (
    <HttpContext.Provider value={{ store, dispatch }}>
      <Allotment
        css={css`
          height: calc(100vh - 48px);
        `}
        vertical={true}
      >
        <Allotment.Pane preferredSize={400}>
          <div>
            {JSON.stringify(store.request)}
            <HttpRequest updateRequest={updateRequest}></HttpRequest>
            <HttpRequestOptions data={data}></HttpRequestOptions>
          </div>
        </Allotment.Pane>
        <Allotment.Pane>
          <HttpResponse />
        </Allotment.Pane>
      </Allotment>
    </HttpContext.Provider>
  );
};

export default EvaRequestComponent;
