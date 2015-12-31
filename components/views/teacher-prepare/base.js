var React = require('react-native');
var UAI = require('../../api/base');
var LoadingView = require('../loading');
var CheckAsTeacherView = require('../check-as-teacher/base');
var Select = require('./select');
var theme = require('../../styles/theme');

var {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableHighlight,
} = React;

var TeacherPrepareView = React.createClass({
  goNext(sessions) {
    this.setState({ selectedSession: sessions[0].idSeccion });
    this.setState({ selectedActivity: this.state.activities[0].id });

    setTimeout(() => {
      this.props.navigator.push({
        title: 'Teacher Check',
        component: CheckAsTeacherView,
        passProps: {
          token: this.props.token,
          activityId: this.state.selectedActivity,
          sessionId: this.state.selectedSession,
        },
      });
    }, 200);
  },

  getInitialState() {
    return {
      isLoading: true,
      selectedSession: null,
      selectedActivity: null,
      sessions: [],
      activities: [
        { id: '1', title: 'Cátedra' },
        { id: '2', title: 'Ayudantía' },
        { id: '3', title: 'Laboratorio' },
        { id: '4', title: 'Prueba' },
        { id: '5', title: 'Control' },
        { id: '6', title: 'Evento' },
      ],
    };
  },

  componentDidMount: async function() {
    try {
      var sessions = await UAI.getTeacherSessions({
        token: this.props.token,
        academicUnit: 1,
      });

      this.setState({ sessions, isLoading: false });
      setTimeout(() => {
        //this.goNext(sessions);
      }, 400);
    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  },

  onChange(value) {
    this.setState({value});
  },

  render() {
    var activitiesOptions = this.state.activities.map((activity) => {
      return { value: activity.id, title: activity.title };
    });
    return (
      <View style={theme.base.container}>
        <View style={theme.layouts.medium}>
          <Text style={[theme.texts.subtitle, theme.texts.center]}>Selecciona una clase</Text>
          <Select options={activitiesOptions} onSelect={(activityId) => {
            this.setState({ selectedActivity: activityId });
          }} />
          <Text style={[theme.texts.subtitle, theme.texts.center]}>Selecciona el tipo</Text>
        </View>
      </View>
    );
  },
});

module.exports = TeacherPrepareView;
