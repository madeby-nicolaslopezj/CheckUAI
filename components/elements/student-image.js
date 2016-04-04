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
    this.state = {};
    this.setSource();
  }

  componentWillReceiveProps() {
    this.setSource();
  }

  async setSource() {
    var token = encodeURIComponent(this.props.token);
    const baseUrl = await getSetting('apiUrl');
    var source = `${baseUrl}Asistencia/fotoalumno?token=${token}&expedienteId=${this.props.student.idExpediente}`;
    console.log('Fetching image:', source);
    this.setState({source});
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
  }

  render() {
    if (!this.state.source) return <View></View>;
    return (
      <Image
      key={this.props.student.idExpediente}
      source={{ uri: this.state.source }}
      style={{
        width: 300,
        height: 300,
        marginRight: 16,
      }}/>
    );
  }
};

StudentImage.propTypes = propTypes;
