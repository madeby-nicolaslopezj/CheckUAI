'use strict';

var React = require('react-native');
var UAI = require('../api/base');
var TeacherPrepareView = require('./teacher-prepare');
var Progress = require('react-native-progress');
var Button = require('react-native-button');
var t = require('tcomb-form-native');
var Form = t.form.Form;

var {
  StyleSheet,
  Text,
  View,
  AlertIOS
} = React;

var TeacherLoginModel = t.struct({
  email: t.String,              // a required string
  password: t.String,  // an optional string
});

var options = {
  fields: {
    email: {
      label: 'Email',
      placeholder: 'Email'
    },
    password: {
      label: 'Contraseña',
      placeholder: 'Contraseña'
    }
  }
};

var TeacherLoginView = React.createClass({
  getInitialState() {
    return {
      isLoading: false,
      value: {
        email: 'jorge.villalon@uai.cl',
        password: '1234'
      }
    };
  },
  onChange(value) {
    this.setState({value});
  },
  onPress: async function() {
    try {
      this.setState({ isLoading: true });

      var token = await UAI.loginTeacher({
        email: this.state.value.email,
        password: this.state.value.password
      });

      this.props.navigator.push({
        title: 'Teacher Prepare',
        component: TeacherPrepareView,
        passProps: {
          token: token
        }
      });

      this.setState({ isLoading: false });
    } catch(error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  },
  render() {
    var loadingOrButton;
    if (this.state.isLoading) {
      loadingOrButton = <View style={styles.loadingContainer}><Progress.Bar indeterminate={true} width={200} /></View>
    } else {
      loadingOrButton = <Button onPress={this.onPress}>Entrar</Button>
    }
    return (
      <View style={styles.container}>
        <Text style={styles.textTopForm}>Profesor Titular</Text>
        <Form
          ref="form"
          type={TeacherLoginModel}
          options={options}
          value={this.state.value}
          onChange={this.onChange}
          />
        {loadingOrButton}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  container: {
    justifyContent: 'center',
    padding: 20,
    marginTop: 50,
    marginRight: 200,
    marginLeft: 200,
  },
  button: {
    marginTop: 100
  },
  textTopForm: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
  }
});


module.exports = TeacherLoginView;
