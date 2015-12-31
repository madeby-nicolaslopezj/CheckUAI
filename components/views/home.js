var React = require('react-native');
var Button = require('react-native-button');
var TeacherLoginView = require('./teacher-login');
var UAI = require('../api/base');

var {
  StyleSheet,
  Text,
  View,
  Platform,
} = React;

var HomeView = React.createClass({
  componentDidMount: async function() {
    setTimeout(() => {
      //this.handlePress();
    }, 200);
  },

  handlePress: function(event) {
    this.props.navigator.push({
      title: 'Teacher Login',
      component: TeacherLoginView,
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Universidad Adolfo Ibañez
        </Text>
        <Button style={styles.button} onPress={this.handlePress}>
          Universidad Adolfo Ibañez
        </Button>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,

    //justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
    color: '#000000',
  },
  button: {
    marginTop: 100,
  },
});

module.exports = HomeView;
