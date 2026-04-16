# @aava/play-core

A comprehensive Angular component library built with modern web standards, featuring reusable UI components, optimized bundle size, and enterprise-grade functionality.

## 🚀 Features

- **60+ Reusable Components** - From basic form elements to complex data grids
- **Optimized Bundle Size** - Production-ready with source maps excluded
- **Angular 19+ Compatible** - Built with the latest Angular features
- **TypeScript Support** - Full type definitions and interfaces
- **Responsive Design** - Mobile-first approach with Bootstrap grid system
- **Accessibility Ready** - WCAG compliant components
- **Theme Support** - Multiple theme variations and customization options

## 📦 Package Information

- **Current Version**: 1.0.9
- **Package Size**: ~421KB (optimized)
- **Unpacked Size**: ~3.3MB
- **Total Files**: 204
- **License**: MIT

## 🏗️ Component Categories

### Core Components
- **Form Elements**: Button, Textbox, Checkbox, Toggle, Select, Autocomplete
- **Layout**: Header, Sidebar, Footer, Drawer, Layout containers
- **Data Display**: Table, Data Grid, List, Tabs, Accordion, Timeline
- **Navigation**: Breadcrumbs, Pagination, Menu, Dropdown
- **Feedback**: Spinner, Loader, Progress Bar, Skeleton, Rating
- **Media**: Avatars, Image Cards, Carousel
- **Status**: Badges, Banner, Status indicators

### Composite Components
- **Business Logic**: Login forms, Approval cards, Search filters
- **Data Management**: Data tables, Custom grids, Dashboard widgets
- **User Experience**: Multi-step wizards, Chat windows, Prompt bars
- **Enterprise**: Navigation bars, Studio action bars, Rail navigation

### Services & Directives
- **Services**: Theme service, Portal service, Dialog service, Toast service
- **Directives**: Tooltip, Popover directives
- **Utilities**: Type definitions, Interfaces, Constants

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- Angular 16+ (compatible up to Angular 21)
- npm or yarn package manager

### Install the Package
```bash
npm install @aava/play-core
```

### Import in Your Module
```typescript
import { AavaButtonComponent, AavaTableComponent } from '@aava/play-core';

@NgModule({
  imports: [
    AavaButtonComponent,
    AavaTableComponent
  ]
})
export class AppModule { }
```

### Or Use Standalone Components
```typescript
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  standalone: true,
  imports: [AavaButtonComponent]
})
export class MyComponent { }
```

## 📖 Usage Examples

### Basic Button
```html
<aava-button 
  variant="primary" 
  size="medium"
  (click)="handleClick()">
  Click Me
</aava-button>
```

### Data Table with Sorting
```html
<aava-table
  [columns]="tableColumns"
  [data]="tableData"
  [sortable]="true"
  [loading]="isLoading"
  (sortChange)="onSort($event)">
</aava-table>
```

### Responsive Layout
```html
<aava-layout>
  <aava-header>Application Header</aava-header>
  <aava-sidebar>Navigation Menu</aava-sidebar>
  <main>Main Content</main>
  <aava-footer>Footer Content</aava-footer>
</aava-layout>
```

## 🎨 Theming & Customization

### CSS Custom Properties
The library uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --border-radius: 0.375rem;
  --spacing-md: 1rem;
}
```

### Available Themes
- Default (Light)
- Dark
- High Contrast
- Corporate
- Enterprise
- Modern Vibrant

## 🔧 Development & Building

### Prerequisites
```bash
npm install
```

### Build Commands

#### Production Build (Recommended)
```bash
npm run build
```
- Builds library in production mode
- **Automatically removes source maps** (saves ~1.5MB)
- Generates optimized bundles

#### Development Build
```bash
npm run build:dev
```

#### Performance Build
```bash
npm run build:performance
```

#### Bundle Analysis
```bash
npm run build:analyze
```

### Build Output
- **Location**: `dist/play-core/`
- **Main Bundle**: `fesm2022/aava-play-core.mjs`
- **Type Definitions**: `lib/` directory
- **Styles**: `src/lib/styles/`

## 📊 Bundle Optimization

### Source Map Removal
The library automatically excludes source maps in production builds:

```json
"postbuild": "find ../../dist/play-core -name '*.map' -delete && echo 'Source maps removed'"
```

### Size Comparison
| Build Type | Size | Source Maps |
|------------|------|-------------|
| Development | ~3.8MB | Included |
| Production | ~2.3MB | Excluded |
| **Final Package** | **~421KB** | **Excluded** |

### Optimization Features
- ✅ Source maps excluded from production
- ✅ Tree-shaking enabled
- ✅ CSS optimization
- ✅ TypeScript compilation optimization
- ✅ Asset optimization

## 🧪 Testing

### Run All Tests
```bash
npm run test:all
```

### Test Categories
- **Unit Tests**: `npm run test:unit`
- **Integration Tests**: `npm run test:integration`
- **Accessibility Tests**: `npm run test:accessibility`
- **Performance Tests**: `npm run test:performance`
- **High Contrast Tests**: `npm run test:high-contrast`

### Test Coverage
```bash
npm run test:coverage
npm run test:coverage:report
```

## 📦 Publishing

### Create Package
```bash
npm run build
cd ../../dist/play-core
npm pack
```

### Publish (if configured)
```bash
npm publish
```

## 🏗️ Project Structure

```
projects/play-core/
├── src/
│   ├── lib/
│   │   ├── components/          # Core UI components
│   │   ├── composite-components/ # Business logic components
│   │   ├── services/            # Shared services
│   │   ├── directives/          # Custom directives
│   │   ├── constants/           # Application constants
│   │   └── styles/              # CSS/SCSS files
│   └── public-api.ts            # Public exports
├── ng-package.json              # ng-packagr configuration
├── package.json                 # Package configuration
└── README.md                    # This file
```

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit pull request

### Code Standards
- Follow Angular style guide
- Use TypeScript strict mode
- Include unit tests for new components
- Maintain accessibility standards
- Follow component naming conventions

## 📚 API Documentation

### Component Interfaces
Each component exports its interfaces for type safety:

```typescript
import { 
  ButtonVariant, 
  ButtonSize, 
  TableColumn, 
  TableAction 
} from '@aava/play-core';
```

### Service APIs
```typescript
import { 
  DialogService, 
  ToastService, 
  ThemeService 
} from '@aava/play-core';
```

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
- Ensure Node.js version is 18+
- Clear `node_modules` and reinstall
- Check Angular version compatibility

#### Component Not Found
- Verify component is exported in `public-api.ts`
- Check import path and component name
- Ensure component is added to module imports

#### Styling Issues
- Verify CSS custom properties are defined
- Check if theme CSS is imported
- Ensure component styles are included

### Getting Help
- Check existing issues in the repository
- Review component examples in the playground
- Consult Angular documentation for framework-specific issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Angular](https://angular.io/)
- Styled with modern CSS and SCSS
- Icons powered by [Lucide](https://lucide.dev/)
- Grid system based on Bootstrap principles

---

**Version**: 1.0.9  
**Last Updated**: August 30, 2025  
**Maintainer**: Ascendion AVA Platform Team
