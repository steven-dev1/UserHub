import { Mail, Pencil, Trash2 } from "lucide-react";
import type { User as UserType } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { deleteUser, setEditingUser } from "../redux/usersSlice";
import { useState } from "react";
import { Button } from "./Button";

export const User = ({ user }: { user: UserType }) => {
  const dispatch = useAppDispatch();
  const avatar = user.avatar != "" || user.avatar ? user.avatar : "/avatar-default.svg";
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenDeleteModal = () => {
    dispatch(deleteUser(user.id));
    setOpenDeleteModal(!openDeleteModal);
  };
  return (
    <div
      key={user.id}
      className="p-4 relative group bg-blue-50 rounded-lg flex flex-col items-center"
    >
      <div className={`absolute flex-col rounded-lg gap-1 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 transition-all duration-150 ${openDeleteModal ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
        <Button onClick={handleOpenDeleteModal}>Confirmar</Button>
        <button onClick={() => setOpenDeleteModal(false)} className="text-white transition-all duration-100 p-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-red-200 hover:text-red-600">Cancelar</button>
      </div>
      <div className="absolute transition-all duration-150 flex top-2 right-2 opacity-100 md:opacity-0 group-hover:opacity-100">
        <button onClick={() => dispatch(setEditingUser(user))} className="cursor-pointer hover:bg-blue-200 p-2 rounded-full"><Pencil strokeWidth="2.5" size={18} /></button>
        <button onClick={() => setOpenDeleteModal(true)} className="cursor-pointer hover:bg-red-200 p-2 rounded-full"><Trash2 strokeWidth="2.5" color="red" size={18} /></button>
      </div>
      <img
        src={avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-16 h-16 object-cover rounded-full mb-2 border-4 border-blue-100"
      />
      <h3 className="text-lg font-bold">
        {user.first_name} {user.last_name}
      </h3>
      <div className="flex items-center justify-start gap-1">
        <Mail strokeWidth="2.5" color="#155dfc" size={18} />
        <p className="text-sm">{user.email}</p>
      </div>
    </div>
  );
};

export const UserSkeleton = () => {
  return (
    <div className="p-4 bg-blue-50 rounded-lg flex flex-col items-center animate-pulse">
      <div className="w-16 h-16 rounded-full bg-blue-100 mb-2 border-4 border-blue-100"></div>
      <div className="h-4 w-24 bg-blue-100 rounded mb-2"></div>
      <div className="flex items-center justify-start gap-1">
        <div className="w-4 h-4 bg-blue-100 rounded-full"></div>
        <div className="h-3 w-32 bg-blue-100 rounded"></div>
      </div>
    </div>
  );
};
