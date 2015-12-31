/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var theme = require('./components/styles/theme');
var TeacherLoginView = require('./components/views/teacher-login');
var TeacherPrepareView = require('./components/views/teacher-prepare/base');

var {
  AppRegistry,
  Navigator,
  StyleSheet,
} = React;

var CheckUAI = React.createClass({
  renderScene(route, navigator) {
    switch (route.id) {
      case 'teacher-login':
        return <TeacherLoginView navigator={navigator} />;
      case 'teacher-prepare':
        return <TeacherPrepareView navigator={navigator} token={route.token} />;
      default:
        return <Text>Error</Text>;
    }
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{id: 'teacher-login', index: 0}}
        renderScene={this.renderScene}
        style={theme.base.background}
      />
    );
  },
});

AppRegistry.registerComponent('CheckUAI', () => CheckUAI);

module.exports = CheckUAI;
