import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form'

import { Select, SelectProps } from './Select'

interface SelectControllerProps<T extends FieldValues> extends Omit<
  SelectProps,
  'value' | 'onChange' | 'error'
> {
  control: Control<T>
  name: Path<T>
  errors?: FieldErrors<T>
}

export function SelectController<T extends FieldValues>({
  control,
  name,
  ...rest
}: SelectControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange },
        formState: { isSubmitting },
        fieldState: { error },
      }) => (
        <Select
          value={value}
          onChange={onChange}
          isDisabled={rest.isDisabled || isSubmitting}
          error={error?.message}
          {...rest}
        />
      )}
    />
  )
}
