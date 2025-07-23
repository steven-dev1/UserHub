import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { getUsers } from "../utils";
import type { User } from "../types";
import type { RootState } from "./store";
import { initialState } from "../utils";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number) => {
    const data = await getUsers(page);
    return { users: data.data, page };
  }
);

export const selectAllUsers = (state: RootState) => [
  ...state.users.apiUsers,
  ...state.users.manualUsers,
];

export const selectFilteredUsers = createSelector(
  [selectAllUsers, (_: RootState, search: string) => search],
  (users, search) => {
    if (!search) return users;
    return users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
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
      const user = action.payload;

      const manualIndex = state.manualUsers.findIndex((u) => u.id === user.id);
      if (manualIndex !== -1) {
        state.manualUsers[manualIndex] = user;
      }

      const apiIndex = state.apiUsers.findIndex((u) => u.id === user.id);
      if (apiIndex !== -1) {
        state.apiUsers[apiIndex] = user;
      }

      for (const page in state.apiUsersByPage) {
        const pageIndex = state.apiUsersByPage[page].findIndex(
          (u) => u.id === user.id
        );
        if (pageIndex !== -1) {
          state.apiUsersByPage[page][pageIndex] = user;
        }
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      state.manualUsers = state.manualUsers.filter(
        (user) => user.id !== userId
      );

      state.apiUsers = state.apiUsers.filter((user) => user.id !== userId);

      for (const page in state.apiUsersByPage) {
        state.apiUsersByPage[page] = state.apiUsersByPage[page].filter(
          (user) => user.id !== userId
        );
      }
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setEditingUser: (state, action: PayloadAction<User | null>) => {
      state.editingUser = action.payload;
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

        const { users, page } = action.payload;

        const newUsers = users.filter(
          (incoming: User) =>
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

export const { addUser, editUser, deleteUser, setFilter, setEditingUser } =
  usersSlice.actions;

export default usersSlice.reducer;
