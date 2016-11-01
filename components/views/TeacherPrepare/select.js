import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import layouts from '../../styles/layouts'
import buttons from '../../styles/buttons'
import texts from '../../styles/texts'

const primaryColor = '#007AFF'

import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

const propTypes = {
  options: React.PropTypes.array.isRequired,
  selected: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  onSelect: React.PropTypes.func.isRequired
}

export default class Select extends React.Component {

  isSelected (option) {
    return this.props.selected === option.value
  }

  renderSelectedIcon (option) {
    return (
      <View style={{ marginTop: 5 }}>
        <Icon name='radio-button-checked' size={25} color={primaryColor} />
      </View>
    )
  }

  renderIcon (option) {
    if (this.isSelected(option)) return this.renderSelectedIcon(option)
    return (
      <View style={{ marginTop: 5 }}>
        <Icon name='radio-button-unchecked' size={25} color={primaryColor} />
      </View>
    )
  }

  renderOptions () {
    return this.props.options.map((option, index) => {
      return (
        <View key={option.value + index} style={layouts.row}>
          <TouchableHighlight
            underlayColor={'transparent'}
            activeOpacity={0.6}
            onPress={() => this.props.onSelect(option.value)}
            style={[buttons.touchLight, { marginTop: 10 }]}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 40 }}>
                {this.renderIcon(option)}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={texts.select}>{option.title}</Text>
                {
                  option.subtitle
                  ? <Text style={texts.selectSubtitle}>{option.subtitle}</Text>
                  : null
                }
              </View>
            </View>
          </TouchableHighlight>
        </View>
      )
    })
  }

  render () {
    return (
      <View style={[]}>
        {this.renderOptions()}
      </View>
    )
  }
}

Select.propTypes = propTypes
