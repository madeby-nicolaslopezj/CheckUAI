var React = require('react-native');
var UAI = require('../../api/base');

var {
  View,
  StyleSheet,
  Text,
  Switch,
} = React;

var CheckButton = React.createClass({
  propTypes: {
    student: React.PropTypes.object.isRequired,
    token: React.PropTypes.string.isRequired,
    activityId: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      checked: false,
      isLoading: false,
    };
  },

  async onSwichChange(checked) {
    this.setState({ isLoading: true });
    var response = await UAI.markStudentAssistance({
      studentId: this.props.student.idExpediente,
      token: this.props.token,
      activityId: this.props.activityId,
    });
    this.setState({ checked: true, isLoading: false });
  },

  render: function() {
    var loading = null;
    if (this.state.isLoading) {
      loading = <Text>Loading</Text>;
    }

    return (
      <View>
        <Switch value={this.state.checked} disabled={this.state.checked} onValueChange={this.onSwichChange}/>
        {loading}
      </View>
    );
  },
});

var styles = StyleSheet.create({

});

module.exports = CheckButton;
