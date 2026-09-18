import { tv } from 'tailwind-variants'

export const inputCurrencyVariants = tv({
  slots: {
    container: 'w-full',
    wrapper:
      'flex-row items-center gap-x-2 px-4 py-3 border border-gray-600 rounded-xl bg-gray-800',
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
    isDisabled: false,
  },
})
