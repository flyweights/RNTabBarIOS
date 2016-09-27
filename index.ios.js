/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = ReactNative;

var List = React.createClass({
  render: function () {
    return (
      <View style = {styles.container}>
        <Text>
          页面
        </Text>
      </View>
    )
  }
})

var Edit = React.createClass({
  render: function () {
    return (
      <View style = {styles.container}>
        <Text>
          编辑
        </Text>
      </View>
    )
  }
})

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

class Project extends React.Component {
  static title = '<TabBarIOS>';
  static description = 'Tab-based navigation.';
  static displayName = 'TabBarExample';

  state = {
    selectedTab: 'redTab',
    notifCount: 0,
    presses: 0,
  };

//num 这里运来是 num？，不知道为什么这样写，没有找到原因
  _renderContent = (color: string, pageText: string, num: number) => {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  };

  render() {
    return (
      <TabBarIOS>
        <Icon.TabBarItem
          title="video"
          iconName='ios-videocam'
          selectediconName='ios-videocam-outline'
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          <List/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-recording'
          title="record"
          selectediconName='ios-recording-outline'
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          <Edit/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          renderAsOriginal
          title="More"
          iconName='ios-more'
          selectediconName='ios-more-outline'
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          <Account/>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

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

AppRegistry.registerComponent('Project', () => Project);
