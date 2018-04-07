import React, { Component } from 'react';
import Card from './card';
import { Draggable, Droppable } from 'react-drag-and-drop';

class InprogressList extends Component {

  removeItem(type, title) {
    this.props.removeItem({type, title});
  }

  onDrop = (item) => {
   this.props.updateItem({item}, this.props.type, this.props.types);
  }

  render() {
        return (
            <div className='list-wrapper'>
                <h3>In Progress List</h3>
                <Droppable types = {this.props.types} onDrop={this.onDrop}>
                  { this.props.cardList.map((eachCard, index)=> (
                    <Draggable type={this.props.type} key={`inprogress-${index}`} data = {JSON.stringify({item: eachCard, removeType: this.props.type})} >
                        <Card type={this.props.type} removeCallback={ this.removeItem.bind(this) } key={index} { ...eachCard } />
                    </Draggable>
                  ))}
                </Droppable>
            </div>
        );
  }
}

export default InprogressList;
