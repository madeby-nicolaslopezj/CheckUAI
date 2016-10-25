import React from 'react'
var UAI = require('../../api/base');
var LoadingView = require('../loading');
var Spinner = require('../spinner');
var CheckAsTeacherTinderView = require('../check-as-teacher/tinder');
var MK = require('react-native-material-kit');
import Select from './select';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import layouts from '../../styles/layouts';
import inputs from '../../styles/inputs';
import buttons from '../../styles/buttons';
import images from '../../styles/images';
import texts from '../../styles/texts';
import _ from 'underscore';

var {
  MKTextField,
  MKButton,
  MKColor,
} = MK;

import cardStyles from '../../styles/card';

import {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableHighlight,
  ScrollView,
  ActivityIndicatorIOS,
} from 'react-native';

const propTypes = {
  isTeacher: React.PropTypes.bool.isRequired,
  token: React.PropTypes.string.isRequired,
  password: React.PropTypes.string,
  rut: React.PropTypes.string,
};

export default class TeacherPrepareView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedSession: null,
      selectedActivity: null,
      sessions: [],
      activities: [
        { id: 'catedra', title: 'Cátedra' },
        { id: 'ayudantia', title: 'Ayudantía' },
        { id: 'laboratorio', title: 'Laboratorio' },
        { id: 'prueba', title: 'Prueba' },
        { id: 'control', title: 'Control' },
        { id: 'evento', title: 'Evento' },
      ],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  selectFirst(sessions) {
    if (!sessions[0] || !this.state.activities[0]) return;
    this.setState({ selectedSession: sessions[0].idSeccion });
    this.setState({ selectedActivity: this.state.activities[0].id });

    setTimeout(() => {
      //this.asStudent();
    }, 200);
  }

  async fetchData() {
    try {
      var sessions = [];

      if (this.props.isTeacher) {
        sessions = await UAI.getTeacherSessions({
          token: this.props.token,
        });
      } else {
        sessions = await UAI.getColaboratorSessions({
          token: this.props.token,
          rut: this.props.rut,
        });
      }

      this.setState({ sessions, isLoading: false });
      setTimeout(() => {
        this.selectFirst(sessions);
      }, 400);
    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  }

  goBack() {
    this.props.navigator.pop();
  }

  async asTeacher() {
    if (!this.state.selectedActivity || !this.state.selectedSession) return;
    this.setState({ isLoadingStudents: true });

    var sorted = [];

    try {
      var students = await UAI.getSessionStudents({
        token: this.props.token,
        sessionId: this.state.selectedSession,
      });

      this.setState({ isLoadingStudents: false });

      if (students.length == 0) {
        AlertIOS.alert('Error', 'No hay alumnos para esta clase');
        console.log('No students found');
        return;
      }

      sorted = _.sortBy(students, student => student.apellidoPaterno);
    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoadingStudents: false });
      return;
    }

    this.props.navigator.push({
      index: 1,
      id: 'check-as-teacher',
      token: this.props.token,
      activityType: this.state.selectedActivity,
      sessionId: this.state.selectedSession,
      students: sorted,
    });
  }

  asStudent() {
    if (!this.state.selectedActivity || !this.state.selectedSession) return;

    this.props.navigator.push({
      index: 1,
      id: 'check-as-student',
      token: this.props.token,
      activityType: this.state.selectedActivity,
      sessionId: this.state.selectedSession,
      password: this.props.password,
      rut: this.props.rut,
      isTeacher: this.props.isTeacher,
    });
  }

  viewAssistants() {

  }

  renderViewAsistantsButton() {
    return;
    return (
      <View style={[layouts.row, { marginTop: 30 }]}>
        <MKButton
          backgroundColor={MKColor.Indigo}
          shadowRadius={2}
          shadowOpacity={.5}
          shadowColor='black'
          disabled={true}
          onPress={this.viewAssistants.bind(this)}
          style={[buttons.base, layouts.col]}
          >
          <Text pointerEvents='none' style={texts.button}>
            VER ASISTENTES
          </Text>
        </MKButton>
      </View>
    );
  }

  renderButtons() {
    var teacherContent = <Text pointerEvents='none' style={texts.button}>PROFESOR</Text>;
    if (this.state.isLoadingStudents) {
      teacherContent = (
        <ActivityIndicatorIOS
          animating={this.state.isLoadingStudents}
          style={[]}
          color='white'
        />
      );
    }
    return (
      <View style={[cardStyles, { marginTop: 20, padding: 30 }]}>
        <Text style={texts.subtitle}>{'Marcar asistencia como'}</Text>
        <View style={layouts.row}>
          <MKButton
            backgroundColor={MKColor.BlueGrey}
            shadowRadius={2}
            shadowOpacity={.5}
            shadowColor='black'
            onPress={this.asTeacher.bind(this)}
            style={[buttons.base, layouts.col, { marginRight: 10 }]}>
            {teacherContent}
          </MKButton>
          <MKButton
            backgroundColor={MKColor.BlueGrey}
            shadowRadius={2}
            shadowOpacity={.5}
            shadowColor='black'
            onPress={this.asStudent.bind(this)}
            style={[buttons.base, layouts.col, { marginLeft: 10 }]}
            >
            <Text pointerEvents='none' style={texts.button}>
              ALUMNOS
            </Text>
          </MKButton>
        </View>
        {this.renderViewAsistantsButton()}
      </View>
    )
  }

  renderLogoutButton() {
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        activeOpacity={0.6}
        onPress={this.goBack.bind(this)}
        style={{ marginTop: 10 }}>
        <Text style={texts.buttonClean}>
          Salir
        </Text>
      </TouchableHighlight>
    );
  }

  renderSessions() {
    const sessionsOptions = this.state.sessions.map((session) => {
      return { value: session.idSeccion, title: `${session.nombreAsignatura} Sec. ${session.numeroSeccion}` };
    });
    const select = (
      <Select options={sessionsOptions} selected={this.state.selectedSession} onSelect={(sessionId) => {
        this.setState({ selectedSession: sessionId });
      }} />
    );
    return (
      <View style={[cardStyles, { marginTop: 20, padding: 30 }]}>
        <Text style={[texts.subtitle, { marginLeft: 10 }]}>{'Selecciona una clase'}</Text>
        {this.state.isLoading ? <Spinner /> : select}
      </View>
    );
  }

  renderActivities() {
    const activitiesOptions = this.state.activities.map((activity) => {
      return { value: activity.id, title: activity.title };
    });
    return (
      <View style={[cardStyles, { marginTop: 20, padding: 30 }]}>
        <Text style={[texts.subtitle, { marginLeft: 10 }]}>Selecciona el tipo</Text>
        <Select options={activitiesOptions} selected={this.state.selectedActivity} onSelect={(activityType) => {
          this.setState({ selectedActivity: activityType });
        }} />
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={layouts.scrollView} contentContainerStyle={layouts.scrollViewContent}>
        <Row>
          <Col sm={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
            {this.renderSessions()}
            {this.renderActivities()}
            {this.renderButtons()}
            {this.renderLogoutButton()}
          </Col>
        </Row>
      </ScrollView>
    );
  }
};

TeacherPrepareView.propTypes = propTypes;
