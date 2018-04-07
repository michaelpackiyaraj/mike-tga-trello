import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './components/todoList';
import InprogressList from './components/inprogressList';
import DoneList from './components/doneList';
import { bindActionCreators } from 'redux';
import { getTaskDetails, addTask, removeTask } from './actions';
import responseData from './mockData/taskData.json';

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

   updateItem(data, type, types) {
      const { item } = data;
      let updateItem;
      if(types.length) {
        updateItem = JSON.parse(item[types[0]] ? item[types[0]] : item[types[1]]);
        updateItem.addType = type;
      }
      else {
        updateItem = {item: data, addType: type};
      }
      this.props.actions.addTodoList(updateItem);
  }

 componentDidMount() {
     /* fetch('https://api.myjson.com/bins/vgkil').then( (response) => {
          return response.json();
      }).then( (details) => {
          this.props.actions.getTaskDetails(details.data);
          console.log(details.data, '===');
      });*/
      this.props.actions.getTaskDetails(responseData.data);
  }

  render() {
console.log("sasss",this.props);

    const { todo = [], inprogress = [], done = [] } = this.props.taskDetails;
    return (
      <div className='tasks-list-container'>
        <header className='trello-header'>
          <h1 className='trello-title'>Welcome to Trello</h1>
        </header>
        <div className='content-wrapper'>
            <div className='list'>
                <TodoList types = {['inprogress', 'done']} type={'todo'} cardList={ todo } updateItem={ this.updateItem } removeItem={ this.removeItem } />
            </div>
            <div className='list'>
                <InprogressList types = {['done', 'todo']} type={'inprogress'} cardList={ inprogress } updateItem={ this.updateItem } removeItem={ this.removeItem } />
            </div>
            <div className='list'>
                <DoneList types = {['todo', 'inprogress']} type={'done'} cardList={ done } updateItem={ this.updateItem } removeItem={ this.removeItem } />
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
