import {path} from 'ramda'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import CookieManager from 'react-native-cookies'


import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
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

    this.forumId = ['3,4,5', '3', '4', '5']
    this.topicCategories = ['getAll', 'getNews', 'getEvaluatings', 'getVideos']
  }

  componentWillMount() {
    this.props.store.topicStore.fetchTopics(1)
  }

  handlePress = (id) => {
    const {navigation} = this.props
    navigation.navigate('Detail', {
      id,
    })
  }

  handleEndReach = () => {
    const {fetchTopics, meta, isLoading} = this.props.store.topicStore
  
    !isLoading && !meta.last && fetchTopics(meta.number + 1, 10, this.forumId[this.state.activeIndex])
  }

  handleRefresh = () => {

    this.setState({
      isRefreshing: true,
    })

    setTimeout(() => this.setState({
      isRefreshing: false,
    }), 1500)

  }

  handleChangeTab = (activeIndex) => {
    const {fetchTopics} = this.props.store.topicStore
    this.setState({
      activeIndex,
    })

    fetchTopics(1, 10, this.forumId[activeIndex])
  }

  handleLogin = () => {
    const {navigation} = this.props
    navigation.navigate('Login')
  }

  render() {
    const store = this.props.store.topicStore,
          topics = store[this.topicCategories[this.state.activeIndex]],
          titles = ['精选', '新闻', '评测', '视频'],
          userInfo = this.props.store.userStore.userInfo


    return (
      <View>
        <View style={styles.header}>
          {
            userInfo.userAvatar
            ? <Image
                style={{width: '100%', height: 150}}
                source={{uri: userInfo.userAvatar}}
              />
            : <Text
                style={styles.category}
                onPress={this.handleLogin}
              >
                登录
              </Text>
          }
        </View>
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
            onEndReached={this.handleEndReach}
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
