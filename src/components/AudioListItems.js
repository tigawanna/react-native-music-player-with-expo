import React from 'react'
import { Dimensions, StyleSheet, Text, 
    TouchableOpacity, 
     View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import colors from './misc/colors';


export default function AudioListItems(
    {item,optionPress,onaudioPress
        ,isPlaying,activeListItem}
    ){
      const{filename,duration}=item

        const renderPlayPlauseIcon=(isPlaying)=>{
        // console.log("is music playing?",isPlaying)
         if(!isPlaying) return <AntDesign name="caretright" size={24} color="black" />
         return <MaterialIcons name="pause" size={24} color="black" />
       }

        // console.log("active list item")
        
        const convertTime=(minutes)=>{
         if(duration){  
         const hours=minutes/60;
         const minute=hours.toString().split('.')[0];
         const percenr=parseInt(hours.toString().split('.')[1].slice(0,2));
         const seconds=Math.ceil((60*percenr)/100)
         if(parseInt(minute)<10&&seconds<10){
             return `0${minute}:0${seconds}`;
         }
         if(parseInt(minute)<20){
            return `0${minute}:${seconds}`;
        }
        if(seconds<10){
            return `${minute}:0${seconds}`;
        }
        
        return `${minute}:${seconds}`;
       }else{
           return duration
       }
        }

        return (
       
            <View style={styles.container}>
            <TouchableOpacity style={styles.leftcontainer} 
            onPress={()=>onaudioPress()}>
            <View style={styles.leftcontainer}>
            <View style={!activeListItem?styles.thumbnail:styles.playthumbnail}>
            <Text style={styles.thumbnailtext}>
            {activeListItem?
            renderPlayPlauseIcon(isPlaying):filename.charAt(0)}

            </Text>
            </View>
            </View>
            </TouchableOpacity>
         
            <View style={styles.midcontainer}>
            <View style={styles.title}>
            <Text numberOfLines={1} style={styles.titletext}>{filename}</Text>
            <Text numberOfLines={1} style={styles.timetext}>{convertTime(duration)}</Text>
            </View>
            </View>
            <View style={styles.rightcontainer}>
            <Entypo 
            name="dots-three-vertical" 
            size={24} 
            color={colors.FONT_MEDIUM}
            onPress={()=>optionPress(item)}
            />
            </View>
            </View>
     )
}



const {width}=Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#fff",
        margin:5,
        width:"95%",
        borderWidth:1,
        borderColor:"black",
        textAlign:'center',
        width:width-20
        
    },
    leftcontainer:{
        flex: 1,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:3,
        // borderColor:"black",
        maxWidth:100,
         },
    thumbnail:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius:50,
            borderWidth:3,
            height:70,
            margin:5,
            maxWidth:70,
            minWidth:70,
            textAlign:"center"

             },
    playthumbnail:{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor:"#888",
                borderRadius:50,
                borderWidth:3,
                height:70,
                margin:5,
                maxWidth:70,
                minWidth:70,
                textAlign:"center",
                backgroundColor:"#bcc"
    
                 },
    thumbnailtext:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin:20,
            fontSize:20,
            fontWeight:"bold",
           
           },
    midcontainer:{
            flex: 1,
            flexDirection:"row",
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth:2,
            // borderColor:"black",
            minWidth:150,
             },
    title:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
             margin:20,
             },
    titletext:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize:12,
           },  
    timetext:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize:12,
            color:"black"
           },            
    rightcontainer:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height:80,
        maxWidth:30,


       }
  });