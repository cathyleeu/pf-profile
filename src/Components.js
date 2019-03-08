import React, { useState, useEffect } from 'react';

export const Modal = (props) => {
  let displayStyle = {
    display : props.isOpen ? "" : "none"
  }
  // const [display, setDisplay] = useState("none")
  return (
    <div className="modal-cont" style={displayStyle}>
      <div className="modal-select-box">
          {props.children}
      </div> 
    </div>
  )
}

// export function Buttons(WrappedComponent, purpose) {
//   return ;
// }
  
export const ChooseButton = (props) => {
  return (
    <p 
      style={props.customStyle}
      className={props.buttonStyle}
      onClick={(e) => props.handleClick(e)}
      data-purpose={props.purpose}
      >
      {props.innerText}
    </p>
  )
}

export const Startbutton = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}></div>  
  )
}) 


export const InnerCircleText = (props) => {
  if(props.imageUrl) {
    console.log("I got imageUrl");
    return (
      <img 
        className="inner-image" 
        src={props.imageUrl} 
        alt="userImage"/>
    )
  } else {
    return (
      <p className="circle-inner-text">
          {props.text}
      </p>
    )
  }
}

export const InnerCircleEl = (props) => {
  let innerStatus = {
    default : props.isHandleEdit,
    select : props.isRenderModal,
  }
  return (
    <div className="inner-circle-border">
      <div 
        className="inner-circle" 
        onClick={innerStatus[props.innerStatus]}
      >
        { props.children }
      </div>
    </div>
  )
  
}