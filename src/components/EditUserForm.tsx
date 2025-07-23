import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { editUser, setEditingUser } from "../redux/usersSlice";
import { useState, useEffect } from "react";
import { Button } from "./Button";

export const EditUserForm = () => {
  const dispatch = useAppDispatch();
  const editingUser = useAppSelector((state) => state.users.editingUser);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingUser) {
      setFirstName(editingUser.first_name);
      setLastName(editingUser.last_name);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    dispatch(
      editUser({
        ...editingUser,
        first_name: firstName,
        last_name: lastName,
        email: email,
      })
    );
    dispatch(setEditingUser(null));
  };

  if (!editingUser) return null;

  return (
    <div className="bg-black/50 backdrop-blur-xs fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[500px] flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <input
          type="text"
          placeholder="Gustavo"
          className="bg-blue-100 text-sm py-2 px-4 rounded-full outline-none"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Petro"
          className="bg-blue-100 text-sm py-2 px-4 rounded-full outline-none"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="gustavopetro@gmail.com"
          className="bg-blue-100 text-sm py-2 px-4 rounded-full outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
          >
            Save
          </Button>
          <Button
            onClick={() => dispatch(setEditingUser(null))}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
