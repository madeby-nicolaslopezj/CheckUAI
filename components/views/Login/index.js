import React from 'react'
import {View, Text, ScrollView} from 'react-native'
import Title from '../../elements/Title'
import styles from './styles'
import {Form, Field} from 'simple-react-form'
import TextField from '../../elements/Text'
import SegmentedControl from '../../elements/SegmentedControl'
import autobind from 'autobind-decorator'
import Button from '../../elements/Button'
import {loginTeacher, loginColaborator} from '../../api/base'
import sleep from '../../api/sleep'
import Container from '../../elements/Container'
import layouts from '../../styles/layouts'

export default class Login extends React.Component {

  static propTypes = {
    navigator: React.PropTypes.object
  }

  state = {
    email: '',
    password: '',
    type: 'Profesor',
    isLoading: false
  }

  openSettings () {
    this.props.navigator.push({
      index: 1,
      id: 'settings'
    })
  }

  @autobind
  async login () {
    if (this.state.email === 'settings' && this.state.password === 'react') {
      return this.openSettings()
    }

    this.setState({isLoading: true, error: ''})
    try {
      const token = this.state.type === 'Profesor' ? await loginTeacher(this.state) : await loginColaborator(this.state)
      this.setState({isLoading: false})

      this.props.navigator.push({
        index: 1,
        id: 'teacher-prepare',
        token,
        password: this.state.password,
        rut: this.state.rut,
        isTeacher: this.state.type === 'Profesor'
      })

      await sleep(1000)

      this.setState({
        email: '', password: '', rut: '', type: 'Profesor'
      })
    } catch (error) {
      this.setState({isLoading: false, error})
    }
  }

  renderDescription () {
    if (this.state.type === 'Profesor') {
      return 'Entra con tu email UAI'
    } else {
      return 'Entra con tu RUT'
    }
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
            <Title>Login</Title>
            <Text style={styles.description}>
              {this.renderDescription()}
            </Text>
            {this.renderError()}
            <View style={{height: 15}}/>
            <Form useFormTag={false} state={this.state} onChange={changes => this.setState(changes)}>
              <View>
                <Field
                fieldName={this.state.type === 'Profesor' ? 'email' : 'rut'}
                type={TextField}
                placeholder={this.state.type === 'Profesor' ? 'Email' : 'Rut'}
                autoCapitalize='none'
                autoCorrect={false}/>
                <Field
                fieldName='password'
                type={TextField}
                placeholder='Contraseña'
                secureTextEntry />
                <Field
                fieldName='type'
                options={['Profesor', 'Colaborador']}
                type={SegmentedControl}/>
              </View>
            </Form>
            <View style={{height: 10}}/>
            <Button loading={this.state.isLoading} onPress={this.login}>
              Entrar
            </Button>
          </Container>
        </View>
      </ScrollView>
    )
  }

}
