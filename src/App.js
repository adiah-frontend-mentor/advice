// import './App.css';
import React from "react";

import './scss/styles.css';
import useWindowDimensions from "./windowDimensions";
import data from "./data.js"

import mobileDivider from "./images/pattern-divider-mobile.svg"
import desktopDivider from "./images/pattern-divider-desktop.svg"
import die from "./images/icon-dice.svg"

function App() {
  const [adviceData, setAdviceData] = React.useState(data)
  const [count, setCount] = React.useState(0)

  const {height, width } = useWindowDimensions();

  React.useEffect(() => {
    fetch(	"https://api.adviceslip.com/advice")
    .then(response => response.json())
    .then(response => {
      setAdviceData(response);
      console.log(response);
    })
  }, [count])

  function getNewAdvice() {
    setCount(oldCount => oldCount + 1)
    console.log(count)
  }

  return (
    <div className='advice'>
      <h2 className='advice__heading'>ADVICE #{adviceData['slip']['id']}</h2>
      <p className='advice__content'>{adviceData['slip']['advice']}</p>
      <img className='advice__divider' src={width < 640 ? mobileDivider : desktopDivider} alt=""/>
      <div className='advice__dice' onClick={getNewAdvice}><img src={die} alt=""></img></div>
    </div>
  );
}

export default App;