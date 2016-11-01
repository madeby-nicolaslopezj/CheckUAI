import React from 'react'
import {View, TextInput} from 'react-native'
import styles from './styles'

export default class TextFieldComponent extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    passProps: React.PropTypes.object
  }

  render () {
    return (
      <View>
        <TextInput
        style={styles.input}
        onChangeText={this.props.onChange}
        value={this.props.value}
        {...this.props.passProps}/>
      </View>
    )
  }
}
