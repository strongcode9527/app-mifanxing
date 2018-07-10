import {path} from 'ramda'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import CookieManager from 'react-native-cookies'


import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';

@inject('store')
@observer // 将react组件转变为响应式组件, 数据改变自动触发render函数
export default class Login extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      account: '',
      password: '',
    }

    this.forumId = ['3,4,5', '3', '4', '5']
    this.topicCategories = ['getAll', 'getNews', 'getEvaluatings', 'getVideos']
  }

  componentWillMount() {
    this.props.store.topicStore.fetchTopics(1)
    CookieManager.set({
      name: 'strong',
      value: 'strongcookie',
      domain: 'www.mifanxing.com',
      origin: 'sdfs',
      path: '/',
      version: '1',
      expiration: '2019-09-30T12:30:00.00-05:00'
    })
      .then(res => {
        console.log('success cookie' , res)
        CookieManager.getAll()
          .then((res) => {
            console.log('CookieManager.getAll =>', res);
          });
      })
  }

  handleSubmit = () => {
    console.log('in submit', this.state.account, this.state.password)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View>
            <Text style={styles.title}>登录</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="请输入账号"
              onChangeText={(account) => this.setState({account})}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入密码"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
            />
          </View>
          <Button
            title="点击登录"
            color=""
            onPress={this.handleSubmit}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  body: {
    height: 200,
    width: '80%',
    marginTop: 150,
    marginLeft: '10%',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    padding: 5,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#aaa',
    backgroundColor: '#f7f7f7',
  }
});
