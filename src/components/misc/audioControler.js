//play audio
export const playFn=async(playbackObj,uri)=>{
      try{
    return await playbackObj.loadAsync({uri},{shouldPlay:true})
      }
      catch(error){
         console.log("error playing audio",error.message)
        
      }
  
  }


//pause audio
export const pauseFn=async(playbackObj)=>{
    try{
    return await playbackObj.setStatusAsync({shouldPlay:false})
    }
    catch(error){
        console.log("this is from audio controller error pausing audio",error.message)
  
    }

}

//resume audio

export const resumeFn=async(playbackObj)=>{
    try{
  return await playbackObj.playAsync()
    }
    catch(error){
   console.log("error playing audio",error.message)

    }

}

//select another audio

//next audio
export const playnextFn=async(playbackObj,uri)=>{
    // console.log("try block next song",uri)
    try{
   await playbackObj.stopAsync()
   await playbackObj.unloadAsync()
   return await playFn(playbackObj,uri)
    }
    catch(error){
   console.log("error playing next audio ",error.message)
   console.log("catch next song causing error",uri)

return(error)
}

}
//previous audio
