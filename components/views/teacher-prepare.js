var React = require('react-native');
var UAI = require('../api/base');
var Button = require('react-native-button');
var LoadingView = require('./loading');
var CheckAsTeacherView = require('./check-as-teacher/base');
var Theme = require('../styles/theme');

import {TableView, Section, Cell} from 'react-native-tableview-simple';

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

  onPress: async function() {

  },

  render() {
    var {
      input,
      button,
      vgroup,
    } = Theme;
    var style = Theme.login;

    if (this.state.isLoading) {
      return <LoadingView />;
    }

    var RowsSessions = this.state.sessions.map((session, index) => {
      return (
        <TouchableHighlight
          key={session.idSeccion}
          onPress={() => this.setState({ selectedSession: session.idSeccion })}
          style={[vgroup.top, vgroup.seperator]}>
          <View>
            <Text style={[input.text, vgroup.input]}>
              {session.nombreAsignatura} - Sec. {session.numeroSeccion}
            </Text>
          </View>
        </TouchableHighlight>
      );
    });

    var RowsActivity = this.state.activities.map((activity) => {
      return (
        <Cell
        accessory={(activity.id == this.state.selectedActivity) ? 'Checkmark' : null}
        key={activity.id}
        title={activity.title}
        onPress={() => this.setState({ selectedActivity: activity.id })}
        />
      );
    });
    var buttonsDisabled = !(this.state.selectedActivity && this.state.selectedSession);
    return (
      <View style={style.container}>
        <View style={Theme.main.spaceTop} />
        <View style={style.form}>
          <View style={vgroup.form}>
            {RowsSessions}
          </View>
        </View>
        <View style={style.toolbox} />
      </View>

        /*<Text style={styles.textTopForm}>Profesor Titular</Text>
        <View style={styles.tableViewContainer}>
          <TableView>
            {RowsSessions}
          </TableView>
        </View>
        <Text style={styles.textTopForm}>Tipo de Actividad</Text>
        <View style={styles.tableViewContainer}>
          <TableView>
            {RowsActivity}
          </TableView>
        </View>
        <Button
        disabled={buttonsDisabled}
        onPress={() => {
          this.props.navigator.push({
            title: 'Teacher Check',
            component: CheckAsTeacherView,
            passProps: {
              token: this.props.token,
              activityId: this.state.selectedActivity,
              sessionId: this.state.selectedSession,
            },
          });
        }}>Marcar Asistencia (Profesor)</Button>
      <Button onPress={this.onPress} disabled={true}>Marcar Asistencia (Alumnos)</Button>*/

    );
  },
});

module.exports = TeacherPrepareView;
