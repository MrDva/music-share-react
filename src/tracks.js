import imgSrc from "./assets/artwork.jpg";
import imgSrc2 from "./assets/artwork2.jpg";
import imgSrc3 from "./assets/artwork3.jpg";
import cali from "./assets/cali-wataboi.mp3";
import fifty from "./assets/50-tobylane.mp3";
import iwonder from "./assets/iwonder-dreamheaven.mp3";

// All of these artists are at https://pixabay.com/music/search/mood/laid%20back/
export var playList=[
  {
    title: "Cali",
    artist: "Wataboi",
    audioSrc: cali,
    image: imgSrc,
    color: "#00aeb0"
  },
  {
    title: "50",
    artist: "tobylane",
    audioSrc: fifty,
    image: imgSrc2,
    color: "#ffb77a"
  }
];

class playInform {
  constructor(titile,artist,audioSrc,image,color){
    this.titile=titile;
    this.artist=artist;
    this.audioSrc=audioSrc;
    this.image=image;
    this.color=color;
  }
  
  static addMusic(){
    playList.push(new playInform('I Wonder','DreamHeaven',iwonder,imgSrc3,"#5323ff"));
  }
}

export default AddTrancks=()=>{
  return(<div>
    <button onClick="playInform.addMusic()">
      添加歌曲I wonder
    </button>
  </div>)
}


