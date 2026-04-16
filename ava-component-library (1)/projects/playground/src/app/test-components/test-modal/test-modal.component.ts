import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AavaButtonComponent, AavaDialogService } from '@aava/play-core';
import { SSODialogComponent } from './sso-dialog.component';
import { ProperSimpleModalComponent } from './proper-simple-modal.component';
import { ProperFeedbackModalComponent } from './proper-feedback-modal.component';
import { ProperScrollableModalComponent } from './proper-scrollable-modal.component';
import { AavaButtonComponent, AavaDialogService } from '../../../../../play-core/src/public-api';
import { SelectModalExampleComponent } from './SelectModalExampleComponent';
import { SelectWithModalExampleComponent } from './select-with-expaned-normal';
import { TableTooltipDialogComponent } from './table-tooltip-dialog.component';

@Component({
  selector: 'app-test-modal',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent {
  constructor(private dialogService: AavaDialogService) { }

  openSSOLogin(variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    const widths: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
      'xs': '600px',
      'sm': '600px',
      'md': '600px',
      'lg': '600px',
      'xl': '660px'
    };

    this.dialogService.openModal(SSODialogComponent, {
      width: widths[variant]
    }, { variant });
  }

  openProperSimpleModal() {
    this.dialogService.openModal(ProperSimpleModalComponent, {
      width: '400px',
      closeOnBackdropClick: false // Can be set to false to prevent closing when clicking outside
    });
  }

  openProperFeedbackModal() {
    this.dialogService.openModal(ProperFeedbackModalComponent, {
      width: '400px',
      closeOnBackdropClick:true
    });
  }

  openProperScrollableModal() {
    this.dialogService.openModal(ProperScrollableModalComponent, {
      width: '484px'
    });
  }
  openSelectModalExample(position: 'center' | 'left-top' | 'right-top' | 'right-bottom' | 'left-bottom' = 'center') {
    this.dialogService.openModal(SelectModalExampleComponent, {
      width: '500px',
      position,
      height: '500px'
    });
  }

  openWithSelectModalExample(position: 'center' | 'left-top' | 'right-top' | 'right-bottom' | 'left-bottom' = 'center') {
    this.dialogService.openModal(SelectWithModalExampleComponent, {
      width: '500px',
      position,
      height: '400px'
    });
  }

  openTableTooltip(variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    const widths: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
      'xs': '600px',
      'sm': '700px',
      'md': '800px',
      'lg': '900px',
      'xl': '1000px'
    };

    this.dialogService.openModal(TableTooltipDialogComponent, {
      width: widths[variant]
    }, { variant });
  }

}
