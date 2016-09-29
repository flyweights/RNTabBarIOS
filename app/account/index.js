'use strict';

var React = require('react');
var ReactNative = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Account = React.createClass({
  render: function () {
    return (
      <View style = {styles.container}>
        <Text>
          账户
        </Text>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  container:{
    flex: 1,    
    margin: 50,
    alignItems: 'center',
  },  
});

module.exports = Account;