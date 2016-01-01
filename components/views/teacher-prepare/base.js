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
  ScrollView,
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

  propTypes: {
    token: React.PropTypes.string.isRequired,
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

  goBack() {
    this.props.navigator.pop();
  },

  asTeacher() {
    if (!this.state.selectedActivity || !this.state.selectedSession) return;

    this.props.navigator.push({
      index: 1,
      id: 'check-as-teacher',
      token: this.props.token,
      activityId: this.state.selectedActivity,
      sessionId: this.state.selectedSession,
    });
  },

  render() {
    var sessionsOptions = this.state.sessions.map((session) => {
      return { value: session.idSeccion, title: `${session.nombreAsignatura} Sec. ${session.numeroSeccion}` };
    });
    var activitiesOptions = this.state.activities.map((activity) => {
      return { value: activity.id, title: activity.title };
    });
    return (
      <ScrollView style={theme.base.scrollView} contentContainerStyle={theme.base.scrollViewContent}>
        <View style={theme.layouts.medium}>
          <Text style={[theme.texts.subtitle, theme.texts.center]}>{'Selecciona una clase'.toUpperCase()}</Text>
          <Select options={sessionsOptions} onSelect={(sessionId) => {
            this.setState({ selectedSession: sessionId });
          }} />
          <Text style={[theme.texts.subtitle, theme.texts.center]}>{'Selecciona el tipo'.toUpperCase()}</Text>
          <Select options={activitiesOptions} onSelect={(activityId) => {
            this.setState({ selectedActivity: activityId });
          }} />
          <TouchableHighlight

            onPress={this.asTeacher}
            style={[theme.button.touch, { marginTop: 20 }]}>
            <View style={[theme.button.base, theme.button.primary]}>
              <Text style={[theme.button.content, theme.button.primaryContent]}>
                Marcar Asistencia - Profesor
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.asTeacher}
            style={[theme.button.touch, { marginTop: 10 }]}>
            <View style={[theme.button.base, theme.button.primary]}>
              <Text style={[theme.button.content, theme.button.primaryContent]}>
                Marcar Asistencia - Alumnos
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={'transparent'}
            activeOpacity={0.6}
            onPress={this.goBack}
            style={[theme.button.touchLight, { marginTop: 10 }]}>
            <View style={[theme.button.base, theme.button.link]}>
              <Text style={[theme.button.content, theme.button.linkContent]}>
                Salir
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  },
});

module.exports = TeacherPrepareView;
