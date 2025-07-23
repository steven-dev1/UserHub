export type Page = "1" | "2";

export interface Pages {
  page: Page;
}

export interface User {
    id: string
    first_name: string
    last_name: string
    email: string
    avatar: string
}

export interface UserList {
    users: User[]
}

export interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalpages: number;
}

export interface UsersState {
  apiUsersByPage: {
    [page: number]: User[];
  };
  apiUsers: User[];
  manualUsers: User[];
  loading: boolean;
  error: string | null;
  fetchedPages: number[];
  filter: string;
  editingUser: User | null;
}