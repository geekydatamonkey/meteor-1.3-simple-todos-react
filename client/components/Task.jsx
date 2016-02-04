import React from 'react';

const Task = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    handleDelete: React.PropTypes.func,
    isChecked: React.PropTypes.bool,
  },


  // a "dumb" component is only responsible for invoking its handler and
  // if needed getting any parameters a handler requires.
  handleDelete() {
    const taskID = this.props.task._id;
    this.props.handleDelete(taskID);
  },

  render() {
    return (
      <li className="task">
        <button className="delete" onClick={this.handleDelete}>
          &times;
        </button>
        {this.props.task.text}
      </li>
    );
  },
});

export default Task;
