import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Tasks } from '../../both/collections';
import Task from './Task.jsx';
import NewTaskForm from './NewTaskForm.jsx';
import HideCompletedCheckbox from './HideCompletedCheckbox.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

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
    let query = {};

    if (this.state.hideCompleted) {
      query = { isComplete: { $ne: true } };
    }

    return {
      tasks: Tasks.find(query, { sort: { createdAt: -1 } }).fetch(),
      incompleteCount: Tasks.find({ isComplete: { $ne: true } }).count(),
      currentUser: Meteor.user(),
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
    console.log(Meteor.user());
    const newTask = {
      text: this.state.inputText.trim(),
      isComplete: false,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
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

  renderNewTaskForm() {
    // show only if logged in
    if (this.data.currentUser) {
      return (
        <NewTaskForm
          handleSubmit={this.handleNewTaskSubmit}
          handleChange={this.handleNewTaskChange}
          text={this.state.inputText}
        />
      );
    }
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>To Do List ({this.data.incompleteCount} incomplete)</h1>
          <HideCompletedCheckbox
            hideCompleted={this.state.hideCompleted}
            handleChange={ this.handleHideCompletedChange }
          />
          <AccountsUIWrapper />
          { this.renderNewTaskForm() }
        </header>
        <ul>
          { this.renderTasks() }
        </ul>
      </div>
    );
  },
});

export default App;
