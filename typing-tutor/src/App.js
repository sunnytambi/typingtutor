// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import RandomPara from './comps/random-para';
import TypingBox from './comps/typing-box';
import TypingSpeed from './comps/typing-speed';
import LevelSelector from './comps/level-selector';
import para1 from './data/data.json';
import SideNav from './comps/side-nav';

function App() {
  const [typed_str, setTypedStr] = useState('');
  const [random_str, setRandomStr] = useState('');
  const [started, setStarted] = useState(false);
  const [wrong_letters, setWrongLetters] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selected_level_data, setSelectedLevelData] = useState(para1[0]);

  useEffect(() => {
    //...here your init code
    setLevels(para1.map(l => l.title))
    //setSelectedLevelData(para1[0]);
  }, []);

  function onLevelSelect(selectedIndex) {

    // RESET
    setStarted(false);
    setTypedStr('');
    setWrongLetters([]);
    setSelectedLevelData(para1[selectedIndex]);
  }

  function onCurrentRandomStringChange(str) {
    setStarted(false);
    setRandomStr(str);
    setTypedStr('');
    setWrongLetters([]);
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
    <div className="wrapper">

      <SideNav levels={levels} onLevelSelect={onLevelSelect}></SideNav>

      <div id="content" className="App">
        <h1>Typing Tutor</h1>
        <hr />
        <RandomPara
          started={started}
          selected_level_data={selected_level_data}
          onCurrentRandomStringChange={onCurrentRandomStringChange}
          onType={onType}>
        </RandomPara>
        
        <TypingSpeed typed_str={typed_str} wrong_letters={wrong_letters} started={started}></TypingSpeed>
      </div>

    </div>
  );
}

export default App;
