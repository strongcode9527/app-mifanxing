import React from 'react'
import {Provider} from 'mobx-react'
// 获取store实例
import store from '../store'
import {StackNavigator} from 'react-navigation'

import HomeScreen from './home'
import DetailScreen from './detail'

const Navigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      headerTitle: 'Detail'
    }
  }
})


const  Navigation = () => {
  return (
    <Provider rootStore={store}>
      <Navigator />
    </Provider>
  )
}



export default Navigation