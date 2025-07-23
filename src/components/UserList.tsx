import { useEffect, useState } from "react";
import { User, UserSkeleton } from "./User";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { fetchUsers, selectFilteredUsers } from "../redux/usersSlice";
import { Pagination } from "./Pagination";
import { USERS_PER_PAGE } from "../utils";
import { UserListHeader } from "./UserListHeader";
import { EditUserForm } from "./EditUserForm";

export const UserList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const { manualUsers, loading, error, apiUsers, editingUser } = useSelector(
    (state: RootState) => state.users
  );
  const isSearching = search.trim() !== "";
  
  const allUsers = [...manualUsers, ...apiUsers];
  const start = (page - 1) * USERS_PER_PAGE;
  const end = start + USERS_PER_PAGE;
  const filteredUsers = useSelector((state: RootState) =>
    selectFilteredUsers(state, search)
  );
  const usersToDisplay = isSearching
  ? filteredUsers
  : allUsers.slice(start, end);
  
  const isListEmpty = usersToDisplay.length === 0 && !loading;
  const totalUsers = allUsers.length;

  useEffect(() => {
    dispatch(fetchUsers(1));
    dispatch(fetchUsers(2));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <div className="p-4 w-full flex flex-col items-center gap-2">
      {editingUser && <EditUserForm />}
      <UserListHeader isOpen={isOpen} setIsOpen={setIsOpen} loading={loading} setSearch={setSearch} />
      {loading && <UserListSkeleton />}
      {error && <p className="text-red-500">{error}</p>}
      <div
        className={`w-full justify-center ${
          isListEmpty ? "flex items-center" : "grid"
        }  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}
      >
        {isListEmpty && (
          <p className="my-4 py-2 px-4 bg-gray-100 rounded-full">
            No hay usuarios para mostrar.
          </p>
        )}
        {usersToDisplay.map((user) => {
          return <User user={user} key={user.email} />;
        })}
      </div>
      {!isSearching && (
        <Pagination
          totalpages={totalUsers}
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
