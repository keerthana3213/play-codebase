import { Component } from '@angular/core';
import { AavaButtonComponent, AavaDialogService, AavaIconComponent } from '@aava/play-core';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'app-proper-feedback-modal',
  standalone: true,
  imports: [AavaButtonComponent, AavaIconComponent, AavaTextboxComponent],
  template: `
  <div style="padding:24px">
    <div dialog-header>
      <h3
        style="color: #3B3F46;
        font-family: Mulish;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height:28px;"
      >
        Heading
      </h3>
    </div>
    <div dialog-body>
      <div style="text-align: center; margin:24px 0px">
        <aava-icon
          iconName="circle-check"
          iconSize="70px"
          iconColor="green"
        ></aava-icon>
      </div>
      <p
        style="align-self: stretch;
        color: #6B7280;
        text-align: center;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        margin-bottom:24px"
      >
        This agent will be sent back for corrections and modifications. Kindly
        comment what needs to be done
      </p>
      <div style="margin-bottom:24px">
        <aava-textbox
          label="Feedback Input"
          variant="default"
          placeholder="Enter text here"
          size="xl"
        ></aava-textbox>
      </div>
    </div>
    <div dialog-footer style="display:flex; gap:12px">
      <aava-button
        label="Label"
        variant="secondary"
        size="md"
        (userClick)="onClose()"
        height="52px"
        width="165px"
      ></aava-button>
      <aava-button
        label="Label"
        variant="primary"
        size="md"
        height="52px"
        (userClick)="onClose()"
        width="165px"
      ></aava-button>
    </div>
    </div>
  `
})
export class ProperFeedbackModalComponent {
  constructor(private dialogService: AavaDialogService) { }
  onClose() {
    this.dialogService.close();
  }
}
