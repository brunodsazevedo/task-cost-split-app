import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HeaderModal } from '@/components/HeaderModal'
import { InputController } from '@/components/ui/InputController'
import { Button } from '@/components/ui/Button'
import { InputCurrencyController } from '@/components/ui/InputCurrencyController'
import { SelectController } from '@/components/ui/SelectController'

import UsersGroupIcon from '@/assets/icons/user-multiple-group.svg'
import CoinIcon from '@/assets/icons/dollar-coin.svg'

import { useCreateUpdateExpenseViewModel } from './useCreateUpdateExpense.viewModel'

type Props = ReturnType<typeof useCreateUpdateExpenseViewModel>

export function CreateUpdateExpenseView({
  expenseData,
  control,
  participantsOptions,
  isLoading,
  handleClose,
  handleCreateExpense,
}: Props) {
  return (
    <View className="">
      <HeaderModal
        title={expenseData ? 'Editar Despesa' : 'Criar Despesa'}
        onClose={handleClose}
      />

      <SafeAreaView edges={['bottom']} className="gap-y-8 px-6 pb-6">
        <View className="gap-y-2">
          <View>
            <InputController
              control={control}
              name="title"
              placeholder="Título"
            />
          </View>

          <View>
            <InputCurrencyController
              control={control}
              name="amountInCents"
              placeholder="0,00"
              leftIcon={CoinIcon}
            />
          </View>

          <View>
            <SelectController
              control={control}
              name="participantsIds"
              options={participantsOptions}
              multiSelect
              placeholder="Participantes"
              leftIcon={UsersGroupIcon}
            />
          </View>
        </View>

        <View className="flex-1 justify-end">
          <View>
            <Button isLoading={isLoading} onPress={handleCreateExpense}>
              Salvar
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}
