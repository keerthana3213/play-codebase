import { AavaAutocompleteOption } from '@aava/play-core';

// Basic options for simple demos
export const basicOptions: AavaAutocompleteOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
  { label: 'Honeydew', value: 'honeydew' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Lemon', value: 'lemon' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Raspberry', value: 'raspberry' },
  { label: 'Strawberry', value: 'strawberry' },
];

// Options with icons for icon demos
export const iconOptions: AavaAutocompleteOption[] = [
  { label: 'Dashboard', value: 'dashboard', icon: 'layout' },
  { label: 'Users', value: 'users', icon: 'users' },
  { label: 'Settings', value: 'settings', icon: 'settings' },
  { label: 'Analytics', value: 'analytics', icon: 'chart-no-axes-combined' },
  { label: 'Reports', value: 'reports', icon: 'file-text' },
  { label: 'Calendar', value: 'calendar', icon: 'calendar' },
  { label: 'Messages', value: 'messages', icon: 'message-circle' },
  { label: 'Files', value: 'files', icon: 'folder' },
  { label: 'Help', value: 'help', icon: 'help-circle' },
  { label: 'Profile', value: 'profile', icon: 'user' },
  { label: 'Notifications', value: 'notifications', icon: 'bell' },
  { label: 'Search', value: 'search', icon: 'search' },
];

// Countries for more complex demos
export const countryOptions: AavaAutocompleteOption[] = [
  { label: 'United States', value: 'us', icon: 'flag' },
  { label: 'Canada', value: 'ca', icon: 'flag' },
  { label: 'United Kingdom', value: 'uk', icon: 'flag' },
  { label: 'Germany', value: 'de', icon: 'flag' },
  { label: 'France', value: 'fr', icon: 'flag' },
  { label: 'Japan', value: 'jp', icon: 'flag' },
  { label: 'Australia', value: 'au', icon: 'flag' },
  { label: 'Brazil', value: 'br', icon: 'flag' },
  { label: 'India', value: 'in', icon: 'flag' },
  { label: 'China', value: 'cn', icon: 'flag' },
  { label: 'South Korea', value: 'kr', icon: 'flag' },
  { label: 'Mexico', value: 'mx', icon: 'flag' },
  { label: 'Italy', value: 'it', icon: 'flag' },
  { label: 'Spain', value: 'es', icon: 'flag' },
  { label: 'Netherlands', value: 'nl', icon: 'flag' },
];

// Programming languages for template demos
export const programmingLanguages: AavaAutocompleteOption[] = [
  {
    label: 'JavaScript',
    value: 'javascript',
    icon: 'code',
    description: 'Dynamic programming language for web development',
    popularity: 95,
    year: 1995,
  },
  {
    label: 'TypeScript',
    value: 'typescript',
    icon: 'code',
    description: 'Typed superset of JavaScript',
    popularity: 88,
    year: 2012,
  },
  {
    label: 'Python',
    value: 'python',
    icon: 'code',
    description: 'High-level programming language for general purpose',
    popularity: 92,
    year: 1991,
  },
  {
    label: 'Java',
    value: 'java',
    icon: 'code',
    description: 'Object-oriented programming language',
    popularity: 85,
    year: 1995,
  },
  {
    label: 'C#',
    value: 'csharp',
    icon: 'code',
    description: 'Modern programming language for .NET',
    popularity: 78,
    year: 2000,
  },
  {
    label: 'Go',
    value: 'go',
    icon: 'code',
    description: 'Statically typed compiled language',
    popularity: 72,
    year: 2009,
  },
  {
    label: 'Rust',
    value: 'rust',
    icon: 'code',
    description: 'Systems programming language focused on safety',
    popularity: 68,
    year: 2010,
  },
  {
    label: 'Kotlin',
    value: 'kotlin',
    icon: 'code',
    description: 'Modern programming language for JVM',
    popularity: 75,
    year: 2011,
  },
];

// User data for async demos
export const userOptions: AavaAutocompleteOption[] = [
  {
    label: 'John Doe',
    value: 'john-doe',
    icon: 'user',
    email: 'john.doe@example.com',
  },
  {
    label: 'Jane Smith',
    value: 'jane-smith',
    icon: 'user',
    email: 'jane.smith@example.com',
  },
  {
    label: 'Bob Johnson',
    value: 'bob-johnson',
    icon: 'user',
    email: 'bob.johnson@example.com',
  },
  {
    label: 'Alice Brown',
    value: 'alice-brown',
    icon: 'user',
    email: 'alice.brown@example.com',
  },
  {
    label: 'Charlie Wilson',
    value: 'charlie-wilson',
    icon: 'user',
    email: 'charlie.wilson@example.com',
  },
  {
    label: 'Diana Davis',
    value: 'diana-davis',
    icon: 'user',
    email: 'diana.davis@example.com',
  },
  {
    label: 'Edward Miller',
    value: 'edward-miller',
    icon: 'user',
    email: 'edward.miller@example.com',
  },
  {
    label: 'Fiona Garcia',
    value: 'fiona-garcia',
    icon: 'user',
    email: 'fiona.garcia@example.com',
  },
  {
    label: 'George Martinez',
    value: 'george-martinez',
    icon: 'user',
    email: 'george.martinez@example.com',
  },
  {
    label: 'Helen Rodriguez',
    value: 'helen-rodriguez',
    icon: 'user',
    email: 'helen.rodriguez@example.com',
  },
];

