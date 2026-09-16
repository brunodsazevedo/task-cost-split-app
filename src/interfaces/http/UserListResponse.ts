export interface UserListResponse {
  users: UserData[]
}

interface UserData {
  name: string
  email: string
  id: string
}
