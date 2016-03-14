'use strict';

import React from 'react-native';
const {
  StyleSheet,
} = React;

const STANDARD_PADDING = 16;
const HALF_STANDARD_PADDING = STANDARD_PADDING / 2;
const FORM_WIDTH = 300;
const STANDARD_SPACE_TOP = 60;
const INPUT_PADDING = 12;
const INPUT_FONT_SIZE = 16;
const INPUT_RADIUS = 4;
const INPUT_BACKGROUND_COLOUR = 'grey';
const INPUT_BORDER_WIDTH = 1;
const INPUT_BORDER_COLOUR = 'rgba(0, 0, 0, .18)';
const BACKGROUND_COLOR = '#eee';
const PRIMARY_COLOUR = '#000000';
const SECONDARY_COLOUR = '#000000';

export default {
  main: StyleSheet.create({
    background: {
      backgroundColor: BACKGROUND_COLOR,
    },
    spaceTop: {
      marginTop: STANDARD_SPACE_TOP,
    },
  }),
  input: StyleSheet.create({
    text: {
      height: 45,
      padding: INPUT_PADDING,
      fontSize: INPUT_FONT_SIZE,
      backgroundColor: INPUT_BACKGROUND_COLOUR,
      borderRadius: INPUT_RADIUS,
      borderColor: INPUT_BORDER_COLOUR,
      borderWidth: INPUT_BORDER_WIDTH,
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
    secondary: {
      backgroundColor: SECONDARY_COLOUR,
      borderColor: SECONDARY_COLOUR,
    },
  }),
  vgroup: StyleSheet.create({
    form: {
      borderRadius: INPUT_RADIUS,
      borderWidth: INPUT_BORDER_WIDTH,
      borderColor: INPUT_BORDER_COLOUR,
      backgroundColor: INPUT_BACKGROUND_COLOUR,
      width: FORM_WIDTH,
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
    input: {
      borderWidth: 0,
    },
  }),
  login: StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      padding: STANDARD_PADDING,
      backgroundColor: BACKGROUND_COLOR,
    },
    logoContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: FORM_WIDTH - 10,
    },
    text: {
      color: 'black',
    },
    strong: {
      fontWeight: 'bold',
    },
    form: {
      alignItems: 'center',
    },
    loginButton: {
      marginTop: HALF_STANDARD_PADDING,
      width: FORM_WIDTH,
    },
    loading: {
      height: 40,
      top: 1,
      right: STANDARD_PADDING,
      position: 'absolute',
    },
    toolbox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    options: {
      flex: 1,
      flexDirection: 'column',
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 16,
    },
  }),
};
