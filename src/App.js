import React, { Component } from 'react';
import './App.scss';


const InnerCircleText = (props) => {
  // {this.state.editStatus ? "Photo" : "Edit" }
  return (
    <p className="circle-inner-text">
        {props.text}
    </p>
  )
}

const InnerCircleEl = (props) => {
  return (
    <div className="inner-circle-border">
      <div className="inner-circle">
        {/* photo space */}
        {props.children}
      </div>
    </div>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      name : "",
      edit : false,
      slide: "" 
    }
    this.editStatus = {
      true : {
        "slide" : "edit-start",
        "fadeTitle" : "fade-out",
        "fadeInput" : "fade-in",
        "innerText" : "Photo"
      },
      false : {
        "slide" : "edit-end",
        "fadeTitle" : "fade-in",
        "fadeInput" : "fade-out",
        "innerText" : "Edit"
      }
    } 
  }
  isHandleClick = (e) => {
    e.preventDefault();
    console.log("clicked")
    this.setState({
      edit : !this.state.edit,
    })
  }
  isHandleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    
  }
  isDispatchStatus = (state) => {
    console.log(state);
  }
  render() {
    let { slide, fadeTitle, fadeInput, innerText } = this.editStatus[this.state.edit];
    return (
      <div className="App">
        <div className="edit-component">
          <p className={`title-cont ${slide} ${fadeTitle}`}>Edit Your Profile</p>
          <div className={`image-cont ${slide}`} onClick={this.isHandleClick}>
            <InnerCircleEl />
            <InnerCircleText text={innerText}/>
          </div>
          <div 
            className={`input-cont ${slide} ${fadeInput}`}>
            <p>name</p>
            <input 
              type="text" 
              placeholder="Write Your Name"
              onChange={this.isHandleChange}
              value={this.state.name}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
