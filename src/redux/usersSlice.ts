import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getUsers } from "../utils";
import type { User } from "../types";

interface UsersState {
  apiUsersByPage: {
    [page: number]: User[];
  };
  apiUsers: User[];
  manualUsers: User[];
  loading: boolean;
  error: string | null;
  fetchedPages: number[];
}

const initialState: UsersState = {
  apiUsersByPage: {},
  apiUsers: [],
  manualUsers: [],
  loading: false,
  error: null,
  fetchedPages: [],
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number) => {
    const data = await getUsers(page);
    return { users: data.data, page };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.manualUsers.push(action.payload);
    },
    editUser: (state, action: PayloadAction<User>) => {
      const index = state.manualUsers.findIndex(
        (u) => u.id === action.payload.id
      );
      if (index !== -1) state.manualUsers[index] = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.manualUsers = state.manualUsers.filter(
        (u) => u.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        const { users, page } = action.payload as {
          users: User[];
          page: number;
        };

        
        const newUsers = users.filter(
          (incoming) =>
            !state.apiUsers.some((existing) => existing.id === incoming.id)
        );
        state.apiUsers.push(...newUsers);

        
        state.apiUsersByPage[page] = users;

        
        if (!state.fetchedPages.includes(page)) {
          state.fetchedPages.push(page);
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching users";
      });
  },
});

export const { addUser, editUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
