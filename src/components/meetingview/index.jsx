import { useState } from 'react';
import { Constants, useMeeting } from '@videosdk.live/react-sdk';

import Button from '../../@ui/button';
import { ButtonIcon } from '../../@ui/button-icon';

import copyIcon from '../../../public/icons/copy.png';

import { Controls } from '../controls';
import { Participants } from '../participants';

const {
  RECORDING_STARTING,
  RECORDING_STARTED,
  RECORDING_STOPPING,
  RECORDING_STOPPED,
} = Constants.recordingEvents;

export const MeetingView = ({ meetingId, onMeetingLeft }) => {
  const [joined, setJoined] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const { join, participants, startRecording, stopRecording, recordingState } =
    useMeeting({
      onMeetingJoined: () => setJoined('JOINED'),
    });

  const handleRecording = () => {
    if (recordingState === RECORDING_STARTED) {
      stopRecording();
    } else if (recordingState === RECORDING_STOPPED) {
      startRecording(
        'https://webhook.site/ad755096-3582-498c-a9f0-c1241cdc5caf',
        null,
        null,
        {
          enabled: true,
          summary: {
            enabled: true,
            prompt:
              'Write summary in sections like Title, Agenda, Speakers, Action Items, Outlines, Notes and Summary',
          },
        }
      );
    }
  };

  const joinMeeting = () => {
    setJoined('JOINING');
    join();
  };

  const handleCopy = () => {
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
    navigator.clipboard.writeText(meetingId);
    setIsCopied(true);
  };

  return (
    <>
      {/* header */}
      <div className="flex justify-end w-[98%] ml-[1%]">
        <div className="p-4 m-2 rounded-md shadow-sm bg-green-50 flex items-center justify-between">
          <h3 className="text-lg rounded-md px-3 py-1">
            {isCopied ? 'copied!' : meetingId}
          </h3>
          <ButtonIcon onClick={() => handleCopy()}>
            <img src={copyIcon} alt="copy meeting-id" width={30} />
          </ButtonIcon>
        </div>
      </div>

      <div className="h-full flex items-center justify-center">
        {joined === 'JOINED' ? (
          <div className="relative w-full h-full py-y bg-slate-900">
            {/* controls */}
            <div className="flex justify-between w-[96%] left-[2%] py-4 bottom-0 items-center z-20 absolute rounded-lg shadow-lg">
              <div className="flex justify-between w-full items-center gap-4">
                {/* audio/video controls */}
                <Controls onMeetingLeft={onMeetingLeft} />

                {/* handle transcription */}
                <div className="flex gap-4">
                  <ButtonIcon
                    className="bg-white px-4 py-4 rounded-md"
                    onClick={handleRecording}
                  >
                    {recordingState === RECORDING_STARTED
                      ? 'stop recording'
                      : recordingState === RECORDING_STARTING
                        ? 'recording...'
                        : 'start recording'}
                  </ButtonIcon>
                </div>
              </div>
            </div>

            {/* participants */}
            <Participants participants={participants} />
          </div>
        ) : joined === 'JOINING' ? (
          <Button
            text="Joining..."
            color="text-white"
            className=" rounded-lg shadow-md mb-20 py-4 px-8 text-xl"
          />
        ) : (
          // start meeting
          <Button
            text="Start Meeting"
            onClick={joinMeeting}
            color="text-white"
            className=" rounded-lg shadow-md mb-20 py-4 px-8 text-xl"
          />
        )}
      </div>
    </>
  );
};
