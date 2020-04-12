// @flow
import React from 'react';

function RandomPara(props) {

  function renderLetters() {

    let wrong_letters = [];

    const random_letters_list = props.str.split('').map((letter, index) => {
      let span_class = 'text-muted font-weight-normal';
      if (props.typed_str[index]) {
        let correctly_typed = props.typed_str[index] === letter;
        if (!correctly_typed) {
          wrong_letters.push(letter)
        }

        span_class = correctly_typed ? 'text-success font-weight-bold' : 'text-danger font-italic';
      }
      return <span key={Math.random()} className={span_class}>{letter}</span>
    });

    return <div>
      <div className="mb-3">{random_letters_list}</div>
      
    </div>;
  }

  return renderLetters();
}

export default RandomPara;