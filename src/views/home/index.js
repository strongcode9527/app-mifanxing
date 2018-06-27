import { inject, observer } from 'mobx-react'
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import {path} from 'ramda'

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

  componentWillMount() {
    this.props.store.topicStore.fetchTopics()
  }

  render() {
    return (
      <View>
        <Text style={styles.welcome}>
          home
        </Text>
        {
          this.props.store.topicStore.getTopics.map(item => (
            <View key={item.id}>
              <Text style={styles.welcome} key={item.id}>
                {item.post.title}
              </Text>
              {
                path(['images', '0', 'filename'], item) &&
                <Image
                  style={{width: 50, height: 50}}
                  source={{uri: item.images[0].filename}}
                />
              }

            </View>

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
