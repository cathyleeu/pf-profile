import React, { Component } from 'react';
import { ChooseButton, Startbutton, AppContext } from './Components'


let width = 320, height = 0, streaming = false;
class Camera extends Component { 
    static contextType = AppContext;
    
    constructor(props) {
        super(props)
        
        this.takeRef = React.createRef();
        this.renderCanvas = React.createRef();
        this.renderVideo = React.createRef();

        this.state = {
          canvasDisplay : "none",
        }
        console.log("camera component is rendering");
        
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
              video.mozSrcObject = stream;
            } else {
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
        this.context.handleSetState({
          imageUrl: data,          
          modal : false
        })
        this.setState({
          canvasDisplay: '',
        })
        this.handleCloseCamera(video);
      }
      handleCloseCamera = (video) => {
        video = this.renderVideo.current;
        video.srcObject.getTracks().forEach(track => track.stop())
        let _self = this;
        
        this.context.toggleVisible('Camera')
        setTimeout(() => {
          _self.context.handleSetState({
            Camera : null
        })}, 800)        
      }
      render() {
          return (
            <AppContext.Consumer>
              {({CameraVisible}) => {
                let display = CameraVisible ? "open" : "close";
                return(
                  <div className={`inner-temp ${display}`}>
                      <div className={'photo-comp-top'}>
                          <video ref={this.renderVideo}>Video stream not available.</video>
                          <canvas ref={this.renderCanvas} className="canvas" style={{display:this.state.canvasDisplay}}></canvas>
                      </div>
                      <div className="photo-comp-btm">
                          <ChooseButton 
                              handleClick={this.handleCloseCamera} innerText={'Cancle'}/>
                          <Startbutton ref={this.takeRef}/>
                      </div>
                  </div>
              )}}
            </AppContext.Consumer>
          )
      }

}

export default Camera;