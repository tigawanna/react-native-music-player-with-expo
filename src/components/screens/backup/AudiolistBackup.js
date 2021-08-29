//initial state with all functions inside 

import React, { Component } from 'react'
import { Text,Dimensions, StyleSheet,View } from 'react-native'
import { AudioContext } from './navigation/context/AudioProvider';
import { RecyclerListView,LayoutProvider } from 'recyclerlistview';
import AudioListItems from '../components/AudioListItems';
import OptionModal from '../components/modals/OptionModal';
import {Audio} from 'expo-av'
const SCREEN_WIDTH = Dimensions.get('window').width;

export class AudioList extends Component {
  constructor(props) {
    super(props);
   this.state={
     open:false,
     playbackObj:null,
     soundOb:null,
     currentaudio:{}
   }

    this.layoutProvider = new LayoutProvider((i) => {
      return 'audio'
    }, (type, dim) => {
      switch (type) {
        case 'audio': 
          dim.width =  SCREEN_WIDTH;
          dim.height = 100;
         break;
        default: 
          dim.width = 0;
          dim.height = 0;
          break;
      };
    })
  }
static contextType=AudioContext

optionPress=(thing)=>{
 this.setState({...this.state, open:true,thing:thing})
}

requestClose=()=>{
  this.setState({...this.state, open:false})
  console.log("closing,closing,closing")
}
 onPressPlay=()=>{
  this.setState({...this.state, open:false})
  console.log("playing song and closing")
 }
 onPressPlaylist=()=>{
  this.setState({...this.state, open:false})
  console.log("adding to playlist and closing")
 }


 handleAudioPress=async(audio)=>{
   //playing the audio for the first time
if(this.state.soundOb===null){
  const playbackObj=new Audio.Sound();

  const status= 
  await playbackObj.loadAsync({uri:audio.uri},{shouldPlay:true})
  console.log("audio pressed")
  return this.setState(
    {...this.state,playbackObj:playbackObj,soundOb:status,currentaudio:audio}
    )

}
// pause playing audio
if(this.state.soundOb.isLoaded&&this.state.soundOb.isPlaying){
 console.log("pausing audio")
  const status= await this.state.playbackObj.setStatusAsync({shouldPlay:false})
  return this.setState({...this.state,soundOb:status})
  // console.log("should play?",this.state.playbackObj)
  }

  // resume playing audio
if(this.state.soundOb.isLoaded&&!this.state.soundOb.isPlaying
  &&this.state.currentaudio.id===audio.id){
  console.log("resuming playing")
   const status= await this.state.playbackObj.playAsync()
   return this.setState({...this.state,soundOb:status})
   // console.log("should play?",this.state.playbackObj)
   }
}



rowRenderer=(type,item)=>{
    console.log("items in row",item)
    return <AudioListItems item={item}
    optionPress={this.optionPress}
    onaudioPress={()=>this.handleAudioPress(item)}
/>
}  
    render() {
        return (
          <AudioContext.Consumer>
          {({dataProvider})=>{
              return <View style={styles.container}>
              <RecyclerListView 
              style={styles.list}
              contentContainerStyle={{ margin: 3 }}
               dataProvider={dataProvider}
               layoutProvider={this.layoutProvider}
               rowRenderer={this.rowRenderer}
               />
               <OptionModal open={this.state.open}
               requestClose={this.requestClose}
               thing={this.state.thing}
               onPressPlay={this.onPressPlay}
               onPressPlaylist={this.onPressPlaylist}
               />
               </View>
          
          }}
          </AudioContext.Consumer>
        )
    }
}

export default AudioList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        },
    list:{
        flex:1,
        color:"black",
        backgroundColor:"#eee",
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
        backgroundColor:"#fff",
        margin:5,
        width:"95%",
        borderWidth:1,
        borderColor:"black",
        textAlign:'center',
        }
  });








//level 2


