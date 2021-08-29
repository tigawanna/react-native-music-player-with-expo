import { Audio } from 'expo-av';
import { storeaudioForNextOpening, randomIndex } from './helper';
import { pauseFn, playFn, playnextFn, resumeFn } from './audioControler';

export const handlePlayPause=async(audio,context,setMusicOn)=>{
//playing the audio for the first time
const {playbackObj,soundOb,currentaudio,updateState,
  audioFiles,isPlaying,playbackPosition,currentAudioPosition}=context
  console.log("playback position on initial click",currentAudioPosition)

 setMusicOn()
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
   playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackSatusUpdate)
   return storeaudioForNextOpening(audio,index,context.isRepeating,context.isShuffling)
     }
   
   // pause playing audio
   if(soundOb.isLoaded&&soundOb.isPlaying &&currentaudio.id===audio.id){
   const index=audioFiles.indexOf(audio)
     const status= await pauseFn(playbackObj)
     return updateState(
       context,
       {
       soundOb:status,
       isPlaying:false,
       currentaudioIndex:index,
       })
     }
   
     // resume paused audio
   if(soundOb.isLoaded&&!soundOb.isPlaying&&currentaudio.id===audio.id){
   const status= await resumeFn(playbackObj)
   const index=audioFiles.indexOf(audio)
     return updateState(
         context,
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
      updateState(
       context,
       {
       soundOb:status,
       currentaudio:audio,
       isPlaying:true, 
       currentaudioIndex:index,
       })
       playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackSatusUpdate)
       return storeaudioForNextOpening(audio,index,context.isRepeating,context.isShuffling)
     }
}


export const handleNextPressed=async(context)=>{
    const newIndex=context.isShuffling?randomIndex(context.totalAudioCount):context.currentaudioIndex+1
    const nextaudio=context.audioFiles[newIndex]
    const status=await playnextFn(context.playbackObj,nextaudio.uri)
    // console.log("current song is ",nextaudio.uri)
    // console.log("sound object is",status)
    if(status!==undefined||!newIndex>=context.totalAudioCount)
    {
     context.updateState(
     context,
     {soundOb:status,
     currentaudio:nextaudio,
     isPlaying:true, 
     currentaudioIndex:newIndex,
     playbackDuration:null,
     playbackPosition:null
     })
     context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackSatusUpdate)
     return storeaudioForNextOpening(nextaudio,newIndex,context.isRepeating,context.isShuffling)
    }
    else{
      if(newIndex>=context.totalAudioCount){
      context.playbackObj.unloadAsync()
      return context.updateState(
        context,
         {playbackObj:context.playbackObj,
           soundOb:null,
           currentaudio:context.audioFiles[0],
           isPlaying:false,
           currentaudioIndex:0,
           playbackDuration:null,
           playbackPosition:null
         })
        }
        else if (status===undefined){
        try{
            await context.playbackObj.stopAsync()
            await context.playbackObj.unloadAsync()
            // return await playFn(playbackObj,uri)
            return"can't play this"
             }
        catch(error){
          const newerIndex=context.isShuffling?
          randomIndex(context.totalAudioCount):context.currentaudioIndex+1
          const newersong=context.audioFiles[newerIndex]
          const playbackObj=new Audio.Sound();
          const statu=await playbackObj.loadAsync({uri:newersong.uri},{shouldPlay:true})
    
          context.updateState(
           context,
            {playbackObj:playbackObj,
              soundOb:statu,
              currentaudio:newersong,
              isPlaying:true,
              currentaudioIndex:newerIndex,
              playbackDuration:null,
              playbackPosition:null
            })
            context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackSatusUpdate)
           return storeaudioForNextOpening(newersong,newerIndex,context.isRepeating,context.isShuffling)
         }
    }
    }
    }

    
export const handlePrevPressed=async(context)=>{
        const newIndex=context.currentaudioIndex-1
        const nextaudio=context.audioFiles[newIndex]
        const status=await playnextFn(context.playbackObj,nextaudio.uri)

        if(status!==undefined||!newIndex>=context.totalAudioCount)
        {
         context.updateState(
         context,
         {soundOb:status,
         currentaudio:nextaudio,
         isPlaying:true, 
         currentaudioIndex:newIndex,
         playbackDuration:null,
         playbackPosition:null
         })
         context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackSatusUpdate)
         return storeaudioForNextOpening(nextaudio,newIndex,context.isRepeating,context.isShuffling)
        }
        else{
          if(newIndex>=context.totalAudioCount){
          context.playbackObj.unloadAsync()
          return context.updateState(
            context,
             {playbackObj:context.playbackObj,
               soundOb:null,
               currentaudio:context.audioFiles[0],
               isPlaying:false,
               currentaudioIndex:0,
               playbackDuration:null,
               playbackPosition:null
             })
            }
            else if (status===undefined){
            try{
                await context.playbackObj.stopAsync()
                await context.playbackObj.unloadAsync()
                // return await playFn(playbackObj,uri)
                return"can't play this"
                 }
            catch(error){
              const newerIndex=newIndex-1
              const newersong=context.audioFiles[newerIndex]
              const playbackObj=new Audio.Sound();
              const statu=await playbackObj.loadAsync({uri:newersong.uri},{shouldPlay:true})
        
              context.updateState(
               context,
                {playbackObj:playbackObj,
                  soundOb:statu,
                  currentaudio:newersong,
                  isPlaying:true,
                  currentaudioIndex:newerIndex,
                  playbackDuration:null,
                  playbackPosition:null
                })
                context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackSatusUpdate)
               return storeaudioForNextOpening(newersong,newerIndex,context.isRepeating,context.isShuffling)
             }
        }
        }
        }    

