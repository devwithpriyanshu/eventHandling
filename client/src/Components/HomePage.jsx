import { useEffect } from "react"

export default function HomePage(){
    
    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({audio:true,video:true})
        .then(function(mediaStreamObj){
            let videoPreview = document.getElementById('vid');
            videoPreview.srcObject = mediaStreamObj;
            videoPreview.onloadedetadata = () =>{
                videoPreview.play();
            }
            let start = document.getElementById('startBtn');
            let stop = document.getElementById('stopBtn');
            let vidSave = document.getElementById('vid2')
            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let videoData = [];
            start.addEventListener('click',(e)=>{
                mediaRecorder.start();
                console.log(mediaRecorder.state);
            })
            stop.addEventListener('click',(e)=>{
                mediaRecorder.stop();
                console.log(mediaRecorder.state);
            })
            mediaRecorder.ondataavailable = (e) =>{
                videoData.push(e.data);
            }
            mediaRecorder.onstop = (e) =>{
                let blob = new Blob(videoData,{'type' : 'video/mp4;'});
                let videoUrl = window.URL.createObjectURL(blob);
                localStorage.setItem("videoUrl",videoUrl);
                videoData = [];
                vidSave.src = videoUrl;
            }
        }).catch((error) =>{
            console.log(error.name,error.message)
        })
    },[])
    return(
      <>
      {
        localStorage.getItem("token")?
        <>
        <h1>Logged In!!</h1>
        <h4>{localStorage.getItem("name")}</h4>
        <button id="startBtn">Start Recording</button>
        <button id="stopBtn">Stop Recording</button><br />
        <p>Video Preview</p>
        <video id="vid" controls autoPlay></video><br />
        <p>Saved Video</p>
        <video id="vid2" controls></video>
        </> : alert("Logged Out") 
      }
      
      </>
    )
  }