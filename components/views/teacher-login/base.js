import React from 'react'
import UAI from '../../api/base';
import Progress from 'react-native-progress';
import Button from 'react-native-button';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Switch from './switch';
import layouts from '../../styles/layouts';
import inputs from '../../styles/inputs';
import buttons from '../../styles/buttons';
import images from '../../styles/images';
import texts from '../../styles/texts';


import {
  MKTextField,
  MKButton,
  MKColor,
} from 'react-native-material-kit';

import cardStyles from '../../styles/card';

import imageTest from './image.js';
import image2Test from './image2.js';

import {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  Navigator,
  NativeModules,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';

var {
  FaceDetector,
} = NativeModules;

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: this.props.debug ? 'jorge.villalon@uai.cl' : '',
      password: this.props.debug ? '1234' : '',
      rut: this.props.debug ? '5669371-8' : '',
      isTeacher: true,
      fadeAnim: new Animated.Value(0)
    };

    setTimeout(() => {
      if (this.props.debug) {
        //This.onDone();
      }
    }, 100);
  }

  onChange(value) {
    this.setState({ value });
  }

  openSettings() {
    this.props.navigator.push({
      index: 1,
      id: 'settings',
    });
  }

  async onDone() {
    if (this.state.isLoading) return;
    try {
      this.setState({ isLoading: true });

      var token;

      if (this.state.email == 'settings' && this.state.password == 'react') {
        this.openSettings();
        this.setState({ isLoading: false });
        return;
      } else if (this.state.isTeacher) {
        token = await UAI.loginTeacher({
          email: this.state.email,
          password: this.state.password,
        });
      } else {
        token = await UAI.loginColaborator({
          rut: this.state.rut,
          password: this.state.password,
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

      setTimeout(() => {
        if (this.props.debug) {
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
            rut: '',
            email: '',
            password: '',
          });
        }
      }, 500);

    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  }

  renderRutInput() {
    if (this.state.isTeacher) return;
    return (
      <View>
        <MKTextField
          style={inputs.textfield}
          highlightColor={MKColor.BlueGrey}
          placeholder='Rut'
          value={this.state.rut}
          onChangeText={(rut) => this.setState({ rut })}
        />
        <MKTextField
          style={inputs.textfield}
          placeholder='Contraseña'
          highlightColor={MKColor.BlueGrey}
          password
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
      </View>
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
          password
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
        <ActivityIndicator
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

  async componentDidMount() {
    await sleep(200);
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 600,
      },
    ).start();
  }

  render () {
    return (
      <View style={layouts.centerContainer}>
        <StatusBar backgroundColor='white' barStyle='default' />
        <Row>
          <Col smOffset={1} sm={10} mdOffset={3} md={6} lgOffset={4} lg={4}>
            <Animated.View style={{ opacity: this.state.fadeAnim }}>
              {this.renderLogo()}
              {this.renderForm()}
              {this.renderButton()}
            </Animated.View>
          </Col>
        </Row>
      </View>
    )
  }
}
