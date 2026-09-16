import { useQuery } from '@tanstack/react-query'

import * as userService from '@/services/user.service'

export function useGetUserListQuery() {
  const query = useQuery({
    initialData: [],
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  })

  return query
}
