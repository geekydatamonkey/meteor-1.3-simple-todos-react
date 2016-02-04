import React from 'react';

const Task = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    handleDelete: React.PropTypes.func.isRequired,
    handleToggleComplete: React.PropTypes.func.isRequired,
  },

  getClassName() {
    const classList = ['task'];
    if (this.props.task.isComplete) {
      classList.push('is-complete');
    }
    return classList.join(' ');
  },

  // a "dumb" component is only responsible for invoking its handler and
  // if needed getting any parameters a handler requires.
  handleDelete() {
    this.props.handleDelete(this.props.task);
  },

  toggleComplete() {
    this.props.handleToggleComplete(this.props.task);
  },

  render() {
    return (
      <li className={ this.getClassName() }>
        <button className="delete" onClick={this.handleDelete}>
          &times;
        </button>
        <input
          type="checkbox"
          checked={ this.props.task.isComplete }
          onClick={ this.toggleComplete }
        />
        <span className="text">{this.props.task.text}</span>
      </li>
    );
  },
});

export default Task;
