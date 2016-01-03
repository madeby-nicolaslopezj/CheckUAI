var React = require('react-native');
var UAI = require('../../api/base');
var LoadingView = require('../loading');
var MK = require('react-native-material-kit');
var theme = require('../../styles/theme');
var Camera = require('react-native-camera');
var RNBlur = require('react-native-blur');
var AppleEasing = require('react-apple-easing');

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
} = React;

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

var CheckAsTeacherStudentView = React.createClass({
  propTypes: {
    sessionId: React.PropTypes.number.isRequired,
    token: React.PropTypes.string.isRequired,
    activityId: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      isLoading: true,
      students: [],
      keyboardHeight: new Animated.Value(0),
    };
  },

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow);
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide);
  },

  keyboardWillShow(e) {
    Animated.timing(this.state.keyboardHeight, {
      toValue: e.endCoordinates.height - 60,
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

  async componentDidMount() {
    try {
      var students = await UAI.getSessionStudents({
        token: this.props.token,
        sessionId: this.props.sessionId,
      });

      this.setState({
        students: students,
        isLoading: false,
      });
    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  },

  render() {
    if (this.state.isLoading) {
      return <LoadingView/>;
    }

    return (
      <Camera type={Camera.constants.Type.front} style={[theme.base.container]}>
        <Animated.View style={[theme.layouts.bottomIndicator, { bottom: this.state.keyboardHeight, marginTop: 20 }]} >
          <BlurView blurType="xlight">
            <View style={theme.layouts.small}>
              <MKTextField
                style={[theme.inputs.textfield]}
                tintColor={MKColor.BlueGrey}
                placeholder="Email"
                floatingLabelEnabled={true}
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}
              />
              <MKTextField
                style={[theme.inputs.textfield]}
                tintColor={MKColor.BlueGrey}
                placeholder="Contraseña"
                floatingLabelEnabled={true}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
              />
            </View>
            <TouchableHighlight
              underlayColor={'transparent'}
              activeOpacity={0.6}
              onPress={() => {
                this.props.navigator.pop();
              }}

              style={[theme.button.touchLight, { marginTop: 10 }]}>
              <View style={[theme.button.base, theme.button.link]}>
                <Text style={[theme.button.content, theme.button.linkContent]}>
                  Salir
                </Text>
              </View>
            </TouchableHighlight>
          </BlurView>
        </Animated.View>
      </Camera>
    );
  },
});

module.exports = CheckAsTeacherStudentView;
