import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Modal from '../Modal';




//사진을 찍고 ->

let width = 320,height = 0, streaming = false, data;
class EditImageUpload extends Component {

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
  constructor(props){
    super(props)
    this.state = {}
    this.handleTakePicture = this.handleTakePicture.bind(this)
  }
  componentWillMount(){
    this.setState({...this.defaultState})
  }
  handleImageChange = e => {
    e.preventDefault();

    let reader =  new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imageSelected: reader.result,
        modalVisible: false,
      });
    }

    reader.readAsDataURL(file);
  }
  isSelectCamera = () => {
    this.setState({modalVisible: true})
  }
  handleCamera = () => {
    this.setState({modalVisible: false, cameraVisible : true })
    this.handleStartCamera()
  }

  handleStartCamera = () => {
    let video = this.refs.video, canvas = this.refs.canvas, startbutton = this.refs.startbutton
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
         var vendorURL = window.URL || window.webkitURL;
         video.src = vendorURL.createObjectURL(stream);
       }
       video.play();
      //  console.log("method",video.play());
     },
     function(err) {
       console.log("An error occured! " + err);
     }
   );
   video.addEventListener('canplay', () => this.handleCanPlay(video), false)
   startbutton.addEventListener('click', () => this.handleTakePicture(canvas, video) , false);

  }
  handleTakePicture(canvas, video){
    let selectbutton = this.refs.selectbutton;

    let context = canvas.getContext('2d'), data;
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      data = canvas.toDataURL('image/png');
    } else {
      this.handleClearPhoto(canvas)
    }
    this.setState({
      imagePreviewUrl: data,
      canvas: '',
      takeAfter: '',
      takeBefore: 'none'
    })
    selectbutton.addEventListener('click', () => this.handleSetImage(data) , false)

  }
  handleClearPhoto = (canvas) => {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    data = canvas.toDataURL('image/png');
    // console.log("from_clearphoto", data);
  }
  handleCanPlay = (video) => {
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
      let videoEle = ReactDOM.findDOMNode(this.refs.video), canvasEle = ReactDOM.findDOMNode(this.refs.canvas)
      videoEle.setAttribute('width', width)
      videoEle.setAttribute('height', height)
      canvasEle.setAttribute('width', width)
      canvasEle.setAttribute('height', height)
      streaming = true;
    }
  }

  renderTakeImg = () => {
    let {imageSelected} = this.state;
    if(imageSelected){
      return (
        <div>
          <img src={imageSelected} id="profile_img" className="profile_img" alt="프로필 사진"/>
        </div>
      )
    }else{
      return (
        <div>
          <img src={require('../../images/friends1.png')} id="profile_img" className="profile_img" alt="프로필 사진" />
        </div>
      )
    }
  }
  handleSetImage = (data) => {
    this.setState({
      imagePreviewUrl: '',
      imageSelected: data,
      modalVisible: false,
      cameraVisible: false,
      canvas: 'none',
      takeAfter: 'none',
      takeBefore: ''
    })
  }
  handleCloseCamera = () => {
    this.setState({
      imagePreviewUrl: data,
      imageSelected:'',
      modalVisible: false,
      cameraVisible: false,
      canvas: 'none',
      takeAfter: 'none',
      takeBefore: ''
    })
  }
  render(){
    return (
      <div>
        <div className="cont_wrap">
          <h2>프로필 사진 변경</h2>
          <div onClick={this.isSelectCamera} className="profile_image">
            {this.renderTakeImg()}
          </div>
        </div>
        <Modal open={this.state.modalVisible}>
          <div className="modal">
            <ul>
              <li onClick={this.handleCamera}>
                  사진찍기
              </li>
              <li onClick={() => this.setState({...this.defaultState})}>
                  현재 사진 삭제
              </li>
              <li>
                <label> 사진업로드
                  <input type="file" onChange={(e)=>this.handleImageChange(e)} className='file'/>
                </label>
              </li>
              <li onClick={() => this.setState({modalVisible: false})}>
                  취소
              </li>
            </ul>
          </div>
        </Modal>
        <Modal open={this.state.cameraVisible}>
          <div className="modal camera-box">
            <div className="camera">
                <video ref="video">Video stream not available.</video>
                <canvas ref="canvas" className="canvas" style={{display:this.state.canvas}}></canvas>
            </div>
            <div ref="cameraBtns">
              <button ref="selectbutton" style={{display: this.state.takeAfter}}>선택하기</button>
              <button onClick={() => this.setState({canvas: 'none', takeAfter: 'none', takeBefore:'' })} style={{display: this.state.takeAfter}}>다시찍기</button>
              <button ref="startbutton" style={{display: this.state.takeBefore}}>사진찍기</button>
              <button onClick={this.handleCloseCamera} style={{display: this.state.takeBefore}}> 닫기</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default EditImageUpload;
