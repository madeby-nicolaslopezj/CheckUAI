/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var theme = require('./components/styles/theme');
var TeacherLoginView = require('./components/views/teacher-login');
var TeacherPrepareView = require('./components/views/teacher-prepare/base');
var CheckAsTeacherView = require('./components/views/check-as-teacher/base');
var CheckAsTeacherTinderView = require('./components/views/check-as-teacher/tinder');

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
      case 'check-as-teacher':
        return <CheckAsTeacherView navigator={navigator} token={route.token} activityId={route.activityId} sessionId={route.sessionId}/>;
      case 'check-as-teacher-tinder':
        return <CheckAsTeacherTinderView navigator={navigator} token={route.token} activityId={route.activityId} sessionId={route.sessionId}/>;
      default:
        return <Text>Error</Text>;
    }
  },

  configureScene(route) {
    console.log(Navigator.SceneConfigs);
    switch (route.id) {
      case 'check-as-teacher-tinder':
        return Navigator.SceneConfigs.FloatFromBottom;
      default:
        return Navigator.SceneConfigs.FloatFromRight;
    }
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{id: 'teacher-login', index: 0}}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        style={theme.base.background}
      />
    );
  },
});

AppRegistry.registerComponent('CheckUAI', () => CheckUAI);

module.exports = CheckUAI;
