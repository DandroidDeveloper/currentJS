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

import Messages from './messages';

import Profile from './profile';

import styles from './styles.js';

import Firebase from 'firebase';

let app = new Firebase("https://loginpage3.firebaseio.com/");

import clamp from 'clamp';

var SWIPE_THRESHOLD = 120;

const People = [
  'red',
  'green',
  'blue',
  'purple',
  'orange',
]

export default class account extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      person: People[0],
    }

  }
  _goToNextPerson() {
    let currentPersonIdx = People.indexOf(this.state.person);
    let newIdx = currentPersonIdx + 1;

    this.setState({
      person: People[newIdx > People.length - 1 ? 0 : newIdx]
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount(){
this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState.bind(this))
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      this.setState({
        user: user_data,
        loaded: true
      });
    });

  }
 _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextPerson();
    this._animateEntrance();
  }

  render(){
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    return (
      <View style={styles.container}>
       <View style={styles.toolbar} loaded={this.state.loaded}>
        <TouchableOpacity style={styles.toolbarMenu}
	 onPress={this.goToProfile.bind(this)}
         underlayColor={'#dddddd'}>
        <Image source={require('image!ic_account_circle_white_24dp')}></Image>
        </TouchableOpacity>
        <View style={styles.toolbarTitle}>
	<Text style={styles.title}>Collab</Text>
        </View>
        <TouchableOpacity style={styles.toolbarAction}
	 onPress={this.goToMessages.bind(this)}
         underlayColor={'#dddddd'}>
        <Image source={require('image!ic_chat_white_24dp')}></Image>
        </TouchableOpacity>
        </View>
        <Animated.View style={[styles.body, animatedCardStyles]} {...this._panResponder.panHandlers}>
        {
          this.state.user &&
              <View>
              <Image
                style={styles.profile}
                source={{uri: this.state.user.password.profileImageURL}}
              />
              <View>
                <Text style={styles.profileName}>{this.state.user.password.email}</Text>
              </View>
              </View>
        }
        </Animated.View>
        <Animated.View style={[styles.floatingActionButtonSecondary, animatedNopeStyles]}>
        <Image source={require('image!ic_clear_white_24dp')}></Image>
        </Animated.View>

        <Animated.View style={[styles.floatingActionButtonPrimary, animatedYupStyles]}>
        <Image source={require('image!ic_done_white_24dp')}></Image>
        </Animated.View>
              <TouchableOpacity
                  style={styles.floatingActionButtonTertiary}>
		  <Image source={require('image!ic_arrow_upward_white_24dp')}></Image>
	      </TouchableOpacity>
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
  goToMessages(){
    this.props.navigator.push({
      component: Messages,
    });
  }
  goToProfile(){
    this.props.navigator.push({
      component: Profile,
    });
  }

}
