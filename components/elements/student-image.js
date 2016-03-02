var React = require('react-native');
var Image = require('react-native-image-progress');
var Progress = require('react-native-progress');
var UAI = require('../api/base');

var {
  View,
  StyleSheet,
  Text,
} = React;

var StudentImage = React.createClass({
  propTypes: {
    token: React.PropTypes.string.isRequired,
    student: React.PropTypes.object.isRequired,
  },

  componentWillReceiveProps: function(nextProps) {
    this.forceUpdate();
  },

  render() {
    var token = encodeURIComponent(this.props.token);
    var source = `${UAI.BaseUrl}Asistencia/fotoalumno?token=${token}&expedienteId=${this.props.student.idExpediente}`;

    console.log('Fetch student image', source);
    return (
      <Image
      key={this.props.student.idExpediente}
      source={{ uri: source }}
      indicator={Progress.CircleSnail}
      style={{
        width: 300,
        height: 300,
        marginRight: 16,
      }}/>
    );
  },
});

module.exports = StudentImage;
