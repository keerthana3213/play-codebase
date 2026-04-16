import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSpinnerComponent } from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaSpinnerComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrls: ['./basic-usage-demo.component.scss'],
})
export class BasicUsageDemoComponent {
  copyToClipboard(): void {
    const code = this.getExampleCode();
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  }

  getExampleCode(): string {
    return `import { Component } from '@angular/core';
import { AavaSpinnerComponent } from '@aava/play-core';

@Component({
  selector: 'app-basic-spinners',
  standalone: true,
  imports: [AavaSpinnerComponent],
  template: \`
    <div class="spinner-demo">
      <h3>Progress Indicators</h3>
      <div class="spinner-row">
        <aava-spinner type="linear-gradient" color="primary" [progressIndex]="25" size="sm"></aava-spinner>
        <aava-spinner type="linear-gradient" color="primary" [progressIndex]="50" size="sm"></aava-spinner>
        <aava-spinner type="linear-gradient" color="primary" [progressIndex]="75" size="sm"></aava-spinner>
        <aava-spinner type="linear-gradient" color="primary" [progressIndex]="100" size="sm"></aava-spinner>
      </div>
      
      <h3>Medium Size Progress</h3>
      <div class="spinner-row">
        <ava-spinner type="linear-gradient" color="primary" [progressIndex]="25" size="md"></aava-spinner>
        <ava-spinner type="linear-gradient" color="primary" [progressIndex]="50" size="md"></aava-spinner>
        <ava-spinner type="linear-gradient" color="primary" [progressIndex]="75" size="md"></aava-spinner>
        <ava-spinner type="linear-gradient" color="primary" [progressIndex]="100" size="md"></aava-spinner>
      </div>
      
      <h3>Animated Spinners</h3>
      <div class="spinner-row">
        <aava-spinner type="linear-gradient" color="primary" size="md" [animation]="true"></aava-spinner>
        <aava-spinner type="blob" color="success" size="md" [animation]="true"></aava-spinner>
        <aava-spinner type="linear-gradient" color="warning" size="md" [animation]="true"></aava-spinner>
      </div>
    </div>
  \`
})
export class BasicSpinnersComponent { }`;
  }
}
