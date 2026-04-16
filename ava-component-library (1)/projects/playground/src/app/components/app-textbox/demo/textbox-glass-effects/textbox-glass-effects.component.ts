import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textbox-glass-effects',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextboxComponent],
  templateUrl: './textbox-glass-effects.component.html',
  styleUrls: ['./textbox-glass-effects.component.scss'],
})
export class TextboxGlassEffectsComponent {
  glass10Value = '';
  glass50Value = '';
  tintValue = '';
  glowValue = '';
  customStylesValue = '';

  onGlass10Change(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Glass 10 textbox value changed:', target.value);
  }

  onGlass50Change(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Glass 50 textbox value changed:', target.value);
  }

  onTintChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Tint effect textbox value changed:', target.value);
  }

  onGlowChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Glow effect textbox value changed:', target.value);
  }

  onCustomStylesChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Custom styles textbox value changed:', target.value);
  }
}
