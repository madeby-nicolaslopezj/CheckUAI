import React from 'react'
import {View, Text, ScrollView, AlertIOS, TouchableHighlight} from 'react-native'
import Title from '../../elements/Title'
import styles from './styles'
import {Form, Field} from 'simple-react-form'
import TextField from '../../elements/Text'
import autobind from 'autobind-decorator'
import Button from '../../elements/Button'
import Container from '../../elements/Container'
import layouts from '../../styles/layouts'
import {getSetting} from '../../api/settings'
import {markManualStudentAssistance} from '../../api/base'
import Toast from '@remobile/react-native-toast'

export default class CheckAsStudentNoPic extends React.Component {

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

  state = {
    email: '',
    password: '',
    isLoading: false
  }

  @autobind
  async check () {
    this.setState({ isLoading: true, error: '' })
    var response = await markManualStudentAssistance({
      assist: true,
      token: this.props.token,
      activityType: this.props.activityType,
      sessionId: this.props.sessionId,
      email: this.state.email,
      password: this.state.password,
      module: this.props.module
    })

    if (response.Resultado) {
      this.setState({ isLoading: false, email: '', password: '' })
      Toast.showShortCenter('Asistencia marcada')
    } else {
      this.setState({ isLoading: false })
      if (response.respuesta) {
        this.setState({error: response.respuesta})
      } else {
        this.setState({error: 'Error al marcar asistencia'})
      }
    }
  }

  @autobind
  onEmailBlur () {
    if (this.state.email && !this.state.email.includes('@')) {
      this.setState({ email: this.state.email + '@alumnos.uai.cl' })
    }
  }

  @autobind
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

  renderError () {
    if (!this.state.error) return
    return (
      <Text style={styles.error}>
        {String(this.state.error)}
      </Text>
    )
  }

  render () {
    return (
      <ScrollView style={layouts.scrollView} contentContainerStyle={layouts.scrollViewContent}>
        <View style={styles.container}>
          <Container>
            <Title>Marcar Asistencia</Title>
            <Text style={styles.description}>
              Entra con tu email UAI
            </Text>
            {this.renderError()}
            <View style={{height: 15}}/>
            <Form useFormTag={false} state={this.state} onChange={changes => this.setState(changes)}>
              <View>
                <Field
                fieldName='email'
                type={TextField}
                placeholder='Email'
                autoCapitalize='none'
                autoCorrect={false}
                onBlur={this.onEmailBlur}/>
                <Field
                fieldName='password'
                type={TextField}
                placeholder='Contraseña'
                secureTextEntry />
              </View>
            </Form>
            <View style={{height: 10}}/>
            <Button loading={this.state.isLoading} onPress={this.check}>
              Entrar
            </Button>
            <TouchableHighlight
              underlayColor={'transparent'}
              activeOpacity={0.6}
              onPress={this.goBack}
              style={styles.backButton}>
              <Text style={styles.backButtonText}>
                Salir
              </Text>
            </TouchableHighlight>
          </Container>
        </View>
      </ScrollView>
    )
  }

}
