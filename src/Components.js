import React, { useContext } from 'react';
import ReactDOM from 'react-dom';


export const appState = {
  imageUrl: "",
  toggleVisible: () => {},
  handleSetState: () => {}
}
export const AppContext = React.createContext(appState);

// TODO: splitted 따로 불러와서 렌더링 하는 부분 생각해보기! 
// export function isImportComponents(getComponents) {
//   return getComponents().then(({ default: Component }) => {
//     return Component
//   });
// }


export function VisibleComponent({eventComponent, targetComponent, purpose}) {
    const contexts = useContext(AppContext);
    // edit === default ? setState ( edit : edit )
    // edit === edit && modal === false ? modal === true 
    const eventClick = () => {
      switch (contexts.edit) {
        case "default":
          contexts.handleSetState({ edit : "edit"})
          break;
        case "edit":
          contexts.handleSetState({ modal : !contexts["modal"] })
          break;
        case "done":
          contexts.handleSetState({ edit : "edit", modal : !contexts["modal"] })
          break;
        default:
          break;
      }
    }
    return (
      <React.Fragment>
        { eventComponent(eventClick, purpose) }
        { contexts[purpose] && targetComponent(contexts) }
      </React.Fragment>  
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
  return (
    <div className="inner-circle-border">
      <div 
        className="inner-circle" 
        onClick={props.handleClick}>
        { props.children }
      </div>
    </div>
  )
}

export const modalRoot = document.getElementById('modal-root');

export class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div');
    this.el.classList.add("modal-cont"); 
  }
  componentDidMount() {
    modalRoot.appendChild(this.el)
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
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

export const VisibleModal = ({ Camera, Library, toggleVisible, handleSetState }) => {
  let turn = ( Camera || Library ) ? 'open' : ''
  return (
    <Modal>
      <div className="modal_scene">
        <div className={`modal_cube ${turn}`}>
          <div className={`cube_face cube_face_select`}>
            <ChooseButton 
              handleClick={toggleVisible} 
              innerText={'Take a photo'} 
              purpose={'Camera'}/>
            
            <ChooseButton 
              handleClick={toggleVisible} 
              innerText={'Choose from library'}
              purpose={'Library'}/>

            <ChooseButton 
              handleClick={() => handleSetState({modal : false})}
              purpose={'modal'}
              innerText={'Cancle'} 
            />      
          </div>
          <div className={`cube_face cube_face_temp`}>
              { Camera && <Camera /> }
              { Library && <Library /> }
          </div>               
        </div>
        
      </div>
    </Modal>
  )
}


