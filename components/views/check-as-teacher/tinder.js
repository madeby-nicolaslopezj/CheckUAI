var React = require('react-native');
var UAI = require('../../api/base');
var LoadingView = require('../loading');
var Student = require('./student-tinder');
var clamp = require('clamp');
var MK = require('react-native-material-kit');
var theme = require('../../styles/theme');

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
  TouchableHighlight,
} = React;

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

var SWIPE_THRESHOLD = 200;

var CheckAsTeacherTinderView = React.createClass({
  propTypes: {
    sessionId: React.PropTypes.number.isRequired,
    token: React.PropTypes.string.isRequired,
    activityId: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      isLoading: true,
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(1),
      students: [],
      yesStudents: [],
      noStudents: [],
      pendingStudents: [],
      student: null,
      ready: false,
    };
  },

  componentDidMount: async function() {
    try {
      var students = await UAI.getSessionStudents({
        token: this.props.token,
        sessionId: this.props.sessionId,
      });

      this.setState({
        students: students,
        pendingStudents: students,
        student: students[0],
      });

      this.panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (e, gestureState) => {
          this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
          this.state.pan.setValue({x: 0, y: 0});
        },

        onPanResponderMove: Animated.event([
          null, {dx: this.state.pan.x, dy: this.state.pan.y},
        ]),

        onPanResponderRelease: (e, {vx, vy}) => {
          this.state.pan.flattenOffset();
          var velocity;

          if (vx >= 0) {
            velocity = clamp(vx, 3, 5);
          } else if (vx < 0) {
            velocity = clamp(vx * -1, 3, 5) * -1;
          }

          if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
            Animated.decay(this.state.pan, {
              velocity: {x: velocity, y: vy},
              deceleration: 0.98,
            }).start(this.resetState);
            this.markAssistance(this.state.pan.x._value > 0);
          } else {
            Animated.spring(this.state.pan, {
              toValue: {x: 0, y: 0},
              friction: 4,
            }).start();
          }
        },
      });

      this.setState({
        isLoading: false,
      });
    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  },

  resetState() {
    this.goNextStudent();
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this.animateEntrance();
  },

  goNextStudent() {
    this.state.pendingStudents.shift();
    this.setState({ pendingStudents: this.state.pendingStudents });

    if (this.state.pendingStudents.length > 0) {
      this.setState({
        student: this.state.pendingStudents[0],
      });
    } else {
      this.setState({
        ready: true,
      });
    }
  },

  animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  },

  async pressNo() {
    Animated.spring(this.state.pan, {
      toValue: {x: -400, y: 0},
      velocity: 1,
      friction: 4,
    }).start();
    await sleep(300);
    this.markAssistance(false);
    this.resetState();
  },

  async pressYes() {
    Animated.spring(this.state.pan, {
      toValue: {x: 400, y: 0},
      velocity: 1,
      friction: 4,
    }).start();
    await sleep(300);
    this.markAssistance(true);
    this.resetState();
  },

  async markAssistance(assist) {
    if (assist) {
      this.setState({ yesStudents: this.state.yesStudents.concat([this.state.student]) });
      var response = await UAI.markStudentAssistance({
        studentId: this.state.student.idExpediente,
        token: this.props.token,
        activityId: this.props.activityId,
      });
    } else {
      this.setState({ noStudents: this.state.noStudents.concat([this.state.student]) });
    }
  },

  renderCount(num, word) {
    return `${num} ${word}${num != 1 ? 's' : ''}`;
  },

  render() {
    if (this.state.isLoading) {
      return <LoadingView/>;
    }

    if (this.state.ready) {
      return (
        <View style={theme.base.container}>
          <Text style={[theme.texts.subtitle, { marginBottom: 20 }]}>
            {this.state.yesStudents.length} asistentes - {this.state.noStudents.length} ausentes
          </Text>
          <MKButton
            backgroundColor={MKColor.BlueGrey}
            shadowRadius={2}
            shadowOpacity={.5}
            shadowColor="black"
            onPress={() => {
              this.props.navigator.pop();
            }}

            style={[theme.button.base]}
            >
            <Text pointerEvents="none" style={[theme.button.text]}>
              TERMINAR
            </Text>
          </MKButton>
        </View>
      );
    }

    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ['-30deg', '0deg', '30deg']});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    var {height, width} = Dimensions.get('window');
    let offsetTop = height / 2;

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [1, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [1, 1.2], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity, top: offsetTop};

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 1]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1.2, 1], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity, top: offsetTop};

    return (
      <View style={theme.base.container}>
        <Animated.View style={[styles.card, animatedCardStyles]} {...this.panResponder.panHandlers}>
          <Student student={this.state.student} token={this.props.token} activityId={this.props.activityId} />
        </Animated.View>

        <Animated.View style={[styles.nope, animatedNopeStyles]}>
          <MKButton
            backgroundColor={MKColor.Red}
            shadowRadius={2}
            shadowOpacity={.5}
            shadowColor="black"
            onPress={this.pressNo}
            style={[theme.button.base]}
            >
            <Text pointerEvents="none" style={[theme.button.text]}>
              AUSENTE
            </Text>
          </MKButton>
        </Animated.View>

        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <MKButton
            backgroundColor={MKColor.Green}
            shadowRadius={2}
            shadowOpacity={.5}
            shadowColor="black"
            onPress={this.pressYes}
            style={[theme.button.base]}
            >
            <Text pointerEvents="none" style={[theme.button.text]}>
              PRESENTE
            </Text>
          </MKButton>
        </Animated.View>

        <View style={[styles.bottomIndicator]}>
          <Text style={theme.texts.normal}>
            {this.renderCount(this.state.yesStudents.length, 'presente')} - {this.renderCount(this.state.noStudents.length, 'ausente')} - {this.renderCount(this.state.pendingStudents.length, 'pendiente')}
          </Text>
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
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  card: {
    marginTop: -100,
    width: 300,
    height: 300,
  },
  yup: {
    position: 'absolute',
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    position: 'absolute',
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  },
});

module.exports = CheckAsTeacherTinderView;
