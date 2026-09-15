import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserData } from '@/interfaces/UserData'

interface UserStore {
  user: UserData | null
  token: string | null
  setSession: (sessionParams: SessionParams) => void
  logout: () => void
}

interface SessionParams {
  user: UserData
  token: string
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setSession: (sessionParams: SessionParams) => set({ ...sessionParams }),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'taskCostSplit-user',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
