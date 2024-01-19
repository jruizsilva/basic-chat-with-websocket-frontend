import { useQuery } from '@tanstack/react-query'

import { fetchAllUserOnline } from 'services/users'

export const useUsersQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await fetchAllUserOnline()
    }
  })

  return { data, ...rest }
}
