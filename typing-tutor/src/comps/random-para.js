// @flow
import React, { useState, useEffect, useRef } from 'react';

function RandomPara(props) {

  const [current_random_str, setCurrentRandomStr] = useState('');
  const [typed_str, setTypedStr] = useState('');
  const [selected_level_content, setSelectedLevelContent] = useState('');
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  function generateRandomStr() {
    if (props.selected_level_data && props.selected_level_data.content) {
      setSelectedLevelContent(props.selected_level_data.content);

      // Reset text input
      if (textInput && textInput.current) textInput.current.value = '';
      setTypedStr('');

      let rand = Math.round(Math.random() * props.selected_level_data.content.length);
      rand = rand ? rand - 1 : 0;
      const rand_str = props.selected_level_data.content[rand];
      console.log('app > onLevelSelect', rand, '  >>  ', rand_str)
      setCurrentRandomStr(rand_str);
      props.onCurrentRandomStringChange(rand_str);
    }
  }

  function onTypingChange(e) {
    e.preventDefault();
    var code = (e.keyCode ? e.keyCode : e.which);
    props.onType(code, e.target.value);
    setTypedStr(e.target.value);
  }

  function renderLetters() {

    const random_letters_list = current_random_str.split('').map((letter, index) => {
      let span_class = 'text-muted font-weight-normal';
      if (props.started && typed_str[index]) {
        let correctly_typed = typed_str[index] === letter;
        span_class = correctly_typed ? 'text-success font-weight-bold' : 'text-danger font-italic';
      }
      return <span key={Math.random()} className={span_class}>{letter}</span>
    });

    if (typed_str.length >= current_random_str.length ||
      selected_level_content !== props.selected_level_data.content) {
      // Present new random string
      generateRandomStr();
    }

    return <div>
      <div className="mb-3 border border-warning">
        <code className="typed-letters">{random_letters_list}</code>
        
      </div>
      <code><input type="text" className="w-100 typed-letters" onKeyUp={onTypingChange} ref={textInput} /></code>
      {
        !props.started && (
          <div className="font-weight-light" >Press ENTER in the text box above to start typing</div>
        )
      }
    </div>;
  }

  return renderLetters();
}

export default RandomPara;