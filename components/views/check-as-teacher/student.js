var React = require('react-native');
var Image = require('react-native-image-progress');
var Progress = require('react-native-progress');
var StudentImage = require('../../elements/student-image');
var CheckButton = require('./student-button');

var {
  View,
  StyleSheet,
  Text,
  Switch,
} = React;

var Student = React.createClass({
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
      <View style={styles.container}>
        <StudentImage student={this.props.student} />
        <View style={styles.rightContainer}>
          <Text style={styles.nameText}>
            {this.props.student.nombre} {this.props.student.apellidoPaterno} {this.props.student.apellidoMaterno}
          </Text>
          <CheckButton student={this.props.student} token={this.props.token} activityId={this.props.activityId} />
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

module.exports = Student;
