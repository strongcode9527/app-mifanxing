import React from 'react'
import {Provider} from 'mobx-react'
import {StackNavigator} from 'react-navigation'

import store from '../store'
import HomeScreen from './home'
import DetailScreen from './detail'
import LoginScreen from './login/Login'

const Navigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Login'
    }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      headerTitle: 'Detail'
    }
  },

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