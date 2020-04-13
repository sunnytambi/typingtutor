// @flow
import React from 'react';

function LevelSelector(props) {

  function onChangeHandler(e) {
    props.onLevelSelect(e.target.selectedIndex);
  }

  function render_selector() {
    let options = props.levels.map(l => {
      return <option value={l} key={l}>{l}</option>;
    });

    return (
      <div>
        Select Level:
        <select onChange={onChangeHandler}>
          <option value='-1' key='-1'>--Select--</option>
          {options}
        </select>
      </div>
      );
  }

  return render_selector()
}

export default LevelSelector;