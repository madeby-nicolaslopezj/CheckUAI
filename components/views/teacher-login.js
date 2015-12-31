var React = require('react-native');
var UAI = require('../api/base');
var Progress = require('react-native-progress');
var Button = require('react-native-button');
var RNFocal = require('rn-focalpoint');
var Theme = require('../styles/theme2');

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
    }, 600);
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
    var {
      input,
      button,
      vgroup,
    } = Theme;
    var style = Theme.login;

    return (
      <View style={style.container}>
        <View style={style.logoContainer}>
            <Image style={style.logo} resizeMode={Image.resizeMode.contain} source={require('../../assets/logo.png')} />
        </View>
        <View style={style.form}>
          <View style={vgroup.form}>
            <View style={[vgroup.top, vgroup.seperator]}>
              <TextInput
                style={[input.text, vgroup.input]}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}
              />
            </View>
            <View style={vgroup.bottom}>
              <TextInput
                style={[input.text, vgroup.input]}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
              />
            </View>
          </View>
          <TouchableHighlight
            onPress={this.onDone}
            style={[button.touch, style.loginButton]}>
            <View style={[button.base, button.primary]}>
              <Text style={[button.content, button.primaryContent]}>
                Entrar
              </Text>
              <ActivityIndicatorIOS
                animating={this.state.isLoading}
                style={style.loading}
                color="white"
              />
            </View>
          </TouchableHighlight>
        </View>
        <View style={style.toolbox} />
      </View>
    );
  },
});

module.exports = TeacherLoginView;
