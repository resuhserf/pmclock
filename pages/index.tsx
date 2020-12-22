import Head from "next/head";
import styles from "styles/Home.module.scss";
import { useState, useEffect } from "react";
import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home(): ReactElement {
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
        <title>Odoromop Clock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Odoromop Clock</h1>
      <div id="controls">
        <h3 id="timer-label">{indicator}</h3>
        <h3 id="time-left">{`${min}:${secFm}`}</h3>
        <button
          id="start_stop"
          className={styles.button}
          onClick={() => {
            setRunClock(!runClock);
          }}
        >
          Start / Stop
        </button>
        <button id="reset" className={styles.button} onClick={reset}>
          Reset
        </button>
        <audio id="beep" src="/beep.mp3">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
        <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js" />
      </div>
      <div className={styles.mod}>
        <div id="break-block">
          <h3 id="break-label">Break Length</h3>
          <h3 id="break-length">{brkLng}</h3>
          <button
            id="break-increment"
            className={styles.button}
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
            className={styles.button}
            onClick={() => {
              if (brkLng > 1 && runClock === false) {
                setBrkLng(brkLng - 1);
                setSec(0);
              }
            }}
          >
            Break Decrement
          </button>
        </div>
        <div id="session-block">
          <h3 id="session-label">Session Length</h3>
          <h3 id="session-length">{ssnLng}</h3>
          <button
            id="session-increment"
            className={styles.button}
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
            className={styles.button}
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
        </div>
      </div>
    </div>
  );
}
