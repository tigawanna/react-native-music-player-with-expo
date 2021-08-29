import React, { Component } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AudioContext } from './navigation/context/AudioProvider';

export class AudioList extends Component {
    static contextType=AudioContext
  
    render() {
        return (
            <View>
     
            <FlatList
            style={styles.list}
            data={this.context.audioFiles}
             renderItem={({item})=>
             (
             <TouchableOpacity
             style={styles.listitem}
             onPress={()=>console.log(item)}
              >
              <Text style={styles.text}>{item.filename}</Text>
            
              </TouchableOpacity>
         )}
        
            />
            </View>
        )
    }
}

export default AudioList

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    list:{
        color:"black",
        backgroundColor:"#fff",
        margin:5,
        width:"100%",
        borderWidth:2,
        borderColor:"black",
        },
      listitem:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color:"black",
        backgroundColor:"#eee",
        margin:5,
        padding:10,
        width:"97%",
        borderWidth:1,
        borderColor:"black",
        }
  });




