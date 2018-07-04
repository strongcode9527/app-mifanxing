import {path} from 'ramda'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

@inject('store')
@observer // 将react组件转变为响应式组件, 数据改变自动触发render函数
export default class App extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
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

  handleChangeTab = (activeIndex) => {
    this.setState({
      activeIndex,
    })
  }

  render() {
    const {topics} = this.props.store.topicStore,
          titles = ['精选', '新闻', '评测', '视频']


    return (
      <View>
        <View style={styles.header}>
          {
            titles.map((title, index) => (
              <Text
                onPress={() => this.handleChangeTab(index)}
                style={this.state.activeIndex === index ? styles.active : styles.category}
              >
                {title}
              </Text>
            ))
          }
        </View>
        {
          topics.length > 0 &&
          <FlatList
            data={topics}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleScroll}
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
  header: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  category: {
    padding: 10,
    fontSize: 18,
    width: '25%',
    textAlign: 'center',
  },
  active: {
    padding: 10,
    fontSize: 18,
    width: '25%',
    color: 'red',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
  all: {
    backgroundColor: '#f7f7f7'
  },
  li: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    textAlign: 'left',
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
  }
});
