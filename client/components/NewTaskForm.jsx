import React from 'react';

const NewTaskForm = React.createClass({
  propTypes: {
    handleSubmit: React.PropTypes.func.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
  },

  handleChange(event) {
    const str = event.target.value;
    this.props.handleChange(str);
  },

  render() {
    return (
      <form
        className="new-task"
        onSubmit={this.props.handleSubmit}
      >
        <input
          type="text"
          value={this.props.text}
          onChange={this.handleChange}
          placeholder="Type a new task"
        />
      </form>
    );
  },
});

export default NewTaskForm;
