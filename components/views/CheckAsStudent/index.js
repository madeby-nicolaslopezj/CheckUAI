import {
  View,
  AlertIOS,
  Animated,
  Keyboard,
  TouchableHighlight,
  NativeModules,
  Image,
  StatusBar
} from 'react-native'
import React from 'react'
import UAI from '../../api/base'
import { getSetting } from '../../api/settings'
import {
  MKTextField,
  MKColor
} from 'react-native-material-kit'
import Camera from '@nitrog7/react-native-camera'
import {BlurView} from 'react-native-blur'
import AppleEasing from 'react-apple-easing'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spinner from '../spinner'
import Toast from '@remobile/react-native-toast'
import layouts from '../../styles/layouts'
import inputs from '../../styles/inputs'

const {
  FaceDetector
} = NativeModules

export default class CheckAsStudent extends React.Component {

  static propTypes = {
    sessionId: React.PropTypes.number.isRequired,
    token: React.PropTypes.string.isRequired,
    activityType: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    rut: React.PropTypes.string,
    module: React.PropTypes.string.isRequired,
    navigator: React.PropTypes.object,
    debug: React.PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      keyboardHeight: new Animated.Value(0),
      photo: null
    }
  }

  componentWillMount () {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
  }

  async componentWillUnmount () {
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()
    await UAI.endSession({
      token: this.props.token,
      sessionId: this.props.sessionId
    })
  }

  async componentDidMount () {
    await UAI.startSession({
      token: this.props.token,
      sessionId: this.props.sessionId
    })
  }

  keyboardWillShow (e) {
    Animated.timing(this.state.keyboardHeight, {
      toValue: e.endCoordinates.height - 5,
      duration: 250,
      easing: AppleEasing.easeOut
    }).start()
  }

  keyboardWillHide (e) {
    Animated.timing(this.state.keyboardHeight, {
      toValue: 0,
      duration: 250,
      easing: AppleEasing.easeOut
    }).start()
  }

  goBack () {
    AlertIOS.prompt('Introduce la contraseña', null, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', type: 'secure-text', onPress: async (text) => {
        const masterPassword = await getSetting('masterPassword')
        if (masterPassword && text === masterPassword) {
          this.props.navigator.pop()
        } else if (text === this.props.password) {
          this.props.navigator.pop()
        } else {
          AlertIOS.alert('Contraseña incorrecta', null, [{ text: 'Ok', style: 'cancel' }])
        }
      } }
    ], 'secure-text')
  }

  async check () {
    console.log('will check')
    this.setState({ isLoading: true })
    var response = await UAI.markManualStudentAssistance({
      assist: true,
      token: this.props.token,
      activityType: this.props.activityType,
      sessionId: this.props.sessionId,
      email: this.state.email,
      password: this.state.password,
      photo: this.state.photo,
      module: this.props.module
    })

    if (response.Resultado) {
      this.setState({ photo: null, isLoading: false, email: '', password: '' })
      Toast.showShortCenter('Asistencia marcada')
    } else {
      this.setState({ isLoading: false })
      if (response.respuesta) {
        Toast.showShortCenter(`Error: ${response.respuesta}`)
      } else {
        Toast.showShortCenter(`Error al marcar asistencia`)
      }
    }
  }

  async photo () {
    this.refs.camera.capture({ rotation: 270 }, async (error, base64) => {
      if (!error) {
        this.didTakePhoto(base64)
      }
    })
  }

  didTakePhoto (base64) {
    FaceDetector.numFaces(base64, (response) => {
      console.log(response, 'caras en la foto')
      /* else if (this.props.debug) {
        Toast.showShortCenter('No se detectó tu cara, pero estamos en pruebas')
        this.setState({ photo: base64 })
      } */
      if (response === 1) {
        this.setState({ photo: base64 })
      } else if (response > 1) {
        Toast.showShortCenter('Solo tienes que salir tú en la foto, intentalo nuevamente')
      } else {
        Toast.showShortCenter('No se detectó tu cara, intentalo nuevamente')
      }
    })
  }

  checkEmailUAI () {
    if (this.state.email && !this.state.email.includes('@')) {
      this.setState({ email: this.state.email + '@alumnos.uai.cl' })
    }
  }

  cancelPhoto () {
    this.setState({ photo: null })
  }

  renderPhoto () {
    if (!this.state.photo) return null
    return <Image source={{ isStatic: true, uri: `data:image/jpeg;base64,${this.state.photo}` }} style={[layouts.centerContainer, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]} />
  }

  renderActionButton () {
    if (this.state.photo) {
      /* const hiddenButton = <TouchableHighlight
        underlayColor={'transparent'}
        activeOpacity={0.6}
        onPress={this.cancelPhoto.bind(this)}
        style={{ marginBottom: 10 }}>
        <View>
          <Icon name='replay' size={30} color='#333' />
        </View>
      </TouchableHighlight> */
      return (
        <View>
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
    )
  }

  render () {
    return (
      <View style={[layouts.centerContainer, { backgroundColor: 'transparent' }]}>
        <StatusBar hidden />
        <Camera
        ref='camera'
        captureTarget={Camera.constants.CaptureTarget.memory}
        type={Camera.constants.Type.front}
        style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}/>
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
                    onBlur={this.checkEmailUAI.bind(this)}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                  />
                  <MKTextField
                    style={inputs.textfield}
                    tintColor={MKColor.BlueGrey}
                    placeholder='Contraseña'
                    password
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                  />
                </View>
                <View style={[{ flex: 0.2 }, layouts.center]}>
                  {
                    (this.state.isLoading)
                    ? <Spinner />
                    : this.renderActionButton()
                  }
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </View>
      </View>
    )
  }
}
