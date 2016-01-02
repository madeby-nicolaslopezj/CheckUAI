var React = require('react-native');
var UAI = require('../api/base');
var Progress = require('react-native-progress');
var Button = require('react-native-button');
var RNFocal = require('rn-focalpoint');
var theme = require('../styles/theme');
const MK = require('react-native-material-kit');

const {
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
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Navigator,
} = React;

var TeacherLoginView = React.createClass({
  componentDidMount: function() {
    setTimeout(() => {
      this.onDone();
    }, 100);
  },

  getInitialState() {
    return {
      isLoading: false,
      email: 'jorge.villalon@uai.cl',
      password: '1234',
    };
  },

  onChange(value) {
    this.setState({value});
  },

  async onDone() {
    if (this.state.isLoading) return;
    try {
      this.setState({ isLoading: true });

      var token = await UAI.loginTeacher({
        email: this.state.email,
        password: this.state.password,
      });

      this.props.navigator.push({
        index: 1,
        id: 'teacher-prepare',
        token: token,
      });

      this.setState({ isLoading: false });
    } catch (error) {
      AlertIOS.alert('Error', error.message);
      this.setState({ isLoading: false });
    }
  },

  render() {
    return (
      <View style={theme.base.container}>
        <View style={theme.layouts.small}>
          <View style={[theme.base.logoContainer, { marginBottom: 70, marginTop: -200 }]}>
              <Image style={theme.base.logo} resizeMode={Image.resizeMode.contain} source={require('../../assets/logo.png')} />
          </View>
          <View style={[MKCardStyles.card, { marginBottom: 100 }]}>
            <View style={{ padding: 30 }}>
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
              <MKButton
                backgroundColor={MKColor.BlueGrey}
                shadowRadius={2}
                shadowOpacity={.5}
                shadowColor="black"
                onPress={this.onDone}
                style={[theme.button.base]}
                >
                {
                  this.state.isLoading ?
                  <ActivityIndicatorIOS
                    animating={this.state.isLoading}
                    style={[]}
                    color="white"
                  />
                  :
                  <Text pointerEvents="none" style={[theme.button.text]}>
                    ENTRAR
                  </Text>
                }
              </MKButton>
            </View>
          </View>
        </View>
      </View>
    );
  },
});

module.exports = TeacherLoginView;
