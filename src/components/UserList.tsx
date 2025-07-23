import { useEffect, useState } from "react";
import type { Pages, UserList as UserListType } from "../types";
import { getUsers } from "../utils";
import { User } from "./User";

export const UserList = () => {
    const [users, setUsers] = useState<UserListType["users"]>([]);
    const [page, setPage] = useState<Pages["page"]>("1");
    useEffect(()=>{
      const fetchUsers = async () => {
        const response = await getUsers(page);
        console.log(response);
        setUsers(response?.data);
      };
      fetchUsers();
    }, [page])
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <User key={user.email} {...user} />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPage("2")}>Next Page</button>
      </div>
    </div>
  );
};
