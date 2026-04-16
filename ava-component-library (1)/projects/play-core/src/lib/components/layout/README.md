# Aava Layout Component

A reusable layout component that provides a consistent structure with header, sidebar, main content area, and footer sections.

## Features

- **Header Section**: Fixed height (default: 100px) with full width
- **Sidebar Container**: Fixed width (default: 100px) with height calculated as 100vh - header height
- **Main Content Area**: Flexible content area using `ng-content` for dynamic content
- **Footer Section**: Bottom section with dynamic text support
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Accessibility**: High contrast mode support
- **Customizable**: Configurable dimensions and visibility options

## Usage

### Basic Usage

```html
<aava-layout>
  <!-- Header content -->
  <div slot="header">
    <h1>My Application Header</h1>
  </div>

  <!-- Sidebar content -->
  <div slot="sidebar">
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </div>

  <!-- Main content -->
  <div>
    <h2>Main Content Area</h2>
    <p>This is where your main application content goes.</p>
  </div>

  <!-- Footer content -->
  <div slot="footer">
    <p>Custom footer content</p>
  </div>
</aava-layout>
```

### With Custom Dimensions

```html
<aava-layout 
  headerHeight="120px" 
  sidebarWidth="250px"
  footerText="© 2024 My Company">
  
  <!-- Content here -->
</aava-layout>
```

### Without Sidebar

```html
<aava-layout [showSidebar]="false">
  <!-- Content without sidebar -->
</aava-layout>
```

### Without Footer

```html
<aava-layout [showFooter]="false">
  <!-- Content without footer -->
</aava-layout>
```

## Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `headerHeight` | string | '100px' | Height of the header section |
| `sidebarWidth` | string | '100px' | Width of the sidebar section |
| `footerText` | string | '' | Default text for footer (if no slot content) |
| `showSidebar` | boolean | true | Whether to show the sidebar |
| `showFooter` | boolean | true | Whether to show the footer |

## Content Slots

- **`[slot="header"]`**: Content for the header section
- **`[slot="sidebar"]`**: Content for the sidebar section
- **`[slot="footer"]`**: Content for the footer section
- **Default slot**: Main content area (no slot attribute needed)

## Styling

The component uses CSS Grid and Flexbox for layout. You can customize the appearance by overriding the CSS classes:

- `.aava-layout-container`: Main container
- `.aava-layout-header`: Header section
- `.aava-layout-sidebar`: Sidebar section
- `.aava-layout-main`: Main content area
- `.aava-layout-footer`: Footer section

## Responsive Behavior

- On mobile devices (≤768px), the sidebar becomes a collapsible overlay
- The main content area takes full width on mobile
- Smooth transitions for sidebar visibility

## Accessibility

- Supports high contrast mode
- Semantic HTML structure with proper ARIA roles
- Keyboard navigation support
- Screen reader friendly

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- IE11+ with appropriate polyfills
- Mobile browsers with touch support
