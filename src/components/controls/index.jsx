import { useState } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { ControlButton } from '../../@ui/control-btn';
import { ButtonIcon } from '../../@ui/button-icon';

import audioIcon from '../../../public/icons/microphone.png';
import videoIcon from '../../../public/icons/videocam.png';

export const Controls = ({ onMeetingLeft }) => {
  const { toggleMic, toggleWebcam, end } = useMeeting();
  const [micClicked, setMicClicked] = useState(false);
  const [webcamClicked, setWebcamClicked] = useState(false);

  const handleMicClick = () => {
    toggleMic();
    setMicClicked((prev) => !prev); // Toggle state
  };

  const handleMeetingLeft = () => {
    end();
    onMeetingLeft();
  };

  const handleWebcamClick = () => {
    toggleWebcam();
    setWebcamClicked((prev) => !prev); // Toggle state
  };

  return (
    <div className="flex items-center justify-left space-x-4 bg-white px-4 py-4 rounded-md">
      <ControlButton
        text="End"
        onClick={handleMeetingLeft}
        bgColor="bg-red-500"
      />

      {/* Mic Button */}
      <div className="relative">
        <ButtonIcon onClick={handleMicClick}>
          <img src={audioIcon} width={30} alt="audio" />
        </ButtonIcon>
        {micClicked && (
          <div className="absolute top-1 left-1 w-full h-[2px] bg-blue-500 rotate-45 origin-top-left"></div>
        )}
      </div>
      {/* Webcam Button */}
      <div className="relative">
        <ButtonIcon onClick={handleWebcamClick}>
          <img src={videoIcon} width={30} alt="video" />
        </ButtonIcon>
        {webcamClicked && (
          <div className="absolute top-[2px] left-[2px] w-full h-[2px] bg-blue-500 rotate-45 origin-top-left"></div>
        )}
      </div>
    </div>
  );
};
