import React from 'react-native';
var theme = require('./components/styles/theme');
var TeacherLoginView = require('./components/views/teacher-login/base');
var TeacherPrepareView = require('./components/views/teacher-prepare/base');
var CheckAsTeacherView = require('./components/views/check-as-teacher/base');
var CheckAsTeacherTinderView = require('./components/views/check-as-teacher/tinder');
var CheckAsStudentView = require('./components/views/check-as-student/base');
import Orientation from 'react-native-orientation';

console.log(Orientation);

var {
  AppRegistry,
  Navigator,
  StyleSheet,
} = React;

var CheckUAI = React.createClass({

  componentDidMount() {
    //Orientation.lockToPortrait();
  },

  renderScene(route, navigator) {
    console.log('rendering', route.id);
    switch (route.id) {
      case 'teacher-login':
        return <TeacherLoginView navigator={navigator} />;
      case 'teacher-prepare':
        return <TeacherPrepareView navigator={navigator} token={route.token} password={route.password} isTeacher={route.isTeacher} rut={route.rut} />;
      case 'check-as-teacher':
        return <CheckAsTeacherView navigator={navigator} token={route.token} activityId={route.activityId} sessionId={route.sessionId}/>;
      case 'check-as-teacher-tinder':
        return <CheckAsTeacherTinderView navigator={navigator} token={route.token} activityId={route.activityId} sessionId={route.sessionId}/>;
      case 'check-as-student':
        return <CheckAsStudentView navigator={navigator} token={route.token} password={route.password} isTeacher={route.isTeacher} rut={route.rut} activityId={route.activityId} sessionId={route.sessionId}/>;
      default:
        return <Text>Error</Text>;
    }
  },

  configureScene(route) {
    switch (route.id) {
      case 'check-as-teacher-tinder':
        return Navigator.SceneConfigs.FloatFromBottom;
      case 'check-as-student':
        return Navigator.SceneConfigs.FloatFromBottom;
      default:
        return Navigator.SceneConfigs.FloatFromRight;
    }
  },

  render: function () {
    return (
      <Navigator
        initialRoute={{ id: 'teacher-login', index: 0 }}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        style={theme.base.background}
      />
    );
  },
});

AppRegistry.registerComponent('CheckUAI', () => CheckUAI);

module.exports = CheckUAI;
