import { Button } from "./Button";
import { Plus, Search } from "lucide-react";
import { NewUserForm } from "./NewUserForm";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const UserListHeader = ({ isOpen, setIsOpen, loading, setSearch }: Props) => {
  return (
    <div className="w-full flex flex-wrap items-center justify-center md:justify-between gap-2">
      <NewUserForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex items-center gap-1">
        <div className="bg-blue-50 p-2 rounded-full">
          <Search strokeWidth={3} size={18} color="#155dfc" />
        </div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="bg-blue-50 md:w-[300px] focus:border-blue-200 border-2 border-transparent text-sm py-2 px-4 rounded-full outline-none"
          placeholder="George Bluth..."
          type="search"
        />
      </div>
      <Button onClick={() => setIsOpen(true)} disabled={loading}>
        <Plus size={18} />
        Crear
      </Button>
    </div>
  );
};