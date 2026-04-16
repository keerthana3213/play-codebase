import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textbox-processing-effects',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextboxComponent],
  templateUrl: './textbox-processing-effects.component.html',
  styleUrls: ['./textbox-processing-effects.component.scss'],
})
export class TextboxProcessingEffectsComponent {
  processingValue = '';
  shimmerValue = '';
  gradientValue = '';
  customGradientValue = '';
  borderPulseValue = '';

  onProcessingChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Processing textbox value changed:', target.value);
  }

  onShimmerChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Shimmer textbox value changed:', target.value);
  }

  onGradientChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Gradient textbox value changed:', target.value);
  }

  onCustomGradientChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Custom gradient textbox value changed:', target.value);
  }

  onBorderPulseChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Border pulse textbox value changed:', target.value);
  }
}
