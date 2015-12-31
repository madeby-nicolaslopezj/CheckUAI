var React = require('react-native');
var UAI = require('../api/base');
var Button = require('react-native-button');
var LoadingView = require('./loading');
var CheckAsTeacherView = require('./check-as-teacher/base');

import {TableView, Section, Cell} from 'react-native-tableview-simple';

var {
  StyleSheet,
  Text,
  View,
  AlertIOS,
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
        this.goNext(sessions);
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
    if (this.state.isLoading) {
      return <LoadingView />;
    }

    var RowsSessions = this.state.sessions.map((session) => {
      var title = `${session.nombreAsignatura} - Sec. ${session.numeroSeccion}`;
      return (
        <Cell
        accessory={(session.idSeccion == this.state.selectedSession) ? 'Checkmark' : null}
        key={session.idSeccion}
        title={title}
        onPress={() => this.setState({ selectedSession: session.idSeccion })}
        />
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
      <View style={styles.container}>
        <Text style={styles.textTopForm}>Profesor Titular</Text>
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
        <Button onPress={this.onPress} disabled={true}>Marcar Asistencia (Alumnos)</Button>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  tableViewContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    //flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: 50,
    marginRight: 200,
    marginLeft: 200,
  },
  button: {
    marginTop: 100,
  },
  textTopForm: {
    fontSize: 20,
  },
});

module.exports = TeacherPrepareView;
