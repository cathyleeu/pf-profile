import React, { Component } from 'react';
import { ChooseButton } from './Components'


let cropNode;
class Library extends Component { 
    state = {
        cropDisplay: "none",
        dropDisplay: "",
    }
    constructor(props) {
        super(props)
        this.inputClick = React.createRef();
        this.cropBox = React.createRef();
        this.cropButton = React.createRef();
        
    }
    isHandleReadFile = (e) => {
        console.log("isHandleReadFile");
        e.preventDefault();
    
        this.setState({
          cropDisplay : "",
          dropDisplay: "none"
        })

        this.cropButton.current.style.marginTop = '2vmin';
        
        let _self = this;
        let purpose = e.target.dataset.purpose || 'Camera'
        var files = e.target.files || e.dataTransfer.files;
        
        if(!files) {
          return;
        }
        if (files[0].type.includes("image")) {
          var reader = new FileReader();
    
          reader.onload = function(evt) {  
            let fileUrl = evt.target.result;
    
            _self.props.handleSetState({
              imagePreviewUrl : fileUrl
            }) 
    
            if(purpose === "Library") {
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
    
        if(e.target.className === "lib-readfile") {
          e.target.className = "lib-readfile drag-over"
        }
    }
    isHandleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // drag 가 떠났을때 style 
    
        if(e.target.className === "lib-readfile drag-over") {
          e.target.className = "lib-readfile"
        }
    
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
          }
          cropNode = new window.Croppie(this.cropBox.current, cropOpts);
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
            
            _self.props.handleSetState({
                imagePreviewUrl: canvas.toDataURL(),
                modal : false,
                Library: null
            })
            _self.setState({
                cropDisplay : 'none'
            })
            cropNode.destroy();
        })
    }
    handleInputClick = () => {
        this.inputClick.current.click()
    }
    render() {
        return (
            <div className={`inner-temp ${this.props.isOpen}`}>
              <input 
                ref={this.inputClick}
                type="file"
                name="files[]"
                accept=".jpg, .jpeg, .png"
                data-purpose="Lbrary"
                onChange={this.isHandleReadFile}
                style={{display: 'none'}}
              />
              <div 
                className={"lib-readfile"}
                data-purpose="Library"
                // file drop 받는 곳에서 발생하는 이벤트 
                onDragEnter={this.isHandleDragEnter}
                onDragOver={this.isHandleDragOver}
                onDragLeave={this.isHandleDragLeave}
                onDrop={this.isHandleDrop}
                >
                    <ChooseButton 
                        innerText={'Drag & Drop'}
                        customStyle={{display: `${this.state.dropDisplay}`}}/>
                    <ChooseButton 
                        buttonStyle={'file-open-btn'}
                        customStyle={{display: `${this.state.dropDisplay}`}}
                        handleClick={this.handleInputClick} 
                        innerText={'Click here to browse'}
                    />
                    <div ref={this.cropBox} style={{display: `${this.state.cropDisplay}`}}></div>
                  
                </div>
                <div className="lib-btm" ref={this.cropButton}>
                    <ChooseButton 
                        buttonStyle={'cancle-btn'}
                        handleClick={this.props.isHandleSelectType} 
                        purpose={'Library'} 
                        innerText={'Cancle'}
                    />
                    <ChooseButton
                        buttonStyle={'cancle-btn'}
                        customStyle={{display: `${this.state.cropDisplay}`}}
                        handleClick={this.isHandleCrop} 
                        innerText={'Crop'}
                    />
                </div>
              
            </div>
        )
    }
}


export default Library

