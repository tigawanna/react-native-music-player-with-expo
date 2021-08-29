import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeaudioForNextOpening=async(audio,index,)=>{
   await AsyncStorage.setItem('previousAudio',JSON.stringify({audio,index}))

}
export const storePositionForNextOpening=async(position)=>{
await AsyncStorage.setItem('previousAudioPosition',JSON.stringify({position}))
}
export const storeRepeatVal=async(repeatVal)=>{
    await AsyncStorage.setItem('repeat',JSON.stringify({repeatVal}))
   
    }
export const storeShuffleVal=async(shuffleVal)=>{
    await AsyncStorage.setItem('shuffle',JSON.stringify({shuffleVal}))
    }
    
export const timeConvert=(minutes)=>{
if(minutes){
    const hrs=minutes/60;
    const minute=hrs.toString().split('.')[0];
    const percent=parseInt(hrs.toString().split('.')[1].slice(0,2));
    const sec=Math.ceil((60*percent)/100);


    if(parseInt(minute)<10&&sec<10){
        return `0${minute}:0${sec}`
    }
    if(parseInt(minute)<10){
        return `0${minute}:${sec}`
    }
    if(parseInt(sec)<10){
        return `${minute}:0${sec}`
    }
    return `${minute}:${sec}`
}
}

export const timeFix = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
	//ES6 interpolated literals/template literals 
  	//If seconds is less than 10 put a zero in front.
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}
export const randomIndex=(total)=>{
    return Math.floor((Math.random()*total)+1)

}
