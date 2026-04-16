export interface SSOLoginDemoData {
  id: string;
  title: string;
  description: string;
  variant?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  errorMessage?: string;
}

export const ssoLoginVariants: SSOLoginDemoData[] = [
  {
    id: 'xs',
    title: 'Extra Small',
    description: 'Compact variant for embedded contexts',
    variant: 'xs',
  },
  {
    id: 'sm',
    title: 'Small',
    description: 'Small variant for sidebar or modal contexts',
    variant: 'sm',
  },
  {
    id: 'md',
    title: 'Medium',
    description: 'Standard variant for most applications',
    variant: 'md',
  },
  {
    id: 'lg',
    title: 'Large',
    description: 'Large variant for prominent authentication pages',
    variant: 'lg',
  },
  {
    id: 'xl',
    title: 'Extra Large',
    description: 'Extra large variant for enterprise applications',
    variant: 'xl',
  },
];

export const ssoLoginStates: SSOLoginDemoData[] = [
  {
    id: 'default',
    title: 'Default State',
    description: 'Normal interactive state',
  },
  {
    id: 'loading',
    title: 'Loading State',
    description: 'Component in loading state during authentication',
    loading: true,
  },
  {
    id: 'disabled',
    title: 'Disabled State',
    description: 'Component disabled during processing',
    disabled: true,
  },
  {
    id: 'error',
    title: 'Error State',
    description: 'Component with error message display',
    errorMessage: 'Invalid username or password. Please try again.',
  },
];

export const ssoLoginEvents: SSOLoginDemoData[] = [
  {
    id: 'login',
    title: 'Login Event',
    description: 'Traditional username/password login',
  },
  {
    id: 'sso-login',
    title: 'SSO Login Event',
    description: 'Single Sign-On authentication',
  },
  {
    id: 'forgot-password',
    title: 'Forgot Password Event',
    description: 'Password recovery flow',
  },
  {
    id: 'trouble-signin',
    title: 'Trouble Signing In Event',
    description: 'Help and support flow',
  },
];
