import { useQuery } from '@tanstack/react-query'

import { fetchAllUserOnline } from 'services/users'
import { useAppStore } from 'store/useAppStore'

export const useUsersQuery = () => {
  const setUsers = useAppStore((store) => store.setUsers)
  const { data, ...rest } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await fetchAllUserOnline()
    }
  })

  if (data === undefined) return
  setUsers(data)

  return { data, ...rest }
}
