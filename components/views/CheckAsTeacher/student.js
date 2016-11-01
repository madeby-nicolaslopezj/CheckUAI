import React from 'react'
import UAI from '../../api/base';
import layouts from '../../styles/layouts';
import inputs from '../../styles/inputs';
import buttons from '../../styles/buttons';
import images from '../../styles/images';
import texts from '../../styles/texts';
import StudentImage from '../../elements/student-image';
import {prettifyText} from '../../api/helpers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'underscore';

import {
  View,
  Text,
  AlertIOS,
  ScrollView,
  TouchableHighlight,
} from 'react-native'

const propTypes = {
  student: React.PropTypes.object.isRequired,
  mark: React.PropTypes.func.isRequired,
  yes: React.PropTypes.bool.isRequired,
  no: React.PropTypes.bool.isRequired,
  token: React.PropTypes.string.isRequired,
  multiplier: React.PropTypes.number.isRequired,
};

export default class CheckAsTeacherStudent extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (!_.isEqual(this.props.student, nextProps.student)) {
      return true;
    }
    if (this.props.yes !== nextProps.yes) {
      return true;
    }
    if (this.props.no !== nextProps.no) {
      return true;
    }
    if (this.props.token !== nextProps.token) {
      return true;
    }
    return false;
  }

  notPresent() {
    this.props.mark(false, this.props.student);
  }

  present() {
    this.props.mark(true, this.props.student);
  }

  renderImage() {
    return <StudentImage
    token={this.props.token}
    student={this.props.student}
    width={50 * this.props.multiplier}
    height={50 * this.props.multiplier}/>;
  }

  renderName() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 * this.props.multiplier }}>
          {prettifyText(this.props.student.apellidoPaterno + ' ' + this.props.student.apellidoMaterno)}
        </Text>
        <Text style={{ fontSize: 14 * this.props.multiplier, color: '#555' }}>
          {prettifyText(this.props.student.nombre)}
        </Text>
      </View>
    );
  }

  renderButtons() {
    return (
      <View>
        <View style={[layouts.row, { width: 70 * this.props.multiplier, marginRight: 16 }]}>
          <TouchableHighlight
            underlayColor={'transparent'}
            activeOpacity={0.6}
            onPress={this.notPresent.bind(this)}
            style={{ marginRight: 5 }}>
            <View>
              <Icon name='clear' size={35 * this.props.multiplier} style={{  }} color={this.props.no ? '#F44336' : '#E0E0E0'} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'transparent'}
            activeOpacity={0.6}
            onPress={this.present.bind(this)}
            style={{ marginRight: 5 }}>
            <View>
              <Icon name='check' size={35 * this.props.multiplier} style={{}} color={this.props.yes ? '#4CAF50' : '#E0E0E0'} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={[layouts.row, { marginBottom: this.props.multiplier }]}>
        {this.renderImage()}
        {this.renderName()}
        {this.renderButtons()}
      </View>
    )
  }
}

CheckAsTeacherStudent.propTypes = propTypes;
