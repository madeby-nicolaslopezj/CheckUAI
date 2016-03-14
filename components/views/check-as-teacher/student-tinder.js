var React = require('react-native');
var Image = require('react-native-image-progress');
var Progress = require('react-native-progress');
import StudentImage from '../../elements/student-image';
var MK = require('react-native-material-kit');
import layouts from '../../styles/layouts';
import inputs from '../../styles/inputs';
import buttons from '../../styles/buttons';
import images from '../../styles/images';
import texts from '../../styles/texts';

var {
  MKTextField,
  MKButton,
  MKColor,
} = MK;

var {
  View,
  StyleSheet,
  Text,
  Switch,
} = React;

const propTypes = {
  student: React.PropTypes.object.isRequired,
  token: React.PropTypes.string.isRequired,
  activityId: React.PropTypes.string.isRequired,
};

export default class StudentTinder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StudentImage student={this.props.student} token={this.props.token} />
        <View style={{ padding: 30 }}>
          <Text style={[texts.subtitle, { marginBottom: 0 }]}>
            {this.props.student.apellidoPaterno} {this.props.student.apellidoMaterno}
          </Text>
          <Text style={[texts.subtitle, { marginBottom: 0, marginTop: 10, fontWeight: 'normal' }]}>
            {this.props.student.nombre}
          </Text>
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});

StudentTinder.propTypes = propTypes;
