var Progress = require('react-native-progress');
var React = require('react-native');
var theme = require('../styles/theme');

var {
  Text,
  View,
  StyleSheet,
  ActivityIndicatorIOS,
} = React;

var Spinner = React.createClass({
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS
          animating={true}
          style={[]}
          color='black'
        />
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
