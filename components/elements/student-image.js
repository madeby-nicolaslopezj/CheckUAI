var React = require('react-native');
var Image = require('react-native-image-progress');
var Progress = require('react-native-progress');

var {
  View,
  StyleSheet,
  Text,
} = React;

var StudentImage = React.createClass({
  propTypes: {
    student: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {};
  },

  render: function() {
    return (
      <Image
      source={{ uri: 'http://loremflickr.com/240/320/profile' }}
      indicator={Progress.CircleSnail}
      indicatorProps={{
      }}
      style={{
        width: 120,
        height: 160,
        marginRight: 16,
      }}/>
    );
  },
});

module.exports = StudentImage;
