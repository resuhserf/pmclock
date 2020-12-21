import Head from "next/head";
import styles from "styles/Home.module.scss";
import { useState, useEffect } from "react";

export default function Home() {
  enum ind {
    Break = "Break",
    Session = "Session",
  }
  const [brkLng, setBrkLng] = useState(5);
  const [ssnLng, setSsnLng] = useState(25);
  const [min, setMin] = useState(ssnLng);
  const [sec, setSec] = useState(0);
  const [secFm, setSecFm] = useState("00");
  const [runClock, setRunClock] = useState(false);
  const [isSsn, setIsSsn] = useState(true);
  const [indicator, setIndicator] = useState(ind.Session);

  useEffect(() => {
    if (runClock) {
      while (sec < 60) {
        const interval = setInterval(() => {
          setSec(sec + 1);
        }, 1000);
        return () => clearInterval(interval);
      }
      if (sec === 60) {
        setSec(0);
      }
    }
  });

  useEffect(() => {
    if (sec > 50) {
      setSecFm(`0${60 - sec}`);
    } else {
      if (sec !== 0) {
        setSecFm((60 - sec).toString());
      } else {
        setSecFm("00");
      }
    }
  }, [sec]);

  useEffect(() => {
    if (secFm === "59" && min > 0 && runClock) {
      setMin(min - 1);
    }
    if (secFm === "00" && min === 0 && runClock) {
      if (isSsn) {
        setMin(brkLng);
        setIsSsn(false);
        setIndicator(ind.Break);
      } else {
        setMin(ssnLng);
        setIsSsn(true);
        setIndicator(ind.Session);
      }
      document.querySelector("audio")!.play();
    }
  }, [secFm]);

  const reset = () => {
    setBrkLng(5);
    setSsnLng(25);
    setMin(25);
    setSec(0);
    setSecFm("00");
    setRunClock(false);
    setIsSsn(true);
    const audio = document.querySelector("audio");
    audio!.pause();
    audio!.currentTime = 0;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pomorodo Clock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Pomodoro Clock</h1>
      <div id="break-label">Break Length</div>
      <div id="session-label">Session Length</div>
      <button
        id="break-increment"
        onClick={() => {
          if (brkLng < 60 && runClock === false) {
            setBrkLng(brkLng + 1);
            setSec(0);
          }
        }}
      >
        Break Increment
      </button>
      <button
        id="break-decrement"
        onClick={() => {
          if (brkLng > 1 && runClock === false) {
            setBrkLng(brkLng - 1);
            setSec(0);
          }
        }}
      >
        Break Decrement
      </button>
      <button
        id="session-increment"
        onClick={() => {
          if (ssnLng < 60 && runClock === false) {
            setSsnLng(ssnLng + 1);
            setMin(ssnLng + 1);
            setSec(0);
          }
        }}
      >
        Session Increment
      </button>
      <button
        id="session-decrement"
        onClick={() => {
          if (ssnLng > 1 && runClock === false) {
            setSsnLng(ssnLng - 1);
            setMin(ssnLng - 1);
            setSec(0);
          }
        }}
      >
        Session Decrement
      </button>
      <div id="break-length">{brkLng}</div>
      <div id="session-length">{ssnLng}</div>
      <div id="timer-label">{indicator}</div>
      <div id="time-left">{`${min}:${secFm}`}</div>
      <button
        id="start_stop"
        onClick={() => {
          setRunClock(!runClock);
        }}
      >
        Start / Stop
      </button>
      <button id="reset" onClick={reset}>
        Reset
      </button>
      <audio id="beep" src="/beep.mp3">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js" />
    </div>
  );
}
