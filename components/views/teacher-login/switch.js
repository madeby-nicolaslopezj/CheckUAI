import React from 'react'
var theme = require('../../styles/theme');
const MK = require('react-native-material-kit');
var Icon = require('react-native-vector-icons/MaterialIcons');

const {
  MKCardStyles,
  MKTextField,
  MKButton,
  MKColor,
  MKCheckbox,
} = MK;

import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Switch,
  SegmentedControlIOS,
} from 'react-native';

module.exports = React.createClass({
  propTypes: {
    trueLabel: React.PropTypes.string.isRequired,
    falseLabel: React.PropTypes.string.isRequired,
    isTrue: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  render() {
    var iconName = this.props.checked ? 'check-box' : 'check-box-outline-blank';

    return (
      <View style={this.props.style}>
        <SegmentedControlIOS
          values={[this.props.falseLabel, this.props.trueLabel]}
          selectedIndex={this.props.isTrue ? 1 : 0}
          tintColor={MKColor.BlueGrey}
          onChange={(index) => this.props.onChange(!this.props.isTrue)}
          />
      </View>
    );

    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        activeOpacity={0.6}
        onPress={() => this.props.onChange(!this.props.isTrue)}
        style={[theme.button.touchLight, this.props.style]}>
        <View style={[theme.layouts.row]}>
          <Text style={[theme.inputGroup.selectText, { marginTop: 10, }]}>{this.props.falseLabel}</Text>
          <Switch onValueChange={this.props.onChange} value={this.props.isTrue}/>
          <Text style={[theme.inputGroup.selectText, { marginTop: 10, textAlign: 'right' }]}>{this.props.trueLabel}</Text>
        </View>
      </TouchableHighlight>
    );
  },
});
