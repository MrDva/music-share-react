// All of these artists are at https://pixabay.com/music/search/mood/laid%20back/
import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import imgSrc3 from './assets/artwork.jpg'

class playInform {
  constructor(titile,artist,audioSrc,image,color){
    this.titile=titile;
    this.artist=artist;
    this.audioSrc=audioSrc;
    this.image=image;
    this.color=color;
  }
  setAudioSrc(audioSrc){
    this.audioSrc=audioSrc;
  }

  componentDidMount(){

  }
  
  static addMusic(musicMessage){
   
  }

   static color(){
    return '#'+(Math.random()*0xffffff<<0).toString(16); 
 }
}



const AddTrancks=()=>{

    const[musicList,setMusicList]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    //const{playList,setPlayList}=usePlayList();
    const [playList,setPlayList]=useState([]);

    const[playMusicIndex,setPlayMusicIndex]=useState(0);

    const onClickMusic=(index)=>{
        setPlayMusicIndex((prevIndex)=>index);
    }


    const fetchAudioFile = async (musicMessage) => {
        try {
            console.log('musicMessage:', musicMessage);
          const response = await fetch('http://localhost:8080/music/file/'+musicMessage.musicId);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.arrayBuffer();
          //const file =new File([data],'时间煮雨.mp3',{type:audio/mp3})
          const blob = new Blob([data], { type: 'audio/mp3' });
          const url = URL.createObjectURL(blob);
        //   if(playList.length===1&&playList[0].titile===null){
        //   }
          setPlayList([...playList, new playInform(musicMessage.musicName,musicMessage.musicName,url,imgSrc3,playInform.color())]);
          //playList.push(new playInform(musicMessage.musicName,musicMessage.musicName,url,imgSrc3,playInform.color()));
        } catch (error) {
          console.error('Error fetching audio file:', error);
        }
      };
    

   

    useEffect(()=>{
        const fetchMusic=async()=>{
            try{
                const response=await fetch('http://localhost:8080/music/play-list');
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const result= await response.json();
                setMusicList(result);
            }catch(error){
                setError(error);
            }finally{
                setLoading(false);
            }
        };

        fetchMusic();
    },[]);

    useEffect(()=>{
        if(musicList.length<=0){
            return;
        }
        fetchAudioFile(musicList[playMusicIndex]);
    },[playMusicIndex]);

    if(loading){
        return <p>Loading</p>;
    }

    if(error){
        return <p>Error:{error.message}</p>;
    }



  return(<div>
    <AudioPlayer tracks={playList}/>
    <h1>List of Music</h1>
    <u1>
        {musicList.map((item,index)=>(
            <button onClick={()=>onClickMusic(index)} key={item.musicId}>{item.musicName}</button>
        ))}
    </u1>
  </div>)
}

export default AddTrancks;


