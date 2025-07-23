

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



export const USERS_PER_PAGE = 6;