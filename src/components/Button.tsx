export const Button = ({ children, onClick, disabled, type }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean, type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] }) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className="bg-blue-500 text-sm transition-all duration-150 disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">
        {children}
    </button>
  );
};