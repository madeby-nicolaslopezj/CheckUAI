import React from 'react-native';
import UAI from '../../api/base';
import Progress from 'react-native-progress';
import Button from 'react-native-button';
import RNFocal from 'rn-focalpoint';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Switch from './switch';
import layouts from '../../styles/layouts';
import inputs from '../../styles/inputs';
import buttons from '../../styles/buttons';
import images from '../../styles/images';

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
      email: this.props.debug ? 'jorge.villalon@uai.cl' : '',
      password: this.props.debug ? '1234' : '',
      rut: this.props.debug ? '5669371-8' : '',
      isTeacher: true,
    };

    setTimeout(() => {
      if (this.props.debug) {
        this.onDone();
      }
    }, 100);
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
      <MKTextField
        style={inputs.textfield}
        highlightColor={MKColor.BlueGrey}
        placeholder='Rut'
        value={this.state.rut}
        onChangeText={(rut) => this.setState({ rut })}
      />
    );
  }

  renderTeacherInputs() {
    if (!this.state.isTeacher) return;
    return (
      <View>
        <MKTextField
          style={inputs.textfield}
          highlightColor={MKColor.BlueGrey}
          placeholder='Email'
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <MKTextField
          style={inputs.textfield}
          placeholder='Contraseña'
          highlightColor={MKColor.BlueGrey}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
      </View>
    );
  }

  renderLogo() {
    return (
      <Row>
        <Col smOffset={1} sm={10} mdOffset={1} md={10} lgOffset={0} lg={12}>
          <View style={images.logoContainer}>
            <Image style={images.logo} resizeMode={Image.resizeMode.contain} source={require('../../../assets/logo.png')} />
          </View>
        </Col>
      </Row>
    );
  }

  renderButton() {
    var content = <Text style={buttons.text}>ENTRAR</Text>;
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
      <MKButton
        backgroundColor={MKColor.BlueGrey}
        shadowRadius={2}
        shadowOpacity={.5}
        shadowColor='black'
        onPress={this.onDone.bind(this)}
        style={buttons.login}>
        {content}
      </MKButton>
    )
  }

  renderForm() {
    return (
      <View>
        <View style={{ height: 150 }}>
          {this.renderTeacherInputs()}
          {this.renderRutInput()}
        </View>
        <Switch
          isTrue={this.state.isTeacher}
          onChange={(value) => this.setState({ isTeacher: value })}
          style={{ marginBottom: 30 }}
          trueLabel='Profesor'
          falseLabel='Colaborador'
        />
      </View>
    );
  }

  render() {
    return (
      <View style={layouts.centerContainer}>
        <Row>
          <Col smOffset={1} sm={10} mdOffset={3} md={6} lgOffset={4} lg={4}>
            {this.renderLogo()}
            {this.renderForm()}
            {this.renderButton()}
          </Col>
        </Row>
      </View>
    );
  }
};
