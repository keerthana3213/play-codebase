# @aava/play-animations

An angular animation library

## 🚀 Features



## 📦 Package Information

- **Current Version**: 1.0.1
- **Package Size**: ~421KB (optimized)
- **Unpacked Size**: ~3.3MB
- **Total Files**: 204
- **License**: MIT

## 🏗️ Component Categories

### Core Components


### Composite Components


### Services & Directives


## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- Angular 16+ (compatible up to Angular 21)
- npm or yarn package manager

### Install the Package
```bash
npm install @aava/play-animations
```

### Import in Your Module
```typescript
import { AavaButtonComponent, AavaTableComponent } from '@aava/play-animations';

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
import { AavaButtonComponent } from '@aava/play-animations';

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
  (click)="handleClick()"
   playAnimate animation="ripple" trigger="click">
  Click Me
</aava-button>
```



### Source Map Removal
The library automatically excludes source maps in production builds:

```json
"postbuild": "find ../../dist/play-animation -name '*.map' -delete && echo 'Source maps removed'"
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
cd ../../dist/play-animation
npm pack
```

### Publish (if configured)
```bash
npm publish
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

### Service APIs
```typescript
import { 
 PlayAnimateDirective, PlayAnimationService
} from '@aava/play-animations';
```

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
- Ensure Node.js version is 18+
- Clear `node_modules` and reinstall
- Check Angular version compatibility



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
**Last Updated**: November 17, 2025  
**Maintainer**: Ascendion AVA Platform Team
