var Progress = require('react-native-progress');
var React = require('react-native');
var theme = require('../styles/theme');

var {
  Text,
  View,
  StyleSheet,
} = React;

var Spinner = React.createClass({
  render() {
    //<Progress.CircleSnail size={30} indeterminate={true} />
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading..</Text>
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
