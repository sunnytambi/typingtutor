// @flow
import React, { useEffect, useRef } from 'react';

function TypingBox(props) {

  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.focus();
  }, []);

  function onTypingChange(e) {
    //e.preventDefault();
    var code = (e.keyCode ? e.keyCode : e.which);
    console.log('typed code:', code, '  ,  key:', e.target.value);
    props.onType(code, e.target.value);
  }

  return (
    <div>
      <input type="text" className="w-100" onKeyUp={onTypingChange} ref={textInput} />
      {
        !props.started && (
          <div className="font-weight-light" >Press ENTER in the text box above to start typing</div>
        )
      }
      
    </div>
  );
}

export default TypingBox;