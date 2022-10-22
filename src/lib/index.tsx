import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import HttpRequest from './components/http/Request';
import 'allotment/dist/style.css';
import 'antd/dist/antd.css';
import HttpRequestOptions from './components/http/RequestOptions';
import { createContext, FC, useEffect, useReducer, useState } from 'react';
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
  testResult: {},
  locale: en,
};

function reducer(state = defaultState, action) {
  const clonestate = JSON.parse(JSON.stringify(state));
  _.set(clonestate, action.type, action.payload);
  return clonestate;
}

interface ArexRequestComponentProps {
  collectionTreeData: any[];
  currentRequestId: string;
  envData: [];
  currentEnvId: string;
  locale: string;
  onEdit: ({ type, payload }: any) => any;
}

const ArexRequestComponent: FC<ArexRequestComponentProps> = ({
  // locale,
  // updateRequest,
  // createRequest,
  // findRequest,
  // id
  collectionTreeData,

  currentRequestId,
  envData,
  currentEnvId,
  locale,
  onEdit,
}) => {
  const [store, dispatch] = useReducer(reducer, defaultState); //创建reducer
  const [data, setData] = useState({});
  useEffect(() => {
    dispatch({
      type: 'locale',
      payload: localeObj[locale],
    });
    onEdit({
      type: 'retrieve',
      payload: {
        requestId: currentRequestId,
      },
    }).then((res) => {
      console.log(res, 'res');
      dispatch({
        type: 'request',
        payload: res,
      });
    });
  }, [locale]);

  // retrieveRequest={findRequestById}
  // updateRequest={updateRequestById}
  // createRequest={createRequestService}
  // deleteRequest={findRequestById}

  return (
    <HttpContext.Provider value={{ store, dispatch }}>
      <Allotment
        css={css`
          height: calc(100vh - 48px);
        `}
        vertical={true}
      >
        <Allotment.Pane preferredSize={400}>
          <div
            css={css`
              height: 100%;
              display: flex;
              flex-direction: column;
            `}
          >
            {/*{JSON.stringify(store.request)}*/}
            <HttpRequest collectionTreeData={collectionTreeData} currentRequestId={currentRequestId} onEdit={onEdit}></HttpRequest>
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

export default ArexRequestComponent;
