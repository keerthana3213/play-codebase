import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent, AavaDialogService } from '@aava/play-core';
import { SSODialogComponent } from './sso-dialog.component';
import { ProperSimpleModalComponent } from './proper-simple-modal.component';
import { ProperFeedbackModalComponent } from './proper-feedback-modal.component';
import { ProperScrollableModalComponent } from './proper-scrollable-modal.component';

@Component({
  selector: 'app-test-modal-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss'],
})
export class TestModalDemoComponent {
  constructor(private dialogService: AavaDialogService) { }

  openSSOLogin(variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    const widths: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
      xs: '600px',
      sm: '600px',
      md: '600px',
      lg: '600px',
      xl: '660px',
    };

    this.dialogService.openModal(
      SSODialogComponent,
      {
        width: widths[variant],
      },
      { variant }
    );
  }

  openProperSimpleModal() {
    this.dialogService.openModal(ProperSimpleModalComponent, {
      width: '400px',
    });
  }

  openProperFeedbackModal() {
    this.dialogService.openModal(ProperFeedbackModalComponent, {
      width: '400px',
    });
  }

  openProperScrollableModal() {
    this.dialogService.openModal(ProperScrollableModalComponent, {
      width: '484px',
    });
  }
}
