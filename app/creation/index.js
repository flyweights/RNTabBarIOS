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
  Dimensions,
  ActivityIndicatorIOS,
  RefreshControl
} = ReactNative;

var request = require('../common/request')
var config = require('../common/config')

var width = Dimensions.get('window').width

var cachedResults = {
  nextPage: 1,
  items: [],
  total: 0
}

var List = React.createClass({

  getInitialState: function () {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      isLoadingTail: false,
      isRefreshing: false,
      dataSource: ds.cloneWithRows([]),
    };
  },

  _renderRow: function (rowData) {
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
    this._fetchData(1)
  },

  _hasMore: function () {
    return cachedResults.items.length !== cachedResults.total
  },

  _fetchData: function (page) {
    var that = this

    if (page !== 0){
      this.setState({
        isLoadingTail: true
      })
    }else{
      this.setState({
        isRefreshing: true
      })
    }

    request.get(config.api.base + config.api.creations,{
      accessToken: 'ab1def',
      page: page
    })
      .then((data) => {
        if (data.success) {
          var items = cachedResults.items.slice()

          if (page !== 0){
            items = items.concat(data.data)
            cachedResults.nextPage +=1
          }else{
            items = data.data.concat(items)
          }

          cachedResults.items = items
          cachedResults.total = data.total

          setTimeout(() => {
            if (page !== 0){
              this.setState({
                isLoadingTail: false,
                dataSource: this.state.dataSource.cloneWithRows(cachedResults.items)
              })
            }else{
              this.setState({
                isRefreshing: false,
                dataSource: this.state.dataSource.cloneWithRows(cachedResults.items)
              })
            }
          },200)

          // setTimeout(function () {
          //   this.setState({
          //     isLoadingTail: false,
          //     dataSource: this.state.dataSource.cloneWithRows(cachedResults.items)
          //   })
          // }.bind(this),2000)

        }
      })
      .catch((error)=> {

        if (page !== 0){
          this.setState({
            isLoadingTail: false
          })

        }else{
          this.setState({
            isRefreshing: false
          })
        }

        console.warn(error)
      })
  },

  _fetchMoreData:function () {
    if (!this._hasMore() || this.state.isLoadingTail){
      return
    }

    var page = cachedResults.nextPage
    this._fetchData(page)
  },

  _onRefresh: function () {
    if (!this._hasMore() || this.state.isRefreshing){
      return
    }
    this._fetchData(0)
  },

  _renderFooter:function () {
    if (!this._hasMore() && cachedResults.total !=0){
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      )
    }

    if (!this.state.isLoadingTail){
      return <View style={styles.loadingMore}/>
    }

    return <ActivityIndicatorIOS style={styles.loadingMore}/>
  },

  render: function () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}

          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor='#ff6600'
              title='拼命加载中'
            />
          }

          renderFooter={this._renderFooter}

          onEndReached={this._fetchMoreData}
          onEndReachedThreshold={20}

          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
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
  },

  loadingMore: {
    marginVertical:20
  },

  loadingText:{
    color:'#777',
    textAlign: 'center'
}

});

module.exports = List;