import React from 'react'
import {View, SegmentedControlIOS} from 'react-native'
import styles from './styles'

export default class TextFieldComponent extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    options: React.PropTypes.arrayOf(React.PropTypes.string),
    passProps: React.PropTypes.object
  }

  getIndex (value) {
    return this.props.options.indexOf(value)
  }

  getValue (index) {
    return this.props.options[index]
  }

  render () {
    return (
      <View>
        <SegmentedControlIOS
        style={styles.input}
        values={this.props.options}
        selectedIndex={this.getIndex(this.props.value)}
        onChange={(event) => this.props.onChange(this.getValue(event.nativeEvent.selectedSegmentIndex))}
        {...this.props.passProps}/>
      </View>
    )
  }
}
