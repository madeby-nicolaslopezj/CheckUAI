var React = require('react-native');
var UAI = require('../../api/base');
var LoadingView = require('../loading');
var MK = require('react-native-material-kit');
var theme = require('../../styles/theme');
var Camera = require('react-native-camera');
var RNBlur = require('react-native-blur');
var AppleEasing = require('react-apple-easing');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Orientation = require('react-native-orientation');
var Spinner = require('../spinner');
import Toast from '@remobile/react-native-toast';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import layouts from '../../styles/layouts';
import inputs from '../../styles/inputs';
import buttons from '../../styles/buttons';
import images from '../../styles/images';
import texts from '../../styles/texts';

var {
  BlurView,
  VibrancyView,
} = RNBlur;

var {
  MKCardStyles,
  MKTextField,
  MKButton,
  MKColor,
} = MK;

var {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  ListView,
  Animated,
  Component,
  PanResponder,
  Dimensions,
  DeviceEventEmitter,
  TouchableHighlight,
  Easing,
  NativeModules,
  Image,
} = React;

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

const propTypes = {
  sessionId: React.PropTypes.number.isRequired,
  token: React.PropTypes.string.isRequired,
  activityId: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  isTeacher: React.PropTypes.bool.isRequired,
  rut: React.PropTypes.string,
};

export default class CheckAsTeacherStudentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      keyboardHeight: new Animated.Value(0),
      photo: null,
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow(e) {
    Animated.timing(this.state.keyboardHeight, {
      toValue: e.endCoordinates.height - 5,
      duration: 250,
      easing: AppleEasing.easeOut,
    }).start();
  }

  keyboardWillHide(e) {
    Animated.timing(this.state.keyboardHeight, {
      toValue: 0,
      duration: 250,
      easing: AppleEasing.easeOut,
    }).start();
  }

  goBack() {
    var text = this.props.isTeacher ? 'Introduce la contraseña' : 'Introduce el Rut';
    AlertIOS.prompt(text, null, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', type: 'secure-text', onPress: (text) => {
        if (this.props.isTeacher && text == this.props.password) {
          this.props.navigator.pop();
        } else if (!this.props.isTeacher && text == this.props.rut) {
          this.props.navigator.pop();
        } else {
          var text = this.props.isTeacher ? 'Contraseña incorrecta' : 'Rut incorrecto';
          AlertIOS.alert(text, null, [{ text: 'Ok', style: 'cancel' }]);
        }
      }, },
    ], 'secure-text');
  }

  async check() {
    this.setState({ isLoading: true });
    var response = await UAI.markManualStudentAssistance({
      assist: true,
      token: this.props.token,
      activityId: this.props.activityId,
      sessionId: this.props.sessionId,
      email: this.state.email,
      password: this.state.password,
      photo: this.state.photo,
    });

    if (response.respuesta == 'OK') {
      this.setState({ photo: null, isLoading: false, email: '', password: '' });
      Toast.showShortCenter('Asistencia marcada');
    } else {
      this.setState({ photo: null, isLoading: false });
      Toast.showShortCenter(`Error: ${response.respuesta}`);
    }
  }

  async photo() {
    var data = this.refs.camera.capture({ rotation: 270 }, async (error, base64) => {
      if (!error) {
        this.setState({ photo: base64 });
      }
    });
  }

  cancelPhoto() {
    this.setState({ photo: null });
  }

  renderPhoto() {
    if (!this.state.photo) return null;
    return <Image source={{ isStatic: true, uri: `data:image/jpeg;base64,${this.state.photo}` }} style={[layouts.centerContainer, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]} />;
  }

  renderActionButton() {
    if (this.state.photo) {
      return (
        <View>
          <TouchableHighlight
            underlayColor={'transparent'}
            activeOpacity={0.6}
            onPress={this.cancelPhoto.bind(this)}
            style={{ marginBottom: 10 }}>
            <View>
              <Icon name='replay' size={30} color='#333' />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'transparent'}
            activeOpacity={0.6}
            onPress={this.check.bind(this)}
            style={{ marginTop: 10 }}>
            <View>
              <Icon name='check' size={30} color='#333' />
            </View>
          </TouchableHighlight>
        </View>
      )
    }

    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        activeOpacity={0.6}
        onPress={this.photo.bind(this)}
        style={{ marginTop: 10 }}>
        <View>
          <Icon name='photo-camera' size={30} color='#333' />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={[layouts.centerContainer, { backgroundColor: 'transparent' }]}>
        <Camera ref='camera' captureTarget={Camera.constants.CaptureTarget.memory} type={Camera.constants.Type.front} style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>
          <Text></Text>
        </Camera>
        {this.renderPhoto()}
        <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>
          <Animated.View style={[layouts.bottomIndicator, { bottom: this.state.keyboardHeight, padding: 0 }]}>
            <BlurView blurType='xlight' style={[layouts.bottomIndicator, { bottom: 0, paddingLeft: 0, paddingRight: 0 }]}>
              <View style={[layouts.row]}>
                <View style={[{ flex: 0.2 }, layouts.center]}>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    activeOpacity={0.6}
                    onPress={this.goBack.bind(this)}
                    style={{ marginTop: 10 }}>
                    <View>
                      <Icon name='close' size={30} color='#333' />
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={{ flex: 0.6 }}>
                  <MKTextField
                    style={inputs.textfield}
                    tintColor={MKColor.BlueGrey}
                    placeholder='Email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    autoCorrect={false}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                  />
                  <MKTextField
                    style={inputs.textfield}
                    tintColor={MKColor.BlueGrey}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                  />
                </View>
                <View style={[{ flex: 0.2 }, layouts.center]}>
                  {
                    (this.state.isLoading) ?
                    <Spinner /> :
                    this.renderActionButton()
                  }
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </View>
      </View>
    );
  }
};
