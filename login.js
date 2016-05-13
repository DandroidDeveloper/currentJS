'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  AsyncStorage
} from 'react-native';

import Header from './header';

import Signup from './signup';
import Account from './account';

import Firebase from 'firebase';

let app = new Firebase("https://loginpage3.firebaseio.com/");

import styles from './styles.js';

export default class login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Header text="Login" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
        </View>
          <TouchableOpacity
            onPress={this.login.bind(this)}
            style={styles.floatingActionButtonPrimary}>
 	    <Image source={require('image!ic_done_white_24dp')}></Image>
	  </TouchableOpacity>

          <TouchableOpacity
            onPress={this.goToSignup.bind(this)}
            style={styles.floatingActionButtonSecondary}>
	    <Image source={require('image!ic_person_add_white_24dp')}></Image>
	  </TouchableOpacity>
      </View>
    );
  }

  login(){

    this.setState({
      loaded: false
    });

    app.authWithPassword({
      "email": this.state.email,
      "password": this.state.password
    }, (error, user_data) => {

      this.setState({
        loaded: true
      });

      if(error){
        alert('Login Failed. Please try again');
      }else{
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        this.props.navigator.push({
          component: Account
        });
      }
    });


  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup,
    });
  }

}

AppRegistry.registerComponent('login', () => login);
