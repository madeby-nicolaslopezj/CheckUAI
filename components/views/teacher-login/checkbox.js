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
} = React;

var Checkbox = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  render() {
    var iconName = this.props.checked ? 'check-box' : 'check-box-outline-blank';
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        activeOpacity={0.6}
        onPress={() => this.props.onChange(!this.props.checked)}
        style={[theme.button.touchLight, this.props.style]}>
        <View style={[theme.layouts.row]}>
          <Icon style={{ marginLeft: -3 }} name={iconName} size={25} color={MKColor.Indigo} />
          <Text style={[theme.inputGroup.selectText, { marginTop: 10, marginLeft: 10 }]}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  },
});

module.exports = Checkbox;
