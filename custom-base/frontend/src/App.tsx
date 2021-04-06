import React, {useEffect, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import {MatterportPage} from 'components/MatterportPage';

function App() {
  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9111/matterport")
        .then(res => res.text())
        .then(res => setApiResponse(res));
  }

  useEffect(()=>{
    callAPI();
  }, [])
    
  
  return (
    <div className="App">
        <p className="App-intro">;{apiResponse}</p>
        <MatterportPage/>
    </div>
  );
}

export default App;
