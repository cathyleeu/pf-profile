import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor() {
    super()
    this.state = {
      name : ""
    }
  }
  isHandleClick(e) {
    e.preventDefault();
    console.log("clicked")
  }
  render() {
    return (
      <div className="App">
        <div className="edit-component">
          <p className="main-title">Edit Your Profile</p>
          <div className="main-circle" onClick={this.isHandleClick}>
            <div className="inner-circle">
              <p className="circle-inner-text">Edit</p>          
            </div>
          </div>
          <label>
            name
            <input 
              type="text" 
              placeholder="Write Your Name"
              // value={this.state.name}
              />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
