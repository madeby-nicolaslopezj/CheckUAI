var React = require('react-native');
var theme = require('../../styles/theme');
const MK = require('react-native-material-kit');

const {
  MKCardStyles,
  MKTextField,
  MKButton,
  MKColor,
  MKRadioButton,
} = MK;

var {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var Select = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired,
    selected: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    onSelect: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      radioGroup: new MKRadioButton.Group(),
    };
  },

  renderOptions() {
    return this.props.options.map((option, index) => {
      return (
        <View key={option.value} style={[theme.layouts.row]}>
          <MKRadioButton
            group={this.state.radioGroup}
            checked={this.props.selected === option.value}
            onPress={() => {
              this.props.onSelect(option.value);
            }}/>
          <TouchableHighlight

            underlayColor={'transparent'}
            activeOpacity={0.6}
            onPress={() => this.props.onSelect(option.value)}
            style={[theme.button.touchLight, { marginTop: 10 }]}>
            <Text style={theme.inputGroup.selectText}>{option.title}</Text>
          </TouchableHighlight>
          </View>
        );
    });
  },

  render() {
    return (
      <View style={[]}>
        {this.renderOptions()}
      </View>
    );
  },
});

module.exports = Select;
