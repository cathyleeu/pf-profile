import React, { Component } from 'react';
import './App.scss';
import { ChooseButton, InnerCircleEl, InnerCircleText, Modal } from './Components'


class App extends Component {
  state = {
    name : "",
    edit : false,
    modal: false,

    file: '',
    imagePreviewUrl: '',
    
    CameraIsOpen : "",
    LibraryIsOpen: "",

    innerStatus : "default",

    Camera: null,
    Library: null
  }
  constructor() {
    super()
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
  isHandleSelectType = (e) => {
  
    let { purpose } = e.target.dataset;
    let targetResult = this.state[`${purpose}IsOpen`];
    let result =  targetResult === "" ||  targetResult === "close" ? "open" : "close";
    
    let targetState = {
      [`${purpose}IsOpen`]: result
    }
    if(result === "close") {
      targetState[purpose] = null;
    }
    
    this.handleSetState(targetState)
    
    this.isImportComponents(() => import(`./${purpose}`), purpose );
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

  handleSetState = (obj) => {
    this.setState((state) => {
      return {
        ...obj
      }
    })
  }
   render() {
    let { slide, fadeTitle, innerText } = this.editStatus[this.state.edit];
    let { Camera, Library, CameraIsOpen, LibraryIsOpen } = this.state;
    return (
      <div className="App">
        <Modal isOpen={this.state.modal}>

          <ChooseButton 
            buttonStyle={'select-button'}
            handleClick={this.isHandleSelectType} innerText={'Take a photo'} purpose={'Camera'}/>
          <ChooseButton 
            buttonStyle={'select-button'}
            handleClick={this.isHandleSelectType} innerText={'Choose from library'} purpose={'Library'}/>
          <ChooseButton 
            buttonStyle={'select-button'}
            handleClick={this.isRenderModal} innerText={'Cancle'}/>

          <div className={'selected-temp'}>
            { Camera && 
              <Camera 
                isOpen={CameraIsOpen}
                isHandleSelectType={this.isHandleSelectType}
                handleSetState={this.handleSetState}/>
            }
            { Library && 
              <Library 
                isOpen={LibraryIsOpen}
                isHandleSelectType={this.isHandleSelectType}
                handleSetState={this.handleSetState}
              />
            }
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
              imageUrl={this.state.imagePreviewUrl}
              text={innerText}
            />
          </div>
        </div>
      </div>
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