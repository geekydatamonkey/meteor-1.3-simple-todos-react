import React from 'react';

export default class Task extends React.Component {

  constructor(props) {
    super(props);

    // change to static variable  once supported (ES7)
    // see: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es7-property-initializers
    this.propTypes = {
      task: React.PropTypes.object.isRequired,
    };
  }

  render() {
    return (
      <li className="task">{this.props.task.text}</li>
    );
  }

}
