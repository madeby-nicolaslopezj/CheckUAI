import React from 'react-native';
import theme from './components/styles/theme';
import TeacherLoginView from './components/views/teacher-login/base';
import TeacherPrepareView from './components/views/teacher-prepare/base';
import CheckAsTeacher from './components/views/check-as-teacher/list';
import CheckAsStudentView from './components/views/check-as-student/base';
import Settings from './components/views/settings/index';
import Orientation from 'react-native-orientation';
import {getSetting} from './components/api/settings';

const debug = false && __DEV__;

var {
  AppRegistry,
  Navigator,
  StyleSheet,
} = React;

var CheckUAI = React.createClass({

  async componentDidMount() {
    //Orientation.lockToPortrait();
  },

  renderScene(route, navigator) {
    console.log('rendering', route.id);
    switch (route.id) {
      case 'settings':
        return <Settings debug={debug} navigator={navigator} />;
      case 'teacher-login':
        return <TeacherLoginView debug={debug} navigator={navigator} />;
      case 'teacher-prepare':
        return <TeacherPrepareView debug={debug} navigator={navigator} {...route} />;
      case 'check-as-teacher':
        return <CheckAsTeacher debug={debug} navigator={navigator} {...route}/>;
      case 'check-as-student':
        return <CheckAsStudentView debug={debug} navigator={navigator} token={route.token} password={route.password} isTeacher={route.isTeacher} rut={route.rut} activityType={route.activityType} sessionId={route.sessionId}/>;
      default:
        return <Text>View not found</Text>;
    }
  },

  configureScene(route) {
    switch (route.id) {
      case 'settings':
        return Navigator.SceneConfigs.VerticalDownSwipeJump;
      case 'check-as-teacher-tinder':
        return Navigator.SceneConfigs.FloatFromBottom;
      case 'check-as-student':
        return Navigator.SceneConfigs.FloatFromBottom;
      default:
        return Navigator.SceneConfigs.FloatFromRight;
    }
  },

  render() {
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
