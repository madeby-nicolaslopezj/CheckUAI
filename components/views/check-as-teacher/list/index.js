import React from 'react-native';
import UAI from '../../../api/base';
import layouts from '../../../styles/layouts';
import inputs from '../../../styles/inputs';
import buttons from '../../../styles/buttons';
import images from '../../../styles/images';
import texts from '../../../styles/texts';
import _ from 'underscore';
import Dimensions from 'Dimensions';

import Student from './student';

const {
  View,
  Text,
  AlertIOS,
  ScrollView,
  TouchableHighlight,
} = React;

const propTypes = {
  sessionId: React.PropTypes.number.isRequired,
  token: React.PropTypes.string.isRequired,
  activityType: React.PropTypes.string.isRequired,
};

export default class CheckAsTeacherList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      students: [],
    };
    this.yesStudents = [];
    this.noStudents = [];
  }

  async componentDidMount() {
    var response = await UAI.startSession({
      token: this.props.token,
      sessionId: this.props.sessionId,
    });

    this.fetchStudents();
  }

  async componentWillUnmount() {
    var response = await UAI.endSession({
      token: this.props.token,
      sessionId: this.props.sessionId,
    });
  }

  async fetchStudents() {
    try {
      var students = await UAI.getSessionStudents({
        token: this.props.token,
        sessionId: this.props.sessionId,
      });

      if (students.length == 0) {
        AlertIOS.alert('Error', 'No hay alumnos para esta clase');
        console.log('No students found');
        this.props.navigator.pop();
        return;
      }

      const sorted = _.sortBy(students, student => student.apellidoPaterno);

      this.setState({
        students: sorted,
        isLoading: false,
      });

    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  }

  async markAssistance(assist, student) {
    if (assist) {
      this.noStudents = _.without(this.noStudents, student.idExpediente);
      this.yesStudents.push(student.idExpediente);
    } else {
      this.yesStudents = _.without(this.yesStudents, student.idExpediente);
      this.noStudents.push(student.idExpediente);
    }

    this.forceUpdate();

    const response = await UAI.markStudentAssistance({
      assist: assist,
      studentId: student.idExpediente,
      token: this.props.token,
      activityType: this.props.activityType,
      sessionId: this.props.sessionId,
    });

    if (!response.Resultado) {
      if (assist) {
        this.yesStudents = _.without(this.yesStudents, student.idExpediente);
      } else {
        this.noStudents = _.without(this.noStudents, student.idExpediente);
      }

      this.forceUpdate();

      if (response.respuesta) {
        Toast.showShortCenter(`Error al marcar asistencia la asistencia de ${student.nombre} ${student.apellidoPaterno}: ${response.respuesta}`);
      } else {
        Toast.showShortCenter(`Error al marcar asistencia la asistencia de ${student.nombre} ${student.apellidoPaterno}`);
      }
    }
  }

  renderStudents() {
    return this.state.students.map(student => {

      return <Student
      {...this.props}
      key={student.idExpediente}
      yes={_.contains(this.yesStudents, student.idExpediente)}
      no={_.contains(this.noStudents, student.idExpediente)}
      mark={this.markAssistance.bind(this)}
      student={student} />;
    })
  }

  renderBackButton() {
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
    );
  }

  renderStatus() {
    return (
      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontFamily: 'Roboto', fontSize: 18, marginBottom: 0, textAlign: 'center' }}>
          {this.yesStudents.length} asistente{this.yesStudents.length == 1 ? '' : 's'} - {this.noStudents.length} ausente{this.noStudents.length == 1 ? '' : 's'}
        </Text>
        {this.renderBackButton()}
      </View>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={layouts.centerContainer}>
          <Text>Cargando...</Text>
        </View>
      );
    }
    const statusHeight = 70;
    return (
      <View style={{ height: Dimensions.get('window').height }}>
        <ScrollView style={layouts.scrollView} contentContainerStyle={layouts.scrollViewContent}>
          {this.renderStudents()}
        </ScrollView>
        <View style={{ height: statusHeight, shadowOffset:{
            width: 0,
            height: 0,
          },
          shadowColor: 'black',
          shadowOpacity: 0.2,
          backgroundColor: '#eee'
         }}>
          {this.renderStatus()}
        </View>
      </View>
    );
  }
}

CheckAsTeacherList.propTypes = propTypes;
