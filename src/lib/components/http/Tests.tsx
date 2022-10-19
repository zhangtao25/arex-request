import {useCodeMirror} from "../../helpers/editor/codemirror";
import {useContext, useRef} from "react";
import {javascript} from "@codemirror/lang-javascript";
import {HttpContext} from "../../index";

const HttpTests = () => {
  const {store,dispatch} = useContext(HttpContext)
  const value = `

// Check status code is 200
pw.test("Status code is 200", ()=> {
    pw.expect(pw.response.body[0].id).toBe(1);
});`
  const testScriptEditor = useRef(null)
  useCodeMirror({
    container:testScriptEditor.current,
    value: store.request.testscript,
    height: '300px',
    extensions: [javascript()],
    onChange(val){
      dispatch({
        type: 'setRequestTestscript',
        payload: val,
      });
    }
  })
  return <div>


    <div ref={testScriptEditor}></div>


  </div>;
};

export default HttpTests;
