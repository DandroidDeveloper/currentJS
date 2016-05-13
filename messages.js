'use strict';
import React, {
  AppRegistry,
  Component, 
  PanResponder,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import Header from './header';

import Login from './login';

import Account from './account';

import styles from './styles.js';

import Firebase from 'firebase';

let app = new Firebase("https://loginpage3.firebaseio.com/");

export default class messages extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }

  componentWillMount(){
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      this.setState({
        user: user_data,
        loaded: true
      });
    });

  }

  render(){

    return (
      <View style={styles.container}>
       <View style={styles.toolbar} loaded={this.state.loaded}>
        <TouchableOpacity style={styles.toolbarMenu}
	 onPress={this.goToAccount.bind(this)}
         underlayColor={'#dddddd'}>
        <Image source={require('image!ic_queue_music_white_24dp')}></Image>
        </TouchableOpacity>
        <View style={styles.toolbarTitle}>
	<Text style={styles.title}>Messages</Text>
        </View>
        <TouchableOpacity style={styles.toolbarAction}
         underlayColor={'#dddddd'}>
        <Image source={require('image!ic_more_vert_white_24dp')}></Image>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  logout(){

    AsyncStorage.removeItem('user_data').then(() => {    
      app.unauth();
      this.props.navigator.push({
        component: Login
      });
    });

  }
  goToAccount(){
    this.props.navigator.push({
      component: Account,
    });
  }

}
