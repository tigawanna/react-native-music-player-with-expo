import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SingleAudio from './../SingleAudio';
import { AudioContext } from './../../context/AudioProvider';
import OnePlayer from './OnePlayer';



export default function Player() {
const  context = useContext(AudioContext)
  return (
    <View style={styles.container}>
    <SingleAudio/>
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
  },
});