import React, { Component } from 'react'
import { Text,Dimensions, StyleSheet,View } from 'react-native'
import { AudioContext } from './navigation/context/AudioProvider';
import { RecyclerListView,LayoutProvider } from 'recyclerlistview';
import AudioListItems from '../components/AudioListItems';
import OptionModal from '../components/modals/OptionModal';
import {Audio} from 'expo-av'
import { pauseFn, playFn } from './../components/misc/audioControler';
const SCREEN_WIDTH = Dimensions.get('window').width;

export class AudioList extends Component {
  constructor(props) {
    super(props);
   this.state={
     open:false,
     playbackObj:null,
     soundOb:null,
     currentaudio:{}
   }

    this.layoutProvider = new LayoutProvider((i) => {
      return 'audio'
    }, (type, dim) => {
      switch (type) {
        case 'audio': 
          dim.width =  SCREEN_WIDTH;
          dim.height = 100;
         break;
        default: 
          dim.width = 0;
          dim.height = 0;
          break;
      };
    })
  }
static contextType=AudioContext

optionPress=(thing)=>{
 this.setState({...this.state, open:true,thing:thing})
}

requestClose=()=>{
  this.setState({...this.state, open:false})
  console.log("closing,closing,closing")
}
 onPressPlay=()=>{
  this.setState({...this.state, open:false})
  console.log("playing song and closing")
 }
 onPressPlaylist=()=>{
  this.setState({...this.state, open:false})
  console.log("adding to playlist and closing")
 }



 handleAudioPress=async(audio)=>{
   //playing the audio for the first time
if(this.state.soundOb===null){
  const playbackObj=new Audio.Sound();
  const status=await playFn(playbackObj,audio.uri)
  console.log("audio playing")
  return this.setState(
  {...this.state,playbackObj:playbackObj,soundOb:status,currentaudio:audio}
    )

}
// pause playing audio
if(this.state.soundOb.isLoaded&&this.state.soundOb.isPlaying){
 console.log("pausing audio")
  const status= pauseFn(this.state.playbackObj)
  return this.setState({...this.state,soundOb:status})
  // console.log("should play?",this.state.playbackObj)

  }

  // resume playing audio
if(this.state.soundOb.isLoaded&&!this.state.soundOb.isPlaying
  &&this.state.currentaudio.id===audio.id){
    console.log("sound obect contains",this.state.soundOb.isPlaying)
  console.log("resuming playing")
  const status= await this.state.playbackObj.playAsync()
 
   return this.setState({...this.state,soundOb:status})
   // console.log("should play?",this.state.playbackObj)
   }
   else{
     console.log("error resuming")
     console.log("sound obect in error",this.state.soundOb)
     console.log("is loaded?",this.state.soundOb.isLoaded)
     console.log("is playing?",this.state.soundOb.isPlaying)
     console.log("same audio?",this.state.currentaudio.id===audio.id)
   }
}



rowRenderer=(type,item)=>{
    // console.log("items in row",item)
    return <AudioListItems item={item}
    optionPress={this.optionPress}
    onaudioPress={()=>this.handleAudioPress(item)}
/>
}  
    render() {
        return (
          <AudioContext.Consumer>
          {({dataProvider})=>{
              return <View style={styles.container}>
              <RecyclerListView 
              style={styles.list}
              contentContainerStyle={{ margin: 3 }}
               dataProvider={dataProvider}
               layoutProvider={this.layoutProvider}
               rowRenderer={this.rowRenderer}
               />
               <OptionModal open={this.state.open}
               requestClose={this.requestClose}
               thing={this.state.thing}
               onPressPlay={this.onPressPlay}
               onPressPlaylist={this.onPressPlaylist}
               />
               </View>
          
          }}
          </AudioContext.Consumer>
        )
    }
}

export default AudioList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        },
    list:{
        flex:1,
        color:"black",
        backgroundColor:"#eee",
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
        backgroundColor:"#fff",
        margin:5,
        width:"95%",
        borderWidth:1,
        borderColor:"black",
        textAlign:'center',
        }
  });



