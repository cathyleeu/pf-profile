import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';

// const isImportComponents = (getComponents, Purpose) => {
  //   getComponents().then((comp) => {
  //     this.setState({
  //       [Purpose] : comp.default
  //     });
  //   });
  //   return;
  // }

export const appState = {
  imageUrl: "",
  CameraVisible: false,
  LibraryVisible : false,
  toggleVisible: () => {},
  handleSetState: () => {}
}
export const AppContext = React.createContext(appState);



export function isImportComponents(getComponents) {
  return getComponents().then(({ default: Component }) => {
    return Component
  });
}

// export function VisibleSplitted(props) {
//     const [ isVisible, setIsVisible ] = useState(null);
//     const getSelected = () => setIsVisible(props.selected)
//     return (
//       <React.Fragment>
//         { isVisible && <div>{isVisible}</div> }
//       </React.Fragment>  
//     )    
// }




// export const VisibleComponent = ({ visible, getComponents, elementId, toggleVisible, purpose }) => {
//   const [ isVisible, setIsVisible ] = useState(false);
//   const show = () => {
//     toggleVisible(purpose);
//     isImportComponents(getComponents, elementId)
//   };
//   console.log("AAAAAA");
  
//   // { isVisible && content(toggleVisible)}
//   return (
//     <React.Fragment>
//       {visible(show)}
//     </React.Fragment>
//   );
// }



export const Modal = (props) => {
  let displayStyle = {
    display : props.isOpen ? "" : "none"
  }
  // const [display, setDisplay] = useState("none")
  return (
    <div className="modal-cont" style={displayStyle}>
      <div className="modal-select-box">
          {props.children}
      </div> 
    </div>
  )
}

  
export const ChooseButton = (props) => {
  return (
    <p 
      style={props.customStyle}
      className={props.buttonStyle}
      onClick={(e) => props.handleClick(e)}
      data-purpose={props.purpose}
      >
      {props.innerText}
    </p>
  )
}

export const Startbutton = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}></div>  
  )
}) 


export const InnerCircleText = (props) => {
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

export const InnerCircleEl = (props) => {
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