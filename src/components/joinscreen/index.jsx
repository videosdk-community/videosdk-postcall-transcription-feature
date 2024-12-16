import { useState } from 'react';
import Button from '../../@ui/button';

export const JoinScreen = ({ getMeetingId, name, setName }) => {
  const [step, setStep] = useState(1); // Step 1: Meeting ID, Step 2: Enter Name
  const [meetingId, setMeetingId] = useState(null);

  const handleStartMeeting = async () => {
    if (name.length >= 2) {
      await getMeetingId(meetingId); // Proceed with meeting creation/joining
      console.log('Welcome', name);
    }
  };

  return (
    <div className="h-full mx-auto overflow-hidden">
      {/* Step 1: Enter Meeting ID */}
      <div
        className={`absolute  inset-0 transition-transform duration-500 ${
          step === 1 ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-4 mb-4 h-full w-full">
          <div className="flex gap-4 w-1/4 min-w-[250px]">
            <input
              type="text"
              placeholder="Enter Meeting ID"
              onChange={(e) => setMeetingId(e.target.value)}
              className="w-full h-12 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Meeting ID"
            />
            <Button
              onClick={() => setStep(2)}
              text="Next"
              className="h-12"
              disabled={!meetingId} // Disable the button if meetingId is empty
            />
          </div>
          <div className="flex flex-col items-center gap-4 w-1/4 min-w-[250px]">
            <span className="mx-4 text-white">or</span>
            <Button
              onClick={() => {
                setMeetingId(null);
                setStep(2);
              }}
              text="Create Meeting"
              className="h-12 w-full"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Enter Name */}
      <div
        className={`absolute inset-0 transition-transform duration-500 ${
          step === 2 ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-4 mb-4 h-full w-full">
          <div className="flex flex-col gap-4 w-1/4 min-w-[250px]">
            <input
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Name"
            />
            <Button
              onClick={handleStartMeeting}
              text="Start Meeting"
              className="h-12 w-full"
              disabled={name.length < 2} // Disable if name is less than 2 characters
            />
            <Button
              onClick={() => setStep(1)}
              text="Back"
              className="h-12 w-full bg-gray-300 hover:bg-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
