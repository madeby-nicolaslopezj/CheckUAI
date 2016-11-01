import React from 'react'
import {TouchableHighlight, Text} from 'react-native'
import styles from './styles'
import autobind from 'autobind-decorator'

export default class Button extends React.Component {

  static propTypes = {
    onPress: React.PropTypes.func,
    children: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    style: React.PropTypes.oneOf(React.PropTypes.array, React.PropTypes.object)
  }

  @autobind
  onPress () {
    if (this.props.disabled) return
    this.props.onPress()
  }

  getStyle () {
    const style = []
    style.push(styles.container)

    if (this.props.disabled) {
      style.push(styles.disabled)
    }

    if (this.props.style) {
      style.push(this.props.style)
    }

    return style
  }

  getTextStyle () {
    const style = []
    style.push(styles.text)

    if (this.props.disabled) {
      style.push(styles.disabledText)
    }

    return style
  }

  getUnderlayColor () {
    if (this.props.disabled) {
      return '#e0e0e0'
    } else {
      return '#1D62F0'
    }
  }

  renderText () {
    if (typeof this.props.children === 'string') {
      return (
        <Text style={this.getTextStyle()}>
          {this.props.children}
        </Text>
      )
    } else {
      return this.props.children
    }
  }

  render () {
    return (
      <TouchableHighlight
      onPress={this.onPress}
      style={this.getStyle()}
      activeOpacity={0.9}
      underlayColor={this.getUnderlayColor()}>
        {this.renderText()}
      </TouchableHighlight>
    )
  }

}
