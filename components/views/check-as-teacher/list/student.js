import React from 'react-native';
import UAI from '../../../api/base';
import layouts from '../../../styles/layouts';
import inputs from '../../../styles/inputs';
import buttons from '../../../styles/buttons';
import images from '../../../styles/images';
import texts from '../../../styles/texts';
import StudentImage from '../../../elements/student-image';
import {prettifyText} from '../../../api/helpers';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {
  View,
  Text,
  AlertIOS,
  ScrollView,
  TouchableHighlight,
} = React;

const propTypes = {
  student: React.PropTypes.object.isRequired,
  sessionId: React.PropTypes.number.isRequired,
  token: React.PropTypes.string.isRequired,
  activityType: React.PropTypes.string.isRequired,
  mark: React.PropTypes.func.isRequired,
  yes: React.PropTypes.bool.isRequired,
  no: React.PropTypes.bool.isRequired,
};

export default class CheckAsTeacherStudent extends React.Component {

  notPresent() {
    this.props.mark(false, this.props.student);
  }

  present() {
    this.props.mark(true, this.props.student);
  }

  renderImage() {
    return <StudentImage token={this.props.token} student={this.props.student} width={50} height={50}/>;
  }

  renderName() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>
          {prettifyText(this.props.student.apellidoPaterno + ' ' + this.props.student.apellidoMaterno)}
        </Text>
        <Text style={{ fontSize: 14, color: '#555' }}>
          {prettifyText(this.props.student.nombre)}
        </Text>
      </View>
    );
  }

  renderButtons() {
    return (
      <View>
        <View style={[layouts.row, { width: 70, marginRight: 16 }]}>
          <TouchableHighlight
            underlayColor={'transparent'}
            activeOpacity={0.6}
            onPress={this.notPresent.bind(this)}
            style={{ marginRight: 5 }}>
            <View>
              <Icon name='clear' size={35} style={{  }} color={this.props.no ? '#F44336' : '#E0E0E0'} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'transparent'}
            activeOpacity={0.6}
            onPress={this.present.bind(this)}
            style={{ marginRight: 5 }}>
            <View>
              <Icon name='check' size={35} style={{}} color={this.props.yes ? '#4CAF50' : '#E0E0E0'} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={layouts.row}>
        {this.renderImage()}
        {this.renderName()}
        {this.renderButtons()}
      </View>
    )
  }
}

CheckAsTeacherStudent.propTypes = propTypes;
