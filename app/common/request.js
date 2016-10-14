'use strict'

var queryString = require('query-string')//字符串操作模块
var _ = require('lodash')//工具库
var Mock = require('mockjs')//模拟数据模块
var config = require('./config')

var request = {}

request.get = function (url, params) {
  if (params) {
    url += '?' + queryString.stringify(params)
    //console.log('发送的url'+ url)
  }

  return fetch(url)
    .then((response) => response.json())
    .then((response) => Mock.mock(response))
}

request.post = function (url, body) {
  var options = _.extend(config.header, {
    body: JSON.stringify(body)
  })

  return fetch(url, options)
    .then((response) => response.json())
    .then((response) => Mock.mock(response))
}

module.exports = request
