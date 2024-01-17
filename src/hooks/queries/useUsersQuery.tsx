import { useQuery } from '@tanstack/react-query'

import { fetchAllUserOnline } from 'services/users'

export const useUsersQuery = () => {
  const { data: users, ...rest } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await fetchAllUserOnline()
    }
  })

  if (users === undefined) return { users: [], ...rest }

  return { users, ...rest } as const
}
