import React from 'react'
import { useState } from 'react'
import { View, Text, Modal, 
    StyleSheet, TouchableHighlight, 
    Dimensions, } from 'react-native'

export default function OptionModal({open,requestClose,
  thing,onPressPlay,onPressPlaylist}) {

    return (
    <View style={styles.centeredView}
    onPress={()=> requestClose()}
    >
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={()=>requestClose()}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.closemodal}>
          <TouchableHighlight
          style={styles.closeoption}
          onPress={() => {
            // setModalVisible(!modalVisible);
            requestClose()
          }}>
          <Text style={styles.textStyle}>X</Text>
        </TouchableHighlight>
          </View>
          {thing?
            <Text style={styles.modalText}>{thing.filename}</Text>:
            <Text style={styles.modalText}>oops,go back and try again</Text>}
        
            <View style={styles.options}>
            <TouchableHighlight
              style={{ ...styles.playoption, backgroundColor: '#4a2' ,color:"black"}}
              onPress={() => {onPressPlay()}}>
              <Text style={styles.textStyle}>Play</Text>
            </TouchableHighlight>

            <TouchableHighlight
            style={{ ...styles.playlistoption, backgroundColor: '#4a2' ,color:"black"}}
            onPress={() => {onPressPlaylist()}}>
            <Text style={styles.textStyle}>Add to playlist</Text>
          </TouchableHighlight>
          </View>
          </View>
        </View>
      </Modal>
   </View>
    )
}
const SCREEN_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width:SCREEN_WIDTH,
      backgroundColor:"#eee",
      position:"absolute",
      bottom:0,

},
    modalView: {
      margin: 20,
      height:200,
      position:"relative",
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,

    },

    closeoption: {
        borderRadius: 3,
       shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:"red",
        padding:3,
        margin:3,
        position:"absolute",
        right:-175,
        top:-25,
        width:50,
     }, 
    options: {
        flex: 1,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
   
        },   
      playoption: {
        flex: 1,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        margin:5,
        padding:10,
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },  
      playlistoption: {
        flex: 1,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        margin:5,
        padding:10,
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },  
    openButton: {
      backgroundColor: '#eFF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      color:"black"
    },

    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });