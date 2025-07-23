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