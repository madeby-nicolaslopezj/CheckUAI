import React from 'react'
import theme from './components/styles/theme'
import Login from './components/views/Login'
import TeacherPrepare from './components/views/TeacherPrepare'
import CheckAsTeacher from './components/views/CheckAsTeacher'
import CheckAsStudentView from './components/views/CheckAsStudent'
import Settings from './components/views/Settings'

const debug = true && __DEV__

import {
  Text,
  AppRegistry,
  Navigator
} from 'react-native'

var CheckUAI = React.createClass({

  async componentDidMount () {
    // Orientation.lockToPortrait()
  },

  renderScene (route, navigator) {
    console.log('rendering', route.id)
    switch (route.id) {
      case 'settings':
        return <Settings debug={debug} navigator={navigator} />
      case 'teacher-login':
        return <Login debug={debug} navigator={navigator} />
      case 'teacher-prepare':
        return <TeacherPrepare debug={debug} navigator={navigator} {...route} />
      case 'check-as-teacher':
        return <CheckAsTeacher debug={debug} navigator={navigator} {...route}/>
      case 'check-as-student':
        return <CheckAsStudentView debug={debug} navigator={navigator} {...route}/>
      default:
        return <Text>View not found</Text>
    }
  },

  configureScene (route) {
    switch (route.id) {
      case 'settings':
        return Navigator.SceneConfigs.VerticalDownSwipeJump
      case 'check-as-teacher-tinder':
        return Navigator.SceneConfigs.FloatFromBottom
      case 'check-as-student':
        return Navigator.SceneConfigs.FloatFromBottom
      default:
        return Navigator.SceneConfigs.FloatFromRight
    }
  },

  render () {
    return (
      <Navigator
      initialRoute={{ id: 'teacher-login', index: 0 }}
      renderScene={this.renderScene}
      configureScene={this.configureScene}
      style={theme.main.background} />
    )
  }
})

AppRegistry.registerComponent('CheckUAI', () => CheckUAI)

module.exports = CheckUAI
