import { ElementType } from 'react'
import { View, Pressable, Text, Image, TouchableOpacity } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { Input } from '@/components/ui/Input'

import { useSelectViewModel } from './useSelectViewModel'

import TrashIcon from '@/assets/icons/trash.svg'
import { colors } from '@/theme/colors'

export interface SelectOptionData {
  id: string
  label: string
  imageURL?: string
  multiSelect?: boolean
  selected?: boolean
}

export interface SelectProps {
  placeholder?: string
  leftIcon?: ElementType<SvgProps>
  isDisabled?: boolean
  error?: string
  options: SelectOptionData[]
  multiSelect?: boolean
  value?: string | string[]
  onChange?: (value: string | string[]) => void
}

export function Select({
  placeholder,
  leftIcon,
  isDisabled,
  error,
  options = [],
  multiSelect = false,
  value,
  onChange,
}: SelectProps) {
  const {
    optionSelectedLabel,
    optionsSelected,
    handleOpenSelectModal,
    handleRemoveSelectedOption,
  } = useSelectViewModel({
    value,
    options,
    onChange,
    multiSelect,
  })

  return (
    <View>
      <Pressable disabled={isDisabled} onPress={handleOpenSelectModal}>
        <Input
          value={optionSelectedLabel}
          leftIcon={leftIcon}
          placeholder={placeholder}
          isDisabled
          error={error}
          className={!isDisabled ? 'opacity-100' : ''}
        />
      </Pressable>

      {multiSelect && (
        <View className="gap-y-4 mt-4">
          {optionsSelected.map((option) => (
            <View
              key={option.id}
              className="flex-row items-center justify-between px-4"
            >
              <View key={option.id} className="flex-row items-center gap-x-3">
                {option.imageURL && (
                  <Image
                    alt={`avatar-${option.id}`}
                    source={{ uri: option.imageURL }}
                    className="h-8 w-8"
                  />
                )}

                <Text className="font-body text-base text-gray-100">
                  {option.label}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleRemoveSelectedOption(option.id)}
              >
                <TrashIcon
                  height={20}
                  width={20}
                  color={colors['danger-light']}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