//level 3

import React, { Component } from 'react'
import { Text,Dimensions, StyleSheet,View } from 'react-native'
import { AudioContext } from './navigation/context/AudioProvider';
import { RecyclerListView,LayoutProvider } from 'recyclerlistview';
import AudioListItems from '../components/AudioListItems';
import OptionModal from '../components/modals/OptionModal';
import {Audio} from 'expo-av'
import { pauseFn, playFn, resumeFn } from './../components/misc/audioControler';
const SCREEN_WIDTH = Dimensions.get('window').width;

export class AudioList extends Component {
  constructor(props) {
    super(props);
   this.state={
     open:false,
}

    this.layoutProvider = new LayoutProvider((i) => {
      return 'audio'
    }, (type, dim) => {
      switch (type) {
        case 'audio': 
          dim.width =  SCREEN_WIDTH;
          dim.height = 100;
         break;
        default: 
          dim.width = 0;
          dim.height = 0;
          break;
      };
    })
  }
static contextType=AudioContext

optionPress=(thing)=>{
 this.setState({...this.state, open:true,thing:thing})
}

requestClose=()=>{
  this.setState({...this.state, open:false})
  console.log("closing,closing,closing")
}
 onPressPlay=()=>{
  this.setState({...this.state, open:false})
  console.log("playing song and closing")
 }
 onPressPlaylist=()=>{
  this.setState({...this.state, open:false})
  console.log("adding to playlist and closing")
 }


 handleAudioPress=async(audio)=>{
   //playing the audio for the first time
  const {playbackObj,soundOb,currentaudio,updateState}=this.context
if(soundOb===null){
  const playbackObj=new Audio.Sound();
  const status= 
  await playFn(playbackObj,audio.uri)
  console.log("audio pressed")
  return this.setState(
    {...this.state,playbackObj:playbackObj,soundOb:status,currentaudio:audio}
    )

}
// pause playing audio
if(soundOb.isLoaded&&soundOb.isPlaying){
 console.log("pausing audio")
  const status= await pauseFn(playbackObj)
  return this.setState({...this.state,soundOb:status})
  // console.log("should play?",this.state.playbackObj)
  }

  // resume playing audio
if(soundOb.isLoaded&&!soundOb.isPlaying
  &&currentaudio.id===audio.id){
  console.log("resuming playing")
   const status= await resumeFn(this.state.playbackObj)
   return this.setState({...this.state,soundOb:status})
   // console.log("should play?",this.state.playbackObj)
   }
}



rowRenderer=(type,item)=>{
    console.log("items in row",item)
    return <AudioListItems item={item}
    optionPress={this.optionPress}
    onaudioPress={()=>this.handleAudioPress(item)}
/>
}  
    render() {
        return (
          <AudioContext.Consumer>
          {({dataProvider})=>{
              return <View style={styles.container}>
              <RecyclerListView 
              style={styles.list}
              contentContainerStyle={{ margin: 3 }}
               dataProvider={dataProvider}
               layoutProvider={this.layoutProvider}
               rowRenderer={this.rowRenderer}
               />
               <OptionModal open={this.state.open}
               requestClose={this.requestClose}
               thing={this.state.thing}
               onPressPlay={this.onPressPlay}
               onPressPlaylist={this.onPressPlaylist}
               />
               </View>
          
          }}
          </AudioContext.Consumer>
        )
    }
}

export default AudioList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        },
    list:{
        flex:1,
        color:"black",
        backgroundColor:"#eee",
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
        backgroundColor:"#fff",
        margin:5,
        width:"95%",
        borderWidth:1,
        borderColor:"black",
        textAlign:'center',
        }
  });


//level 5
import React, { Component } from 'react'
import { Text,Dimensions, StyleSheet,View } from 'react-native'
import { RecyclerListView,LayoutProvider } from 'recyclerlistview';
import {Audio} from 'expo-av'

