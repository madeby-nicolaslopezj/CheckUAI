import React from 'react'
var Image = require('react-native-image-progress')
var Progress = require('react-native-progress')
import { getSetting } from '../api/settings'
var Icon = require('react-native-vector-icons/MaterialIcons')

import {
  View,
  StyleSheet,
  Text,
} from 'react-native'

const propTypes = {
  token: React.PropTypes.string.isRequired,
  student: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
}

const defaultProps = {
  width: 300,
  height: 300
}

export default class StudentImage extends React.Component {

  constructor (props) {
    super(props)
    this.state = { baseUrl: 'http://webapi.uai.cl/', hasErrors: false }
    this.setBaseUrl()
  }

   shouldComponentUpdate (nextProps, nextState) {
     if (this.state.hasErrors != nextState.hasErrors) {
       return true
     }
     if (this.state.baseUrl != nextState.baseUrl) {
       return true
     }
     if (this.props.student.idExpediente != nextProps.student.idExpediente) {
       return true
     }
     if (this.props.token != nextProps.token) {
       return true
     }
     return false
   }

  async setBaseUrl () {
    const baseUrl = await getSetting('apiUrl')
    this.setState({baseUrl})
  }

  onError (error) {
    var token = encodeURIComponent(this.props.token)
    var source = `${this.state.baseUrl}Asistencia/fotoalumno?token=${token}&expedienteId=${this.props.student.idExpediente}`
    console.log('Error fetching image:', source)
    console.log(error)
    this.setState({ hasErrors: true })
  }

  render () {
    var token = encodeURIComponent(this.props.token)
    var source = `${this.state.baseUrl}Asistencia/fotoalumno?token=${token}&expedienteId=${this.props.student.idExpediente}`
    // console.log('Fetching image:', source)
    if (this.state.hasErrors) {
      return (
        <View style={{
          width: this.props.width,
          height: this.props.height,
          borderRadius: this.props.width / 2,
          borderColor: '#aaa',
          borderWidth: 0.5,
          margin: 16,
          overflow: 'hidden',
          backgroundColor: '#ddd',
          alignItems: 'center'
        }}>
          <Icon name='person' size={this.props.height * 0.8} style={{ marginTop: this.props.height * 0.07 }} color='#333' />
        </View>
      )
    }
    return (
      <Image
        key={this.props.student.idExpediente}
        source={{ uri: source }}
        onError={this.onError.bind(this)}
        style={{
          width: this.props.width,
          height: this.props.height,
          borderRadius: this.props.width / 2,
          margin: 16
        }} />
    )
  }
}

StudentImage.propTypes = propTypes
StudentImage.defaultProps = defaultProps
