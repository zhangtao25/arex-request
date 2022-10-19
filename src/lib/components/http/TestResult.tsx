import {useContext, useRef} from "react";
import {HttpContext} from "../../index";
import {useCodeMirror} from "../../helpers/editor/codemirror";
import {javascript} from "@codemirror/lang-javascript";

const TestResult = () => {
  const {store,dispatch} = useContext(HttpContext)

  const testResultEditor = useRef(null)
  useCodeMirror({
    container:testResultEditor.current,
    value: JSON.stringify(store.testresult,null,2),
    height: '300px',
    extensions: [javascript()],
    onChange(val){
      // dispatch({
      //   type: 'setRequestTestscript',
      //   payload: val,
      // });
    }
  })
  return <div>


    <div ref={testResultEditor}></div>


  </div>;

}

export default TestResult
