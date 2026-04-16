import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Common test configuration for component library tests
 */
export class TestConfig {
  /**
   * Configure TestBed with common imports and providers
   */
  static configureTestingModule(imports: any[] = [], providers: any[] = []) {
    return TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ...imports,
      ],
      providers: [...providers],
    });
  }

  /**
   * Common test data for form components
   */
  static getFormTestData() {
    return {
      validEmail: 'test@example.com',
      invalidEmail: 'invalid-email',
      validPassword: 'Password123!',
      invalidPassword: '123',
      longText:
        'This is a very long text that should be properly handled by the component',
      specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
      unicodeText: '测试文本 with unicode 🚀',
      numbers: '1234567890',
      emptyString: '',
      whitespace: '   ',
      nullValue: null,
      undefinedValue: undefined,
    };
  }

  /**
   * Common test scenarios for validation
   */
  static getValidationScenarios() {
    return {
      required: {
        valid: ['test', '123', 'test@example.com'],
        invalid: ['', null, undefined, '   '],
      },
      email: {
        valid: [
          'test@example.com',
          'user.name@domain.co.uk',
          'test+tag@example.org',
        ],
        invalid: ['invalid-email', '@example.com', 'test@', 'test.example.com'],
      },
      minLength: {
        valid: ['123456', 'abcdef', 'test123'],
        invalid: ['123', 'abc', 'test'],
      },
      maxLength: {
        valid: ['123', 'abc', 'test'],
        invalid: [
          '123456789012345678901234567890',
          'very long text that exceeds the maximum allowed length',
        ],
      },
    };
  }

  /**
   * Common accessibility test helpers
   */
  static getAccessibilityTests() {
    return {
      /**
       * Test if element has proper ARIA attributes
       */
      hasAriaAttributes: (
        element: HTMLElement,
        attributes: Record<string, string>
      ) => {
        Object.entries(attributes).forEach(([attr, value]) => {
          expect(element.getAttribute(`aria-${attr}`)).toBe(value);
        });
      },

      /**
       * Test if element is keyboard accessible
       */
      isKeyboardAccessible: (element: HTMLElement) => {
        expect(element.tabIndex).toBeGreaterThanOrEqual(0);
        expect(element.getAttribute('role')).toBeTruthy();
      },

      /**
       * Test if element has proper focus management
       */
      hasFocusManagement: (element: HTMLElement) => {
        element.focus();
        expect(document.activeElement).toBe(element);
      },

      /**
       * Test if element has proper color contrast (basic check)
       */
      hasColorContrast: (element: HTMLElement) => {
        const style = window.getComputedStyle(element);
        const backgroundColor = style.backgroundColor;
        const color = style.color;

        // Basic check - in real scenarios, you'd use a proper contrast checking library
        expect(backgroundColor).toBeTruthy();
        expect(color).toBeTruthy();
        expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
        expect(color).not.toBe('rgba(0, 0, 0, 0)');
      },
    };
  }

  /**
   * Common performance test helpers
   */
  static getPerformanceTests() {
    return {
      /**
       * Measure render time
       */
      measureRenderTime: (renderFunction: () => void, maxTime = 100) => {
        const startTime = performance.now();
        renderFunction();
        const endTime = performance.now();
        const renderTime = endTime - startTime;

        expect(renderTime).toBeLessThan(maxTime);
        return renderTime;
      },

      /**
       * Measure memory usage (basic)
       */
      measureMemoryUsage: (testFunction: () => void) => {
        if ('memory' in performance) {
          const startMemory = (performance as any).memory.usedJSHeapSize;
          testFunction();
          const endMemory = (performance as any).memory.usedJSHeapSize;
          const memoryIncrease = endMemory - startMemory;

          // Memory increase should be reasonable (less than 1MB for simple operations)
          expect(memoryIncrease).toBeLessThan(1024 * 1024);
          return memoryIncrease;
        }
        return 0;
      },

      /**
       * Test component with many properties
       */
      testWithManyProperties: (
        component: any,
        properties: Record<string, any>
      ) => {
        const startTime = performance.now();

        Object.entries(properties).forEach(([key, value]) => {
          component[key] = value;
        });

        const endTime = performance.now();
        const timeToSet = endTime - startTime;

        expect(timeToSet).toBeLessThan(50); // Should set properties quickly
        return timeToSet;
      },
    };
  }

  /**
   * Common edge case test helpers
   */
  static getEdgeCaseTests() {
    return {
      /**
       * Test with extreme values
       */
      testExtremeValues: (component: any, property: string, values: any[]) => {
        values.forEach((value) => {
          component[property] = value;
          expect(component).toBeTruthy();
        });
      },

      /**
       * Test with special characters
       */
      testSpecialCharacters: (component: any, property: string) => {
        const specialChars = [
          '!@#$%^&*()_+-=[]{}|;:,.<>?',
          '测试文本',
          '🚀🎉💻',
          '\\n\\t\\r',
          '<script>alert("test")</script>',
          '&lt;script&gt;alert("test")&lt;/script&gt;',
        ];

        specialChars.forEach((chars) => {
          component[property] = chars;
          expect(component).toBeTruthy();
        });
      },

      /**
       * Test with very long content
       */
      testLongContent: (component: any, property: string) => {
        const longContent = 'A'.repeat(10000); // 10KB of content
        component[property] = longContent;
        expect(component).toBeTruthy();
      },

      /**
       * Test with null/undefined values
       */
      testNullUndefined: (component: any, property: string) => {
        [null, undefined].forEach((value) => {
          component[property] = value;
          expect(component).toBeTruthy();
        });
      },
    };
  }

  /**
   * Common integration test helpers
   */
  static getIntegrationTests() {
    return {
      /**
       * Test component with parent-child relationships
       */
      testParentChild: (parentComponent: any, childComponent: any) => {
        expect(parentComponent).toBeTruthy();
        expect(childComponent).toBeTruthy();
        // Add specific parent-child relationship tests here
      },

      /**
       * Test component with services
       */
      testWithService: (component: any, service: any) => {
        expect(component).toBeTruthy();
        expect(service).toBeTruthy();
        // Add specific service integration tests here
      },

      /**
       * Test component with routing
       */
      testWithRouting: (component: any) => {
        expect(component).toBeTruthy();
        // Add specific routing tests here
      },
    };
  }
}
