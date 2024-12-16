import { Participant } from '../participant';

export const Participants = ({ participants }) => {
  return (
    <div className="h-full relative flex items-center justify-around">
      {[...participants.keys()].map((participantId) => (
        <Participant key={participantId} participantId={participantId} />
      ))}
    </div>
  );
};
