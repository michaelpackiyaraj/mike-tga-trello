import React, { Component } from 'react';
import Card from './card';
import { Draggable, Droppable } from 'react-drag-and-drop';

class TodoList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isFieldOpen: false
      }

      this.addItem = this.addItem.bind(this);
      
  }

  toggleForm = (bool) => {
      this.setState({
          isFieldOpen: bool
      });
  }

  addItem = e => {
      e.preventDefault();
      if ( this.title.value &&  this.description.value ) {
          this.props.updateItem({
              title: this.title.value,
              description: this.description.value
          },this.props.type, []);
            this.title.value = '';
            this.description.value = '';
            this.toggleForm(false);
      }
  }

  onDrop = (item) => {
    this.props.updateItem({item}, this.props.type, this.props.types);
   }

  removeItem(type, title) {
        this.props.removeItem({type, title});
  }

  render() {
        return (
            <div className='list-wrapper' onDrop={(e) => this.ondragover(e)}>
                <h3>To Do List</h3>
                <Droppable types = {this.props.types} onDrop={this.onDrop}>
                    { this.props.cardList.map((eachCard, index)=> (
                        <Draggable type={this.props.type} key={`todo-${index}`} data = {JSON.stringify({item: eachCard, removeType: this.props.type})} >
                            <Card type={this.props.type} removeCallback={ this.removeItem.bind(this) } key={index} { ...eachCard } />
                        </Draggable>
                                        
                    ))}
                </Droppable>
                { (this.state.isFieldOpen) ?
                    <form>
                        <div>
                            <label>Enter Title</label>
                            <input type='text' ref={(elem) => this.title = elem} required />
                        </div>
                        <div>
                            <label>Enter Description</label>
                            <input type='text' ref={(elem) => this.description = elem} required />
                        </div>
                        <button type="submit" onClick={(e) => this.addItem(e) }>Add Item</button>
                    </form>
                    :
                    // eslint-disable-next-line
                    <a href='javascript:void(0);' onClick={() => this.toggleForm(true) }>Add Item</a>

                }
            </div>
        );
  }
}

export default TodoList;
