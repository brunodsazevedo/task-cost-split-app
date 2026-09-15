import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { InputController } from '@/components/ui/InputController'
import { KeyboardContainer } from '@/components/KeyboardContainer'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'

import LogoSvg from '@/assets/images/logo.svg'
import LogoNameSvg from '@/assets/images/logo-name.svg'
import EmailIcon from '@/assets/icons/mail-send-envelope.svg'
import AsteriskIcon from '@/assets/icons/asterisk.svg'

import { useSigninViewModel } from './useSigninViewModel'

type SigninViewProps = ReturnType<typeof useSigninViewModel>

export function SigninView({
  control,
  handleSignIn,
  handleSignUp,
}: SigninViewProps) {
  return (
    <ScrollView contentContainerClassName="bg-base">
      <KeyboardContainer>
        <View className="bg-base">
          <View className="items-center justify-center gap-4 h-[362px]">
            <LogoSvg height={64} width={64} />

            <LogoNameSvg />
          </View>

          <SafeAreaView
            edges={['bottom']}
            className="px-8 py-10 gap-8 rounded-t-3xl bg-gray-700"
          >
            <Text className="font-label text-xl text-center text-gray-100">
              Entre no app
            </Text>

            <View className="gap-3">
              <View>
                <InputController
                  control={control}
                  name="email"
                  placeholder="E-mail"
                  leftIcon={EmailIcon}
                />
              </View>

              <View>
                <InputController
                  control={control}
                  name="password"
                  placeholder="Senha"
                  leftIcon={AsteriskIcon}
                  secureTextEntry
                />
              </View>
            </View>

            <Button onPress={handleSignIn}>Entrar</Button>

            <View className="justify-end gap-y-4">
              <View className="mb-8">
                <Divider />
              </View>

              <Text className="font-body text-sm text-center text-gray-200">
                Ainda não tem cadastro?
              </Text>

              <Button variant="secondary" onPress={handleSignUp}>
                Criar conta
              </Button>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardContainer>
    </ScrollView>
  )
}
