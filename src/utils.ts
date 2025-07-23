import type { User } from "./types";

export const getUsers = async (page: number) => {
  const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
    headers: {
      "x-api-key": "reqres-free-v1"
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data;
}

export const filterUsers = (users: User[], search: string) => {
  return users.filter((user) => {
    return user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
  });
}