import { useEffect, useState } from "react";
import { User, UserSkeleton } from "./User";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { fetchUsers } from "../redux/usersSlice";
import { Pagination } from "./Pagination";
import { Button } from "./Button";
import { Plus, Search } from "lucide-react";
import { filterUsers } from "../utils";
// import { filterUsers } from "../utils";

export const UserList = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const { apiUsersByPage, loading, error, apiUsers } = useSelector(
    (state: RootState) => state.users
  );

  const usersToDisplay = apiUsersByPage[page] || [];
  const isSearching = search.trim() !== "";
  const filteredUsers = filterUsers(apiUsers, search);
  const usersToRender = isSearching
    ? filteredUsers
    : apiUsersByPage[page] || [];
  const totalUsers = isSearching ? filteredUsers.length : apiUsers.length;

  useEffect(() => {
    dispatch(fetchUsers(1));
    dispatch(fetchUsers(2));
  }, []);

  return (
    <div className="p-4 w-full flex flex-col items-center gap-2">
      <div className="w-full flex flex-wrap items-center justify-center md:justify-between gap-2">
        <div className="flex items-center gap-1">
          <Search strokeWidth={3} color="#155dfc" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="bg-blue-100 text-sm py-2 px-4 rounded-full outline-none"
            placeholder="George Bluth..."
            type="search"
            name=""
            id=""
          />
        </div>
        <Button disabled={loading}>
          <Plus size={18} />
          Crear
        </Button>
      </div>
      {loading && <UserListSkeleton />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usersToDisplay.length === 0 && !loading && (
          <p>No hay usuarios para mostrar.</p>
        )}
        {usersToRender.map((user) => {
          return <User user={user} key={user.email} />;
        })}
      </div>
      {!isSearching && (
        <Pagination
          userLength={apiUsers.length}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export const UserListSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <UserSkeleton key={index} />
      ))}
    </div>
  );
};
