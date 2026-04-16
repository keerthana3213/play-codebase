import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaPromptBarComponent } from '@aava/play-core';
import { PromptIcons } from '../../../../../../../play-core/src/public-api';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaPromptBarComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrls: ['./basic-usage-demo.component.scss']
})
export class BasicUsageDemoComponent {
  onMessageSent(message: string) {
    console.log('Message sent:', message);
  }
   allIcons: PromptIcons[] = [
      {
        name: 'paperclip',
        slot: 'icon-start',
        color: 'green',
        visible: true,
        click: () => this.onAttachFile()
      },
      {
        name: 'send',
        slot: 'icon-end',
        color: 'var(--color-text-primary)',
        visible: true,
        click: () => this.onAddImage()
      }
    ];
     onAttachFile() {
    console.log('Attach file clicked');
  }

  onAddImage() {
    console.log('Add image clicked');
  }
  
}
