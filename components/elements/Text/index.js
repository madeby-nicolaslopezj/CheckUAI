import React from 'react'
import {View, TextInput} from 'react-native'
import styles from './styles'

export default class TextFieldComponent extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    passProps: React.PropTypes.object,
    blur: React.PropTypes.bool
  }

  getStyle () {
    if (this.props.blur) {
      return styles.blur
    }
    return styles.input
  }

  render () {
    return (
      <View>
        <TextInput
        style={this.getStyle()}
        onChangeText={this.props.onChange}
        value={this.props.value}
        {...this.props.passProps}/>
      </View>
    )
  }
}
