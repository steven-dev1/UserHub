import { Mail } from "lucide-react";
import type { User as UserType } from "../types";

export const User = ({ user }: { user: UserType }) => {
  return (
    <div
      key={user.id}
      className="p-4 bg-blue-50 rounded-lg flex flex-col items-center"
    >
      <img
        src={user.avatar}
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
