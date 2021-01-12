import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class TransactionScreen extends Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions : null,
      scanned : false,
      scannedData : '',
      buttonState : 'notPressed',
    }
  }

  getCameraPermission = async() => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions : status === 'granted'
    })
  }

  handleBarCodeScanned = async( {type, data} ) => {
    this.setState({
      scannedData : data,
      scanned : true,
      buttonState : 'normal'
    })
  }

  render(){

    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    console.log(buttonState);

    if(buttonState === 'clicked' && hasCameraPermissions){
      return(
        <BarCodeScanner 
          onBarCodeScanned = {
            scanned 
            ? undefined
            : (this.handleBarCodeScanned)
          }
          style = {StyleSheet.absoluteFillObject}
        ></BarCodeScanner>
      )
    }

    else if(buttonState === 'normal'){
      return(
        <View style = {style.view}>
          <Text> {
            hasCameraPermissions === true
            ? this.state.scannedData
            : 'Request camera permission'
            } </Text>
          <TouchableOpacity onPress = {
            this.getCameraPermission
          }><Text style = {style.button}> QR code scan </Text></TouchableOpacity>
        </View>
      )
    }
  }
}

const style = StyleSheet.create({
  view : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },

  button : {
    flex : 1,
    justifyContent : 'center',
    backgroundColor : 'black',
    color : 'white',
    fontSize : 30,
    marginTop: 30,
    width : 200,
    height : 40,
    borderRadius : 10
  }
})