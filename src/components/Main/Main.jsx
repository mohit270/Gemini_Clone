import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import GeminiResponse from "../GeminiResponse";
import { Context } from '../../context/Context';
import { FiCopy, FiCheck } from "react-icons/fi"; 
import './Main.css';
const Main = () => {
    const {onSent,recentPromt,showResult,loading,resultData,setInput,input} = useContext(Context);
    const [listening, setListening] = useState(false);
    const [copied, setCopied] = useState(false);


    // create recognition once
    let inactivityTimer = null;

    const startVoiceRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support voice input.");
            return;
        }
    
        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.interimResults = true; // live transcription
        recognition.maxAlternatives = 1;
        recognition.continuous = true; // keep listening
    
        recognition.onstart = () => {
            setListening(true);
            console.log("🎤 Mic started");
        };
    
        recognition.onresult = (event) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
                        
            // 👇 Show live text immediately
            setInput(transcript);

            // Reset inactivity timer
            if (inactivityTimer) clearTimeout(inactivityTimer);

            // 👇 Only auto-send if user is silent for 5s
            inactivityTimer = setTimeout(() => {
                onSent(transcript);   // send to Gemini
                recognition.stop();   // stop mic
                setListening(false);
                console.log("⏳ Mic stopped after 5s of inactivity");
            }, 3 * 1000);
        };

    
        recognition.onerror = (event) => {
            console.error("Error:", event.error);
            setListening(false);
        };
    
        recognition.onend = () => {
            setListening(false);
            console.log("🎤 Mic ended");
        };
    
        recognition.start();
    }; //   -------------- end --------------
    //   -------------- Clipboard --------------
    const copyToClipboard = (text) => {
        if (!navigator.clipboard) {
            alert("Clipboard not supported");
            return;
        }
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // revert after 2s
            })
            .catch((err) => console.error("Failed to copy:", err));
    };//   -------------- end --------------
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult? <><div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                   
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>: <div className='resutl'> 
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPromt}</p>
                </div>
                <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                    <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                    </div>
                ) : (
                <>
                <GeminiResponse text={resultData} />
                <span className="copy-icon" onClick={() => copyToClipboard(resultData)}>
                    {copied ? <FiCheck color="green" /> : <FiCopy />}
                </span>
                </>
                )}
                </div>
            </div>}

            
            <div className="main-botton">
                <div className="search-box">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                        if (e.key === "Enter") onSent();
                        }}
                        placeholder="Enter a prompt here"
                    />
                    <div>
                        <img src={assets.gallery_icon} alt="Gallery" />
                        <img
                            src={assets.mic_icon}
                            alt="Mic"
                            onClick={startVoiceRecognition}
                            className={listening ? "mic active" : "mic"}
                        />
                        {input?<img onClick={()=> onSent()} src={assets.send_icon} alt="Send" />:null}
                    </div>
                </div>
                <div className="bottom-info">
                    <p>
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default Main;
