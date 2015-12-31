var React = require('react-native');

var {
  View,
  StyleSheet,
  Text,
  Switch,
} = React;

var Select = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      selected: null,
    };
  },

  renderOptions() {
    return this.props.options.map((option) => {
      return (
        <SelectOption
          onSelect={() => {
            this.setState({ selected: option.value });
          }}

          />
      );
    });
  },

  render() {
    return (
      <View>
        {this.renderOptions}
      </View>
    );
  },
});

var SelectOption = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
  render: function() {
    return <Text>{this.props.title}</Text>;
  },
});

module.exports = Select;
