handleAudioPress=async(audio)=>{
    //playing the audio for the first time
 const {playbackObj,soundOb,currentaudio,updateState,audioFiles}=this.context
 this.setState({...this.state,musicOn:true})
 
 if(soundOb===null){
   const playbackObj=new Audio.Sound();
   const status= 
   await playFn(playbackObj,audio.uri)
   const index=audioFiles.indexOf(audio)
 updateState(
    this.context,
     {playbackObj:playbackObj,
       soundOb:status,
       currentaudio:audio,
       isPlaying:true,
       currentaudioIndex:index,
     })
 playbackObj.setOnPlaybackStatusUpdate(this.context.onPlaybackSatusUpdate)
 return storeaudioForNextOpening(audio,index)
   }
 
 // pause playing audio
 if(soundOb.isLoaded&&soundOb.isPlaying &&currentaudio.id===audio.id){
 const index=audioFiles.indexOf(audio)
   const status= await pauseFn(playbackObj)
   return updateState(this.context,
     {soundOb:status,
     isPlaying:false,
     currentaudioIndex:index,
     })
   }
 
   // resume paused audio
 if(soundOb.isLoaded&&!soundOb.isPlaying&&currentaudio.id===audio.id){
 const status= await resumeFn(playbackObj)
 const index=audioFiles.indexOf(audio)
   return updateState(this.context,
     {
       soundOb:status,
       isPlaying:true,
       currentaudioIndex:index,
      })
     }
 
      //playing another audio
 if(soundOb.isLoaded&&currentaudio.id!==audio.id){
   const status= await playnextFn(playbackObj,audio.uri)
    const index=audioFiles.indexOf(audio)
    return updateState(this.context,
     {soundOb:status,
     currentaudio:audio,
     isPlaying:true, 
     currentaudioIndex:index,
     })
   }
 
 }