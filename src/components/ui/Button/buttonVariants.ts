import { tv } from 'tailwind-variants'

export enum ButtonVariantsEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
}

export const buttonVariants = tv({
  slots: {
    container:
      'w-full flex-row items-center gap-x-2 px-4 py-3 min-h-12 rounded-full border',
    text: 'font-label text-base',
  },

  variants: {
    variant: {
      primary: {
        container: 'bg-green-base border-green-light',
        text: 'text-gray-800',
      },

      secondary: {
        container: 'bg-gray-600 border-gray-500',
        text: 'text-gray-200',
      },

      danger: {
        container: 'bg-gray-600 border-gray-500',
        text: 'text-danger-light',
      },
    },

    hasIcon: {
      true: {
        container: 'justify-between',
      },

      false: {
        container: 'justify-center',
      },
    },

    isDisabled: {
      true: {
        container: 'opacity-50',
      },
    },

    isLoading: {
      true: {
        container: 'opacity-50',
      },
    },
  },

  defaultVariants: {
    variant: ButtonVariantsEnum.PRIMARY,
  },
})
