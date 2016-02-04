import { Meteor } from 'meteor/meteor';
import { Tasks } from '../both/collections';

const defaultTasks = [
  { text: 'loaf of bread' },
  { text: 'carton of milk' },
  { text: 'stick of butter' },
];

function initializeTasks(tasks) {
  tasks.forEach(task => Tasks.insert(task));
}

Meteor.startup(() => {
  if (Tasks.find().count() === 0) {
    initializeTasks(defaultTasks);
  }
});
