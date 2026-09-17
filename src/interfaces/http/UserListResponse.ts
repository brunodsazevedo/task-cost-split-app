export interface UserListResponse {
  users: UserData[]
}

export interface UserData {
  name: string
  email: string
  id: string
}
