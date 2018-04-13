import React from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';


const styles = {
  remove: {
    cursor: 'pointer',
    position: 'absolute',
  	top: '0',
  	right: '10px'
  },
  edit: {
    cursor: 'pointer',
    position: 'absolute',
  	top: '0',
  	left: '10px'
  },

};

const Card = ({ type, title, description, removeCallback , editCallback}) => (
    <div className='card' draggable="true">
        <IconButton style={styles.remove} secondary={true}><NavigationClose className="white-color" onClick={() => removeCallback(type, title) }></NavigationClose></IconButton>
     <FlatButton className="white-color" style={styles.edit} label="Edit"  onClick={() => editCallback(type, title) } />
      
        <h4>{ title }</h4>
        <p>{ description }</p>
    </div>
)

export default Card;