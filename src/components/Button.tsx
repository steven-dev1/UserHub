export const Button = ({ children, onClick, disabled }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean }) => {
  return (
    <button disabled={disabled} onClick={onClick} className="bg-blue-500 transition-all duration-150 disabled:bg-blue-950 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        {children}
    </button>
  );
};