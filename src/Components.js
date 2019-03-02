import React, { Component } from 'react';
import './Components.scss';

export const Modal = (props) => {
    // modal open = props.isOpen
    let displayStyle = {
      display : props.isOpen ? "" : "none"
    }
    return (
      <div className="modal-cont" style={displayStyle}>
        <div className="modal-select-box">
            {props.children}
        </div> 
      </div>
    )
  }
  
export const SelectButton = (props) => {
    return (
        <div onClick={props.isHandleClick}>
        <p>{ props.text }</p>
        </div>
    )
}