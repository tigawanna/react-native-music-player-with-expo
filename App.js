import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AudioProvider from './src/context/AudioProvider';
import AppNavigator from './src/components/screens/navigation/AppNavigator';




export default function App() {
  return (
    <AudioProvider>
    <AppNavigator/>
    </AudioProvider>

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
