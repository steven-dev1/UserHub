import { Mail } from "lucide-react";
import type { User as UserType } from "../types";

export const User = (user: UserType) => {
  return (
    <div key={user.id} className="p-4 bg-blue-50 rounded-lg">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-16 h-16 rounded-full mb-2"
      />
      <h3 className="text-lg font-bold">
        {user.first_name} {user.last_name}
      </h3>
      <div className="flex items-center justify-start gap-1">
        <Mail strokeWidth="2.5" color="#155dfc" size={18}/>
        <p className="text-sm">{user.email}</p>
      </div>
    </div>
  );
};
