import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioList from './../AudioList';
import PlayList from './../Playlist';
import Player from './../Player';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function AppNavigator() {

const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="audiolist" component={AudioList} 
      options={{tabBarIcon:({color,size})=>{
      return <MaterialCommunityIcons name="music-box" size={size} color={color} />
      }}}

      />
      <Tab.Screen name="player" component={Player} 
      options={{tabBarIcon:({color,size})=>{
        return <MaterialCommunityIcons name="music" size={size} color={color} />
        }}}
      />
      <Tab.Screen name="playlist" component={PlayList} 
      options={{tabBarIcon:({color,size})=>{
        return <MaterialCommunityIcons name="playlist-music" size={size} color={color} />
        }}}
      />
    </Tab.Navigator>
  </NavigationContainer>
  );
}


