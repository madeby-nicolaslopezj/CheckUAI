import React from 'react-native';
import theme from './components/styles/theme';
import TeacherLoginView from './components/views/teacher-login/base';
import TeacherPrepareView from './components/views/teacher-prepare/base';
var CheckAsTeacherView = require('./components/views/check-as-teacher/base');
import CheckAsTeacherTinderView from './components/views/check-as-teacher/tinder';
import CheckAsStudentView from './components/views/check-as-student/base';
import Orientation from 'react-native-orientation';

const debug = false;

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
        return <TeacherLoginView debug={debug} navigator={navigator} />;
      case 'teacher-prepare':
        return <TeacherPrepareView debug={debug} navigator={navigator} token={route.token} password={route.password} isTeacher={route.isTeacher} rut={route.rut} />;
      case 'check-as-teacher':
        return <CheckAsTeacherView debug={debug} navigator={navigator} token={route.token} activityId={route.activityId} sessionId={route.sessionId}/>;
      case 'check-as-teacher-tinder':
        return <CheckAsTeacherTinderView debug={debug} navigator={navigator} token={route.token} activityId={route.activityId} sessionId={route.sessionId}/>;
      case 'check-as-student':
        return <CheckAsStudentView debug={debug} navigator={navigator} token={route.token} password={route.password} isTeacher={route.isTeacher} rut={route.rut} activityId={route.activityId} sessionId={route.sessionId}/>;
      default:
        return <Text>View not found</Text>;
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

  render: function() {
    return (
      <Navigator
        initialRoute={{ id: 'teacher-login', index: 0 }}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        style={theme.main.background}
      />
    );
  },
});

AppRegistry.registerComponent('CheckUAI', () => CheckUAI);

module.exports = CheckUAI;
