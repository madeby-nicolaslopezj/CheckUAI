var React = require('react-native');
var UAI = require('../../api/base');
var LoadingView = require('../loading');
var CheckAsTeacherTinderView = require('../check-as-teacher/tinder');
var Select = require('./select');
var theme = require('../../styles/theme');
var MK = require('react-native-material-kit');

var {
  MKCardStyles,
  MKTextField,
  MKButton,
  MKColor,
} = MK;

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
    this.setState({ selectedSession: sessions[1].idSeccion });
    this.setState({ selectedActivity: this.state.activities[0].id });

    setTimeout(() => {
      this.asStudent();
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
        this.goNext(sessions);
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
      id: 'check-as-teacher-tinder',
      token: this.props.token,
      activityId: this.state.selectedActivity,
      sessionId: this.state.selectedSession,
    });
  },

  asStudent() {
    if (!this.state.selectedActivity || !this.state.selectedSession) return;

    this.props.navigator.push({
      index: 1,
      id: 'check-as-student',
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
        <View style={[theme.layouts.medium, { marginTop: 60, marginBottom: 60 }]}>
          <View style={[MKCardStyles.card, { marginTop: 20, padding: 30 }]}>
            <Text style={[theme.texts.subtitle, { marginLeft: 10 }]}>{'Selecciona una clase'}</Text>
            <Select options={sessionsOptions} selected={this.state.selectedSession} onSelect={(sessionId) => {
              this.setState({ selectedSession: sessionId });
            }} />
          </View>

          <View style={[MKCardStyles.card, { marginTop: 20, padding: 30 }]}>
            <Text style={[theme.texts.subtitle, { marginLeft: 10 }]}>{'Selecciona el tipo'}</Text>
            <Select options={activitiesOptions} selected={this.state.selectedActivity} onSelect={(activityId) => {
              this.setState({ selectedActivity: activityId });
            }} />
          </View>


          <View style={[MKCardStyles.card, { marginTop: 20, padding: 30 }]}>
            <Text style={[theme.texts.subtitle]}>{'Marcar asistencia como'}</Text>

            <View style={theme.layouts.row}>
              <MKButton

                backgroundColor={MKColor.BlueGrey}
                shadowRadius={2}
                shadowOpacity={.5}
                shadowColor="black"
                onPress={this.asTeacher}
                style={[theme.button.base, theme.layouts.col, { marginRight: 10 }]}
                >
                <Text pointerEvents="none" style={[theme.button.text]}>
                  PROFESOR
                </Text>
              </MKButton>

              <MKButton

                backgroundColor={MKColor.BlueGrey}
                shadowRadius={2}
                shadowOpacity={.5}
                shadowColor="black"
                onPress={this.asStudent}
                style={[theme.button.base, theme.layouts.col, { marginLeft: 10 }]}
                >
                <Text pointerEvents="none" style={[theme.button.text]}>
                  ALUMNOS
                </Text>
              </MKButton>
            </View>
          </View>

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
