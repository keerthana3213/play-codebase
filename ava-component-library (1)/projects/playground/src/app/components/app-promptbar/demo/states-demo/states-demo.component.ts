import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaPromptBarComponent, PromptIcons } from '@aava/play-core';

@Component({
  selector: 'ava-states-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaPromptBarComponent],
  templateUrl: './states-demo.component.html',
  styleUrls: ['./states-demo.component.scss']
})
export class StatesDemoComponent {
  icons: PromptIcons[] = [
    {
      name: 'send',
      slot: 'icon-end',
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onSend()
    }
  ];


  onSend() {
    console.log('Send clicked');
  }
}
