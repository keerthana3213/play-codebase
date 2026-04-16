import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaToggleComponent } from '@aava/play-core';

@Component({
  selector: 'ava-forms-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaToggleComponent],
  templateUrl: './forms-demo.component.html',
  styleUrls: ['./forms-demo.component.scss']
})
export class FormsDemoComponent {
  formData = {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingCommunications: false,
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
  }
}
