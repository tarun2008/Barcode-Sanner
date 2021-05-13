import React from 'react';
import {Text, View, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {barCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
   constructor(){
       super();
       this.state = {
         hasCameraPermission : null,
         sacnned : false,
         scannedData : '',
         buttonState : 'normal'

       }
   }
   getCameraPermissions = async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions : status === "granted"
    });
  }

  handleBarCodeScanned = async({type,data})=>{
    this.setState({
      scanned : true,
      scannedData : data,
      buttonState : 'normal'
    })
  }
  render(){
    if(buttonState === "clicked" && hasCameraPermissions){
        return(
          <BarCodeScanner
          onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          />
        );
      }
    
      else if(buttonState === "normal"){
        return (
          <View style={styles.container}>
            <Image source = {require('./assets/Scanner')}/>
            <Text style={styles.displayText}>{
              hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"
            }</Text>
            <TouchableOpacity
            onPress = {this.getCameraPermissions}
            style={styles.scanButton}>
              <Text style={styles.buttonText}>Scan QR Code</Text>            
            </TouchableOpacity>
          </View>
        );
      }
  }  
}
const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',      
    },
    displayText : {
     fontSize : 15,
     textDecorationLine : 'underline',   
    },
    scanButton : {
      backgroundColor : '#2196F3',
      padding : 10,
      margin : 10,
    },
    buttonText : {
      fontSize : 20,
    }
  });  



