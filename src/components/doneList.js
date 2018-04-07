import React, { Component } from 'react';
import Card from './card';
import { Draggable, Droppable } from 'react-drag-and-drop';

class DoneList extends Component {

  removeItem(type, title) {
      this.props.removeItem({type, title});
  }

  onDrop = (item) => {
    this.props.updateItem({item}, this.props.type, this.props.types);
   }

  render() {
        return (
            <div className='list-wrapper'>
                <h3>Done List</h3>
                <Droppable types={this.props.types} onDrop={this.onDrop}>
                    { this.props.cardList.map((eachCard, index)=> (
                        <Draggable type={this.props.type} key={`done-${index}`} data = {JSON.stringify({item: eachCard, removeType: this.props.type})} >
                            <Card type={this.props.type} removeCallback={ this.removeItem.bind(this) } key={index} { ...eachCard } />
                        </Draggable>
                                        
                    ))}
                </Droppable>
            </div>
        );
  }
}

export default DoneList;
