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
    
    innerStatus : "default",
    selectType : "default",
    
    cropNode: "",

    canvasDisplay : "none",

    Camera: null,
    Library: null
  }
  constructor() {
    super()
    this.takeRef = React.createRef();
    this.renderCanvas = React.createRef();
    this.renderVideo = React.createRef();
    
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
    // Fix 
    this.selectStatus = {
      default : {
        camera : "",
        library: "",
      },
      camera : {
        camera: "open",
        library: ""
      },
      library : {
        camera: "",
        library: "open"
      },
      cameraCancle : {
        camera: "close",
        library: ""
      },
      libCancle : {
        camera: "",
        library: "close"
      }
    }
  }
  isHandleEdit = (e) => {
    e.preventDefault();
    console.log("clicked")
    this.setState({
      edit : !this.state.edit,
      innerStatus : "select"
    })
  }
  isRenderModal = () => {
    console.log("rendal modal");
    this.setState({
      modal : !this.state.modal,
      selectType : "default"
    })
    
  }
  isHandleSelectType = (e) => {
  
    let purpose = e.target.dataset.purpose;
  
    this.setState({
      selectType: purpose
    })

    if(purpose === "camera") {
      // 이때 시작을 하는 것이지...
      import('./Camera').then(({ default: Camera }) => {
        this.setState({
          Camera
        });
      });
      return;
    }
    if(purpose === "library") {
      import('./Library').then(({ default: Library }) => {
        this.setState({
          Library
        });
      });
      return;
    }
  }

  // isHandleChange = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   this.setState({
  //     [e.target.name] : e.target.value
  //   })
  // }

  handleSetState = (obj) => {
    this.setState(state => {
      return {
        ...obj
      }
    })
  }
   render() {
    let { slide, fadeTitle, innerText } = this.editStatus[this.state.edit];
    let { camera, library } = this.selectStatus[this.state.selectType];
    let { Camera, Library } = this.state;
    return (
      <div className="App">
        <Modal isOpen={this.state.modal}>

          <ChooseButton 
            buttonStyle={'select-button'}
            handleClick={this.isHandleSelectType} innerText={'Take a photo'} purpose={'camera'}/>
          <ChooseButton 
            buttonStyle={'select-button'}
            handleClick={this.isHandleSelectType} innerText={'Choose from library'} purpose={'library'}/>
          <ChooseButton 
            buttonStyle={'select-button'}
            handleClick={this.isRenderModal} innerText={'Cancle'}/>

          <div className={'selected-temp'}>
            { Camera && 
              <Camera 
                isOpen={camera}
                isHandleSelectType={this.isHandleSelectType}
                canvasDisplay={this.state.canvasDisplay}
                handleSetState={this.handleSetState}/>
            }
            { Library && 
              <Library 
                isOpen={library}
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