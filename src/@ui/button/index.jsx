const Button = ({
  text = 'Click Me',
  color = 'text-white',
  background = 'bg-blue-500',
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`${background} ${color} ${className} px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition-opacity`}
    >
      {text}
    </button>
  );
};

export default Button;
