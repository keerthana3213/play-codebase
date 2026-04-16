# Component Tokens Documentation

## Overview

The `components/` directory contains component-specific design tokens that build upon the base semantic tokens. These tokens provide component-specific design decisions and ensure consistency across all component instances.

## Architecture

Component tokens follow a hierarchical structure:

```
components/
├── _index.css         # Imports all component tokens
├── _button.css        # Button component tokens
├── _input.css         # Input component tokens
├── _typography.css    # Typography component tokens
├── _badge.css         # Badge component tokens
├── _spinner.css       # Spinner component tokens
├── _progress.css      # Progress component tokens
├── _tooltip.css       # Tooltip component tokens
├── _slider.css        # Slider component tokens
├── _radio.css         # Radio component tokens
├── _checkbox.css      # Checkbox component tokens
├── _toast.css         # Toast component tokens
└── _dropdown.css      # Dropdown component tokens
```

## Token Structure

Each component token file follows this structure:

```css
/**
 * Component: [Component Name]
 * Purpose: [Brief description of the component's purpose]
 */

:root {
  /* Component-specific semantic tokens */
  --{component}-{property}-{variant}: var(--semantic-token);
  
  /* Component states */
  --{component}-{state}-{property}: var(--semantic-token);
  
  /* Component sizes */
  --{component}-{size}-{property}: var(--semantic-token);
}
```

## Component Token Categories

### 1. Button Tokens (`_button.css`)
Button component tokens for different variants, states, and sizes.

**Variants:**
- Primary, Secondary, Tertiary, Ghost, Danger

**States:**
- Default, Hover, Active, Disabled, Loading

**Sizes:**
- Small, Medium, Large

**Example:**
```css
--button-primary-background: var(--color-surface-interactive-default);
--button-primary-text: var(--color-text-on-brand);
--button-primary-hover-background: var(--color-surface-interactive-hover);
```

### 2. Input Tokens (`_input.css`)
Input component tokens for form controls.

**States:**
- Default, Focus, Error, Disabled, Success

**Sizes:**
- Small, Medium, Large

**Example:**
```css
--input-border-color: var(--color-border-default);
--input-focus-border-color: var(--color-border-focus);
--input-error-border-color: var(--color-border-error);
```

### 3. Typography Tokens (`_typography.css`)
Typography component tokens for text elements.

**Elements:**
- Headings (H1-H6), Body text, Labels, Captions

**Variants:**
- Display, Heading, Body, Label, Caption

**Example:**
```css
--typography-heading-1-font: var(--font-heading-h1);
--typography-body-1-font: var(--font-body-1);
--typography-label-font: var(--font-label);
```

### 4. Badge Tokens (`_badge.css`)
Badge component tokens for status indicators.

**Variants:**
- Default, Success, Warning, Error, Info

**Sizes:**
- Small, Medium, Large

**Example:**
```css
--badge-success-background: var(--color-surface-success);
--badge-success-text: var(--color-text-success);
```

### 5. Spinner Tokens (`_spinner.css`)
Spinner component tokens for loading states.

**Sizes:**
- Small, Medium, Large

**Variants:**
- Default, Primary, Secondary

**Example:**
```css
--spinner-size-sm: var(--global-icon-size-sm);
--spinner-color: var(--color-text-secondary);
```

### 6. Progress Tokens (`_progress.css`)
Progress component tokens for progress indicators.

**Variants:**
- Default, Success, Warning, Error

**Sizes:**
- Small, Medium, Large

**Example:**
```css
--progress-track-background: var(--color-surface-subtle);
--progress-fill-background: var(--color-surface-interactive-default);
```

### 7. Tooltip Tokens (`_tooltip.css`)
Tooltip component tokens for contextual information.

**Positions:**
- Top, Bottom, Left, Right

**Variants:**
- Default, Error, Warning

**Example:**
```css
--tooltip-background: var(--color-surface-elevated);
--tooltip-text: var(--color-text-primary);
```

### 8. Slider Tokens (`_slider.css`)
Slider component tokens for range inputs.

**States:**
- Default, Focus, Disabled

**Sizes:**
- Small, Medium, Large

**Example:**
```css
--slider-track-background: var(--color-surface-subtle);
--slider-thumb-background: var(--color-surface-interactive-default);
```

