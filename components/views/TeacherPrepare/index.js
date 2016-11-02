import React from 'react'
import {getTeacherSessions, getColaboratorSessions, getSessionStudents} from '../../api/base'
import Spinner from '../spinner'
import Select from './select'
import { Column as Col, Row } from 'react-native-flexbox-grid'
import layouts from '../../styles/layouts'
import buttons from '../../styles/buttons'
import texts from '../../styles/texts'
import _ from 'underscore'
import Button from '../../elements/Button'
import {Form, Field} from 'simple-react-form'
import SegmentedControl from '../../elements/SegmentedControl'

import {
  Text,
  View,
  AlertIOS,
  TouchableHighlight,
  ScrollView
} from 'react-native'

export default class TeacherPrepareView extends React.Component {

  static propTypes = {
    isTeacher: React.PropTypes.bool.isRequired,
    token: React.PropTypes.string.isRequired,
    password: React.PropTypes.string,
    rut: React.PropTypes.string,
    navigator: React.PropTypes.object
  }

  constructor (props) {
    super(props)
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
        { id: 'evento', title: 'Evento' }
      ]
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  selectFirst (sessions) {
    if (!sessions[0] || !this.state.activities[0]) return
    this.setState({ selectedSession: sessions[0].idSeccion })
    this.setState({ selectedActivity: this.state.activities[0].id })
    this.setState({ selectedModule: '1' })

    setTimeout(() => {
      // this.asStudent()
    }, 200)
  }

  async fetchData () {
    try {
      var sessions = []

      if (this.props.isTeacher) {
        sessions = await getTeacherSessions({
          token: this.props.token
        })
      } else {
        sessions = await getColaboratorSessions({
          token: this.props.token,
          rut: this.props.rut
        })
      }

      this.setState({ sessions, isLoading: false })
      setTimeout(() => {
        this.selectFirst(sessions)
      }, 400)
    } catch (error) {
      AlertIOS.alert('Error', error.message)
      this.setState({ isLoading: false })
    }
  }

  goBack () {
    this.props.navigator.pop()
  }

  async asTeacher () {
    try {
      if (!this.state.selectedActivity || !this.state.selectedSession) return
      this.setState({ isLoadingStudents: true })

      const students = await getSessionStudents({
        token: this.props.token,
        sessionId: this.state.selectedSession
      })

      console.log('students', students)

      this.setState({ isLoadingStudents: false })

      if (students.length === 0) {
        AlertIOS.alert('Error', 'No hay alumnos para esta clase')
        console.log('No students found')
        return
      }

      this.props.navigator.push({
        index: 1,
        id: 'check-as-teacher',
        token: this.props.token,
        activityType: this.state.selectedActivity,
        sessionId: this.state.selectedSession,
        module: this.state.selectedModule,
        students: _.sortBy(students, student => student.apellidoPaterno)
      })
    } catch (error) {
      AlertIOS.alert('Error', error.message)
      this.setState({ isLoadingStudents: false })
      return
    }
  }

  asStudent () {
    if (!this.state.selectedActivity || !this.state.selectedSession) return

    this.props.navigator.push({
      index: 1,
      id: 'check-as-student',
      token: this.props.token,
      activityType: this.state.selectedActivity,
      sessionId: this.state.selectedSession,
      password: this.props.password,
      module: this.state.selectedModule,
      rut: this.props.rut,
      isTeacher: this.props.isTeacher
    })
  }

  asStudentNoPic () {
    if (!this.state.selectedActivity || !this.state.selectedSession) return

    this.props.navigator.push({
      index: 1,
      id: 'check-as-student-no-pic',
      token: this.props.token,
      activityType: this.state.selectedActivity,
      sessionId: this.state.selectedSession,
      password: this.props.password,
      module: this.state.selectedModule,
      rut: this.props.rut,
      isTeacher: this.props.isTeacher
    })
  }

  viewAssistants () {

  }

  renderButtons () {
    return (
      <View style={{ marginTop: 40 }}>
        <Text style={texts.subtitle}>Marcar asistencia como</Text>
        <Button
        disabled={this.state.isLoadingStudents}
        onPress={this.asTeacher.bind(this)}
        style={[{ marginBottom: 10 }]}>
          Profesor
        </Button>
        <View style={layouts.row}>
          <Button
          onPress={this.asStudent.bind(this)}
          style={[buttons.base, layouts.col]}>
            Alumno Con Foto
          </Button>
          <Button
          onPress={this.asStudentNoPic.bind(this)}
          style={[buttons.base, layouts.col, { marginLeft: 10 }]}>
            Alumno Sin Foto
          </Button>
        </View>
      </View>
    )
  }

  renderLogoutButton () {
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        activeOpacity={0.6}
        onPress={this.goBack.bind(this)}
        style={{ marginTop: 40 }}>
        <Text style={texts.buttonClean}>
          Salir
        </Text>
      </TouchableHighlight>
    )
  }

  renderSessions () {
    const sessionsOptions = this.state.sessions.map((session) => {
      return {
        value: session.idSeccion,
        title: session.nombreAsignatura,
        subtitle: `${session.nombreProfesor} - Sección ${session.numeroSeccion}`
      }
    })
    const select = (
      <Select options={sessionsOptions} selected={this.state.selectedSession} onSelect={(sessionId) => {
        this.setState({ selectedSession: sessionId })
      }} />
    )
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={texts.subtitle}>Selecciona una clase</Text>
        {this.state.isLoading ? <Spinner /> : select}
      </View>
    )
  }

  renderActivities () {
    const activitiesOptions = this.state.activities.map((activity) => {
      return { value: activity.id, title: activity.title }
    })
    return (
      <View style={{ marginTop: 40 }}>
        <Text style={texts.subtitle}>Selecciona el tipo</Text>
        <Select options={activitiesOptions} selected={this.state.selectedActivity} onSelect={(activityType) => {
          this.setState({ selectedActivity: activityType })
        }} />
      </View>
    )
  }

  renderModules () {
    return (
      <View style={{ marginTop: 40 }}>
        <Text style={texts.subtitle}>Selecciona el Módulo</Text>
        <Form state={this.state} onChange={changes => this.setState(changes)} useFormTag={false}>
          <View>
            <Field fieldName='selectedModule' type={SegmentedControl} options={['1', '2', '3', '4', '5', '6', '7', '8', '9']}/>
          </View>
        </Form>
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={layouts.scrollView} contentContainerStyle={layouts.scrollViewContent}>
        <Row>
          <Col sm={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
            {this.renderSessions()}
            {this.renderActivities()}
            {this.renderModules()}
            {this.renderButtons()}
            {this.renderLogoutButton()}
          </Col>
        </Row>
      </ScrollView>
    )
  }
}
