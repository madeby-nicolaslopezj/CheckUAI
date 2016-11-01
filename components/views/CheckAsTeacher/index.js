import React from 'react'
import {startSession, endSession, markStudentAssistance} from '../../api/base'
import layouts from '../../styles/layouts'
import texts from '../../styles/texts'
import _ from 'underscore'
import Dimensions from 'Dimensions'
import { BlurView } from 'react-native-blur'
import Toast from '@remobile/react-native-toast'

import Student from './student'

import {
  View,
  Text,
  TouchableHighlight,
  ListView,
  StatusBar
} from 'react-native'

const propTypes = {
  sessionId: React.PropTypes.number.isRequired,
  token: React.PropTypes.string.isRequired,
  activityType: React.PropTypes.string.isRequired,
  module: React.PropTypes.string.isRequired,
  students: React.PropTypes.arrayOf(React.PropTypes.object),
  navigator: React.PropTypes.object
}

export default class CheckAsTeacherList extends React.Component {

  constructor (props) {
    super(props)

    this.yesStudents = []
    this.noStudents = []
    this.state = {}

    this.datasource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => {
        return row1 !== row2
      }
    })

    const students = props.students.map(student => {
      student.yes = _.contains(this.yesStudents, student.idExpediente)
      student.no = _.contains(this.noStudents, student.idExpediente)
      return student
    })

    this.state.dataSource = this.datasource.cloneWithRows(students)
  }

  async componentDidMount () {
    await startSession({
      token: this.props.token,
      sessionId: this.props.sessionId
    })
  }

  async componentWillUnmount () {
    await endSession({
      token: this.props.token,
      sessionId: this.props.sessionId
    })
  }

  async markAssistance (assist, student) {
    if (assist) {
      this.noStudents = _.without(this.noStudents, student.idExpediente)
      this.yesStudents = _.union(this.yesStudents, [student.idExpediente])
    } else {
      this.yesStudents = _.without(this.yesStudents, student.idExpediente)
      this.noStudents = _.union(this.noStudents, [student.idExpediente])
    }

    this.updateList()

    const response = await markStudentAssistance({
      assist: assist,
      studentId: student.idExpediente,
      token: this.props.token,
      activityType: this.props.activityType,
      sessionId: this.props.sessionId,
      module: this.props.module
    })

    if (!response.Resultado) {
      if (assist) {
        this.yesStudents = _.without(this.yesStudents, student.idExpediente)
      } else {
        this.noStudents = _.without(this.noStudents, student.idExpediente)
      }

      this.updateList()

      if (response.respuesta) {
        Toast.showShortCenter(`Error al marcar asistencia la asistencia de ${student.nombre} ${student.apellidoPaterno}: ${response.respuesta}`)
      } else {
        Toast.showShortCenter(`Error al marcar asistencia la asistencia de ${student.nombre} ${student.apellidoPaterno}`)
      }
    }
  }

  updateList () {
    const students = this.props.students.map(student => {
      student.yes = _.contains(this.yesStudents, student.idExpediente)
      student.no = _.contains(this.noStudents, student.idExpediente)
      return student
    })
    this.setState({
      dataSource: this.datasource.cloneWithRows(students)
    })
  }

  renderStudents () {
    const diff = Dimensions.get('window').width - 375
    const multiplier = 1 + (diff / 700)
    return <ListView
    style={{ marginTop: 20, marginBottom: 70, overflow: 'visible' }}
    dataSource={this.state.dataSource}
    renderRow={(student) => <Student
      token={this.props.token}
      yes={student.yes}
      no={student.no}
      multiplier={multiplier}
      mark={this.markAssistance.bind(this)}
      student={student} />}
    />
  }

  renderBackButton () {
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        activeOpacity={0.6}
        onPress={() => this.props.navigator.pop()}
        style={{ marginTop: 10 }}>
        <Text style={texts.buttonClean}>
          Salir
        </Text>
      </TouchableHighlight>
    )
  }

  renderStatus () {
    /* {this.yesStudents.length} asistente{this.yesStudents.length === 1 ? '' : 's'} -*/
    return (
      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 0, textAlign: 'center', fontWeight: '700' }}>
          {this.noStudents.length} ausente{this.noStudents.length === 1 ? '' : 's'}
        </Text>
        {this.renderBackButton()}
      </View>
    )
  }

  render () {
    console.log('hello')
    if (this.state.isLoading) {
      return (
        <View style={layouts.centerContainer}>
          <Text>Cargando...</Text>
        </View>
      )
    }
    const statusHeight = 70
    return (
      <View style={{ height: Dimensions.get('window').height, backgroundColor: '#fff' }}>
        <StatusBar backgroundColor='white' barStyle='default' />
        {this.renderStudents()}
        <View style={{
          height: 20,
          width: Dimensions.get('window').width,
          position: 'absolute',
          top: 0,
          borderBottomColor: '#eee',
          borderBottomWidth: 0.5,
          backgroundColor: '#fff'
        }}/>

        <View style={{
          position: 'absolute',
          height: statusHeight,
          borderTopColor: '#ccc',
          borderTopWidth: 0.5,
          bottom: 0,
          width: Dimensions.get('window').width
        }}>
          <BlurView blurType='xlight' style={{ height: statusHeight }}>
            {this.renderStatus()}
          </BlurView>
        </View>
      </View>
    )
  }
}

CheckAsTeacherList.propTypes = propTypes
