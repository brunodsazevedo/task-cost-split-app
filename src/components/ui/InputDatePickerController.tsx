import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form'

import { InputDatePicker, InputDatePickerProps } from './InputDatePicker'

interface Props<T extends FieldValues> extends Omit<
  InputDatePickerProps,
  'value' | 'error'
> {
  control: Control<T>
  name: Path<T>
  errors?: FieldErrors<T>
}

export function InputDatePickerController<T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <InputDatePicker {...rest} value={value} onChangeValue={onChange} />
      )}
    />
  )
}
