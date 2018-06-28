import {pathOr} from 'ramda'
import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import HTML from 'react-native-render-html'

import {
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';



@inject('store')
@observer // 将react组件转变为响应式组件, 数据改变自动触发render函数
export default class Detail extends Component<Props> {

  componentDidMount() {
    const id = pathOr('', ['navigation', 'state', 'params', 'id'], this.props)
    this.props.store.topicStore.fetchTopicDetail(id)
  }

  render() {
    const {title, content} = this.props.store.topicStore.topic.post
    return (
      <ScrollView>
        <Text style={styles.welcome}>
          {title}
        </Text>
        {
          content && <HTML html={content} imagesMaxWidth={Dimensions.get('window').width} />
        }
      </ScrollView>
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
