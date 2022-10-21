import { json } from '@codemirror/lang-json';
import { Tabs } from 'antd';
import { FC, useRef } from 'react';
import { HoppRESTResponse } from '../../helpers/types/HoppRESTResponse';
import LensesHeadersRenderer from './HeadersRenderer';
import JSONLensRenderer from './renderers/JSONLensRenderer';
import RawLensRenderer from './renderers/RawLensRenderer';
import {css} from "@emotion/react";
import TestResult from "../http/TestResult";

const LensesResponseBodyRenderer: FC<{ response: HoppRESTResponse }> = ({ response }) => {
  // const jsonResponse = useRef(null);

  // useCodeMirror({
  //   container: jsonResponse.current,
  //   value: response.body,
  //   height: '300px',
  //   extensions: [json()],
  // });
  const items = [
    {
      label: 'JSON',
      key: '0',
      children: <JSONLensRenderer response={response} />,
    },
    {
      label: 'Raw',
      key: '1',
      children: <RawLensRenderer response={response} />,
    },
    {
      label: 'Headers',
      key: '2',
      children: <LensesHeadersRenderer headers={response.headers} />,
    },
    {
      label: 'Result',
      key: '3',
      children: <TestResult />,
    },
  ];
  return (
    <div css={css`padding: 16px`}>
      <Tabs items={items} />
      {/*<div ref={jsonResponse}></div>*/}
    </div>
  );
};

export default LensesResponseBodyRenderer;
