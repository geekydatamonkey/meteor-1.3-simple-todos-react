import React from 'react';
import Task from './Task.jsx';

const Tasks = [
  { _id: 1, text: 'Task 1' },
  { _id: 2, text: 'Task 2' },
  { _id: 3, text: 'Task 3' },
];

export default class App extends React.Component {
  getTasks() {
    return Tasks;
  }

  renderTasks() {
    return this.getTasks()
      .map(task => <Task key={task._id} task={task}/>);
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>To Do List</h1>
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}