// Color options for custom styles demo
export const colorOptions: AavaAutocompleteOption[] = [
  { label: 'Red', value: 'red', icon: 'circle', color: '#ef4444' },
  { label: 'Blue', value: 'blue', icon: 'circle', color: '#3b82f6' },
  { label: 'Green', value: 'green', icon: 'circle', color: '#10b981' },
  { label: 'Yellow', value: 'yellow', icon: 'circle', color: '#f59e0b' },
  { label: 'Purple', value: 'purple', icon: 'circle', color: '#8b5cf6' },
  { label: 'Pink', value: 'pink', icon: 'circle', color: '#ec4899' },
  { label: 'Orange', value: 'orange', icon: 'circle', color: '#f97316' },
  { label: 'Teal', value: 'teal', icon: 'circle', color: '#14b8a6' },
  { label: 'Indigo', value: 'indigo', icon: 'circle', color: '#6366f1' },
  { label: 'Gray', value: 'gray', icon: 'circle', color: '#6b7280' },
];

// Technology stack options
export const techStackOptions: AavaAutocompleteOption[] = [
  { label: 'React', value: 'react', icon: 'code', category: 'Frontend' },
  { label: 'Angular', value: 'angular', icon: 'code', category: 'Frontend' },
  { label: 'Vue.js', value: 'vue', icon: 'code', category: 'Frontend' },
  { label: 'Node.js', value: 'nodejs', icon: 'code', category: 'Backend' },
  { label: 'Express', value: 'express', icon: 'code', category: 'Backend' },
  { label: 'Django', value: 'django', icon: 'code', category: 'Backend' },
  { label: 'Flask', value: 'flask', icon: 'code', category: 'Backend' },
  {
    label: 'PostgreSQL',
    value: 'postgresql',
    icon: 'database',
    category: 'Database',
  },
  {
    label: 'MongoDB',
    value: 'mongodb',
    icon: 'database',
    category: 'Database',
  },
  { label: 'Redis', value: 'redis', icon: 'database', category: 'Database' },
  { label: 'Docker', value: 'docker', icon: 'box', category: 'DevOps' },
  { label: 'Kubernetes', value: 'kubernetes', icon: 'box', category: 'DevOps' },
  { label: 'AWS', value: 'aws', icon: 'cloud', category: 'Cloud' },
  { label: 'Azure', value: 'azure', icon: 'cloud', category: 'Cloud' },
  { label: 'Google Cloud', value: 'gcp', icon: 'cloud', category: 'Cloud' },
];

// Form validation options
export const validationOptions: AavaAutocompleteOption[] = [
  { label: 'Required Field', value: 'required' },
  { label: 'Email Validation', value: 'email' },
  { label: 'Phone Number', value: 'phone' },
  { label: 'URL Validation', value: 'url' },
  { label: 'Numeric Only', value: 'numeric' },
  { label: 'Alphanumeric', value: 'alphanumeric' },
  { label: 'Minimum Length', value: 'min-length' },
  { label: 'Maximum Length', value: 'max-length' },
  { label: 'Pattern Matching', value: 'pattern' },
  { label: 'Custom Validator', value: 'custom' },
];

// Accessibility demo options
export const accessibilityOptions: AavaAutocompleteOption[] = [
  { label: 'Screen Reader Support', value: 'screen-reader', icon: 'eye' },
  { label: 'Keyboard Navigation', value: 'keyboard-nav', icon: 'keyboard' },
  { label: 'High Contrast Mode', value: 'high-contrast', icon: 'contrast' },
  { label: 'Focus Management', value: 'focus-management', icon: 'target' },
  { label: 'ARIA Attributes', value: 'aria-attributes', icon: 'accessibility' },
  { label: 'Voice Commands', value: 'voice-commands', icon: 'mic' },
  { label: 'Reduced Motion', value: 'reduced-motion', icon: 'move' },
  { label: 'Large Text Support', value: 'large-text', icon: 'type' },
  { label: 'Color Blind Support', value: 'color-blind', icon: 'palette' },
  { label: 'Motor Impairment Support', value: 'motor-support', icon: 'hand' },
];

// Mock API response for async demos
export const mockApiResponse = (query: string): AavaAutocompleteOption[] => {
  const allUsers = userOptions;
  if (!query) return allUsers.slice(0, 5);

  return allUsers
    .filter((user) => {
      const email = user['email'] as string | undefined;
      return (
        user.label.toLowerCase().includes(query.toLowerCase()) ||
        (email && email.toLowerCase().includes(query.toLowerCase()))
      );
    })
    .slice(0, 5);
};

// Simulate API delay
export const simulateApiCall = (
  query: string
): Promise<AavaAutocompleteOption[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockApiResponse(query));
    }, Math.random() * 1000 + 500); // Random delay between 500-1500ms
  });
};
