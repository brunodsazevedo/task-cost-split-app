import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { KeyboardContainer } from '@/components/KeyboardContainer'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import LogoSvg from '@/assets/images/logo.svg'
import LogoNameSvg from '@/assets/images/logo-name.svg'
import EmailIcon from '@/assets/icons/mail-send-envelope.svg'
import AsteriskIcon from '@/assets/icons/asterisk.svg'

import { useSigninViewModel } from './useSigninViewModel'
import { Divider } from '@/components/ui/Divider'

type SigninViewProps = ReturnType<typeof useSigninViewModel>

export function SigninView({}: SigninViewProps) {
  return (
    <ScrollView>
      <KeyboardContainer>
        <View className="bg-base">
          <View className="items-center justify-center gap-2 h-[362px]">
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
                <Input placeholder="E-mail" leftIcon={EmailIcon} />
              </View>

              <View>
                <Input
                  placeholder="Senha"
                  leftIcon={AsteriskIcon}
                  secureTextEntry
                />
              </View>
            </View>

            <Button>Entrar</Button>

            <View className="justify-end gap-y-4">
              <View className="mb-8">
                <Divider />
              </View>

              <Text className="font-body text-sm text-center text-gray-200">
                Ainda não tem cadastro?
              </Text>

              <Button variant="secondary">Criar conta</Button>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardContainer>
    </ScrollView>
  )
}
