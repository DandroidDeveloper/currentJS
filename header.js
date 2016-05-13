'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner';

export default class header extends Component {

  render(){
    return (
      <View style={styles.toolbar}>
        <View style={styles.toolbarTitle}>
          <Text style={styles.title}>{this.props.text}</Text>
        </View>
        <View style={styles.header_item}>
        {  !this.props.loaded &&
            <GiftedSpinner />
        }
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection:'row',
    backgroundColor:'#212121',
    elevation: 5,
},
  toolbarTitle: {
    flex:8,
    alignItems:'center',
    margin:10,
},
  title: {
    color:'#FFF',
    fontSize:24,
},
  header_item: {
    paddingLeft: 10,
    paddingRight: 10
  },
});

AppRegistry.registerComponent('header', () => header);
