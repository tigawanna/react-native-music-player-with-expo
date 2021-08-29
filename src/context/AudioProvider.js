import React, { Component,createContext } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
import {Audio} from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeaudioForNextOpening, storePositionForNextOpening, 
  storeShuffleVal, storeRepeatVal, randomIndex } from './../components/misc/helper';
import { playnextFn } from '../components/misc/audioControler';
import MusicInfo from 'expo-music-info';

export const AudioContext=createContext()
export class AudioProvider extends Component {
  constructor(props) {
    super(props);
      this.state = {
        audioFiles:[],
        permissionError:false,
        dataProvider:new DataProvider((r1,r2)=>r1!==r2),
        playbackObj:new Audio.Sound(),
        soundOb:null,
        currentaudio:{},
        isPlaying:false,
        currentaudioIndex:null,
        playbackDuration:null,
        playbackPosition:null,
        currentAudioPosition:null,
        songMeta:null,
        isShuffling:false,
        isRepeating:false,
        onPlaybackSatusUpdate:this.onPlaybackSatusUpdate
    };
    this.totalAudioCount=0
  }

  permissinoAlert = () => {
    Alert.alert(
      "Permission Required, App needs permission to read audio files",
      [
        {
          text: "Okey",
          onPress: () => this.getPermission(),
        },
        {
          text: "fuck off",
          onPress: () => this.permissinoAlert(),
        },
      ]
    );
  };

  getAudioFiles= async()=>{
    const {dataProvider,audioFiles}=this.state
    let media =await MediaLibrary.getAssetsAsync({
        mediaType:"audio"
    })
    media =await MediaLibrary.getAssetsAsync({
        mediaType:"audio",
        first:media.totalCount,
    })
    // console.log("loaded audio",media.assets)
    //filtering audio less than 60secs
    const longSongs=media.assets.filter(function(el){
      return el.duration>60
    })
    // console.log("longer audio",longSongs)
    this.totalAudioCount=media.totalCount
    this.setState({...this.state,audioFiles:[...audioFiles,...longSongs]
        ,dataProvider:dataProvider.cloneWithRows([...audioFiles,...longSongs])}
     )
    // console.log(media.assets)
     }

  getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    if (permission.granted) {
        this.getAudioFiles()
    }
    if (!permission.granted && !permission.canAskAgain) {
        //can't read files , need permisions
        this.setState({...this.state,permissionError:true})
      }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        //display lert that user must display permission
        this.permissinoAlert();
      }
      if (status === "granted") {
        //read all audio files
        this.getAudioFiles()
      }
      if (status === "denied" && !canAskAgain) {
        //can't read files , need permisions
        this.setState({...this.state,permissionError:true})
      }
   
    }
    console.log(permission);
  };
  handleShufflePressed=()=>{
  this.setState({...this.state,isShuffling:!this.state.isShuffling})
  // console.log("saving shuffle mode",!this.state.isShuffling)
   storeShuffleVal(!this.state.isShuffling)
  }
  handleRepeatPressed=async()=>{
this.setState({...this.state,isRepeating:!this.state.isRepeating})
    storeRepeatVal(!this.state.isRepeating)
    }

  componentDidMount() {
    this.getPermission()
   
  }

  updateState=(prevState,newState={})=>{
    this.setState({...prevState,...newState})
  }

  loadPreviousAudio=async()=>{
    console.log("loadig preious song")
    //loading form async storage
    let previousAudio=await AsyncStorage.getItem('previousAudio')
    let previousPosition=await AsyncStorage.getItem('previousAudioPosition')
    let repeat=await AsyncStorage.getItem('repeat')
    let shuffle=await AsyncStorage.getItem('shuffle')
    
    let currentAudio;
    let currentAudioIndex;
   
    if(previousAudio===null){
      currentAudio=this.state.audioFiles[0]
      currentAudioIndex=0
    }
    else{
      previousAudio=JSON.parse(previousAudio)
      previousAudioPosition=JSON.parse(previousPosition)

      repeat=JSON.parse(repeat)
      shuffle=JSON.parse(shuffle)
      console.log("reshuffvalues",repeat,shuffle)

      currentAudio=previousAudio.audio
      currentAudioIndex=previousAudio.index
      savedAudioPosition=previousAudioPosition.position

  
      if(this.state.soundOb===null){
        try{
          const uri=previousAudio.audio.uri
           await this.state.playbackObj.loadAsync(
            {uri},
            {shouldPlay:false},)
  
          const status=await this.state.playbackObj.setPositionAsync(savedAudioPosition)
          this.setState({...this.state,
            soundOb:status,
            currentaudio:currentAudio,
            currentaudioIndex:currentAudioIndex,
            playbackPosition:savedAudioPosition,
            playbackDuration:status.durationMillis,

            isShuffling:shuffle.shuffleVal,
            isRepeating:repeat.repeatVal,
        })
          this.state.playbackObj.setOnPlaybackStatusUpdate(this.state.onPlaybackSatusUpdate)

        }catch(err){
          console.log("without sound object",err)
        }
    
      }
      else{
        try{
          const status=await this.state.playbackObj.setPositionAsync(savedAudioPosition)
            this.setState({...this.state,
              soundOb:status,
              currentaudio:currentAudio,
              currentaudioIndex:currentAudioIndex,
              playbackPosition:savedAudioPosition,
              playbackDuration:status.durationMillis,

              isShuffling:shuffle.shuffleVal,
              isRepeating:repeat.repeatVal,
            })
            this.state.playbackObj.setOnPlaybackStatusUpdate(this.state.onPlaybackSatusUpdate)
        }catch(err){
          console.log("with sound object",err)
        }
   
      }
      
    }

  }

  onPlaybackSatusUpdate=async(playbackStatus)=>{
 //  console.log("duration milis",formatMillis(playbackStatus.durationMillis))
  //  console.log("is shuffle",this.state.isShuffling)

    if(playbackStatus.isLoaded&&playbackStatus.isPlaying){
      this.updateState({
        ...this.state,
        playbackPosition:playbackStatus.positionMillis,
        playbackDuration:playbackStatus.durationMillis
      })
      storePositionForNextOpening(
        playbackStatus.positionMillis,
  
        )
    }
    if(playbackStatus.didJustFinish){
    // const newIndex=this.state.currentaudioIndex+1
    const newIndex=this.state.isShuffling?
    randomIndex(this.totalAudioCount):this.state.currentaudioIndex+1
    const nextaudio=this.state.audioFiles[newIndex]
    const status=await playnextFn(this.state.playbackObj,nextaudio.uri)
    if(status!==undefined||!newIndex>=this.totalAudioCount)
    {
     this.updateState(this.state,
     {soundOb:status,
     currentaudio:nextaudio,
     isPlaying:true, 
     currentaudioIndex:newIndex,
     })
     storePositionForNextOpening(playbackStatus.positionMillis)
     return storeaudioForNextOpening(
       nextaudio,newIndex,

       )
    }
    else{
      if(newIndex>=this.totalAudioCount){
      this.state.playbackObj.unloadAsync()
      return this.updateState(
        this.state,
         {playbackObj:this.state.playbackObj,
           soundOb:null,
           currentaudio:this.state.audioFiles[0],
           isPlaying:false,
           currentaudioIndex:0,
           playbackDuration:null,
           playbackPosition:null
         })
        }
        else if (status===undefined){
          try{
            await this.state.playbackObj.stopAsync()
            await this.state.playbackObj.unloadAsync()
           return"can't play this"
             }
             catch(error){
               const newerIndex=newIndex+1
               const newersong=
               this.state.audioFiles[newerIndex]
          const playbackObj=new Audio.Sound();
          const statu=await playbackObj.loadAsync({uri:newersong.uri},{shouldPlay:true})
          this.updateState(
           this.state,
            {playbackObj:playbackObj,
              soundOb:statu,
              currentaudio:newersong,
              isPlaying:true,
              currentaudioIndex:newerIndex,
            })
            playbackObj.setOnPlaybackStatusUpdate(this.onPlaybackSatusUpdate)
            storePositionForNextOpening(playbackStatus.positionMillis)
           return storeaudioForNextOpening(
             newersong,newerIndex,
      
            )
         }
    }
    }
    
    }
     }


   
  
  render() {
      const {
        audioFiles,
        dataProvider,
        permissionError,
        playbackObj,
        soundOb,
        currentaudio,
        isPlaying,
        currentaudioIndex,
        playbackDuration,
        playbackPosition,
        songMeta,
        isRepeating,
        isShuffling,
        currentAudioPosition
      }=this.state
    // console.log("the previous audio position is",
    // this.state.currentAudioPosition)
    if(permissionError){
        return  <View style={styles.container}>
        <Text style={{fontSize:20,textAlign:"center",color:"red"}}>
        needs permission to use this app</Text>
        </View>
    }
    return (
<AudioContext.Provider value={
  {
    audioFiles,
    dataProvider,
    playbackObj,
    soundOb,
    currentaudio,
    isPlaying,
    currentaudioIndex,
    updateState:this.updateState,
    totalAudioCount:this.totalAudioCount,
    playbackDuration,
    playbackPosition,
    currentAudioPosition,
    songMeta,
    isRepeating,
    isShuffling,
    handleRepeatPressed:this.handleRepeatPressed,
    handleShufflePressed:this.handleShufflePressed,
    loadPreviousAudio:this.loadPreviousAudio,
    onPlaybackSatusUpdate:this.onPlaybackSatusUpdate
  }}>
{this.props.children}
</AudioContext.Provider>
    );
    
  }
}

export default AudioProvider


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });