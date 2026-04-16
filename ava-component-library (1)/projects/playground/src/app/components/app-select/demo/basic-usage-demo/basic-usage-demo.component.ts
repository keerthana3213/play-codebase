import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaSelectComponent, AavaSelectOptionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaSelectComponent, AavaSelectOptionComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrls: ['./basic-usage-demo.component.scss']
})
export class BasicUsageDemoComponent {
 onSelectionChange(event: any) {
    console.log('Selection changed:', event);
  } }
