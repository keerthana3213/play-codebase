# SSO Login Demo Components

This directory contains comprehensive demo components for the SSO Login component, showcasing various features, variants, and use cases.

## Demo Structure

### Main Demo Component

- **`app-sso-login-demo.component.ts`** - Main demo component with navigation to detailed demos
- **`app-sso-login-demo.component.html`** - Main demo template with component showcase
- **`app-sso-login-demo.component.scss`** - Styling for the main demo

### Demo Data

- **`sso-login-demo.data.ts`** - Sample data and configurations for different demo scenarios

### Detailed Demo Components

- **`basic-usage-demo/`** - Basic usage demonstration with event handling
- **`variants-demo/`** - All size variants (xs, sm, md, lg, xl) showcase
- **`events-demo/`** - Comprehensive event system demonstration
- **`states-demo/`** - Different component states (loading, disabled, error)
- **`accessibility-demo/`** - Accessibility features and guidelines

## Usage

### Navigation

The main demo component provides navigation cards to each detailed demo page:

```html
<a routerLink="./basic-usage" class="nav-card">
  <h4>Basic Usage</h4>
  <p>Complete SSO login form with all features</p>
</a>
```

### Routing

Each demo is accessible via specific routes:

- `/app-sso-login` - Main demo page
- `/app-sso-login/basic-usage` - Basic usage demo
- `/app-sso-login/variants` - Variants demo
- `/app-sso-login/events` - Events demo
- `/app-sso-login/states` - States demo
- `/app-sso-login/accessibility` - Accessibility demo

### Component Integration

All demos use the `AavaSSOLoginComponent` from the library:

```typescript
import { AavaSSOLoginComponent } from "../../../../../@aava/play-core/src/lib/composite-components/sso-login/aava-sso-login.component";
```

## Features Demonstrated

### Variants

- **XS (500px)** - Compact for embedded contexts
- **SM (500px)** - Small for sidebar/modal contexts
- **MD (500px)** - Standard for most applications
- **LG (500px)** - Large for prominent authentication pages
- **XL (560px)** - Extra large for enterprise applications

### States

- **Default** - Normal interactive state
- **Loading** - During authentication process
- **Disabled** - When processing or unavailable
- **Error** - With custom error messages

### Events

- **Login** - Traditional username/password authentication
- **SSO Login** - Single Sign-On authentication
- **Forgot Password** - Password recovery flow
- **Trouble Signing In** - Help and support flow

### Accessibility

- **Keyboard Navigation** - Full keyboard support
- **Screen Reader** - Comprehensive screen reader support
- **Semantic Structure** - Proper HTML semantics
- **Color & Contrast** - WCAG AA compliance

## Styling

All demos use CSS custom properties for theming and follow the design system:

```scss
.demo-wrapper {
  background: var(--color-surface-subtle);
  border-radius: var(--global-radius-lg);
  color: var(--color-text-primary);
}
```

## Responsive Design

All demo components are responsive and adapt to different screen sizes:

```scss
@media (max-width: 768px) {
  .nav-grid {
    grid-template-columns: 1fr;
  }
}
```

## Best Practices

1. **Event Handling** - All demos properly handle component events
2. **Type Safety** - Use proper TypeScript types for all data
3. **Accessibility** - Ensure keyboard navigation and screen reader support
4. **Responsive** - Design for all screen sizes
5. **Documentation** - Clear descriptions and examples for each demo
