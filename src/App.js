import React, { Component } from 'react';
import './App.scss';
import { 
  ChooseButton, 
  InnerCircleEl, 
  InnerCircleText, 
  Modal, 
  // VisibleComponent,
  appState,
  AppContext,
  // VisibleSplitted,
  // isImportComponents
} from './Components'


class App extends Component {
  constructor() {
    super()
    this.toggleVisible = (purpose) => {
      console.log("CCCCC");
      if(typeof purpose !== "string") {
        purpose = purpose.target.dataset.purpose;
      }
      
      this.setState((state) => ({
        [`${purpose}Visible`] : !state[`${purpose}Visible`],
        selected : purpose
      }))

      let targetResult = this.state[`${purpose}Visible`];
      if(!targetResult) {
        this.handleSetState({
          [purpose] : null,
          selected : ""
        })
      }

      this.isImportComponents(() => import(`./${purpose}`), purpose );

      // isImportComponents(() => import(`./${purpose}`), "selected")

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
      CameraVisible: appState.CameraVisible,
      LibraryVisible: appState.libraryVisible,
      toggleVisible: this.toggleVisible,
      handleSetState: this.handleSetState,
      selected: "", 

      innerStatus : "default",
  
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

  isHandleEdit = (e) => {
    e.preventDefault();
    this.setState({
      edit : !this.state.edit,
      innerStatus : "select"
    })
  }
  isRenderModal = () => {
    this.setState({
      modal : !this.state.modal,
    })
  }

  isImportComponents = (getComponents, Purpose) => {
    getComponents().then((comp) => {
      this.setState({
        [Purpose] : comp.default
      });
    });
    return;
  }

  // isHandleChange = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   this.setState({
  //     [e.target.name] : e.target.value
  //   })
  // }

  
   render() {
    let { slide, fadeTitle, innerText } = this.editStatus[this.state.edit];
    let { Camera, Library } = this.state;
    return (
      <AppContext.Provider value={this.state}>
        <div className="App" >
          <Modal isOpen={this.state.modal}>
            <ChooseButton 
              buttonStyle={'select-button'}
              handleClick={this.toggleVisible} innerText={'Take a photo'} purpose={'Camera'}/>
            <ChooseButton 
              buttonStyle={'select-button'}
              handleClick={this.toggleVisible} innerText={'Choose from library'} purpose={'Library'}/>
            <ChooseButton 
              buttonStyle={'select-button'}
              handleClick={this.isRenderModal} innerText={'Cancle'}/>
            <div className={'selected-temp'}>
              { Camera && <Camera /> }
              { Library && <Library /> }
            </div>
            

          </Modal>
          
          <div className="edit-component">
            <p className={`title-cont ${slide} ${fadeTitle}`}>Edit Your Profile</p>
            <div className={`image-cont ${slide}`}>
              <InnerCircleEl 
                isHandleEdit={this.isHandleEdit} 
                isRenderModal={this.isRenderModal}
                innerStatus={this.state.innerStatus} 
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


