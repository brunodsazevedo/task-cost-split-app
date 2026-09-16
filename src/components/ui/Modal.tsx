import { useModalStore } from '@/store/useModalStore'
import { View, Modal as RNModal, TouchableWithoutFeedback } from 'react-native'

export function Modal() {
  const { isOpen, config, content, close } = useModalStore()

  return (
    <RNModal
      visible={isOpen}
      animationType={config.animationType}
      transparent={config.transparent}
      statusBarTranslucent={config.statusBarTranslucent}
      onRequestClose={close}
    >
      <TouchableWithoutFeedback onPress={close}>
        <View className="flex-1 justify-center items-center p-6 bg-base/80">
          <TouchableWithoutFeedback onPress={() => {}}>
            {content}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  )
}
