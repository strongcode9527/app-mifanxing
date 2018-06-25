import { inject, observer } from 'mobx-react'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {pathOr} from 'ramda'

@inject('store')
@observer // 将react组件转变为响应式组件, 数据改变自动触发render函数
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }
  handlePress() {
    const {navigation} = this.props
    navigation.navigate('Detail')
  }

  componentDidMount() {
    this.props.store.afterCreate()
  }

  render() {
    console.log(this.props.store)
    return (
      <View>
        <Text style={styles.welcome}>
          home
        </Text>
        {
          this.props.store.topicStore.topics.map(item => (
            <Text style={styles.welcome} key={item}>
              {item}
            </Text>
          ))
        }
        <Button onPress={this.handlePress} title="go to detail"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
