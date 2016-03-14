var Progress = require('react-native-progress');
var React = require('react-native');
import layouts from '../styles/layouts';

var {
  View,
  StyleSheet,
  ActivityIndicatorIOS,
} = React;

var LoadingView = React.createClass({
  render() {
    return (
      <View style={layouts.centerContainer}>
        <ActivityIndicatorIOS
          animating={true}
          style={[]}
          color='white'
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
  },
});

module.exports = LoadingView;
