var React = require('react-native');
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

var {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Switch,
  SegmentedControlIOS,
} = React;

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
          tintColor={MKColor.Indigo}
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
