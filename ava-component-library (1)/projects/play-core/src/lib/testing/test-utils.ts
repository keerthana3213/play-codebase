import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

/**
 * Testing utilities for the component library
 */
export class TestUtils {
  /**
   * Get element by CSS selector
   */
  static getElement<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): DebugElement {
    return fixture.debugElement.query(By.css(selector));
  }

  /**
   * Get all elements by CSS selector
   */
  static getAllElements<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(selector));
  }

  /**
   * Get element by test ID
   */
  static getElementByTestId<T>(
    fixture: ComponentFixture<T>,
    testId: string
  ): DebugElement {
    return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  }

  /**
   * Trigger click event on element
   */
  static clickElement<T>(fixture: ComponentFixture<T>, selector: string): void {
    const element = this.getElement(fixture, selector);
    if (element) {
      element.nativeElement.click();
      fixture.detectChanges();
    }
  }

  /**
   * Trigger keyboard event on element
   */
  static triggerKeyEvent<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    eventType: 'keydown' | 'keyup' | 'keypress',
    key: string
  ): void {
    const element = this.getElement(fixture, selector);
    if (element) {
      const event = new KeyboardEvent(eventType, { key });
      element.nativeElement.dispatchEvent(event);
      fixture.detectChanges();
    }
  }

  /**
   * Set input value
   */
  static setInputValue<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    value: string
  ): void {
    const element = this.getElement(fixture, selector);
    if (element) {
      element.nativeElement.value = value;
      element.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  /**
   * Check if element has class
   */
  static hasClass<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    className: string
  ): boolean {
    const element = this.getElement(fixture, selector);
    return element
      ? element.nativeElement.classList.contains(className)
      : false;
  }

  /**
   * Check if element is visible
   */
  static isVisible<T>(fixture: ComponentFixture<T>, selector: string): boolean {
    const element = this.getElement(fixture, selector);
    if (!element) return false;
    const style = window.getComputedStyle(element.nativeElement);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0'
    );
  }

  /**
   * Check if element is disabled
   */
  static isDisabled<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): boolean {
    const element = this.getElement(fixture, selector);
    return element ? element.nativeElement.disabled : false;
  }

  /**
   * Get element text content
   */
  static getTextContent<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): string {
    const element = this.getElement(fixture, selector);
    return element ? element.nativeElement.textContent.trim() : '';
  }

  /**
   * Get element attribute value
   */
  static getAttribute<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    attribute: string
  ): string {
    const element = this.getElement(fixture, selector);
    return element ? element.nativeElement.getAttribute(attribute) : '';
  }

  /**
   * Wait for async operations
   */
  static async waitForAsync(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 0));
  }

  /**
   * Create a test host component for testing inputs/outputs
   */
  static createTestHost<T>(
    component: any,
    template: string
  ): ComponentFixture<T> {
    @Component({
      template,
      imports: [component],
      standalone: true,
    })
    class TestHostComponent {}

    return TestBed.createComponent(TestHostComponent) as ComponentFixture<T>;
  }
}

/**
 * Common test data for components
 */
export const TestData = {
  // Colors
  colors: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],

  // Sizes
  sizes: ['small', 'medium', 'large'],

  // Variants
  variants: ['filled', 'outlined', 'text', 'ghost'],

  // Sample text
  sampleText: 'Sample text for testing',
  longText:
    'This is a very long text that should be truncated or wrapped properly in the component',

  // Sample data
  sampleItems: [
    { id: 1, name: 'Item 1', value: 'value1' },
    { id: 2, name: 'Item 2', value: 'value2' },
    { id: 3, name: 'Item 3', value: 'value3' },
  ],

  // Sample form data
  formData: {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    active: true,
  },
};

/**
 * Common test expectations
 */
export const TestExpectations = {
  /**
   * Expect element to be present
   */
  elementToBePresent<T>(fixture: ComponentFixture<T>, selector: string): void {
    const element = TestUtils.getElement(fixture, selector);
    expect(element).toBeTruthy();
  },

  /**
   * Expect element to not be present
   */
  elementToNotBePresent<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): void {
    const element = TestUtils.getElement(fixture, selector);
    expect(element).toBeFalsy();
  },

  /**
   * Expect element to have class
   */
  elementToHaveClass<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    className: string
  ): void {
    expect(TestUtils.hasClass(fixture, selector, className)).toBeTrue();
  },

  /**
   * Expect element to not have class
   */
  elementToNotHaveClass<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    className: string
  ): void {
    expect(TestUtils.hasClass(fixture, selector, className)).toBeFalse();
  },

  /**
   * Expect element to be visible
   */
  elementToBeVisible<T>(fixture: ComponentFixture<T>, selector: string): void {
    expect(TestUtils.isVisible(fixture, selector)).toBeTrue();
  },

  /**
   * Expect element to be hidden
   */
  elementToBeHidden<T>(fixture: ComponentFixture<T>, selector: string): void {
    expect(TestUtils.isVisible(fixture, selector)).toBeFalse();
  },

  /**
   * Expect element to be disabled
   */
  elementToBeDisabled<T>(fixture: ComponentFixture<T>, selector: string): void {
    expect(TestUtils.isDisabled(fixture, selector)).toBeTrue();
  },

  /**
   * Expect element to be enabled
   */
  elementToBeEnabled<T>(fixture: ComponentFixture<T>, selector: string): void {
    expect(TestUtils.isDisabled(fixture, selector)).toBeFalse();
  },

  /**
   * Expect element to have text content
   */
  elementToHaveText<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    text: string
  ): void {
    expect(TestUtils.getTextContent(fixture, selector)).toContain(text);
  },

  /**
   * Expect element to have exact text content
   */
  elementToHaveExactText<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    text: string
  ): void {
    expect(TestUtils.getTextContent(fixture, selector)).toBe(text);
  },
};
