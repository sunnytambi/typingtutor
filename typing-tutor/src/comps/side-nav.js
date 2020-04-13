// @flow
import React from 'react';

function SideNav(props) {

  function onLevelClick(e) {
    e.stopPropagation();
    console.log('sidebar click', e.target.dataset.index);
    props.onLevelSelect(e.target.dataset.index);
  }

  function renderNavs() {
    let nav_items = [];

    for (const [index, level] of props.levels.entries()) {
      nav_items.push(< li key={index} >
        <a href="javascript:void(0)" onClick={onLevelClick} data-index={index}>{level}</a>
      </li>);
    }

    return <nav id="sidebar">
      <div className="sidebar-header">
        <h3>Typing Tutor</h3>
      </div>

      <ul className="list-unstyled components">
        <p>Select Level:</p>
        {nav_items}
      </ul>
    </nav>


    
  }

  return renderNavs();
}

export default SideNav;