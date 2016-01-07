var React = require('react-native');
var Image = require('react-native-image-progress');
var Progress = require('react-native-progress');
var StudentImage = require('../../elements/student-image');
var CheckButton = require('./student-button');
var theme = require('../../styles/theme');
var MK = require('react-native-material-kit');

var {
  MKCardStyles,
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

var StudentTinder = React.createClass({
  propTypes: {
    student: React.PropTypes.object.isRequired,
    token: React.PropTypes.string.isRequired,
    activityId: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {};
  },

  render: function() {
    return (
      <View style={[MKCardStyles.card]}>
        <StudentImage student={this.props.student} token={this.props.token} />
        <View style={{ padding: 30 }}>
          <Text style={[theme.texts.subtitle, { marginBottom: 0 }]}>
            {this.props.student.apellidoPaterno} {this.props.student.apellidoMaterno}
          </Text>
          <Text style={[theme.texts.subtitle, { marginBottom: 0, marginTop: 10, fontWeight: 'normal' }]}>
            {this.props.student.nombre}
          </Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row',
  },
  rightContainer: {
    flex: 1,
  },
  nameText: {

  },
});

module.exports = StudentTinder;
