export const ButtonIcon = ({
  onClick,
  children,
  className = '',
  style = {},
}) => {
  return (
    <button
      style={style}
      className={`flex gap-2 hover:opacity-90 transition-opacity cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
