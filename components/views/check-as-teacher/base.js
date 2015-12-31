var React = require('react-native');
var UAI = require('../../api/base');
var LoadingView = require('../loading');
var Student = require('./student');

var {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  ListView,
} = React;

var CheckAsTeacherView = React.createClass({
  propTypes: {
    sessionId: React.PropTypes.number.isRequired,
    token: React.PropTypes.string.isRequired,
    activityId: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      isLoading: true,
      studentsDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: async function() {
    try {
      var students = await UAI.getSessionStudents({
        token: this.props.token,
        sessionId: this.props.sessionId,
      });

      this.setState({
        isLoading: false,
        studentsDataSource: this.state.studentsDataSource.cloneWithRows(students),
      });
    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  },

  renderStudent(student) {
    return <Student student={student} token={this.props.token} activityId={this.props.activityId} key={student.idExpediente} />;
  },

  render() {
    if (this.state.isLoading) {
      return <LoadingView/>;
    }

    return (
      <ListView
        dataSource={this.state.studentsDataSource}
        renderRow={this.renderStudent}
        style={styles.listView}
      />
    );
  },
});

var styles = StyleSheet.create({
  listView: {
    backgroundColor: '#bbbbbb',
    paddingTop: 64,
  },
  scrollViewContentContainer: {

  },
});

module.exports = CheckAsTeacherView;
