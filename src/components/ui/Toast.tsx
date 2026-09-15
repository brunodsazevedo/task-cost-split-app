import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fonts'
import toast, { BaseToast, ToastProps } from 'react-native-toast-message'

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        marginTop: 12,
        borderLeftColor: colors['green-base'],
        backgroundColor: colors.gray['600'],
      }}
      text1Style={{
        fontFamily: fontFamily.heading,
        fontSize: 18,
        color: colors['green-base'],
      }}
      text2Style={{
        fontFamily: fontFamily.body,
        fontSize: 14,
        color: colors.gray['100'],
      }}
    />
  ),

  error: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        marginTop: 12,
        borderLeftColor: colors['danger-light'],
        backgroundColor: colors.gray['600'],
      }}
      text1Style={{
        fontFamily: fontFamily.heading,
        fontSize: 18,
        color: colors['danger-light'],
      }}
      text2Style={{
        fontFamily: fontFamily.body,
        fontSize: 14,
        color: colors.gray['100'],
      }}
    />
  ),
}

export { toastConfig, toast }
