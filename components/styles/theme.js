var React = require('react-native');

var {
  StyleSheet,
} = React;

const STANDARD_PADDING = 20;
const SMALL_CONTAINER_WIDTH = 300;
const MEDIUM_CONTAINER_WIDTH = 450;
const BACKGROUND_COLOR = '#eee';
const PRIMARY_COLOUR = '#000000';

var theme = {
  base: StyleSheet.create({
    background: {
      backgroundColor: BACKGROUND_COLOR,
    },
    container: {
      flex: 1,
      backgroundColor: BACKGROUND_COLOR,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  layouts: StyleSheet.create({
    medium: {
      width: MEDIUM_CONTAINER_WIDTH,
      padding: STANDARD_PADDING,
      backgroundColor: '#ddd',
    },
  }),
  texts: StyleSheet.create({
    center: {
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 20,
      marginTop: 15,
      marginBottom: 15,
    },
  }),
};

module.exports = theme;
