// import { Component } from '@angular/core';
// import { AuthenticationComponent } from "../../../../../@aava/play-core/src/lib/components/authentication/authentication.component";
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-app-authenticationflowcomponent',
//   imports: [AuthenticationComponent,FormsModule],
//   templateUrl: './app-authenticationflowcomponent.component.html',
//   styleUrl: './app-authenticationflowcomponent.component.scss'
// })
// export class AppAuthenticationflowcomponentComponent {

//   showAuth = false;
//   enableAnimations = true;

//   toggleAuth(enableAnimations: boolean): void {
//     this.showAuth = true;
//     this.enableAnimations = enableAnimations;
//   }

//   closeAuth(): void {
//     this.showAuth = false;
//   }

// }


import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AavaIconComponent } from '@aava/play-core';

interface AuthDocSection {
  title: string;
  description: string;
  showCode: boolean;
}

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}


@Component({
  selector: 'app-app-authenticationflowcomponent',
  imports: [FormsModule, CommonModule, AavaIconComponent], // Add CommonModule to imports
  templateUrl: './app-authenticationflowcomponent.component.html',
  styleUrls: ['./app-authenticationflowcomponent.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppAuthenticationflowcomponentComponent {
  // Documentation sections
  sections: AuthDocSection[] = [
    {
      title: 'Basic Usage',
      description: 'Basic usage of the authentication flow component with and without animations.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'enableAnimation',
      type: 'boolean',
      default: 'true',
      description: 'Whether to enable animations for the authentication flow.',
    },
  ];

  // Example state management
  showAuth = false;
  enableAnimations = true;

  toggleSection(index: number): void {
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from bubbling up to the section header
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  toggleAuth(enableAnimations: boolean): void {
    this.showAuth = true;
    this.enableAnimations = enableAnimations;
  }

  closeAuth(): void {
    this.showAuth = false;
  }

  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  }

  // Example code snippets
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `     
import { Component } from '@angular/core';
import { AuthenticationComponent } from '@awe/@aava/play-core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authenticationflow',
  standalone: true,
  imports: [AuthenticationComponent, FormsModule, CommonModule],
  templateUrl: './app-authenticationflow.component.html',
  styleUrls: ['./app-authenticationflow.component.css']
})
export class AppAuthenticationflowComponent {
  showAuth = false;
  enableAnimations = true;

  toggleAuth(enableAnimations: boolean): void {
    this.showAuth = true;
    this.enableAnimations = enableAnimations;
  }

  closeAuth(): void {
    this.showAuth = false;
  }
}
<ng-container [ngSwitch]="section.title">
  <ng-container *ngSwitchCase="'Basic Usage'">
    <div class="row g-3">
      <div class="col-12">
        <button class="auth-toggle-button" (click)="toggleAuth(true)">
            Open Authentication with Animations
        </button>
        <button class="auth-toggle-button" (click)="toggleAuth(false)">
            Open Authentication without Animations
        </button>
      </div>
      <div class="col-12" *ngIf="showAuth">
      <div class="auth-container">
        <h3>{{ enableAnimations ? 'With Animations' : 'Without Animations' }}</h3>
          <app-authentication [enableAnimation]="enableAnimations"></app-authentication>
          <button class="auth-toggle-button" (click)="closeAuth()">
          Close Authentication
          </button>
         </div>
        </div>
      </div>
  </ng-container>
</ng-container>  
`,
    };

    return examples[section] || '';
  }

}

