import React from 'react'
var Progress = require('react-native-progress');
var theme = require('../styles/theme');

import {
  Text,
  View,
  StyleSheet,
  ActivityIndicatorIOS,
} from 'react-native';

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
