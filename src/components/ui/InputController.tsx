import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form'

import { Input, InputProps } from './Input'

interface InputControllerProps<T extends FieldValues> extends Omit<
  InputProps,
  'value' | 'onChangeText' | 'error'
> {
  control: Control<T>
  name: Path<T>
  errors?: FieldErrors<T>
}

export function InputController<T extends FieldValues>({
  control,
  name,
  ...rest
}: InputControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        formState: { isSubmitting },
        fieldState: { error },
      }) => (
        <Input
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          isDisabled={rest.isDisabled || isSubmitting}
          error={error?.message}
          {...rest}
        />
      )}
    />
  )
}
