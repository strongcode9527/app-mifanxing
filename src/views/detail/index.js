import {pathOr} from 'ramda'
import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import HTML from 'react-native-render-html'

import {
  View,
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
        <View style={styles.welcome}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.content}>
          {
            content && <HTML html={content} imagesMaxWidth={Dimensions.get('window').width} />
          }
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  welcome: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: 'black',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    marginBottom: 5,
    color: '#333333',
    textAlign: 'center',
  },
  content: {
    padding: 10,
    backgroundColor: 'white',
  }
});
