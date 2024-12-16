import { useState } from 'react';
import { MeetingProvider } from '@videosdk.live/react-sdk';

import { Container } from './components/container';
import { MeetingView } from './components/meetingview';
import { JoinScreen } from './components/joinscreen';
import { authToken, createMeeting, validateMeeting } from './API';

function App() {
  const [meetingId, setMeetingId] = useState(null);
  const [participantName, setParticipantName] = useState('');

  const getMeetingId = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : await validateMeeting(id);
    setMeetingId(meetingId);
  };

  const onMeetingLeft = () => {
    setMeetingId(null);
  };

  return (
    <Container>
      {meetingId && participantName ? (
        <MeetingProvider
          token={authToken}
          config={{
            name: participantName,
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
          }}
        >
          <MeetingView meetingId={meetingId} onMeetingLeft={onMeetingLeft} />
        </MeetingProvider>
      ) : (
        <JoinScreen
          getMeetingId={getMeetingId}
          name={participantName}
          setName={setParticipantName}
        />
      )}
    </Container>
  );
}

export default App;
