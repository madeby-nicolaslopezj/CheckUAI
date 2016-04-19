var React = require('react-native');
var Image = require('react-native-image-progress');
var Progress = require('react-native-progress');
import { getSetting } from '../api/settings';
var Icon = require('react-native-vector-icons/MaterialIcons');

var {
  View,
  StyleSheet,
  Text,
} = React;

const propTypes = {
  token: React.PropTypes.string.isRequired,
  student: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

const defaultProps = {
  width: 300,
  height: 300,
};

export default class StudentImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { baseUrl: 'http://webapi.uai.cl/' };
    this.setBaseUrl();
  }

   shouldComponentUpdate(nextProps, nextState) {
     if (this.state.baseUrl != nextState.baseUrl) {
       return true;
     }
     if (this.props.student.idExpediente != nextProps.student.idExpediente) {
       return true;
     }
     if (this.props.token != nextProps.token) {
       return true;
     }
     return false;
   }

  async setBaseUrl() {
    const baseUrl = await getSetting('apiUrl');
    this.setState({baseUrl});
  }

  onError(error) {
    console.log('Error fetching image:', error);
  }

  render() {
    var token = encodeURIComponent(this.props.token);
    var source = `${this.state.baseUrl}Asistencia/fotoalumno?token=${token}&expedienteId=${this.props.student.idExpediente}`;
    console.log('Fetching image:', source);
    return (
      <Image
      key={this.props.student.idExpediente}
      source={{ uri: source }}
      onError={this.onError.bind(this)}
      style={{
        width: this.props.width,
        height: this.props.height,
        borderRadius: this.props.width / 2,
        margin: 16,
      }}/>
    );
  }
};

StudentImage.propTypes = propTypes;
StudentImage.defaultProps = defaultProps;
