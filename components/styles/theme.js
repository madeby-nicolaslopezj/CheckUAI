var React = require('react-native');

var {
  StyleSheet,
} = React;

const STANDARD_PADDING = 20;
const SMALL_CONTAINER_WIDTH = 450;
const MEDIUM_CONTAINER_WIDTH = 550;
const BACKGROUND_COLOR = '#f9f9f9';
const PRIMARY_COLOUR = '#000000';
const INPUT_RADIUS = 4;
const INPUT_BACKGROUND_COLOUR = 'white';
const INPUT_BORDER_WIDTH = 1;
const INPUT_BORDER_COLOUR = 'rgba(0, 0, 0, .18)';
const SELECTED_BACKGROUND_COLOR = 'rgba(0, 0, 0, .1)';
const INPUT_FONT_SIZE = 16;
const INPUT_PADDING = 12;

var theme = {
  base: StyleSheet.create({
    background: {
      backgroundColor: BACKGROUND_COLOR,
    },
    container: {
      flex: 1,
      backgroundColor: BACKGROUND_COLOR,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView: {
      flex: 1,
      backgroundColor: BACKGROUND_COLOR,
    },
    scrollViewContent: {
      paddingVertical: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      height: 100,
      width: 300 - 10,
    },
  }),
  layouts: StyleSheet.create({
    small: {
      width: SMALL_CONTAINER_WIDTH,

      //backgroundColor: '#ddd',
    },
    medium: {
      width: MEDIUM_CONTAINER_WIDTH,

      //backgroundColor: '#ddd',
    },
    row: {
      flexDirection: 'row',
    },

    col: {
      flex: 1,
    },

    bottomIndicator: {
      position: 'absolute',
      right: 0,
      left: 0,
      bottom: 20,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  texts: StyleSheet.create({
    center: {
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 20,
      marginBottom: 15,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    normal: {
      fontSize: 16,
      fontFamily: 'Roboto',
    },
  }),
  inputGroup: StyleSheet.create({
    container: {
      borderRadius: INPUT_RADIUS,
      borderWidth: INPUT_BORDER_WIDTH,
      borderColor: INPUT_BORDER_COLOUR,
      backgroundColor: INPUT_BACKGROUND_COLOUR,
      marginBottom: 15,
    },
    top: {
      borderTopLeftRadius: INPUT_RADIUS,
      borderTopRightRadius: INPUT_RADIUS,
    },
    bottom: {
      borderBottomLeftRadius: INPUT_RADIUS,
      borderBottomRightRadius: INPUT_RADIUS,
    },
    seperator: {
      borderBottomWidth: INPUT_BORDER_WIDTH,
      borderBottomColor: '#E5E5E5',
    },
    select: {
      padding: 15,
    },
    selectSelected: {
      backgroundColor: SELECTED_BACKGROUND_COLOR,
    },
    selectText: {
      fontFamily: 'Roboto',
      fontSize: 18,
      flex: 1,
      paddingTop: 7,
      paddingBottom: 7,
      marginBottom: 10,
    },
  }),
  button: StyleSheet.create({
    base: {
      height: 42,
      padding: INPUT_PADDING,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
    },
  }),
  inputs: StyleSheet.create({
    textfield: {
      height: 42,
      marginTop: 0,
      marginBottom: 30,
    },
  }),
  camera: StyleSheet.create({
    container: {
      width: SMALL_CONTAINER_WIDTH,
      height: SMALL_CONTAINER_WIDTH * 1.3,
    },
  }),
};

module.exports = theme;
