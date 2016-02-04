import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Tasks } from '../../both/collections';
import Task from './Task.jsx';
import NewTaskForm from './NewTaskForm.jsx';

const App = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks

  getInitialState() {
    return {
      inputText: '',
    };
  },

  getMeteorData() {
    return {
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
  },

  getTasks() {
    return this.data.tasks;
  },

  handleSubmit(event) {
    event.preventDefault();
    const newTask = {
      text: this.state.inputText.trim(),
      createdAt: new Date(),
    };
    Tasks.insert(newTask);

    // reset input form
    this.setState({
      inputText: '',
    });
  },

  handleInputChange(str = '') {
    this.setState({
      inputText: str,
    });
  },

  handleTaskDelete(taskId) {
    Tasks.remove(taskId);
  },

  renderTasks() {
    return this.getTasks()
      .map((task) => {
        return (
          <Task
            key={task._id}
            task={task}
            handleDelete={this.handleTaskDelete}
          />
        );
      });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>To Do List</h1>
          <NewTaskForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleInputChange}
            text={this.state.inputText}
          />
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  },
});

export default App;
