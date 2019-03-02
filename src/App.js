import React, { Component } from 'react';
import './App.scss';


const InnerCircleText = (props) => {
  return (
    <p className="circle-inner-text">
        {props.text}
    </p>
  )
}

const InnerCircleEl = (props) => {
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

// class InnerCircleEl extends Component {
//   constructor(props) {
//     super(props)
//     this.innerStatus = {
//       default : {
//         handleClick : this.props.isHandleEdit
//       },
//       select : {
//         handleClick : this.props.isRenderModal
//       }
//     } 
//   }
//   render() {
//     let { handleClick } = this.innerStatus[this.props.innerStatus];
//     return (
//       <div className="inner-circle-border">
//         <div className="inner-circle" onClick={handleClick}>
//           { this.props.children }
//         </div>
//       </div>
//     )
//   }
// }



const Modal = (props) => {
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

const SelectButton = (props) => {
  return (
    <div 
      className="select-button"
      onClick={() => props.isHandleClick(props.purpose)}>
      <p>{ props.text }</p>
    </div>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      name : "",
      edit : false,
      innerStatus : "default",
      modal: false,
      selectType : "default",
      canvas : "none"
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
  isHandleInnerStatus = (state) => {
    this.setState({
      innerStatus : state
    })
  }
  isHandleSelectType = (type) => {
    this.setState({
      selectType: type
    })
    
    console.log(`is selected ${type}`);
  }
  // isRenderCamera = () => {
    
  //   console.log("isRenderCamera");

  // }
  // isRenderFileDrop = () => {
  //   // select box choose -> file drop -> crop image
  //   console.log("isRenderFileDrop");
    
  // }
  isHandleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  // handleStartCamera = () => {
  //   let video = this.refs.video, canvas = this.refs.canvas, startbutton = this.refs.startbutton
  //   navigator.getMedia = ( navigator.getUserMedia ||
  //                          navigator.webkitGetUserMedia ||
  //                          navigator.mozGetUserMedia ||
  //                          navigator.msGetUserMedia);
  //  navigator.getMedia(
  //    {
  //      video: true,
  //      audio: false
  //    },
  //    function(stream) {
  //      if (navigator.mozGetUserMedia) {
  //        video.mozSrcObject = stream;
  //      } else {
  //        var vendorURL = window.URL || window.webkitURL;
  //        video.src = vendorURL.createObjectURL(stream);
  //      }
  //      video.play();
  //     //  console.log("method",video.play());
  //    },
  //    function(err) {
  //      console.log("An error occured! " + err);
  //    }
  //  );
  //  video.addEventListener('canplay', () => this.handleCanPlay(video), false)
  //  startbutton.addEventListener('click', () => this.handleTakePicture(canvas, video) , false);

  // }

  render() {
    let { slide, fadeTitle, fadeInput, innerText } = this.editStatus[this.state.edit];
    let { camera, library } = this.selectStatus[this.state.selectType];
    return (
      <div className="App">
        <Modal isOpen={this.state.modal}>

          <SelectButton isHandleClick={this.isHandleSelectType} text={'Take a photo'} purpose="camera"/>
          <SelectButton isHandleClick={this.isHandleSelectType} text={'Choose from library'} purpose="library"/>
          <SelectButton isHandleClick={this.isRenderModal} text={'Cancle'}/>

          <div className={'selected-temp'}>
            <div className={`photo-comp ${camera}`}>
              <div className={'photo-comp-top'}>
                <video ref="video">Video stream not available.</video>
                <canvas ref="canvas" className="canvas" style={{display:this.state.canvas}}></canvas>
              </div>
              <div className="photo-comp-btm">
                <p onClick={() => this.isHandleSelectType('cameraCancle')}>Cancle</p>
                <div 
                  ref="takebutton"
                  // style={{display: this.state.takeBefore}}
                >
                </div>
              </div>
            </div>
            <div className={`lib-comp ${library}`}>
              <p onClick={() => this.isHandleSelectType('libCancle')}>Cancle</p>
            </div>

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
            <InnerCircleText text={innerText}/>
          </div>
          <div 
            className={`input-cont ${slide} ${fadeInput}`}>
            <p>name</p>
            <input 
              type="text" 
              name="name"
              placeholder="Write Your Name"
              onChange={this.isHandleChange}
              value={this.state.name}
              />
              <button>
                Complete
              </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