### 9. Radio Tokens (`_radio.css`)
Radio component tokens for radio button inputs.

**States:**
- Default, Checked, Disabled, Focus

**Sizes:**
- Small, Medium, Large

**Example:**
```css
--radio-border-color: var(--color-border-default);
--radio-checked-background: var(--color-surface-interactive-default);
```

### 10. Checkbox Tokens (`_checkbox.css`)
Checkbox component tokens for checkbox inputs.

**States:**
- Default, Checked, Indeterminate, Disabled, Focus

**Sizes:**
- Small, Medium, Large

**Example:**
```css
--checkbox-border-color: var(--color-border-default);
--checkbox-checked-background: var(--color-surface-interactive-default);
```

### 11. Toast Tokens (`_toast.css`)
Toast component tokens for notification messages.

**Variants:**
- Success, Error, Warning, Info

**Positions:**
- Top, Bottom, Top-right, Top-left

**Example:**
```css
--toast-success-background: var(--color-surface-success);
--toast-error-background: var(--color-surface-error);
```

### 12. Dropdown Tokens (`_dropdown.css`)
Dropdown component tokens for select menus.

**States:**
- Default, Open, Disabled

**Sizes:**
- Small, Medium, Large

**Example:**
```css
--dropdown-background: var(--color-background-primary);
--dropdown-border-color: var(--color-border-default);
```

## Usage Guidelines

### For Component Developers

1. **Import Component Tokens:**
```css
@import "./tokens/components/_button.css";
```

2. **Use in Component Styles:**
```css
.button {
  background-color: var(--button-primary-background);
  color: var(--button-primary-text);
  padding: var(--button-medium-padding);
}
```

3. **Handle States:**
```css
.button:hover {
  background-color: var(--button-primary-hover-background);
}

.button:disabled {
  background-color: var(--button-disabled-background);
}
```

### For Designers

1. **Reference in Design Specs:**
   - Use component tokens in design specifications
   - Document component variants and states
   - Maintain consistency across components

2. **Component Variations:**
   - Define clear variant guidelines
   - Document state transitions
   - Specify size relationships

## Best Practices

### 1. Token Naming
- Use consistent naming patterns: `--{component}-{property}-{variant}`
- Be descriptive but concise
- Follow established conventions

### 2. Token Relationships
- Build on semantic tokens, not global tokens
- Maintain clear hierarchy
- Avoid circular dependencies

### 3. Component Consistency
- Use consistent token patterns across components
- Maintain similar state structures
- Follow established size scales

### 4. Documentation
- Document component-specific decisions
- Explain token relationships
- Provide usage examples

## Maintenance

### Adding New Components
1. Create component token file
2. Define component-specific tokens
3. Add to `_index.css`
4. Update documentation

### Modifying Existing Components
1. Consider impact on all variants
2. Test across all states
3. Update related components if needed
4. Document changes

### Component Token Dependencies
- Component tokens depend on semantic tokens
- Semantic tokens depend on global tokens
- Theme tokens can override component tokens

## Examples

### Button Component Usage
```css
/* Component definition */
.button {
  background-color: var(--button-primary-background);
  color: var(--button-primary-text);
  border: 1px solid var(--button-primary-border);
  padding: var(--button-medium-padding);
  border-radius: var(--button-border-radius);
  font: var(--button-font);
}

/* State variations */
.button:hover {
  background-color: var(--button-primary-hover-background);
}

.button:active {
  background-color: var(--button-primary-active-background);
}

.button:disabled {
  background-color: var(--button-disabled-background);
  color: var(--button-disabled-text);
}
```

### Input Component Usage
```css
/* Component definition */
.input {
  border: 1px solid var(--input-border-color);
  background-color: var(--input-background);
  color: var(--input-text);
  padding: var(--input-padding);
  border-radius: var(--input-border-radius);
}

/* State variations */
.input:focus {
  border-color: var(--input-focus-border-color);
  box-shadow: 0 0 0 2px var(--input-focus-ring-color);
}

.input.error {
  border-color: var(--input-error-border-color);
}
```

---

*This documentation is maintained as part of the Play+ Design System. For questions or contributions, please refer to the project guidelines.* 