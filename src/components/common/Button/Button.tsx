import { forwardRef } from 'react';
import { ButtonProps } from '../../../stories/Button';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', rounded = 'md', children, ...props },
    ref
  ) => {
    return (
      <button css={styles.button(variant, size, rounded)} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;