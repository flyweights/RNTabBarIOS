'use strict';

var React = require('react');
var ReactNative = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image,
  Dimensions
} = ReactNative;

var request = require('../common/request')
var config = require('../common/config')

var width = Dimensions.get('window').width

var List = React.createClass({

  getInitialState: function () {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([{
        "_id": "140000198504171274",
        "thumb": "http://dummyimage.com/1200x600/5f44b8)",
        "video": "http://flyweights.top"
      },
        {
          "_id": "530000201404204726",
          "thumb": "http://dummyimage.com/1200x600/3c54ba)",
          "video": "http://flyweights.top"
        }]),
    };
  },

  renderRow: function (rowData) {
    return (
      <TouchableHighlight>
        <View style={styles.item}>
          <Text style={styles.title}>{rowData._id}</Text>
          <Image
            source={{uri: rowData.thumb}}
            style={styles.thumb}>
            <Icon
              name='ios-play'
              size={28}
              style={styles.play}
            />
          </Image>
          <Text style></Text>
          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon
                name='ios-heart-outline'
                size={28}
                style={styles.up}
              />
              <Text style={styles.handleText}>喜欢</Text>
            </View>
            <View style={styles.handleBox}>
              <Icon
                name='ios-chatboxes-outline'
                size={28}
                style={styles.commentIcon}
              />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )

  },

  componentDidMount: function () {
    this._fetchData()
  },


  _fetchData: function () {
    request.get(config.api.base + config.api.creations,{
      accessToken: 'ab1def'
    })
      .then((data) => {
        if (data.success) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data.data)
          })
        }
      })
      .catch((error)=> {
        console.warn(error)
      })
  },


  render: function () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee725c'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },

  item: {
    width: width,
    marginBottom: 10,
    backgroundColor: '#fff'
  },

  thumb: {
    width: width,
    height: width * 0.5,
    resizeMode: 'cover'
  },

  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },

  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },

  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 2 - 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  play: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: '#ed7b66'
  },

  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },

  up: {
    fontSize: 22,
    color: '#333'
  },

  commentIcon: {
    fontSize: 22,
    color: '#333'
  }

});

module.exports = List;