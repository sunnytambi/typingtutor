// @flow
import React, { useState } from 'react';

// Ref: https://www.speedtypingonline.com/typing-equations
function TypingSpeed(props) {
  const [starting_time] = useState(new Date().getTime());

  function render_gross_cpm() {

    const current_time = new Date().getTime();
    const diff_time_ms = current_time - starting_time;
    const diff_time_min = (diff_time_ms / 1000) / 60;
    const gross_cpm = Math.floor(props.typed_str.length / diff_time_min);
    const err_cpm = Math.floor(props.wrong_letters.length / diff_time_min)
    const net_cpm = gross_cpm - err_cpm;

    return <div>
      <div>CPM = {gross_cpm}</div>
      <div>NPM = {net_cpm}</div>
    </div>;
  }

  return props.started && render_gross_cpm();
}

export default TypingSpeed;