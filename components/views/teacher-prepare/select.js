import React from 'react'
var theme = require('../../styles/theme');
const MK = require('react-native-material-kit');
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import layouts from '../../styles/layouts';
import inputs from '../../styles/inputs';
import buttons from '../../styles/buttons';
import images from '../../styles/images';
import texts from '../../styles/texts';

const {
  MKCardStyles,
  MKTextField,
  MKButton,
  MKColor,
  MKRadioButton,
} = MK;

import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

const propTypes = {
  options: React.PropTypes.array.isRequired,
  selected: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  onSelect: React.PropTypes.func.isRequired,
};

/**
<MKRadioButton
  group={this.state.radioGroup}
  checked={this.props.selected === option.value}
  onPress={() => {
    this.props.onSelect(option.value);
  }}/>
 */

export default class Select extends React.Component {

  isSelected(option) {
    return this.props.selected === option.value;
  }

  renderSelectedIcon(option) {
    return (
      <View style={{ marginTop: 5 }}>
        <Icon name='radio-button-checked' size={25} color={MKColor.BlueGrey} />
      </View>
    );
  }

  renderIcon(option) {
    if (this.isSelected(option)) return this.renderSelectedIcon(option);
    return (
      <View style={{ marginTop: 5 }}>
        <Icon name='radio-button-unchecked' size={25} color={MKColor.BlueGrey} />
      </View>
    );
  }

  renderOptions() {
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
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    });
  }

  render() {
    return (
      <View style={[]}>
        {this.renderOptions()}
      </View>
    );
  }
};

Select.propTypes = propTypes;
