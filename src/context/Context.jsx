import { createContext, useState } from "react";
import runChat from "./../config/gemini";

// create the context
export const Context = createContext();
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPromt, setRecentPromt] = useState("");
  const [prevPromts, setPrevPromts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index,nextWord)=>{ setTimeout(function(){ setResultData(prev=>prev+nextWord); },75*index);}

  const newChat = ()=>{
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setShowResult(true);
    setLoading(true);
    try {
      let response;

      if(prompt !== undefined){
        response = await runChat(prompt);
        setRecentPromt(prompt);
      }else {
        setPrevPromts(prev=> [...prev,input]);
        setRecentPromt(input);
        response = await runChat(input);
      }

      const responseSplit = response.split(" ");
      // ✅ Just set the markdown response
      for(let i = 0;i<responseSplit.length;i++){
        let nextWord = responseSplit[i];
        delayPara(i/3,nextWord + " "); 
      }
    } catch (err) {
      setResultData("⚠️ Error: Could not fetch response.");
    }
    setLoading(false);
    setInput("");
  };

  // onSent("what is react.js");
  const contextValue = {
    prevPromts,
    setPrevPromts,
    onSent,
    setRecentPromt,
    recentPromt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;   // ✅ default export
