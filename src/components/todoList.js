import React, { Component } from 'react';
import Card from './card';
import { Draggable, Droppable } from 'react-drag-and-drop';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class TodoList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isFieldOpen: false,
          open:false,
          title:'',
          type:''
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
      if ( this.refs.title.input.value &&  this.refs.description.input.value ) {
          this.props.updateItem({
              title: this.refs.title.input.value,
              description: this.refs.description.input.value
          },this.props.type, []);
            this.refs.title.input.value = '';
            this.refs.description.input.value = '';
            this.toggleForm(false);
      }
  }

  onDrop = (item) => {
    this.props.updateItem({item}, this.props.type, this.props.types);
   }

  handleClose = () => {
    this.setState({ open: false });
  };

  removeItem = (type, title) => {
    this.props.removeItem({type, title});
  }

  editItem = (type, title) => {
    let editTitle = '';
    let editDesc = '';
    this.props.cardList.map((data, idx) => {
      if(title == data.title){
        editTitle = data.title;
        editDesc = data.description;
      }
    });

    this.setState({ open: true,title: editTitle,description: editDesc,type:type });
    this.props.editItem({type, title});
  }

  render() {

    const headerStyle = {
        fontSize : '30px',
        paddingTop: '15px'
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

        return (
            <div className='list-wrapper' onDrop={(e) => this.ondragover(e)}>
                <Subheader style={headerStyle}>To Do List</Subheader>
               <List>
                <Droppable types = {this.props.types} onDrop={this.onDrop}>
                    { this.props.cardList.map((eachCard, index)=> (
                        <ListItem><Draggable type={this.props.type} key={`todo-${index}`} data = {JSON.stringify({item: eachCard, removeType: this.props.type})} >
                            <Card type={this.props.type} editCallback={ this.editItem } removeCallback={ this.removeItem } key={index} { ...eachCard } />
                            <Dialog
                              title={this.state.type}
                              actions={actions}
                              modal={true}
                              open={this.state.open}
                            >
                           <form>
                              <div>
                                  <TextField
                                      hintText="Enter Title"
                                      floatingLabelText="Enter Title" ref='title'
                                      fullWidth="true"
                                      type="input"
                                      value={this.state.title}
                                      onChange={(e) => this.setState({title:e.target.value})}
                                    />
                              </div>
                              <div>
                                  <TextField
                                      hintText="Enter Description"
                                      floatingLabelText="Enter Description" ref='description'
                                      value={this.state.description}
                                       fullWidth="true"
                                       type="input"
                                       value={this.state.description}
                                      onChange={(e) => this.setState({description:e.target.value})}
                                    />
                              </div>
                          </form>
                            </Dialog>
                        </Draggable></ListItem>
                                        
                    ))}
                </Droppable>
                </List>
                { (this.state.isFieldOpen) ?
                    <form>
                        <div>
                            <TextField
                                hintText="Enter Title"
                                floatingLabelText="Enter Title" ref='title'
                              />
                        </div>
                        <div>
                            <TextField
                                hintText="Enter Description"
                                floatingLabelText="Enter Description" ref='description'
                              />
                        </div>
                        <RaisedButton label="Add Task" primary={true} onClick={(e) => this.addItem(e) } />
                    </form>
                    :
                    <FloatingActionButton>
                      <ContentAdd onClick={() => this.toggleForm(true) } />
                    </FloatingActionButton>
                }
                
            </div>
        );
  }
}

export default TodoList;
