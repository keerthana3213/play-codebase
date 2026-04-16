import { Component, Input } from '@angular/core';
import { AavaButtonComponent, AavaDialogService } from '@aava/play-core';

@Component({
  selector: 'app-proper-sso-dialog',
  standalone: true,
  imports: [AavaButtonComponent],
  template: `
    <div>
      <div dialog-header>
        <h3>SSO Login ({{variant}} size)</h3>
      </div>
      <div dialog-body>
        <div class="sso-buttons">
          <aava-button
            [label]="'Google SSO Login'"
            [size]="variant"
            variant="primary"
            (userClick)="onSsoLogin()">
          </aava-button>
          <aava-button
            [label]="'Microsoft SSO Login'"
            [size]="variant"
            variant="primary"
            (userClick)="onSsoLogin()">
          </aava-button>
          <aava-button
            [label]="'Facebook SSO Login'"
            [size]="variant"
            variant="primary"
            (userClick)="onSsoLogin()">
          </aava-button>
        </div>
      </div>
      <div dialog-footer>
        <aava-button 
          label="Cancel" 
          variant="secondary" 
          [size]="variant"
          (userClick)="onClose()">
        </aava-button>
      </div>
    </div>
  `,
  styles: [`
    .sso-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
  `]
})
export class ProperSsoDialogComponent {
  @Input() variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  constructor(private dialogService: AavaDialogService) { }

  onSsoLogin() {
    // Add your SSO login logic here
    console.log('SSO Login clicked for size:', this.variant);
    this.dialogService.close();
  }

  onClose() {
    this.dialogService.close();
  }
}
