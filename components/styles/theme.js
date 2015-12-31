var React = require('react-native');

var {
  StyleSheet,
} = React;

const STANDARD_PADDING = 20;
const SMALL_CONTAINER_WIDTH = 300;
const MEDIUM_CONTAINER_WIDTH = 450;
const BACKGROUND_COLOR = '#eee';
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
      flexDirection: 'row',
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
  }),
  layouts: StyleSheet.create({
    medium: {
      width: MEDIUM_CONTAINER_WIDTH,

      //backgroundColor: '#ddd',
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
  inputGroup: StyleSheet.create({
    container: {
      borderRadius: INPUT_RADIUS,
      borderWidth: INPUT_BORDER_WIDTH,
      borderColor: INPUT_BORDER_COLOUR,
      backgroundColor: INPUT_BACKGROUND_COLOUR,
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
      fontSize: INPUT_FONT_SIZE,
    },
  }),
  button: StyleSheet.create({
    touch: {
      borderRadius: INPUT_RADIUS,
    },
    base: {
      height: 42,
      padding: INPUT_PADDING,
      borderRadius: INPUT_RADIUS,
      borderWidth: INPUT_BORDER_WIDTH,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      fontSize: INPUT_FONT_SIZE,
    },
    primary: {
      backgroundColor: PRIMARY_COLOUR,
      borderColor: PRIMARY_COLOUR,
    },
    primaryContent: {
      color: 'white',
    },
  }),
};

module.exports = theme;
