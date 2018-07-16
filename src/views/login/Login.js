import React, { Component } from 'react'
import Toast from 'react-native-easy-toast'
import { inject, observer } from 'mobx-react'

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

  componentWillUpdate(nextProps) {
    const {error, clearError} = nextProps.store.userStore
    console.log(error)
    if(error) {
      this.refs.toast.show(error)
      clearError()
    }
  }

  handleSubmit = () => {
    const {login} = this.props.store.userStore,
          {account, password} = this.state

    login(account, password, this.props.navigation)
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
            onPress={this.handleSubmit}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <Toast
          ref="toast"
          position="top"
          textStyle={{color:'white'}}
        />
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
