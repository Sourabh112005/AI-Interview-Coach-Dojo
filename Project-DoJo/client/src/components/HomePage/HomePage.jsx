import React, { useContext, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMenu } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const HomePage = () => {
  const authUser = useSelector((store) => store.user.authUser);
  const dispatch = useDispatch();
  const [toggleBar, setToggleBar] = useState(false);
  const [inputText, setInputText] = useState(""); // State to store input text
  const videoRef = useRef(null);


  const navigate = useNavigate();
  const { onSent, input, setInput, response } = useContext(Context);
  const [isManuallyStopped, setIsManuallyStopped] = useState(false);
  const [sendResponse, setSendResponse] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  
  useEffect(() => {
    if (response) {
        videoRef.current.play();
    } else {
        videoRef.current.pause();
    }
}, [response]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        // Microphone access granted
      })
      .catch((err) => {
        console.error("Microphone access denied", err);
        toast.error("Microphone access denied. Please allow microphone usage.");
      });
  }, []);

  useEffect(() => {
    const handleEnd = () => {
      if (!isManuallyStopped) {
        SpeechRecognition.startListening({ continuous: true });
      }
    };

    const recognition = SpeechRecognition.getRecognition();
    if (recognition) {
      recognition.addEventListener("end", handleEnd);
      recognition.onerror = (event) => {
        console.error("Speech recognition error detected: " + event.error);
        toast.error("Speech recognition error: " + event.error);
      };
    }

    return () => {
      if (recognition) {
        recognition.removeEventListener("end", handleEnd);
      }
    };
  }, [isManuallyStopped]);

  const startListening = () => {
    setIsManuallyStopped(false);
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIsManuallyStopped(true);
    SpeechRecognition.stopListening();
    onSent(transcript);
    speak(response); // Convert input text to speech
    resetTranscript();
  };

  if(response){

  }
  const speak = (transcript) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(transcript);
      speech.voice = speechSynthesis.getVoices().find(voice => voice.name === "Google UK English Female");
      speechSynthesis.speak(speech);
    } else {
      console.error("Text-to-speech is not supported in this browser.");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleClickSend = () => {
    onSent(inputText)
    speak(response);
    setInputText(" ")
  }

  useEffect(()=>{
    onSent("You are my interviwer and take my interview about some random question and ask one by one question")
  },[])

  const handleLogout = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      navigate("/");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickNotes = () => {
    navigate("/notes");
  };

  const handleResponseChange = (e) => {
    setSendResponse(e.target.value);
  };

  return (
    <div>
      <div className="navbar bg-blue-400 mt-2rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 flex items-center justify-between">
        <div className="logo flex flex-col items-center justify-center">
          <img className="w-20" src="/src/assets/DojoLogo.png" alt="Dojo Logo" />
          <h3 className="text-white font-semibold">DOJOAI</h3>
        </div>
        <div className="notes">
          <button className="btn btn-primary" onClick={handleClickNotes}>Notes</button>
        </div>
      </div>

      <div className="centerdContent h-[85vh] mt-5 flex flex-col items-center justify-center">
        <div className="video">
          <video  ref={videoRef} className="w-[50vw]" src="/src/assets/06.mp4" autoPlay loop muted>
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute right-2 top- w-[20vw]">
        <p>{response}</p>
        </div>
        <div className="flex  flex-col items-center justify-center">
          <p>{listening ? "Listening..." : "Stopped"}</p>
          <div className="btns">
            <button className="btn m-4" onClick={startListening}>Start</button>
            <button className="btn m-4" onClick={stopListening}>Stop</button>
          </div>
          <div className="transcript-container">
            <p className="text-white">
              {transcript}
            </p>
          </div>
          <div className="input-container pb-3 flex gap-5 items-center justify-center ">
            <input className="input input-bordered" type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type your Query..." />
            <button onClick={handleClickSend} className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
      <div className="footer absolute bottom-0 flex items-center">
        <div onClick={() => setToggleBar(!toggleBar)} className="menu absolute bottom-1 cursor-pointer">
          <IoMenu size={35} />
        </div>
        {toggleBar && (
          <div className="toggleBar absolute bottom-12 left-3 w-fit h-28 p-3 border border-slate-700 shadow-lg bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 flex flex-col items-center justify-center">
            <div onClick={handleLogout} className="logout cursor-pointer ml-5 w-full flex items-center gap-3">
              <MdLogout size={30} />
              <h1 className="text-white  text-lg font-semibold">Logout</h1>
            </div>
            <div className="divider m-0"></div>
            <div className="userInfo w-full flex items-center gap-3">
              <img className="w-10" src={authUser?.profilePhoto} alt="Profile" />
              <p className="text-[18px] capitalize">{authUser?.firstName} {authUser?.lastName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;