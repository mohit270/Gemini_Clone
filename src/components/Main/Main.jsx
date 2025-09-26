import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import GeminiResponse from "../GeminiResponse";
import { Context } from '../../context/Context';
import { TypeAnimation } from "react-type-animation";
import './Main.css';
const Main = () => {
    const {onSent,recentPromt,showResult,loading,resultData,setInput,input} = useContext(Context);
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
                //    <TypeAnimation
                //         sequence={[resultData, 9999999]}
                //         speed={200}
                //         repeat={0}
                //         cursor={false}
                //         wrapper="div"
                //     >
                //     {(text) => }
                //     </TypeAnimation>
                <GeminiResponse text={resultData} />
                )}
                </div>
            </div>}

            
            <div className="main-botton">
                <div className="search-box">
                    <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=> onSent()} src={assets.send_icon} alt="" />:null}
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
