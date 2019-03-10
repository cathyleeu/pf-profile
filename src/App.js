import React, { Component } from 'react';
import './App.scss';
import { 
  InnerCircleEl, 
  InnerCircleText, 
  VisibleModal,
  VisibleComponent,
  appState,
  AppContext,
} from './Components'


class App extends Component {
  constructor() {
    super()
    this.toggleVisible = (purpose) => {
    
      if(typeof purpose !== "string") {
        purpose = purpose.target.dataset.purpose;
      }
      
      this.setState((state) => ({
        [`${purpose}Visible`] : !state[`${purpose}Visible`]
      }))

      let targetResult = this.state[`${purpose}Visible`];
      if(!targetResult) {
        this.handleSetState({
          [purpose] : null
        })
      }

      this.isImportComponents(() => import(`./${purpose}`), purpose );

    }
    this.handleSetState = (obj) => {
      this.setState((state) => {
        return {
          ...obj
        }
      })
    }
    this.state = {
      name : "",
      edit : false,
      modal: false,
  
      imageUrl: appState.imageUrl,
      // animation state : 수정 할 방법 생각해보기
      CameraVisible: appState.CameraVisible,
      LibraryVisible: appState.libraryVisible,
      toggleVisible: this.toggleVisible,
      handleSetState: this.handleSetState, 
  
      Camera: null,
      Library: null
    }
    this.editStatus = {
      true : {
        slide : "edit-start",
        fadeTitle : "fade-out",
        fadeInput : "fade-in",
        innerText : "Click to take a photo",
      },
      false : {
        slide : "edit-end",
        fadeTitle : "fade-in",
        fadeInput : "fade-out",
        innerText : "Edit",
      }
    } 
  }

  isImportComponents = (getComponents, Purpose) => {
    getComponents().then((comp) => {
      this.setState({
        [Purpose] : comp.default
      });
    });
    return;
  }

  
  render() {
    let { slide, fadeTitle, innerText } = this.editStatus[this.state.edit];
    return (
      <AppContext.Provider value={this.state}>
        <div className="App" >
          <div className="edit-component">
            <p className={`title-cont ${slide} ${fadeTitle}`}>Edit Your Profile</p>
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
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;


// <div 
//             className={`input-cont ${slide} ${fadeInput}`}>
//             <p>name</p>
//             <input 
//               type="text" 
//               name="name"
//               placeholder="Write Your Name"
//               onChange={this.isHandleChange}
//               value={this.state.name}
//               />
//               <button>
//                 Complete
//               </button>
//           </div>


