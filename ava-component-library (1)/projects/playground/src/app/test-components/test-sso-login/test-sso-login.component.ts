import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSSOLoginComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-sso-login',
  standalone: true,
  imports: [
    CommonModule,
    AavaSSOLoginComponent
  ],
  templateUrl: './test-sso-login.component.html',
  styleUrl: './test-sso-login.component.scss'
})
export class TestSSOLoginComponent {
  // Simple test component for SSO login variants
}
