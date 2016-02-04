import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Tasks } from '../../both/collections';
import Task from './Task.jsx';
import NewTaskForm from './NewTaskForm.jsx';
import HideCompletedCheckbox from './HideCompletedCheckbox.jsx';

const App = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      inputText: '',
      hideCompleted: false,
    };
  },

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    const query = this.state.hideCompleted
      ? { isComplete: false }
      : {};

    return {
      tasks: Tasks.find(
        query,
        { sort: { createdAt: -1 } }
      ).fetch(),
    };
  },

  getTasks() {
    return this.data.tasks;
  },

  /**
  * New Task Handlers
  */
  handleNewTaskSubmit(event) {
    event.preventDefault();
    const newTask = {
      text: this.state.inputText.trim(),
      isComplete: false,
      createdAt: new Date(),
    };
    Tasks.insert(newTask);

    // reset input form
    this.setState({
      inputText: '',
    });
  },

  handleNewTaskChange(str = '') {
    this.setState({
      inputText: str,
    });
  },

  /**
  * Task Handlers
  */
  handleTaskDelete(task) {
    Tasks.remove(task._id);
  },

  handleTaskToggleComplete(task) {
    Tasks.update(
      task._id,
      { $set: { isComplete: !task.isComplete } }
    );
  },

  /**
  * Toggle Complete Checkbox Handlers
  */
  handleHideCompletedChange() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  },

  renderTasks() {
    return this.getTasks()
      .map(task => (
        <Task
          key={task._id}
          task={task}
          handleDelete={this.handleTaskDelete}
          handleToggleComplete={this.handleTaskToggleComplete}
        />
      )
    );
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>To Do List</h1>
          <HideCompletedCheckbox
            hideCompleted={this.state.hideCompleted}
            handleChange={ this.handleHideCompletedChange }
          />
          <NewTaskForm
            handleSubmit={this.handleNewTaskSubmit}
            handleChange={this.handleNewTaskChange}
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
