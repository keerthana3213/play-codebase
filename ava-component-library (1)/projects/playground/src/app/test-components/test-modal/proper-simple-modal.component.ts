import { Component } from '@angular/core';
import { AavaButtonComponent } from '../../../../../play-core/src/lib/components/button/aava-button.component';
import { AavaDialogService } from '../../../../../play-core/src/lib/components/dialog/aava-dialog-service';
/*import { AavaButtonComponent, AavaDialogService } from '@aava/play-core';*/

@Component({
  selector: 'app-proper-simple-modal',
  standalone: true,
  imports: [AavaButtonComponent],
  template: `
  <div style="padding:24px">

  <div class="ava-modal" style="border-radius:8px;">
    <div
    dialog-header
      style="display: flex;
      align-items: center;
      gap: 12px;
      align-self: stretch;"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12H2M12 22C6.47715 22 2 17.5228 2 12M12 22C9.43223 19.3038 8 15.7233 8 12C8 8.27674 9.43223 4.69615 12 2M12 22C14.5678 19.3038 16 15.7233 16 12C16 8.27674 14.5678 4.69615 12 2M2 12C2 6.47715 6.47715 2 12 2"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h4
        style="margin-top:0;
        margin-bottom:0;
        line-height:0;
        color:#3B3F46;
        font-family: Mulish;
        font-size:24px;
        font-style: normal;
        font-weight: 700;
        width: 219px;
        line-height:28px;"
      >
        Heading
      </h4>
    </div>
    <div dialog-body>
      <p style="align-self: stretch;
      color: #6B7280;
      font-family: Inter;
      font-size:16px;
      font-style: normal;
      font-weight: 400;
      line-height:20px;
      margin:24px 0px;"
      >
        This agent will be sent back for corrections and modifications. Kindly
        comment what needs to be done.
      </p>
    </div>
    <div class="dialog-footer" dialog-footer style="display:flex; gap:12px">
      <aava-button
        label="Label"
        variant="secondary"
        size="md"
        (userClick)="onClose()"
        height="44px"
        width="170px" 
      ></aava-button>
      <aava-button
        label="Label"
        variant="primary"
        size="md"
        (userClick)="onClose()"
        height="44px"
        width="170px"
      ></aava-button>
    </div>
  </div>
  </div>
  `
})
export class ProperSimpleModalComponent {
  constructor(private dialogService: AavaDialogService) { }
  onClose() {
    this.dialogService.close();
  }
}
