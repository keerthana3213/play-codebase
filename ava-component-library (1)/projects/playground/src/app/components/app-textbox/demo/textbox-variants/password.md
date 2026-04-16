```html
<div class="password-demo" style="max-width: 400px; padding: 20px;">
  <aava-textbox [formControl]="passwordControl" label="Password (JS Masked)" type="text" placeholder="Enter password"
    (input)="onPasswordInput($event)">
    <aava-icon slot="icon-end" [iconName]="showPassword ? 'eye' : 'eye-off'" (click)="togglePasswordVisibility()">
    </aava-icon>
  </aava-textbox>
  <div style="margin-top: 8px; font-size: 12px; color: #666;">
    <div>Display: {{ passwordControl.value }}</div>
    <div>Real Value: {{ realPasswordValue }}</div>
  </div>
</div>
```

```ts
// Real password value (actual text)
  private _realPasswordValue = '';

  // Password form control
  passwordControl = new FormControl('');

  showPassword = false;

  get realPasswordValue(): string {
    return this._realPasswordValue;
  }

  /**
   * Handle password input with JavaScript masking
   * Converts characters to dots while preserving the real value
   */
  onPasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const currentDisplayValue = input.value;
    const cursorPosition = input.selectionStart || 0;

    if (this.showPassword) {
      // When visible, just update the real value directly
      this._realPasswordValue = currentDisplayValue;
      this.passwordControl.setValue(currentDisplayValue, { emitEvent: false });
    } else {
      // When masked, we need to figure out what changed
      const previousDisplayValue = this.passwordControl.value || '';
      const previousLength = previousDisplayValue.length;
      const currentLength = currentDisplayValue.length;

      if (currentLength > previousLength) {
        // Characters were added
        const charsAdded = currentLength - previousLength;
        const addPosition = cursorPosition - charsAdded;
        const newChars = currentDisplayValue.substring(addPosition, cursorPosition);

        // Update real value
        this._realPasswordValue =
          this._realPasswordValue.substring(0, addPosition) +
          newChars +
          this._realPasswordValue.substring(addPosition);

      } else if (currentLength < previousLength) {
        // Characters were deleted
        const charsDeleted = previousLength - currentLength;

        // Update real value
        this._realPasswordValue =
          this._realPasswordValue.substring(0, cursorPosition) +
          this._realPasswordValue.substring(cursorPosition + charsDeleted);

      } else {
        // Length same - might be replacement/selection delete
        // For simplicity, we'll handle this as the value at cursor changed
        const newChar = currentDisplayValue.charAt(cursorPosition - 1);
        if (newChar && newChar !== '•') {
          this._realPasswordValue =
            this._realPasswordValue.substring(0, cursorPosition - 1) +
            newChar +
            this._realPasswordValue.substring(cursorPosition);
        }
      }

      // Update display value with dots
      const maskedValue = '•'.repeat(this._realPasswordValue.length);
      this.passwordControl.setValue(maskedValue, { emitEvent: false });

      // Restore cursor position
      setTimeout(() => {
        input.setSelectionRange(cursorPosition, cursorPosition);
      });
    }
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;

    if (this.showPassword) {
      // Show real password
      this.passwordControl.setValue(this._realPasswordValue, { emitEvent: false });
    } else {
      // Show dots
      this.passwordControl.setValue('•'.repeat(this._realPasswordValue.length), { emitEvent: false });
    }
  }
```
