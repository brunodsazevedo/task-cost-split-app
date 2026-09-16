import { tv, VariantProps } from 'tailwind-variants'

export enum ButtonVariantsEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
}

export const iconButtonVariants = tv({
  slots: {
    container: 'w-12 h-12 items-center justify-center p-3 rounded-full border',
  },

  variants: {
    variant: {
      primary: {
        container: 'bg-green-base border-green-light',
      },

      secondary: {
        container: 'bg-gray-600 border-gray-500',
      },

      danger: {
        container: 'bg-gray-600 border-gray-500',
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

export type IconButtonVariantsProps = VariantProps<typeof iconButtonVariants>
