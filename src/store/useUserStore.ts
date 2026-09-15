import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserData } from '@/interfaces/UserData'

interface UserStore {
  user: UserData | null
  token: string | null
}

interface SessionParams {
  user: UserData
  token: string
  setSession: (sessionParams: SessionParams) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setSession: (sessionParams: SessionParams) =>
        set({ user: sessionParams.user, token: sessionParams.token }),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'taskCostSplit-user',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
