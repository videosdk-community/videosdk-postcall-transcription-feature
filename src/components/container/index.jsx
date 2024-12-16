export const Container = ({ children }) => {
  return (
    <div className="relative flex justify-end flex-col w-[100vw] h-[100vh] mx-auto bg-slate-900 shadow-lg rounded-lg">
      {children}
    </div>
  );
};
