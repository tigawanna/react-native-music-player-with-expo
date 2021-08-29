import React from "react";
import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { AudioContext } from "./../../../context/AudioProvider";
import {
  handlePlayPause,
  handleNextPressed,
  handlePrevPressed,
} from "./../../misc/audioMethods";
import { timeConvert, timeFix } from "./../../misc/helper";
import { pauseFn } from "../../misc/audioControler";
import { resumeFn } from "./../../misc/audioControler";

export default function MiniPlayer() {
  // const [playing, setplaying] = useState(false)
  const navigation = useNavigation();

  const context = useContext(AudioContext);
  const [currentPosition, setCurrentPosition] = useState(0);



 
  const setMusicOn = () => {
    console.log("lol");
  };
  const playPressed = () => {
    //  onaudioPress(currentaudio)
    handlePlayPause(context.currentaudio, context, setMusicOn);
    console.log("playing");
  };

  const prevPressed = () => {
    handlePrevPressed(context);
    console.log("playing");
  };
  const nextPressed = () => {
    handleNextPressed(context);
    console.log("playing next");
  };
  const openPlayer = () => {
    navigation.navigate('player', {
        itemId: 86,
    });
  };

  const calculateSeekbar = () => {
    if (
      context.playbackPosition !== null &&
      context.playbackDuration !== null
    ) {
     
      return context.playbackPosition / context.playbackDuration;
    } else return 0;
  };

  const skipTo=(async(value)=>{
    console.log("sound object in context",context.soundOb)
    if(context.soundOb===null) {
      
      return
    }
 
  try{

   const status=await context.playbackObj.
    setPositionAsync(value)
    // setPositionAsync(context.soundObj.durationMillis*value)
    // console.log("slider completion",status)
      context.updateState(context,
      {
      soundOb:status,
      playbackPosition:status.positionMillis,})

      // await resumeFn(context.playbackObj)
      
    }
    catch(err){
      console.log("error in slider completion method",err)
      }
  })

  return (
    <TouchableOpacity
      style={styles.mainview}
      onPress={() => openPlayer(context.currentaudio)}
    >
      <View style={styles.miniplayer}>
        <View style={styles.seekbar}>
          <Slider
            style={styles.slide}
            thumbTintColor="purple"
            value={calculateSeekbar()}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#999"
            maximumTrackTintColor="#000000"
            onValueChange={(value) => {
              setCurrentPosition(timeConvert(value * context.currentaudio.duration));
              // console.log(context.currentaudio.duration*value)
            }}
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
               
              } catch (err) {
                console.log("error in slider completion method", err);
              }
            }}
          />
        </View>
        <View style={styles.buttons}>
          <MaterialCommunityIcons
            name="skip-previous"
            size={44}
            color="black"
            onPress={() => prevPressed()}
          />

          {!context.isPlaying ? (
            <MaterialCommunityIcons
              name="play"
              size={44}
              color="black"
              onPress={() => playPressed()}
            />
          ) : (
            <MaterialCommunityIcons
              name="pause"
              size={44}
              color="black"
              onPress={() => playPressed()}
            />
          )}

          <MaterialCommunityIcons
            name="skip-next"
            size={44}
            color="black"
            onPress={() => nextPressed()}
          />
          <View style={styles.texts}>
          <Text style={styles.songtitletext}>
          {context.currentaudio? context.currentaudio.filename: "song title"}
        </Text>
        <Text style={styles.songtimestamp}>
 
        {context. playbackPosition ? timeFix(context.playbackPosition): "--:--"}
        </Text>
          </View>

        </View>
      </View>
    </TouchableOpacity>
  );
}
const SCREEN_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  miniplayer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: SCREEN_WIDTH,
    backgroundColor: "#ccc",
    padding: 10,
    height: 90,
  },
  texts: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"row",
    width: "60%",
    margin: 2,
    fontWeight: "bold",
    fontSize: 12,
  },
  songtitletext: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    fontWeight: "bold",
    fontSize: 10,
    width: "60%",
  },
  songtimestamp: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    fontWeight: "bold",
    fontSize: 12,
  },
  seekbar: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH - 10,
    height: 5,
  },
  slide: {
    width: SCREEN_WIDTH - 20,
    height: 10,
  },
  buttons: {
    backgroundColor: "#0f0",
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH - 20,
    height: 60,
    flexDirection: "row",
  },
});
