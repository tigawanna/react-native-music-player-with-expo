import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  Dimensions,Image,StyleSheet, Text, View } from 'react-native';
// import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import MusicInfo from 'expo-music-info';
import { AudioContext } from './../context/AudioProvider';
import { useContext, useState,useEffect } from 'react';
import { handleNextPressed, handlePlayPause, handlePrevPressed } from './misc/audioMethods';
import { pauseFn, resumeFn } from './misc/audioControler';
import { timeConvert, timeFix } from './misc/helper';


const SCREEN_WIDTH = Dimensions.get('window').width;
export default function SingleAudio() {
  const  context = useContext(AudioContext)
  const {
    currentaudio,
    isPlaying,
    playbackDuration,
    playbackPosition,
    isRepeating,
    isShuffling,
    handleRepeatPressed,
    handleShufflePressed,
     }=context

  useEffect(() => {
  context.loadPreviousAudio()
    }, [])

// const [shuffleOn, setshuffleOn] = useState()
// const [repeatOn, setrepeatOn] = useState()
const calculateSeekbar=()=>{
 if(playbackPosition!==null&&playbackDuration!==null){
    return playbackPosition/playbackDuration
  }
  else return 0
}

const setMusicOn=()=>{
  console.log("real")
}

// console.log("repeat shuffle",isRepeating,isShuffling)

const repeatBg=isRepeating?"purple":"white"
const shuffleBg=isShuffling?"purple":"white"

const repeatIcon=isRepeating?"white":"black"
const shuffleIcon=isShuffling?"white":"black"


//checkif is loaded
  if(!context.currentaudio){
  return<Text>Loading...</Text>
  }
  return (
    <View style={styles.container}>
      <View style={styles.trackno}>
      <Text>{context.currentaudioIndex+1}/
      {context.totalAudioCount}</Text>
      </View>
      <View style={styles.albumart}>
        {true ? 
        <MaterialCommunityIcons name="music-circle"
        size={250} color="black" />
        : null
     
        
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
      style={styles.slide}
      thumbTintColor="purple"
      value={calculateSeekbar()}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#999"
      maximumTrackTintColor="#000000"
      // onValueChange={(value) => {
      //   setCurrentPosition(timeConvert(value * context.currentaudio.duration));
      //   // console.log(context.currentaudio.duration*value)
      // }}
      onSlidingStart={async () => {
        if (!context.isPlaying) return;
        try {
          await pauseFn(context.playbackObj);
        } catch (err) {
          console.log("error in slider start method", err);
        }
      }}
      onSlidingComplete={async (value) => {
        if (context.soundOb === null) return;
        try {
          const status = await context.playbackObj.setPositionAsync(
            Math.floor(context.soundOb.durationMillis * value)
          );
          // setPositionAsync(context.soundObj.durationMillis*value)
           context.updateState(context, {
            soundOb: status,
            playbackPosition: status.positionMillis,
           
            });
          const resStatus=await resumeFn(context.playbackObj);
          context.updateState(context, {
            soundOb: resStatus,
            isPlaying:true,
            playbackPosition: status.positionMillis,
            });
            console.log("isshuflling?",context.isShuffling)
        } catch (err) {
          console.log("error in slider completion method", err);
        }
      }}
    />

     </View>
     <View style={styles.times}>
     <Text style={styles.starttimes}>{timeFix(playbackPosition)}</Text>
     <Text style={styles.endtimes}>{timeFix(playbackDuration)}</Text>
     </View>
    <View style={styles.controls}>
    <View style={{...styles.repeat,backgroundColor:repeatBg}}>
    <MaterialCommunityIcons name="repeat"
     size={30} color={repeatIcon}
      onPress={()=>handleRepeatPressed(context)} />
     </View>
     <View style={styles.playpause}>
    <MaterialCommunityIcons 
    name="skip-previous" size={44}
     color="black"  onPress={()=>handlePrevPressed(context)}/>

     {!isPlaying?<MaterialCommunityIcons name="play" size={64} 
     color="black" onPress={()=>handlePlayPause(currentaudio,context,setMusicOn)}
     />:<MaterialCommunityIcons name="pause" 
     size={64} color="black" onPress={()=>handlePlayPause(currentaudio,context,setMusicOn)}/>}

    <MaterialCommunityIcons name="skip-next" size={44} 
    color="black"  onPress={()=>handleNextPressed(context)} />
    </View>
    <View 
    style={{...styles.shuffle,backgroundColor:shuffleBg}}>
    <MaterialCommunityIcons name="shuffle-variant"
    size={30} color={shuffleIcon} 
    onPress={()=>handleShufflePressed(context)}/>
    </View>

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
    justifyContent: 'space-evenly',
    width:"90%",

  },
  trackno: {
   fontSize:20,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
     width:"90%",
    fontWeight:"800",
    margin:5,
  },
  albumart: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
 },
 seekbar: {
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  width:SCREEN_WIDTH-10,
},
slide: {
  width:"100%",
  height: 10,
},
times: {
  flexDirection:"row",
   alignItems: 'center',
  justifyContent: 'space-between',
  width:SCREEN_WIDTH-30,
  // borderWidth:1,
},
  songtitle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:"90%",
   },
  songtitletext: {
    alignItems: 'center',
    justifyContent: 'center',
    width:"90%",
   marginTop:2,
    fontWeight:"bold",
    fontSize:15,
  },
  songartisttext: {
    alignItems: 'center',
    justifyContent: 'center',
    width:"90%",
    marginTop:5,
    fontWeight:"700",
    borderTopWidth:1,
  },

  controls: {
    flexDirection:"row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:"100%",
    margin:5,
    // borderWidth:1,
},
repeat: {
  flexDirection:"row",
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  width:"10%",
  margin:5,
  // borderWidth:1,


},
playpause: {
  flexDirection:"row",
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  width:"60%",
  margin:1,
  // borderWidth:1,

},
  shuffle: {
    flexDirection:"row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width:"10%",
    margin:5,
    // borderWidth:1,

  },
});
