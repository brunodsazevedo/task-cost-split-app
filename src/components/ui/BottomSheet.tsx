import { useCallback, useEffect, useMemo, useRef } from 'react'
import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'

import { useBottomSheetStore } from '@/store/useBottomSheetStore'

import { colors } from '@/theme/colors'

export function BottomSheet() {
  const { content, isOpen, config, close } = useBottomSheetStore()

  const bottomSheetRef = useRef<RNBottomSheet>(null)

  const snapPoints = useMemo(
    () => config?.snapPoints || ['80%', '90%'],
    [config?.snapPoints],
  )

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        close()
      }
    },
    [close],
  )

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.7}
        pressBehavior="close"
      />
    )
  }, [])

  useEffect(() => {
    if (isOpen && content) {
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(0)
      })
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isOpen, content])

  return (
    <RNBottomSheet
      ref={bottomSheetRef}
      backgroundStyle={{
        backgroundColor: colors.gray['700'],
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      enableDynamicSizing={config?.enableDynamicSizing ?? true}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={config?.enablePanDownToClose ?? true}
      index={-1}
      animateOnMount
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <BottomSheetScrollView>{content}</BottomSheetScrollView>
    </RNBottomSheet>
  )
}
