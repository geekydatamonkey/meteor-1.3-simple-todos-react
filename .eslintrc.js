// eslintrc
module.exports = {
  extends: 'airbnb',
  rules: {
    'new-cap': [2, {
      capIsNewExceptions: ['express.Router'],
    }],
    'no-unused-vars': [2, {
      args: 'after-used',
      argsIgnorePattern: '[Ii]gnore[d]?',
    }],
  },
  plugins: [
    'react',
  ],
};
