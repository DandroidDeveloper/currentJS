'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  View
} from 'react-native';

import Header from './header';

import Login from './login';

import Firebase from 'firebase';

let app = new Firebase("https://loginpage3.firebaseio.com/");

import styles from './styles.js';

export default class signup extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      loaded: false
    });

    app.createUser({
      'email': this.state.email,
      'password': this.state.password
    }, (error, userData) => {

      if(error){
        switch(error.code){

          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
          break;

          default:
            alert("Error creating user:");
        }

      }else{
        alert('Your account was created!');
      }

      this.setState({
        email: '',
        password: '',
        loaded: true
      });

    });

  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
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
            placeholder={"Password"}/>
        </View>
          <TouchableOpacity
            onPress={this.signup.bind(this)}
            style={styles.floatingActionButtonPrimary}>
	    <Image source={require('image!ic_person_add_white_24dp')}></Image>
	  </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goToLogin.bind(this)}
            style={styles.floatingActionButtonSecondary}>
	    <Image source={require('image!ic_arrow_back_white_24dp')}></Image>
	  </TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);
