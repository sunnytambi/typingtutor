// @flow
import React, { useEffect, useRef, useState } from 'react';

function TypingBox(props) {

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);


  function renderInputBox() {
    
    return <div>
      <code><input type="text" className="w-100 typed-letters" onKeyUp={onTypingChange} ref={textInput} /></code>
      {
        !props.started && (
          <div className="font-weight-light" >Press ENTER in the text box above to start typing</div>
        )
      }

    </div>;
  }

  function onTypingChange(e) {
    e.preventDefault();
    var code = (e.keyCode ? e.keyCode : e.which);
    console.log('typed code:', code, '  ,  key:', e.target.value);
    props.onType(code, e.target.value);
  }

  return renderInputBox();
}

export default TypingBox;