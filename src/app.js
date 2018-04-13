import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './components/todoList';
import InprogressList from './components/inprogressList';
import DoneList from './components/doneList';
import { bindActionCreators } from 'redux';
import { getTaskDetails, addTask, removeTask } from './actions';
import responseData from './mockData/taskData.json';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import './css/index.css';

class App extends Component {

    constructor(props) {
        super(props);
    }

  removeItem = obj => {
      this.props.actions.removeTask(obj);
  }

  updateItem = (data, type, types) => {
      const { item } = data;
      let updateItem;
      if(types.length) {
        updateItem = JSON.parse(item[types[0]] ? item[types[0]] : item[types[1]]);
        updateItem.addType = type;


      }
      else {
        updateItem = {item: data, addType: type};
      }

      this.props.actions.addTask(updateItem);
  }

  editItem = (data, type, types) => {
    console.log("data appjs>>>",data, type, types);
  }

 componentDidMount() {

      fetch('http://localhost:2018/trello/gettask', {'Content-Type':'application/json'}).then( (response) => {
        return response.json();
       
      }).then( (details) => {
         this.props.actions.getTaskDetails(details.data);
      });
      
  }

  render() {

    const headerStyle = {
          backgroundColor : '#448AFF',
          textAlign: 'center'
    };
    const { todo = [], inprogress = [], done = [] } = this.props.taskDetails;

    return (
      <div className='tasks-list-container'>
        <header className='trello-header'>
        <AppBar title="Welcome to Trello" style={headerStyle} iconElementLeft={(<div />)} />
        </header>
        <div className='content-wrapper'>
            <div className='list'>
                <TodoList types = {['inprogress', 'done']} type={'todo'} cardList={ todo } updateItem={ this.updateItem } removeItem={ this.removeItem } editItem={ this.editItem } />
            </div>
            <div className='list'>
                <InprogressList types = {['done', 'todo']} type={'inprogress'} cardList={ inprogress } updateItem={ this.updateItem } removeItem={ this.removeItem } editItem={ this.editItem } />
            </div>
            <div className='list'>
                <DoneList types = {['todo', 'inprogress']} type={'done'} cardList={ done } updateItem={ this.updateItem } removeItem={ this.removeItem } editItem={ this.editItem } />
            </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  taskDetails: state.trelloReducer
});

const mapDispatchToProps = (dispatch) => ({
      actions: {
          getTaskDetails: bindActionCreators(getTaskDetails, dispatch),
          addTask: bindActionCreators(addTask, dispatch),
          removeTask: bindActionCreators(removeTask, dispatch)
      }
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
