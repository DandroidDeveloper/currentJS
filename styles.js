'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#303030',
  },
  toolbar: {
    flexDirection:'row',
    backgroundColor:'#212121',
    elevation: 5,
},
  toolbarMenu: {
    flex:1,
    alignItems:'flex-start',
    margin:10,
},
  toolbarTitle: {
    flex:8,
    alignItems:'center',
    margin:10,
},
  toolbarAction: {
    flex:1,
    alignItems:'flex-end',
    margin:10,
},
  title: {
    color:'#FFF',
    fontSize:24,
},
  body: {
    alignSelf:'center',
    alignItems:'center',
    borderRadius: 10,
    width: 320,
    height: 420,
    marginTop: 40,
    padding:10,
    backgroundColor: '#424242',
    elevation: 5,   
  },
  floatingActionButtonPrimary: {
	width: 60,
	height: 60,
	borderRadius: 30,
	backgroundColor: '#FF4081',
	position: 'absolute',
	bottom: 100,
	right: 20,
        alignItems:'center',
        justifyContent:'center',
	elevation:5,
  },
  floatingActionButtonSecondary: {
	width: 60,
	height: 60,
	borderRadius: 30,
	backgroundColor: '#FF4081',
	position: 'absolute',
	bottom: 100,
	left: 20,
        alignItems:'center',
        justifyContent:'center',
	elevation:5,
  },
  floatingActionButtonTertiary: {
	width: 60,
	height: 60,
	borderRadius: 30,
	backgroundColor: '#FF4081',
	alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
	elevation:5,
  },
  textinput: {
    height: 40,
    margin:10,
    backgroundColor:'#FFF',
    elevation:5,
  },
  profile: {
    width:300,
    height:300,
    marginTop:10,
    marginBottom:10,
    borderRadius:300,
},
  profileName: {
    color:'#FFF',
    fontSize:24,
    fontWeight:'200',
    alignSelf:'center',
},
});
