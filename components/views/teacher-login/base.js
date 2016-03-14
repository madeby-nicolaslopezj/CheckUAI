import React from 'react-native';
import UAI from '../../api/base';
import Progress from 'react-native-progress';
import Button from 'react-native-button';
import RNFocal from 'rn-focalpoint';
import layouts from '../../styles/layouts';
import inputs from '../../styles/inputs';
import images from '../../styles/images';
import Switch from './switch';

import {
  MKTextField,
  MKButton,
  MKColor,
} from 'react-native-material-kit';

import cardStyles from '../../styles/card';

var {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Navigator,
} = React;

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: 'jorge.villalon@uai.cl',
      password: '1234',
      rut: '5669371-8',
      isTeacher: true,
    };
  }

  onChange(value) {
    this.setState({ value });
  }

  async onDone() {
    if (this.state.isLoading) return;
    try {
      this.setState({ isLoading: true });

      var token;

      if (this.state.isTeacher) {
        token = await UAI.loginTeacher({
          email: this.state.email,
          password: this.state.password,
        });
      } else {
        token = await UAI.loginColaborator({
          rut: this.state.rut,
        });
      }

      this.props.navigator.push({
        index: 1,
        id: 'teacher-prepare',
        token: token,
        password: this.state.password,
        rut: this.state.rut,
        isTeacher: this.state.isTeacher,
      });

      this.setState({ isLoading: false });
    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  }

  renderRutInput() {
    if (this.state.isTeacher) return;
    return (
      <TextInput
        style={inputs.textfield}
        placeholder='Rut'
        value={this.state.rut}
        onChangeText={(rut) => this.setState({ rut })}
      />
    );
  }

  renderTeacherInputs() {
    if (!this.state.isTeacher) return;
    return (
      <View style={{ height: 200 }}>
        <TextInput
          style={inputs.textfield}
          placeholder='Email'
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={inputs.textfield}
          placeholder='Contraseña'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
      </View>
    );
  }

  renderLogo() {
    return (
      <View style={images.logoContainer}>
        <Image style={images.logo} resizeMode={Image.resizeMode.contain} source={require('../../../assets/logo.png')} />
      </View>
    );
  }

  renderButton() {
    var content = <Text>ENTRAR</Text>;
    if (this.state.isLoading) {
      content = (
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          style={[]}
          color='white'
        />
      );
    }
    return (
      <Text>Button</Text>
    )
    return (
      <MKButton
        backgroundColor={MKColor.BlueGrey}
        shadowRadius={2}
        shadowOpacity={.5}
        shadowColor='black'
        onPress={this.onDone}
        style={[theme.button.base]}>
        {content}
      </MKButton>
    )
  }

  renderForm() {
    return (
      <View>
        <View style={{ padding: 30 }}>
          {this.renderTeacherInputs()}
          {this.renderRutInput()}
          <Switch
            isTrue={this.state.isTeacher}
            onChange={(value) => this.setState({ isTeacher: value })}
            style={{ marginTop: -10, marginBottom: 20 }}
            trueLabel='Profesor'
            falseLabel='Colaborador'
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={layouts.container}>
        <View style={layouts.small}>
          {this.renderLogo()}
          {this.renderForm()}
          {this.renderButton()}
        </View>
      </View>
    );
  }
};
