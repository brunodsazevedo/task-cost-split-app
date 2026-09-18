import { ReactNode } from 'react'
import { create } from 'zustand'

interface BottomSheetConfig {
  snapPoints?: string[]
  enablePanDownToClose?: boolean
  enableDynamicSizing?: boolean
}

interface BottomSheetStore {
  isOpen: boolean
  content: ReactNode | null
  config: BottomSheetConfig

  open: (content: { content: ReactNode; config?: BottomSheetConfig }) => void
  close: () => void
}

const defaultConfig: BottomSheetConfig = {
  snapPoints: undefined,
  enablePanDownToClose: true,
  enableDynamicSizing: true,
}

export const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  isOpen: false,
  content: null,
  config: defaultConfig,

  open: ({ config, content }) =>
    set({ isOpen: true, content, config: { ...defaultConfig, ...config } }),
  close: () =>
    set({
      isOpen: false,
      content: null,
      config: defaultConfig,
    }),
}))
