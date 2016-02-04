import { Meteor } from 'meteor/meteor';
import { Tasks } from '../both/collections';

const defaultTasks = [
  { text: 'loaf of bread' },
  { text: 'carton of milk' },
  { text: 'stick of butter' },
];

Meteor.startup(() => {
  Tasks.remove({}, () => {
    defaultTasks.forEach(task => Tasks.insert(task));
  });
});
