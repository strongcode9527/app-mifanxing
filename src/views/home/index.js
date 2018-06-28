import { inject, observer } from 'mobx-react'
import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {path} from 'ramda'

@inject('store')
@observer // 将react组件转变为响应式组件, 数据改变自动触发render函数
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  componentWillMount() {
    this.props.store.topicStore.fetchTopics(1)
    console.log('in did mount')
  }

  handlePress(id) {
    const {navigation} = this.props
    navigation.navigate('Detail', {
      id,
    })
  }

  handleScroll = (e) => {
    const event = e.nativeEvent,
          clientHeight = event.layoutMeasurement.height,
          contentHeight = event.contentSize.height,
          scrollTop = event.contentOffset.y

    const {fetchTopics, meta, isLoading} = this.props.store.topicStore

    if(scrollTop + clientHeight === contentHeight) {
      !isLoading && !meta.last && fetchTopics(meta.number + 1)
    }

  }

  render() {
    return (
      <ScrollView
        style={styles.all}
        scrollEventThrottle={200}
        onScroll={this.handleScroll}
      >
        {
          this.props.store.topicStore.topics.map(item => (
            <TouchableWithoutFeedback onPress={() => this.handlePress(item.id)} >
              <View key={item.id} style={styles.li} >
                {
                  path(['images', '0', 'filename'], item) &&
                  <Image
                    style={{width: '100%', height: 150}}
                    source={{uri: item.images[0].filename}}

                  />
                }

                <Text style={styles.text} key={item.id} id={item.id}>
                  {item.post.title}
                </Text>

              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  all: {
    backgroundColor: '#f7f7f7'
  },
  li: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
  }
});
