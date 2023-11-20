import './clickableText.css'
import React from 'react';


const ClickableText = (props) => {
  return (
    <div className='clickabletext' onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default ClickableText;