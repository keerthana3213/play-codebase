import { Component } from '@angular/core';
import { AavaButtonComponent, AavaDialogService, AavaCheckboxComponent } from '@aava/play-core';

@Component({
  selector: 'app-proper-scrollable-modal',
  standalone: true,
  imports: [AavaButtonComponent, AavaCheckboxComponent],
  template: `
  <div style="padding:24px">

  <div style="display:flex;
    flex-direction: column;
    gap:24px;"
    >
    <div 
    dialog-header 
    style="
    color: #3B3F46;
    font-family: Mulish;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; 
    justify-content:flex-start;
    ">
      <h3 style="margin-bottom:0px;">Heading</h3>
    </div>
    <div dialog-body >
      <div>
        <h4 >Heading small</h4>
        <p>
          This agent will be sent back for corrections and modifications. Kindly
          comment what needs to be done.
        </p>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Heading small</h4>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">
          This agent will be sent back for corrections and modifications. Kindly
          comment what needs to be done.
        </p>
        <h4>Heading small</h4>
        <p>
          This agent will be sent back for corrections and modifications. Kindly
          comment what needs to be done.
        </p>
        <h4>Heading small</h4>
        <p>
          This agent will be sent back for corrections and modifications. Kindly
          comment what needs to be done.
        </p>
      <div>
        <h4>Heading small</h4>
        <p>
          This agent will be sent back for corrections and modifications. Kindly
          comment what needs to be done.
        </p>
      </div>
      <div style="
      display: flex;
      height: 24px;
      padding: 0 0;
      align-items: center;
      gap: 8px;
      align-self: stretch;"
      >
        <aava-checkbox variant="default" size="sm"></aava-checkbox>
        <label> Accept Terms and Conditions</label>
      </div>
    </div>
    </div>
    <div dialog-footer style="
    display:flex;
    justify-content: flex-end;
    flex-direction: row;
    gap: 10px;
    align-items: flex-end;
    align-self: stretch;">
      <aava-button
        label="Label"
        variant="secondary"
        size="md"
        (userClick)="onClose()"
      ></aava-button>
      <aava-button
        label="Label"
        variant="primary"
        size="md"
        (userClick)="onClose()"
      ></aava-button>
    </div>
  </div>
  </div>
  `
})
export class ProperScrollableModalComponent {
  constructor(private dialogService: AavaDialogService) { }
  onClose() {
    this.dialogService.close();
  }
}
