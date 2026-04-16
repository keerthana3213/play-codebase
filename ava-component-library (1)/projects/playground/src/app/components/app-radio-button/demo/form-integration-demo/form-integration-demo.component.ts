import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AavaButtonComponent,
  AavaRadioButtonComponent,
  RadioOption,
} from '@aava/play-core';

@Component({
  selector: 'ava-form-integration-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaButtonComponent,
    AavaRadioButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './form-integration-demo.component.html',
  styleUrl: './form-integration-demo.component.scss',
})
export class FormIntegrationDemoComponent {
  templateLanguage = '';
  templateNotifications = '';
  reactiveForm: FormGroup;
  showFormvalue = false;

  themeOptions: RadioOption[] = [
    { label: 'Light Theme', value: 'light' },
    { label: 'Dark Theme', value: 'dark' },
    { label: 'Auto Theme', value: 'auto' },
  ];

  sizeOptions: RadioOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  languageOptions: RadioOption[] = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
  ];

  notificationOptions: RadioOption[] = [
    { label: 'All Notifications', value: 'all' },
    { label: 'Important Only', value: 'important' },
    { label: 'None', value: 'none' },
  ];

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      theme: ['', Validators.required],
      size: ['medium', Validators.required],
    });
  }

  onReactiveThemeChange(value: string) {
    console.log('Reactive form theme changed:', value);
  }

  onReactiveSizeChange(value: string) {
    console.log('Reactive form size changed:', value);
  }

  onTemplateLanguageChange(value: string) {
    console.log('Template form language changed:', value);
  }

  onTemplateNotificationChange(value: string) {
    console.log('Template form notifications changed:', value);
  }

  onReactiveSubmit() {
    if (this.reactiveForm.valid) {
      this.showFormvalue = true;
      console.log('Reactive form submitted:', this.reactiveForm.value);
    }
  }

  onTemplateSubmit() {
    console.log('Template form submitted:', {
      language: this.templateLanguage,
      notifications: this.templateNotifications,
    });
  }
}
