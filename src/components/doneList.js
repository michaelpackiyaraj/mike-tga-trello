import React, { Component } from 'react';
import Card from './card';
import { Draggable, Droppable } from 'react-drag-and-drop';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class DoneList extends Component {

  removeItem(type, title) {
      this.props.removeItem({type, title});
  }

  onDrop = (item) => {
    this.props.updateItem({item}, this.props.type, this.props.types);
   }

  render() {

      const headerStyle = {
        fontSize : '30px',
        paddingTop: '15px'
      }

        return (
            <div className='list-wrapper'>
                <Subheader style={headerStyle}>Done List</Subheader>
                <List>
                <Droppable types={this.props.types} onDrop={this.onDrop}>
                    { this.props.cardList.map((eachCard, index)=> (
                       <ListItem>
                        <Draggable type={this.props.type} key={`done-${index}`} data = {JSON.stringify({item: eachCard, removeType: this.props.type})} >
                            <Card type={this.props.type} removeCallback={ this.removeItem.bind(this) } key={index} { ...eachCard } />
                        </Draggable>
                        </ListItem>
                    ))}
                </Droppable>
                </List>
            </div>
        );
  }
}

export default DoneList;
