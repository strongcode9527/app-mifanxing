import React from 'react'
import {Provider} from 'mobx-react'
import {StackNavigator} from 'react-navigation'

import store from '../store'
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


const StoreInstance = store.create(
  {},
)


const  Navigation = () => {
  return (
    <Provider store={StoreInstance}>
      <Navigator />
    </Provider>
  )
}



export default Navigation