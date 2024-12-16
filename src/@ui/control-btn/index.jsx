export const ControlButton = ({ text, onClick, bgColor }) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} cusor-pointer text-white px-4 py-2 rounded-full hover:scale-105 transition-all duration-200`}
    >
      {text}
    </button>
  );
};
