import React from 'react';

const Tasks = [
  { _id: 1, text: 'Task 1' },
  { _id: 2, text: 'Task 2' },
  { _id: 3, text: 'Task 3' },
];

export default class App extends React.component {
  getTasks() {
    return Tasks;
  }

  render() {
    return (
      <h1>Hello there</h1>
    );
  }
}
