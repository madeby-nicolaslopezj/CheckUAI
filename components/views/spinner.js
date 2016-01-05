var Progress = require('react-native-progress');
var React = require('react-native');
var theme = require('../styles/theme');

var {
  View,
  StyleSheet,
} = React;

var Spinner = React.createClass({
  render() {
    return (
      <View style={styles.loadingContainer}>
        <Progress.CircleSnail size={30} indeterminate={true} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

module.exports = Spinner;
