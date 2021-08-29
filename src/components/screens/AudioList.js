import React, { Component } from 'react'
import { Text,Dimensions, StyleSheet,View } from 'react-native'
import { RecyclerListView,LayoutProvider } from 'recyclerlistview';
import AudioListItems from './../AudioListItems';
import OptionModal from './../modals/OptionModal';
import { AudioContext } from './../../context/AudioProvider';
import MiniPlayer from './other/MiniPlayer';
import { handlePlayPause } from './../misc/audioMethods';



const SCREEN_WIDTH = Dimensions.get('window').width;

export class AudioList extends Component {
  static contextType=AudioContext

  constructor(props) {
    super(props);
   this.state={
     open:false,
     musicOn:false,
   
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




optionPress=(thing)=>{
 this.setState({...this.state, open:true,thing:thing})
}

requestClose=()=>{
  this.setState({...this.state, open:false})
}
 onPressPlay=()=>{
  this.setState({...this.state, open:false})

 }
 onPressPlaylist=()=>{
  this.setState({...this.state, open:false})

 }

 setNusicOn=()=>{
 this.setState({...this.state,musicOn:true}) 
}
rowRenderer=(type,item,index,extendedState)=>{
    // console.log("current audio index",this.context.currentaudioIndex)
    return <AudioListItems
     item={item}
    isPlaying={extendedState.isPlaying}
    optionPress={this.optionPress}
    activeListItem={this.context.currentaudioIndex===index}
    onaudioPress={()=>handlePlayPause(item,this.context,this.setNusicOn)}
   

/>
}  

componentDidMount(){
  this.context.loadPreviousAudio()
 

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
                
                 {true?
                  <MiniPlayer
                   open={true}
                   currentaudio={currentaudio}
                   navigate={this.props.navigate}
                   isPlaying={isPlaying}
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




