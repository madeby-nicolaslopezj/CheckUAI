var React = require('react-native');
var Image = require('react-native-image-progress');
var Progress = require('react-native-progress');
import { getSetting } from '../api/settings';


var {
  View,
  StyleSheet,
  Text,
} = React;

const propTypes = {
  token: React.PropTypes.string.isRequired,
  student: React.PropTypes.object.isRequired,
};

export default class StudentImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { baseUrl: 'http://webapi.uai.cl/' };
    this.setBaseUrl();
  }

  async setBaseUrl() {
    const baseUrl = await getSetting('apiUrl');
    this.setState({baseUrl});
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
  }

  render() {
    var token = encodeURIComponent(this.props.token);
    var source = `${this.state.baseUrl}Asistencia/fotoalumno?token=${token}&expedienteId=${this.props.student.idExpediente}`;
    console.log('Fetching image:', source);
    return (
      <Image
      key={this.props.student.idExpediente}
      source={{ uri: source }}
      style={{
        width: 300,
        height: 300,
        marginRight: 16,
      }}/>
    );
  }
};

StudentImage.propTypes = propTypes;
