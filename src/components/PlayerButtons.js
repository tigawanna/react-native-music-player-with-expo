import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  Dimensions,StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default function PlayerButtons({isPlaying,handlePlayPause}) {
 
    // const playPressed=()=>{
    //  handlePlayPause()
    // }
    //  const pausePressed=()=>{
    //   handlePlayPause()
    // }

  return (
    <View style={styles.container}>
 <View style={styles.controls}>
      <MaterialCommunityIcons 
      name="skip-previous" size={44}
       color="black"  onPress={()=>prevPressed()}/>

       {!isPlaying?<MaterialCommunityIcons name="play" size={44} 
       color="black" onPress={()=>handlePlayPause()}
       />:<MaterialCommunityIcons name="pause" 
       size={44} color="black" onPress={()=>handlePlayPause()}/>}

      <MaterialCommunityIcons name="skip-next" size={44} 
      color="black"  onPress={()=>nextPressed()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:3,
    width:"100%",

  },

  controls: {
    flexDirection:"row",
    backgroundColor: '#fff',
  
    justifyContent: 'center',
    width:"90%",
    borderWidth:1,
    margin:5,

  },
});
