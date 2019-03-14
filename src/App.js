import React, { Component } from 'react';
import './App.scss';
import { 
  InnerCircleEl, 
  InnerCircleText, 
  VisibleModal,
  VisibleComponent,
  appState,
  AppContext,
  ChooseButton,
  AppInput
} from './Components'


class App extends Component {
  constructor() {
    super()
    this.isImportComponents = (purpose) => {
      if(typeof purpose !== "string") {
        purpose = purpose.target.dataset.purpose;
      }
      import(`./${purpose}`).then((comp) => {
        this.setState({
          [purpose] : comp.default
        });
      });
      return;
    }
    this.handleSetState = (obj) => {
      this.setState((state) => {
        return {
          ...obj
        }
      })
    }
    this.state = {
      name: "",
      imageUrl: appState.imageUrl,

      edit : "default",
      modal: false,
      
      // animation state : 수정 할 방법 생각해보기
      isImportComponents : this.isImportComponents,
      handleSetState: this.handleSetState, 
  
      Camera: null,
      Library: null
    }
    this.editStatus = {
      default : {
        slide: "",
        fadeTitle: "",
        fadeInput: "",
        innerText : "Edit",
        headerText : "Edit Your Profile"
      },
      edit : {
        slide : "edit-start",
        fadeTitle : "fade-out",
        fadeInput : "fade-in",
        innerText : "Click to take a photo",
      },
      done : {
        slide : "edit-end",
        fadeTitle : "fade-in",
        fadeInput : "fade-out",
        innerText : "Edit",
        headerText : "Your Profile"
      }
    } 
  }
  handleInitState = () => {
    this.setState((state) => ({
      ...state,
      name: "",
      imageUrl: "",

      edit : "default",
      modal: false
    }))
  }
  
  render() {
    let { slide, fadeTitle, innerText, headerText, fadeInput } = this.editStatus[this.state.edit];
    return (
      <AppContext.Provider value={this.state}>
        <div className="App" >
          <div className="edit-component">
            <p className={`title-cont ${slide} ${fadeTitle}`}>{headerText}</p>
            <div className={`image-cont ${slide}`}>

              <VisibleComponent 
                purpose={'modal'}
                targetComponent={(context) => <VisibleModal {...context}/>}
                eventComponent={(handleClick) => (
                  <InnerCircleEl handleClick={handleClick}/>
                )}
              />

              <InnerCircleText
                imageUrl={this.state.imageUrl}
                text={innerText}
              />
            </div>
            <div 
              style={{display: `${this.state.edit === "edit" ? "" : "none"}`}}
              className={`input-cont ${slide} ${fadeInput}`}>
              <AppInput 
                type="text"
                purpose={"name"}
                placeholder="Write Your Name"
              />
            </div>
            <div style={{display: `${this.state.edit === "edit" ? "" : "none"}`}}>
              <ChooseButton
                // store current state 
                handleClick={() => this.handleSetState({edit : "default"})} 
                innerText={'Complete'} />
              <ChooseButton 
                // reset to be initial state 
                handleClick={this.handleInitState}
                innerText={'Cancle'} />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;



          


