import React from 'react'
var Progress = require('react-native-progress');
import layouts from '../styles/layouts';

import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

var LoadingView = React.createClass({
  render() {
    return (
      <View style={layouts.centerContainer}>
        <ActivityIndicator
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