import AudioListItems from './../AudioListItems';
import OptionModal from './../modals/OptionModal';
import { AudioContext } from './../../context/AudioProvider';
import { pauseFn, playFn, playnextFn, resumeFn } from './../misc/audioControler';
import MiniPlayer from './other/MiniPlayer';
const SCREEN_WIDTH = Dimensions.get('window').width;

export class AudioList extends Component {
  constructor(props) {
    super(props);
   this.state={
     open:false,
     musicOn:false
}

    this.layoutProvider = new LayoutProvider((i) => {
      return 'audio'
    }, (type, dim) => {
      switch (type) {
        case 'audio': 
          dim.width =  SCREEN_WIDTH;
          dim.height = 100;
         break;
        default: 
          dim.width = 0;
          dim.height = 0;
          break;
      };
    })
  }
static contextType=AudioContext



optionPress=(thing)=>{
 this.setState({...this.state, open:true,thing:thing})
}

requestClose=()=>{
  this.setState({...this.state, open:false})
  console.log("closing,closing,closing")
}
 onPressPlay=()=>{
  this.setState({...this.state, open:false})
  console.log("playing song and closing")
 }
 onPressPlaylist=()=>{
  this.setState({...this.state, open:false})
  console.log("adding to playlist and closing")
 }

 onPlaybackSatusUpdate=async(playbackStatus)=>{
// console.log("the play back, status is",playbackStatus)
if(playbackStatus.isLoaded&&playbackStatus.isPlaying){
  this.context.updateState({
    ...this.context,
    playbackPosition:playbackStatus.playableDurationMillis,
    playbackDuration:playbackStatus.durationMillis
  })
}
if(playbackStatus.didJustFinish){
const newIndex=this.context.currentaudioIndex+1
const nextaudio=this.context.audioFiles[newIndex]
const status=await playnextFn(this.context.playbackObj,nextaudio.uri)
console.log("current song is ",audio.uri)

console.log("index",index)
return updateState(this.context,
 {soundOb:status,
 currentaudio:nextaudio,
 isPlaying:true, 
 currentaudioIndex:newIndex,
 })


// else{
//  const newerIndex=newIndex+1 
//  const nexteraudio=this.context.audioFiles[newerIndex]
//  console.log("current song index ",newerIndex)
//  const status=await playnextFn(this.context.playbackObj,nexteraudio.uri)
 
//  return updateState(this.context,
//   {soundOb:status,
//   currentaudio:nexteraudio,
//   isPlaying:true, 
//   currentaudioIndex:newerIndex,
//   })

// }

}
 }

