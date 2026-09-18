import { useMemo, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Button } from '../Button'
import { SelectOptionData } from '.'

import CheckIcon from '@/assets/icons/check.svg'
import { colors } from '@/theme/colors'

export interface OptionsProps {
  options: SelectOptionData[]
  multiSelect?: boolean
  initialSelectedIds?: string[]
  onConfirm?: (selectedIds: string[]) => void
}

export function Options({
  options = [],
  multiSelect = false,
  initialSelectedIds = [],
  onConfirm,
}: OptionsProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds)

  const data = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        selected: selectedIds.includes(option.id),
      })),
    [options, selectedIds],
  )

  function handlePress(option: SelectOptionData) {
    if (multiSelect) {
      const updated = selectedIds.includes(option.id)
        ? selectedIds.filter((id) => id !== option.id)
        : [...selectedIds, option.id]

      setSelectedIds(updated)
      return
    }

    setSelectedIds([option.id])
    onConfirm?.([option.id])
  }

  return (
    <View className="w-full h-max-3/5 rounded-xl bg-gray-700 p-6">
      <ScrollView>
        <View className="gap-y-3">
          {data.map((option) => (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.7}
              onPress={() => handlePress(option)}
              className="flex-row items-center justify-between py-2 px-4"
            >
              <View className="flex-row items-center gap-x-2">
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

              {option.selected && (
                <View className="items-center justify-center rounded-full p-2 bg-green-base">
                  <CheckIcon height={8} width={8} color={colors.gray['100']} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {multiSelect && (
        <View className="mt-6">
          <Button onPress={() => onConfirm?.(selectedIds)}>
            Confirmar seleção
          </Button>
        </View>
      )}
    </View>
  )
}
