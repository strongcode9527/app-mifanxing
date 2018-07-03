import { inject, observer } from 'mobx-react'
import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {path} from 'ramda'

@inject('store')
@observer // 将react组件转变为响应式组件, 数据改变自动触发render函数
export default class App extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      isRefreshing: false,
    }

  }

  componentWillMount() {
    this.props.store.topicStore.fetchTopics(1)
    console.log('in did mount')
  }

  handlePress = (id) => {
    const {navigation} = this.props
    navigation.navigate('Detail', {
      id,
    })
  }

  handleScroll = () => {
    const {fetchTopics, meta, isLoading} = this.props.store.topicStore

    !isLoading && !meta.last && fetchTopics(meta.number + 1)
  }

  handleRefresh = () => {
    console.log('in refresh')
    this.setState({
      isRefreshing: true,
    })

    setTimeout(() => this.setState({
      isRefreshing: false,
    }), 1500)

  }

  render() {
    const {topics} = this.props.store.topicStore

    return (
      <View>
        {
          topics.length > 0 &&
          <FlatList
            data={topics}
            onEndReached={this.handleScroll}
            onRefresh={this.handleRefresh}
            refreshing={this.state.isRefreshing}
            renderItem = {({item}) => (
              <TouchableWithoutFeedback onPress={() => this.handlePress(item.id)} >
                <View key={item.id} style={styles.li} >
                  {
                    path(['images', '0', 'filename'], item) &&
                    <Image
                      style={{width: '100%', height: 150}}
                      source={{uri: path(['images', '0', 'filename'], item)}}
                    />
                  }

                  <Text style={styles.text} key={item.id} id={item.id}>
                    {path(['post', 'title'], item)}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        }
      </View>

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
