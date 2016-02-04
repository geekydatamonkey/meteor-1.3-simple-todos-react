import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import App from './components/App.jsx';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('render-target'));
});
