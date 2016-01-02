var React = require('react-native');
var UAI = require('../../api/base');
var LoadingView = require('../loading');
var Student = require('./student-tinder');
var clamp = require('clamp');
var MK = require('react-native-material-kit');

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
} = React;

var SWIPE_THRESHOLD = 250;

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
      student: null,
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
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this.goNextStudent();
    this.animateEntrance();
  },

  goNextStudent() {
    let currentStudentIdx = this.state.students.indexOf(this.state.student);
    let newIdx = currentStudentIdx + 1;

    this.setState({
      student: this.state.students[newIdx > this.state.students.length - 1 ? 0 : newIdx],
    });
  },

  animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  },

  render() {
    if (this.state.isLoading) {
      return <LoadingView/>;
    }

    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ['-30deg', '0deg', '30deg']});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
    let scale = enter;

    console.log(scale);

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity};

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity};

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.card, animatedCardStyles]} {...this.panResponder.panHandlers}>
          <Student student={this.state.student} token={this.props.token} activityId={this.props.activityId} />
        </Animated.View>

        <Animated.View style={[styles.nope, animatedNopeStyles]}>
          <Text style={styles.nopeText}>Ausente</Text>
        </Animated.View>

        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <Text style={styles.yupText}>Presente</Text>
        </Animated.View>
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
  card: {
    marginTop: -100,
    width: 300,
    height: 300,
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  },
});

module.exports = CheckAsTeacherTinderView;
