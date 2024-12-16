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
    body: JSON.stringify({}),
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
