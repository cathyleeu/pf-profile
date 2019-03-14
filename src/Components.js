import React, { useState ,useContext } from 'react';
import ReactDOM from 'react-dom';


export const appState = {
  imageUrl: "",
  isImportComponents: () => {},
  handleSetState: () => {}
}
export const AppContext = React.createContext(appState);
// const contexts = useContext(AppContext);

export const AppInput = (props) => {
  const [ value, setValue ] = useState('');
  const contexts = useContext(AppContext);
  function handleOnBlur(e) {
    contexts.handleSetState({
      [props.purpose] : value
    })
  }
  function handleChange(e) {
    setValue(e.target.value)
  }
  return (
    <React.Fragment>
      <p>{props.purpose}</p>
      <input
        type={props.type}
        name={props.purpose}
        target={props.purpose}
        onChange={handleChange}
        onBlur={handleOnBlur}
        placeholder={props.placeholder}
        value={value}
      />
    </React.Fragment>
  )
}

export const DisplayComponent = ({Component, BooleanState}) => {
  return (
    <React.Fragment>
      { BooleanState && <Component />}
    </React.Fragment>
  )
}



const handleEditState = (contexts) => {
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

// modal 띄우는 것에만 국한되어 있음 ... 
export function VisibleComponent({eventComponent, targetComponent, purpose}) {
    const contexts = useContext(AppContext);
    // edit === default ? setState ( edit : edit )
    // edit === edit && modal === false ? modal === true 
    
    return (
      <React.Fragment>
        { eventComponent && eventComponent(() => handleEditState(contexts), purpose) }
        { contexts[purpose] && targetComponent(contexts) }
      </React.Fragment>  
    )    
}


export const InnerCircleText = (props) => {
  const contexts = useContext(AppContext);
  // const handleClick = () => {
  //   contexts.handleSetState({ edit : "edit", modal : !contexts["modal"] })
  // }
  if(props.imageUrl) {
    console.log("I got imageUrl");
    return (
      <img 
        className="inner-image" 
        onClick={() => handleEditState(contexts)}
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

export const VisibleModal = ({ Camera, Library, isImportComponents, handleSetState }) => {
  let turn = ( Camera || Library ) ? 'open' : ''
  return (
    <Modal>
      <div className="modal_scene">
        <div className={`modal_cube ${turn}`}>
          <div className={`cube_face cube_face_select`}>
            <ChooseButton 
              handleClick={isImportComponents} 
              innerText={'Take a photo'} 
              purpose={'Camera'}/>
            
            <ChooseButton 
              handleClick={isImportComponents} 
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


