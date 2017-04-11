import React from 'react'
var Image = require('react-native-image-progress')
import { getSetting } from '../api/settings'
var Icon = require('react-native-vector-icons/MaterialIcons')

import { View } from 'react-native'

const propTypes = {
  token: React.PropTypes.string.isRequired,
  student: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number
}

const defaultProps = { width: 300, height: 300 }

export default class StudentImage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.onError = this.onError.bind(this)
  }

  async componentDidMount () {
    const baseUrl = await getSetting('apiUrl')
    console.log('base url is', baseUrl)
    this.setState({ baseUrl })
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.hasErrors !== nextState.hasErrors) return true
    if (this.state.baseUrl !== nextState.baseUrl) return true
    if (this.props.student.idExpediente !== nextProps.student.idExpediente) return true
    if (this.props.token !== nextProps.token) return true
    return true
  }

  onError () {
    var token = encodeURIComponent(this.props.token)
    var source = `${this.state.baseUrl}Asistencia/fotoalumno?token=${token}&expedienteId=${this.props.student.idExpediente}`
    console.log('Error fetching image:', source)
    this.setState({ hasErrors: true })
  }

  renderBlank () {
    return (
      <View
        style={{
          width: this.props.width,
          height: this.props.height,
          borderRadius: this.props.width / 2,
          borderColor: '#aaa',
          borderWidth: 0.5,
          margin: 16,
          overflow: 'hidden',
          backgroundColor: '#ddd',
          alignItems: 'center'
        }}
      >
        <Icon
          name='person'
          size={this.props.height * 0.8}
          style={{ marginTop: this.props.height * 0.07 }}
          color='#333'
        />
      </View>
    )
  }

  render () {
    if (this.state.hasErrors || !this.state.baseUrl) return this.renderBlank()
    var token = encodeURIComponent(this.props.token)
    var source = `${this.state.baseUrl}Asistencia/fotoalumno?token=${token}&expedienteId=${this.props.student.idExpediente}`
    return (
      <Image
        key={this.props.student.idExpediente}
        source={{ uri: source }}
        onError={this.onError}
        style={{
          width: this.props.width,
          height: this.props.height,
          borderRadius: this.props.width / 2,
          margin: 16
        }}
      />
    )
  }
}

StudentImage.propTypes = propTypes
StudentImage.defaultProps = defaultProps
