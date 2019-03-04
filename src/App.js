import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.scss';


const InnerCircleText = (props) => {
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


// width 와 height 이 왜 있어야핟ㅇ...?
let width = 320, height = 0, streaming = false;
let cropNode;
class App extends Component {
  defaultState = {
    file: '',
    imagePreviewUrl: '',
    imageSelected: '',
    modalVisible: false,
    cameraVisible: false,
    canvas: 'none',
    takeAfter: 'none',
    takeBefore: '',
  }
  constructor() {
    super()
    this.state = {
      name : "",
      edit : false,
      innerStatus : "default",
      modal: false,
      selectType : "default",
      canvas : "none",
      video: "",
      cropNode: ""
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
  componentWillMount(){
    this.setState({...this.defaultState})
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
    if(type === "camera") {
      this.handleStartCamera()
      return;
    }
    if(type === "cameraCancle") {
      this.handleCloseCamera(this.state.video)
      return
    }
    
    console.log(`is selected ${type}`);
  }
  isHandleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleStartCamera = () => {
    console.log("handleStartCamera");
    
    let video = this.refs.video, 
        canvas = this.refs.canvas, 
        startbutton = this.refs.startbutton


    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
     {
       video: true,
       audio: false
     },
     function(stream) {
       if (navigator.mozGetUserMedia) {
         // moz stream
         video.mozSrcObject = stream;

       } else {

         // deprecated
         //  var vendorURL = window.URL || window.webkitURL;
         //  video.src = vendorURL.createObjectURL(stream);
        
         video.srcObject=stream;
       }

       video.play();
     },
     function(err) {
       console.log("An error occured! " + err);
     }
   );

   video.addEventListener('canplay', () => this.handleCanPlay(video), false)
   startbutton.addEventListener('click', () => this.handleTakePicture(canvas, video) , false);
    this.setState({
      video : video
    })
  }

  handleTakePicture(canvas, video){

    console.log("handleTakePicture");
    
    // let selectbutton = this.refs.selectbutton;

    let context = canvas.getContext('2d'), data;

    if (width && height) {
      console.log(width, height);
      
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      data = canvas.toDataURL('image/png');
      console.log(data);
      
      
    } else {
      // this.handleClearPhoto(canvas)
      console.log("handleClear");
      
    }
    this.setState({
      imagePreviewUrl: data,
      canvas: '',
      takeAfter: '',
      takeBefore: 'none',
      modal : false
    })

    // selectbutton.addEventListener('click', () => this.handleSetImage(data) , false)
  
    // camera 종료
    this.handleCloseCamera(video);
  }
  handleCloseCamera = (video) => {
    video.srcObject.getTracks().forEach(track => track.stop())
  }
  handleCanPlay = (video) => {
    
    console.log("handleCanPlay");
    // We will scale the photo width to this
    
    if (!streaming) {
      // 먼저 상태 확인을 하고 width 와 height을 췍
      height = video.videoHeight / (video.videoWidth/width)
      /*
        video.videoHeight = 0
        video.videoWidth = 0 둘다 영을 가지고,
        height = 0/(0/320) => NaN 값을 가지게 됨
      */
      if (isNaN(height)) {
        /*
          때문에 NaN이라면? width = 320 에서 (4/3)을 나눈 값을 height으로 지정
          그것이 240 값이 나오고 뷰에는 320*240의 video가 나오게 됨
        */
        height = width / (4/3)
      }
      // let videoEle = ReactDOM.findDOMNode(this.refs.video), 
      //     canvasEle = ReactDOM.findDOMNode(this.refs.canvas);

      // set width, height to video
      // videoEle.setAttribute('width', width)
      // videoEle.setAttribute('height', height)
      // canvasEle.setAttribute('width', width)
      // canvasEle.setAttribute('height', height)
      streaming = true;
    }

  }
  isHandleReadFile = (e) => {
    console.log("isHandleReadFile");
    e.preventDefault();

    let _self = this;
    let purpose = e.target.dataset.purpose || 'camera'
    var files = e.target.files || e.dataTransfer.files;
    
    if(!files) {
      return;
    }
    if (files[0].type.includes("image")) {
      var reader = new FileReader();

      reader.onload = function(evt) {  
        let fileUrl = evt.target.result;

        _self.setState({
          imagePreviewUrl : fileUrl
        }) 

        if(purpose === "library") {
          _self.renderCropImage(e, fileUrl)
        }
      }
      reader.readAsDataURL(files[0]);

    }

  }
  isHandleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  isHandleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  isHandleDragLeave = (e) => {
    // debugger
    e.preventDefault();
    e.stopPropagation();
    // drag 가 떠났을때 style 
  }
  isHandleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.isHandleReadFile(e)
  }
  renderCropImage = (e, fileUrl) => {
    if(fileUrl) {
      let cropOpts = {
        viewport: {
          width: 180,
          height: 180,
          type: 'circle'
        },
        url: fileUrl,
        // enforceBoundary: false
        // mouseWheelZoom: false
      }
      cropNode = new window.Croppie(this.refs.lib, cropOpts);
    }
  }
  isHandleCrop = (e) => {
    e.preventDefault();
    let _self = this;
    cropNode.result({
      type: 'rawcanvas',
      circle: true,
      // size: { width: 300, height: 300 },
      format: 'png'
    }).then(function (canvas) {
      
      _self.setState({
        imagePreviewUrl: canvas.toDataURL(),
        modal : false
      })
      cropNode.destroy();
    })

    

  }
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
                <div ref="startbutton"></div>
              </div>
            </div>
            <div className={`lib-comp ${library}`}>
              <input 
                ref="upload"
                type="file"
                name="files[]"
                accept=".jpg, .jpeg, .png"
                data-purpose="library"
                onChange={this.isHandleReadFile}
                style={{display: 'none'}}
              />
              <div 
                className="lib-readfile"
                data-purpose="library"
                // file drop 받는 곳에서 발생하는 이벤트 
                onDragEnter={this.isHandleDragEnter}
                onDragOver={this.isHandleDragOver}
                onDragLeave={this.isHandleDragLeave}
                onDrop={this.isHandleDrop}
                onClick={() => this.refs.upload.click()}
                >
                  click to choose a file or drop it here
                  <div ref="lib"></div>
                  <button onClick={(e) => this.isHandleCrop(e)}>Crop</button>
              </div>
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
            <InnerCircleText 
              imageUrl={this.state.imagePreviewUrl}
              text={innerText}
            />
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