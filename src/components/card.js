import React from 'react';

const Card = ({ type, title, description, removeCallback }) => (
    <div className='card' draggable="true">
        <span className='remove' onClick={() => removeCallback(type, title) }>X</span>
        <h4>{ title }</h4>
        <p>{ description }</p>
    </div>
)

export default Card;