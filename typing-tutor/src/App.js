// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import RandomPara from './comps/random-para';
import TypingBox from './comps/typing-box';
import TypingSpeed from './comps/typing-speed';
import LevelSelector from './comps/level-selector';
import para1 from './data/data.json';

function App() {
  const [typed_str, setTypedStr] = useState('');
  const [random_str, setRandomStr] = useState('qwerty');
  const [started, setStarted] = useState(false);
  const [wrong_letters, setWrongLetters] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    //...here your init code
    setLevels(para1.map(l => l.title))
  }, []);

  function onLevelSelect(selectedIndex) {

    selectedIndex--;
    if (selectedIndex != -1) {
      let rand = Math.round(Math.random() * para1[selectedIndex].content.length);
      rand = rand ? rand - 1 : 0;
      console.log('app > onLevelSelect', rand, '  >>  ', para1[selectedIndex].content[rand])
      setRandomStr(para1[selectedIndex].content[rand]);
    }
    else {
      setRandomStr('');
    }
  }

  function onType(key_code, input_str) {
    
    if (key_code === 13 && !started) { // Starting for the first time
      setStarted(true);
    }

    if (started) {
      setTypedStr(input_str);

      let err_letters = [];
      for (const [index, letter] of random_str.split('').entries()) {
        if (input_str[index]) {
          let correctly_typed = input_str[index] === letter;
          if (!correctly_typed) {
            err_letters.push(letter);
          }
        }
      }
      setWrongLetters(err_letters)
    }
  }

  return (
    <div className="App">
      <h1>Typing Tutor</h1>
      <hr />
      <LevelSelector levels={levels} onLevelSelect={onLevelSelect}></LevelSelector>
      <RandomPara str={random_str} typed_str={typed_str}></RandomPara>
      <TypingBox str={random_str} onType={onType} started={started}></TypingBox>
      <TypingSpeed typed_str={typed_str} wrong_letters={wrong_letters} started={started}></TypingSpeed>
    </div>
  );
}

export default App;
