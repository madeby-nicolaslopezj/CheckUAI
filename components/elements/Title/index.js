import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles'

export default class Login extends React.Component {

  static propTypes = {
    children: React.PropTypes.any
  }

  render () {
    return (
      <View>
        <Text style={styles.text}>{this.props.children}</Text>
      </View>
    )
  }

}
