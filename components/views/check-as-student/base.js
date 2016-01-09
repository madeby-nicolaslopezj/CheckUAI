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

var CheckAsTeacherStudentView = React.createClass({
  propTypes: {
    sessionId: React.PropTypes.number.isRequired,
    token: React.PropTypes.string.isRequired,
    activityId: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    isTeacher: React.PropTypes.bool.isRequired,
    rut: React.PropTypes.string,
  },

  getInitialState() {
    return {
      isLoading: false,
      keyboardHeight: new Animated.Value(0),
      photo: null,
    };
  },

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow);
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide);
  },

  keyboardWillShow(e) {
    Animated.timing(this.state.keyboardHeight, {
      toValue: e.endCoordinates.height - 5,
      duration: 250,
      easing: AppleEasing.easeOut,
    }).start();
  },

  keyboardWillHide(e) {
    Animated.timing(this.state.keyboardHeight, {
      toValue: 0,
      duration: 250,
      easing: AppleEasing.easeOut,
    }).start();
  },

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
    ]);
  },

  async check() {
    var data = this.refs.camera.capture({ rotation: 270 }, async (error, base64) => {
      if (!error) {
        this.setState({ photo: base64, isLoading: true });

        var success = await UAI.markManualStudentAssistance({
          assist: true,
          token: this.props.token,
          activityId: this.props.activityId,
          sessionId: this.props.sessionId,
          email: this.state.email,
          password: this.state.password,
          photo: base64,
        });

        if (success) {
          this.setState({ photo: null, isLoading: false, email: '', password: '' });
        } else {
          this.setState({ photo: null, isLoading: false });
        }
      }
    });
  },

  renderPhoto() {
    if (!this.state.photo) return null;

    return <Image source={{ isStatic: true, uri: `data:image/jpeg;base64,${this.state.photo}` }} style={[theme.base.container, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]} />;
  },

  render() {
    return (
      <View style={[theme.base.container, { backgroundColor: 'transparent' }]}>
        <Camera ref="camera" captureTarget={Camera.constants.CaptureTarget.memory} type={Camera.constants.Type.front} style={[theme.base.container, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>
          <Text></Text>
        </Camera>
        {this.renderPhoto()}
        <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>
          <Animated.View style={[theme.layouts.bottomIndicator, { bottom: this.state.keyboardHeight, padding: 0 }]}>
            <BlurView blurType="xlight" style={[theme.layouts.bottomIndicator, { bottom: 0, paddingLeft: 0, paddingRight: 0 }]}>
              <View style={[theme.layouts.row]}>
                <View style={[theme.layouts.col, theme.layouts.center]}>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    activeOpacity={0.6}
                    onPress={this.goBack}
                    style={[theme.button.touchLight, { marginTop: 10 }]}>
                    <View style={[theme.button.base, theme.button.link]}>
                      <Icon style={[theme.button.content, theme.button.linkContent]} name="close" size={30} color="#333" />
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={[theme.layouts.small]}>
                  <MKTextField
                    style={[theme.inputs.textfield]}
                    tintColor={MKColor.BlueGrey}
                    placeholder="Email"
                    floatingLabelEnabled={true}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                  />
                  <MKTextField
                    style={[theme.inputs.textfield]}
                    tintColor={MKColor.BlueGrey}
                    placeholder="Contraseña"
                    floatingLabelEnabled={true}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                  />
                </View>
                <View style={[theme.layouts.col, theme.layouts.center]}>
                  {
                    (this.state.isLoading) ?
                    <Spinner /> :
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      activeOpacity={0.6}
                      onPress={this.check}
                      style={[theme.button.touchLight, { marginTop: 10 }]}>
                      <View style={[theme.button.base, theme.button.link]}>
                        <Icon style={[theme.button.content, theme.button.linkContent]} name="check" size={30} color="#333" />
                      </View>
                    </TouchableHighlight>
                  }
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </View>
      </View>
    );
  },
});

module.exports = CheckAsTeacherStudentView;