 handleAudioPress=async(audio)=>{
   //playing the audio for the first time
const {playbackObj,soundOb,currentaudio,updateState,audioFiles}=this.context
this.setState({...this.state,musicOn:true})
if(soundOb===null){
  const playbackObj=new Audio.Sound();
  const status= 
  await playFn(playbackObj,audio.uri)
  console.log("staus testing rejection",status)
 const index=audioFiles.indexOf(audio)
 if(status){
  console.log("index",index)
 updateState(this.context,
    {playbackObj:playbackObj,
      soundOb:status,
      currentaudio:audio,
      isPlaying:true,
      currentaudioIndex:index,
    })
return playbackObj.setOnPlaybackStatusUpdate(this.onPlaybackSatusUpdate)
  }
  else{
    const newsongindex=index+1
    const nextSong=audio[newsongindex]
    console.log("next song is ",nextSong)
  }

  
}

// pause playing audio
if(soundOb.isLoaded&&soundOb.isPlaying &&currentaudio.id===audio.id){

  const index=audioFiles.indexOf(audio)
  console.log("index",index)
  console.log("pausing audio")
  const status= await pauseFn(playbackObj)
  if(status){
  console.log("staus testing rejection",status)
  return updateState(this.context,
    {soundOb:status,
    isPlaying:false,
    currentaudioIndex:index,
    })
  }
    else{
      const newsongindex=index+1
      const nextSong=audio[newsongindex]
      console.log("next song is ",nextSong)
    }

  }

  // resume paused audio
if(soundOb.isLoaded&&!soundOb.isPlaying
  &&currentaudio.id===audio.id){
  console.log("resuming playing")
   const status= await resumeFn(playbackObj)

   console.log("staus testing rejection",status)

   const index=audioFiles.indexOf(audio)
   console.log("index",index)
   if(status){
   return updateState(this.context,
    {
      soundOb:status,
      isPlaying:true,
      currentaudioIndex:index,
     })
    }
     else{
      const newsongindex=index+1
      const nextSong=audio[newsongindex]
      console.log("next song is ",nextSong)
    }

   }

     //playing another audio
if(soundOb.isLoaded
  &&currentaudio.id!==audio.id){
  console.log("playing another song")

  console.log("staus testing rejection",status)

   const status= await playnextFn(playbackObj,audio.uri)
   const index=audioFiles.indexOf(audio)
   console.log("current song is ",audio.uri)
   if(status){
   console.log("index",index)
   return updateState(this.context,
    {soundOb:status,
    currentaudio:audio,
    isPlaying:true, 
    currentaudioIndex:index,
    })
  }
  else{
    const nextSong=audioFiles[38]
    console.log("current song index ",index)
    // console.log("next song index ",nextsongindex)
    console.log("next song is ",nextSong.uri)
    const status= 
  await playFn(playbackObj,nextSong.uri)
  console.log("staus testing rejection",status)
 const index=audioFiles.indexOf(audio)
 if(status){
  console.log("index",index)
  return updateState(this.context,
    {playbackObj:playbackObj,
      soundOb:status,
      currentaudio:audio,
      isPlaying:true,
      currentaudioIndex:index,
    })
  }
  else{
    const newsongindex=index+1
    const nextSong=audio[newsongindex]
    console.log("next song is ",nextSong)
  }
}

}

}

rowRenderer=(type,item,index,extendedState)=>{
    // console.log("current audio index",this.context.currentaudioIndex)
    return <AudioListItems
     item={item}
    isPlaying={extendedState.isPlaying}
    optionPress={this.optionPress}
    activeListItem={this.context.currentaudioIndex===index}
    onaudioPress={()=>this.handleAudioPress(item)}
   

/>
}  
    render() {
      return (
          <AudioContext.Consumer>
        {({dataProvider,isPlaying,currentaudio})=>{

            // console.log(dataProvider._data.length)
              return <View style={styles.container}>
              {dataProvider._data.length>5?
                <RecyclerListView 
                style={styles.list}
                contentContainerStyle={{ margin: 3 }}
                 dataProvider={dataProvider}
                 layoutProvider={this.layoutProvider}
                 rowRenderer={this.rowRenderer}
                 extendedState={{isPlaying}}
                 />:<Text>loading...</Text>}
                
                 {this.state.musicOn?
                  <MiniPlayer
                   open={true}
                   currentaudio={currentaudio}
                   navigate={this.props.navigate}
                   isPlaying={isPlaying}
                   onaudioPress={()=>this.handleAudioPress()}
                   />
                  :null}
          
               <OptionModal open={this.state.open}
               requestClose={this.requestClose}
               thing={this.state.thing}
               onPressPlay={this.onPressPlay}
               onPressPlaylist={this.onPressPlaylist}
               />
               </View>
          
          }}
          </AudioContext.Consumer>
        )
    }
}

export default AudioList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        },
    list:{
        flex:1,
        color:"black",
        backgroundColor:"#eee",
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
        backgroundColor:"#fff",
        margin:5,
        width:"95%",
        borderWidth:1,
        borderColor:"black",
        textAlign:'center',
        }
  });






