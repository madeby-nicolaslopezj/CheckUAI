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
  TouchableWithoutFeedback,
} = React;

var Select = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      selected: null,
      radioGroup: new MKRadioButton.Group(),
    };
  },

  renderOptions() {
    return this.props.options.map((option, index) => {
      return (
        <View key={option.value} style={[theme.layouts.row]}>
          <MKRadioButton
            group={this.state.radioGroup}
            checked={this.state.selected === option.value}
            onPress={() => {
              this.setState({ selected: option.value });
              this.props.onSelect(option.value);
            }}/>
            <TouchableWithoutFeedback onPress={() => {
              this.setState({ selected: option.value });
              this.props.onSelect(option.value);
            }}>
              <Text style={theme.inputGroup.selectText}>{option.title}</Text>
            </TouchableWithoutFeedback>
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

/*

<<SelectOption
  onSelect={() => {
    this.setState({ selected: option.value });
    this.props.onSelect(option.value);
  }}

  isSelected={this.state.selected === option.value}
  isFirst={index == 0}
  isLast={index == this.props.options.length - 1}
  title={option.title}
  key={option.value}
  /><
 */

var SelectOption = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    isFirst: React.PropTypes.bool.isRequired,
    isLast: React.PropTypes.bool.isRequired,
  },
  render: function() {
    var styles = [theme.inputGroup.select];
    if (this.props.isFirst) {
      styles.push(theme.inputGroup.top);
    }

    if (this.props.isLast) {
      styles.push(theme.inputGroup.bottom);
    }

    if (!this.props.isLast) {
      styles.push(theme.inputGroup.seperator);
    }

    if (this.props.isSelected) {
      styles.push(theme.inputGroup.selectSelected);
    }

    return (
      <TouchableWithoutFeedback onPress={this.props.onSelect}>
        <View style={styles}>
          <Text style={theme.inputGroup.selectText}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  },
});

module.exports = Select;
