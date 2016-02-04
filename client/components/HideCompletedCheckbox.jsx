import React from 'react';

const HideCompletedCheckbox = ({ hideCompleted, handleChange }) => (
  <label className="hide-completed">
    <input
      type="checkbox"
      checked={ hideCompleted }
      onChange={ handleChange }
    />
    Hide Completed Tasks
  </label>
);

HideCompletedCheckbox.propTypes = {
  hideCompleted: React.PropTypes.bool.isRequired,
  handleChange: React.PropTypes.func.isRequired,
};

export default HideCompletedCheckbox;
