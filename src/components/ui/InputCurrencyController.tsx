import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form'

import { InputCurrency, InputCurrencyProps } from './InputCurrency'

interface InputCurrencyControllerProps<T extends FieldValues> extends Omit<
  InputCurrencyProps,
  'value' | 'onChangeValue' | 'error'
> {
  control: Control<T>
  name: Path<T>
  errors?: FieldErrors<T>
}

export function InputCurrencyController<T extends FieldValues>({
  control,
  name,
  ...rest
}: InputCurrencyControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        formState: { isSubmitting },
        fieldState: { error },
      }) => (
        <InputCurrency
          value={value}
          onChangeValue={onChange}
          onBlur={onBlur}
          isDisabled={rest.isDisabled || isSubmitting}
          error={error?.message}
          {...rest}
        />
      )}
    />
  )
}
