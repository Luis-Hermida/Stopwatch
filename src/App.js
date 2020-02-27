import React, { Component, useState, useEffect } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Timer />
      </>
    );
  }
}

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [started, setStarted] = useState(false);

  function toggle() {
    setIsActive(!isActive);
    setStarted(true);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
    setStarted(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function ResetButton(props) {
    if (!started) {
      return <div></div>;
    } else {
      return (
        <button className="button" onClick={props.reset}>
          Reset
        </button>
      );
    }
  }

  return (
    <div className="app">
      <div className="time">{seconds}s</div>
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggle}
        >
          {started ? (isActive ? "Pause" : "Resume") : "Start"}
        </button>
        <ResetButton reset={reset} />
      </div>
    </div>
  );
};

export default App;
