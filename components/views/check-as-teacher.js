'use strict';

var React = require('react-native');
var UAI = require('../api/base');
var Progress = require('react-native-progress');

var {
  StyleSheet,
  Text,
  View,
  AlertIOS
} = React;

var CheckAsTeacherView = React.createClass({
  getInitialState() {
    return {
      isLoading: true,
    };
  },
  componentDidMount: async function() {
    try {
      var students = await UAI.getSessionStudents({
        token: this.props.token,
        sessionId: this.props.sessionId
      });

      this.setState({ students, isLoading: false });
    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  },
  render: function() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Progress.Circle size={60} indeterminate={true} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>Hola</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = CheckAsTeacherView;
