import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { KeyboardContainer } from '@/components/KeyboardContainer'
import { InputController } from '@/components/ui/InputController'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'

import LogoSvg from '@/assets/images/logo.svg'
import LogoNameSvg from '@/assets/images/logo-name.svg'
import UserCircleSvg from '@/assets/icons/user-circle-single.svg'
import EmailSvg from '@/assets/icons/mail-send-envelope.svg'
import AsteriskSvg from '@/assets/icons/asterisk.svg'

import { useSignupViewModel } from './useSignupViewModel'

type Props = ReturnType<typeof useSignupViewModel>

export function SignupView({
  control,
  isLoading,
  handleSignup,
  handleSignin,
}: Props) {
  return (
    <View className="flex-1 bg-base">
      <KeyboardContainer>
        <View className="w-full h-[300px] items-center justify-center gap-y-4">
          <LogoSvg height={64} width={64} />

          <LogoNameSvg />
        </View>

        <SafeAreaView
          edges={['bottom']}
          className="flex-1 px-8 py-10 gap-8 rounded-t-3xl bg-gray-700"
        >
          <Text className="font-heading text-xl text-center text-gray-100">
            Crie sua conta
          </Text>

          <View className="gap-y-3">
            <View>
              <InputController
                control={control}
                name="name"
                placeholder="Nome"
                leftIcon={UserCircleSvg}
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect
              />
            </View>

            <View>
              <InputController
                control={control}
                name="email"
                placeholder="E-mail"
                leftIcon={EmailSvg}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>

            <View>
              <InputController
                control={control}
                name="password"
                leftIcon={AsteriskSvg}
                placeholder="Senha"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry
              />
            </View>
          </View>

          <View>
            <Button isLoading={isLoading} onPress={handleSignup}>
              Cadastrar
            </Button>
          </View>

          <View className="flex-1 justify-end gap-y-4">
            <View className="mb-8">
              <Divider />
            </View>

            <Text className="font-body text-sm text-center text-gray-200">
              Já tem cadastro?
            </Text>

            <Button variant="secondary" onPress={handleSignin}>
              Entrar na conta
            </Button>
          </View>
        </SafeAreaView>
      </KeyboardContainer>
    </View>
  )
}
