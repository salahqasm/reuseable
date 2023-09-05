import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { BiMicrophone } from 'react-icons/bi';
import { BsMicMute } from 'react-icons/bs';
import styles from './PushToTalk.module.css';

const PushToTalk = ({
  sessionid,
  show,
  finishedSpeaking,
}: {
  sessionid: string;
  show: boolean;
  finishedSpeaking: boolean;
}) => {
  const modalRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timerId, setTimerId] = useState(null);

  async function startRecording() {
    if (finishedSpeaking) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const recordedChunks:Blob[]= [];

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });

          // const url = URL.createObjectURL(audioBlob);
          // setAudioUrl(url);

          // Testing .. (should be moved to the next server)
          const formData = new FormData();
          formData.append('audio', audioBlob);

          const response = await fetch(
            `https://7f49-212-34-19-200.ngrok.io/upload_audio?sessionid=${sessionid}`,
            {
              method: 'POST',
              body: formData,
            }
          );
          console.log(audioBlob);
          console.log(await response.json());
        };

        setMediaRecorder(recorder);
        recorder.start();
        setRecording(true);

        // Start a timer to automatically stop recording after 20 seconds
        const timer = setTimeout(() => {
          stopRecording();
          clearTimeout(timerId);
          setRecording(false);
          recorder.stop();
        }, 20000); // 20 seconds in milliseconds

        setTimerId(timer);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  }

  function stopRecording() {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
      clearTimeout(timerId);
    }
  }

  function handleMouseDown() {
    if (finishedSpeaking) {
      startRecording();
    }
  }

  function handleMouseUp() {
    if (recording) {
      stopRecording();
    }
  }

  return (
    <>
      <div
        className={styles.container}
        ref={modalRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div>
          <div
            className={`${styles.iconDiv} ${finishedSpeaking &&
              (recording ? styles.pulseBlue : styles.pulseRed)}`}
          >
            {finishedSpeaking ? (
              <BiMicrophone className={recording ? styles.iconRec : styles.icon} />
            ) : (
              <BsMicMute className={styles.icon} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PushToTalk;
