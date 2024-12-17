import { APP_URL } from './constants/constants';

// unsafe Token
export const authToken = import.meta.env.VITE_VIDEOSDK_TOKEN;

// create Meeting
export const createMeeting = async () => {
  const res = await fetch(`${APP_URL}/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // webhook: {
      //   endPoint: 'https://webhook.site/ad755096-3582-498c-a9f0-c1241cdc5caf',
      //   events: [
      //     'recording-started',
      //     'recording-stopped',
      //     'transcription-started',
      //     'transcription-stopped',
      //   ],
      // },
      // autoStartConfig: {
      //   recording: {
      //     transcription: {
      //       enabled: true,
      //       summary: {
      //         enabled: true,
      //         prompt:
      //           'Write summary in sections like Title, Agenda, Speakers, Action Items, Outlines, Notes and Summary',
      //       },
      //     },
      //     config: {
      //       layout: {
      //         type: 'GRID',
      //         priority: 'SPEAKER',
      //         gridSize: 4,
      //       },
      //     },
      //   },
      // },
    }),
  });
  const { roomId } = await res.json();
  return roomId;
};

// validating meeting
export const validateMeeting = async (id) => {
  const res = await fetch(`${APP_URL}/v2/rooms/validate/${id}`, {
    method: 'GET',
    headers: {
      authorization: `${authToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    const { roomId } = await res.json();
    return roomId;
  } else {
    alert('invalid meeting id');
  }
};
