import { tv, VariantProps } from 'tailwind-variants'

export const inputVariants = tv({
  slots: {
    container: 'w-full',
    wrapper:
      'flex-row items-center px-4 py-3 border border-gray-600 rounded-xl bg-gray-800',
    input: 'flex-1 font-body text-base text-gray-200',
  },

  variants: {
    isFocused: {
      true: {
        wrapper: 'border-white',
      },
    },

    isDisabled: {
      true: {
        wrapper: 'opacity-50',
      },
    },
  },

  defaultVariants: {
    isFocused: false,
  },
})

export type InputVariantsProps = VariantProps<typeof inputVariants>
