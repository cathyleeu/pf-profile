import React, { Component } from 'react';
import { ChooseButton, Startbutton } from './Components'


let width = 320, height = 0, streaming = false;
class Camera extends Component { 
    state = {
        
    }
    constructor(props) {
        super(props)
        console.log("from Camera Component");
        
        this.takeRef = React.createRef();
        this.renderCanvas = React.createRef();
        this.renderVideo = React.createRef();
    }
    componentDidMount() {
        this.handleStartCamera()
      }
    handleStartCamera = () => {
        console.log("handleStartCamera");
        let video = this.renderVideo.current; 
        let canvas = this.renderCanvas.current;
        let takeButton = this.takeRef.current;
    
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
       takeButton.addEventListener('click', () => this.handleTakePicture(canvas, video) , false);
    
      }
      handleCanPlay = (video) => {
        
        console.log("handleCanPlay");
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth/width)
          if (isNaN(height)) {
            height = width / (4/3)
          }
          streaming = true;
        }
    
      }
      handleTakePicture(canvas, video){
        console.log("handleTakePicture");
      
        let context = canvas.getContext('2d'), data;
    
        if (width && height) {
          // set width and height to canvas
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video, 0, 0, width, height);
    
          data = canvas.toDataURL('image/png');
    
        } else {
          console.log("handleClear"); 
        }
    
        this.props.handleSetState({
          imagePreviewUrl: data,
          canvasDisplay: '',
          modal : false
        })
        this.handleCloseCamera(video);
      }
      handleCloseCamera = (video) => {
        video = this.renderVideo.current;
        video.srcObject.getTracks().forEach(track => track.stop())

        this.props.handleSetState({
            selectType: "cameraCancle",
            Camera : null
        })
      }
      render() {
          return (
            <div className={`photo-comp ${this.props.isOpen}`}>
                <div className={'photo-comp-top'}>
                    <video ref={this.renderVideo}>Video stream not available.</video>
                    <canvas ref={this.renderCanvas} className="canvas" style={{display:this.props.canvasDisplay}}></canvas>
                </div>
                <div className="photo-comp-btm">
                    <ChooseButton 
                        handleClick={this.handleCloseCamera} innerText={'Cancle'}/>
                    <Startbutton ref={this.takeRef}/>
                </div>
          </div>
          )
      }

}

export default Camera;