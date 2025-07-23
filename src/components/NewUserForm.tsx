import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { useState } from "react";
import { addUser } from "../redux/usersSlice";

interface NewUserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_FORM_DATA = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  };

export const NewUserForm = ({ isOpen, onClose }: NewUserFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.first_name === "" || formData.last_name === "" || formData.email === ""){
      return;
    }
    const newUser = {
        ...formData,
        id: uuidv4(),
    }
    dispatch(addUser(newUser));
    setFormData(INITIAL_FORM_DATA);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed w-screen h-screen bg-black/50 backdrop-blur-xs top-0 left-0 flex items-center justify-center z-50 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-[500px] flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold">Crear usuario</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="first_name" className="text-sm font-bold">
            Nombre
          </label>
          <input
          onChange={(e) => handleChange(e)}
            placeholder="Auron"
            required
            type="text"
            name="first_name"
            id="first_name"
            className="bg-blue-100 text-sm py-2 px-4 rounded-full outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last_name" className="text-sm font-bold">
            Apellido
          </label>
          <input
          onChange={(e) => handleChange(e)}
            placeholder="Play"
            required
            type="text"
            name="last_name"
            id="last_name"
            className="bg-blue-100 text-sm py-2 px-4 rounded-full outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold">
            Email
          </label>
          <input
          onChange={(e) => handleChange(e)}
            placeholder="auronplay@gmail.com"
            required
            type="email"
            name="email"
            id="email"
            className="bg-blue-100 text-sm py-2 px-4 rounded-full outline-none"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button>
            <Plus /> Crear
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
};
