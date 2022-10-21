import { DeleteOutlined, PicRightOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import styled from '@emotion/styled';

import { Button, Tooltip } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';

import { HttpContext } from '../../index';
import { getValueByPath } from '../../helpers/utils/locale';
import { useCodeMirror } from '../../helpers/editor/codemirror';
import { json } from '@codemirror/lang-json';

export const ResponseTestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  & > span:first-of-type {
    font-size: 13px;
    line-height: 32px;
    font-weight: 500;
    color: #9d9d9d;
  }
`;

export const ResponseTestWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  & > div:last-of-type {
    width: 35%;
    text-align: left;
    border-left: 1px solid #eee;
    padding-left: 20px;
    & > span:first-of-type {
    }
    & > div:nth-of-type(2) {
      margin-top: 15px;
      margin-bottom: 10px;
    }
    & > span:nth-of-type(n + 2) {
      display: inline-block;
      color: #10b981;
      cursor: pointer;
      font-weight: bold;
      margin-left: 18px;
      margin-top: 10px;
      &:hover {
        color: #059669;
        transform: translateX(6px);
        transition: all 0.2s ease 0s;
      }
    }
  }
`;

export type ResponseTestProps = {
  OldTestVal: string;
  getTestVal: (p: any) => void;
};

const HttpTests = ({ getTestVal, OldTestVal }: ResponseTestProps) => {
  const { store,dispatch } = useContext(HttpContext);
  const t = (key) => getValueByPath(store.locale, key);

  const [TestVal, setTestVal] = useState<string>('');
  const [isLineWrapping, setIsLineWrapping] = useState<boolean>(true);
  const codeSnippet = [
    {
      name: 'Response: Status code is 200',
      text: `
// Check status code is 200
arex.test("Status code is 200", ()=> {
    arex.expect(arex.response.status).toBe(200);
});
`,
    },
  ];

  const codeCm = useRef(null);

  useCodeMirror({
    container: codeCm.current,
    value: store.request.testScript,
    height: '300px',
    extensions: [json()],
    onChange: (val) => {
      console.log(val,'va')
      dispatch({
        type:'request.testScript',
        payload: val
      })
    },
  });

  const addTest = (text: string) => {
    // console.log(store.request.testScript + text,'store.request.testScript + text')
    dispatch({
      type:'request.testScript',
      payload: store.request.testScript + text
    })

  };
  const feedLine = () => {
    setIsLineWrapping(!isLineWrapping);
  };

  return (
    <>
      <ResponseTestHeader>
        <span>{t('http.javaScriptCode')}</span>
        <div>
          <Tooltip title={t('help')}>
            <Button disabled type='text' icon={<QuestionCircleOutlined />} />
          </Tooltip>
          <Tooltip title={t('lineFeed')}>
            <Button type='text' icon={<PicRightOutlined />} onClick={feedLine} />
          </Tooltip>
          <Tooltip title={t('clearAll')}>
            <Button type='text' icon={<DeleteOutlined />} onClick={() => setTestVal('')} />
          </Tooltip>
        </div>
      </ResponseTestHeader>
      <ResponseTestWrapper>
        {/*{JSON.stringify(store.request.testScript)}*/}
        <div
          ref={codeCm}
          style={{ width: '65%' }}
          // options = {{
          //   lineWrapping:true,
          // }}
        />
        <div>
          <div>
            Test scripts are written in JavaScript, and are run after the response is received.
          </div>
          <Button
            type='text'
            onClick={() => window.open('https://docs.hoppscotch.io/features/tests')}
          >
            Read documentation
          </Button>
          <div>Snippets</div>
          {/* <div>测试脚本使用JavaScript编写,并再受到响应后执行</div>
          <span>阅读文档</span>
          <div>代码片段</div> */}
          {codeSnippet.map((e, i) => (
            <Button type='text' key={i} onClick={() => addTest(e.text)}>
              {e.name}
            </Button>
          ))}
        </div>
      </ResponseTestWrapper>
    </>
  );
};

export default HttpTests;
