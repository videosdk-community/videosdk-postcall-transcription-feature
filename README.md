# Post-Call Transcription Summaries with VideoSDK

VideoSDK simplifies generating post-call transcription summaries in two ways: Automatic Start and Manual Start. These summaries ensure all meeting details are captured, organized, and ready for review.

[![Watch the video](/public/images/thumbnail.png)](https://youtu.be/m1oZckjJK9c)

---

## Getting Started

Begin by cloning the example repository:

```bash
https://github.com/videosdk-community/videosdk-postcall-transcription-feature.git
```

Navigate to the cloned folder:

```bash
cd videosdk-postcall-transcription-feature
```

Install the required dependencies:

```bash
npm install
```

### Generate auth token

Generate a temporary token from your [Video SDK Account](https://app.videosdk.live/).:

copy .env.example

```shell
cp .env.example .env
```

Update the .env File:

```shell
VITE_VIDEOSDK_TOKEN = "videoSDK's authToken"
```

---

## App Architecture

The application follows a modular architecture for clarity and scalability:

![App architecture](/public/images/app-architecture.png)

---

## Breaking Down the Code

### 1. Automatic Start Configuration

When creating a meeting room, enable post-transcription and summaries automatically by adding autoStartConfig to your room creation API.
![Manually enable post transcription](/public/images/auto.png)

```javascript
// /src/API.js
// create Meeting
export const createMeeting = async () => {
  const res = await fetch(`${APP_URL}/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      webhook: {
        endPoint: 'your webhook url',
        events: [
          'recording-started',
          'recording-stopped',
          'transcription-started',
          'transcription-stopped',
        ],
      },
      autoStartConfig: {
        recording: {
          transcription: {
            enabled: true,
            summary: {
              enabled: true,
              prompt:
                'Write summary in sections like Title, Agenda, Speakers, Action Items, Outlines, Notes and Summary',
            },
          },
          config: {
            layout: {
              type: 'GRID',
              priority: 'SPEAKER',
              gridSize: 4,
            },
          },
        },
      },
    }),
  });
  const { roomId } = await res.json();
  return roomId;
};
```

### 2. Manual Start

With VideoSDK, you can manually control recording while enabling post-transcription and automatic summary generation. This is done using the startRecording and stopRecording methods from the useMeeting hook.

- #### Recording State Management

  The useMeeting hook provides methods to start and stop recording, and lets you manage the current recording state.

  ```javascript
  import { useMeeting, Constants } from '@videosdk.live/react-sdk';
  const {
    RECORDING_STARTING,
    RECORDING_STARTED,
    RECORDING_STOPPING,
    RECORDING_STOPPED,
  } = Constants.recordingEvents;
  const { startRecording, stopRecording, recordingState } = useMeeting();
  ```

- #### Handling Start and Stop Recording

  The logic for toggling recording is simple. If recording has already started, it can be stopped. Otherwise, starting the recording enables the transcription and summary generation.

  ```javascript
  const handleRecording = () => {
    const webhookUrl = 'https://webhook.site/your-webhook-url';

    if (recordingState === RECORDING_STARTED) {
      stopRecording(); // Stops recording and triggers post-transcription
    } else if (recordingState === RECORDING_STOPPED) {
      startRecording(webhookUrl, null, null, transcription); // Enables post-transcription
    }
  };
  ```

- #### Example UI Integration
  Here’s how the Start Recording and Stop Recording actions are implemented in a React UI:

```javascript
<ButtonIcon onClick={handleRecording}>
  {recordingState === RECORDING_STARTED
    ? 'Stop Recording'
    : recordingState === RECORDING_STARTING
      ? 'Recording...'
      : 'Start Recording'}
</ButtonIcon>
```

### webhook notifications

Webhook Notifications
Webhooks allow you to receive real-time updates about the transcription process after recording ends. Here are the key webhook events:

1. #### Transcription Started
   Triggered when transcription begins after recording stops.
   ```javascript
   {
   "webhookType": "transcription-started",
   "data": {
    "type": "post-call",
    "id": "xxxxxxx-354d-415b-886a-317d9236b2bb",
    "meetingId": "aaaa-bbbb-cccc",
    "sessionId": "675a9ad9ab022b1e6896e1f9"
   }
   }
   ```
2. #### Transcription Stopped
   Triggered when transcription has successfully completed.

```javascript
{
  "webhookType": "transcription-stopped",
  "data": {
    "type": "post-call",
    "id": "xxxxxxx-354d-415b-886a-317d9236b2bb",
    "meetingId": "aaaa-bbbb-cccc",
    "sessionId": "675a9ad9ab022b1e6896e1f9"
  }
}

```

By combining manual recording management with post-transcription summaries and webhook integration, you can automate summary generation and ensure critical meeting insights are captured in a clean, structured format.

---

## Documentation

For more detailed information, visit the [VideoSDK Documentation](https://docs.videosdk.live/).

---
