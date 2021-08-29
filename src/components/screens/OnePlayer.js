import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { AudioContext } from './../../context/AudioProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import MusicInfo from 'expo-music-info';


const SCREEN_WIDTH = Dimensions.get('window').width;
export default function OnePlayer() {
const  context = useContext(AudioContext)
const{isPlaying,currentaudio,playbackPosition,playbackDuration}=context
const [songMeta, setSongMeta] = useState({image:null});

const getMetaD = async (uri) => {
    try{
      let metadata = await MusicInfo.getMusicInfoAsync(uri,
        {
          title: true,
          artist: true,
          album: true,
          genre: true,
          picture: true,
        }
      );
    
      setSongMeta({
        ...songMeta,
        image:metadata.picture.pictureData,
        artist:metadata.artist,
        album:metadata.album,
        genre:metadata.genre,
        title:metadata.title
      })
    }
    catch(err){
    console.log("promise error",err)
    }
    };
    
    if(context.currentaudio){
      getMetaD(currentaudio.uri)
      }

      const calculateSeekbar=()=>{
        if(playbackPosition!==null&&playbackDuration!==null){
           return playbackPosition/playbackDuration
         }
         else return 0
       }
  return (
    <View style={styles.container}>
      <View style={styles.trackno}>
      <Text>{context.currentaudioIndex+1}/
      {context.totalAudioCount}</Text>
      </View>
      <View style={styles.albumart}>
        {songMeta.image === null ? 
        <MaterialCommunityIcons name="music-circle"
        size={250} color="black" />
        : 
          <Image
            style={{
              width: 250,
              height: 250,
              resizeMode: "contain",
              borderWidth: 1,
              borderColor: "red",
            }}
            source={{ uri: songMeta.image }}
          />
        
        }
      </View>
      <View style={styles.songtitle}>
      <Text style={styles.songtitletext}>
      {context. currentaudio.filename}
      </Text>
      <Text style={styles.songartisttext}>cherry wyse </Text>
      </View>
      <View style={styles.seekbar}>
      <Slider
      style={{width: SCREEN_WIDTH-20, height: 40}}
      value={calculateSeekbar()}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#999"
      maximumTrackTintColor="#000000"
      />
     </View>
    <View style={styles.controls}>
    <MaterialCommunityIcons 
    name="skip-previous" size={44}
     color="black"  onPress={()=>prevPressed()}/>

     {!isPlaying?<MaterialCommunityIcons name="play" size={64} 
     color="black" onPress={()=>handlePlayPause()}
     />:<MaterialCommunityIcons name="pause" 
     size={64} color="black" onPress={()=>handlePlayPause()}/>}

    <MaterialCommunityIcons name="skip-next" size={44} 
    color="black"  onPress={()=>handleNextPressed()} />
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
  },
});