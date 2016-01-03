var Progress = require('react-native-progress');
var React = require('react-native');
var theme = require('../styles/theme');

var {
  View,
  StyleSheet,
} = React;

var LoadingView = React.createClass({
  render() {
    return (
      <View style={theme.base.container}>
        <Progress.Circle size={60} indeterminate={true} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = LoadingView;
