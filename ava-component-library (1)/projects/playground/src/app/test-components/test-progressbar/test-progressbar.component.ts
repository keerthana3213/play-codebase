import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaProgressComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-progressbar',
  standalone: true,
  imports: [CommonModule, AavaProgressComponent],
  templateUrl: './test-progressbar.component.html',
  styleUrl: './test-progressbar.component.scss'
})
export class TestProgressbarComponent {
  // Component logic can be added here if needed
}
