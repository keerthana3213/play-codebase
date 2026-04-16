import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPillComponent, IconOption } from '../../../../../@aava/play-core/src/lib/components/icon-pill/icon-pill.component';
import { IconsComponent } from "../../../../../@aava/play-core/src/lib/components/icons/icons.component";

@Component({
  selector: 'awe-app-icon-pill',
  standalone: true,
  imports: [CommonModule, IconPillComponent, IconsComponent],
  templateUrl: './app-icon-pill.component.html',
  styleUrls: ['./app-icon-pill.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class AppIconPillComponent {
  techOptions: IconOption[] = [
    { name: 'Angular', icon: '/assets/icons/awe_angular.svg', value: 'angular', isLocalSvg: true },
    { name: 'React', icon: '/assets/icons/awe_react.svg', value: 'react', isLocalSvg: true },
    { name: 'Vue', icon: '/assets/icons/awe_vue.svg', value: 'vue', isLocalSvg: true }
  ];

  designOptions: IconOption[] = [
    { name: 'Material UI', icon: '/assets/icons/awe_material.svg', value: 'material', isLocalSvg: true },
    { name: 'Tailwind', icon: '/assets/icons/awe_tailwind.svg', value: 'tailwind', isLocalSvg: true },
    { name: 'Bootstrap', icon: '/assets/icons/awe_bootstrap.svg', value: 'bootstrap', isLocalSvg: true },
    { name: 'Custom', icon: '/assets/icons/awe_custom.svg', value: 'custom', isLocalSvg: true }
  ];

  selectedTech = this.techOptions[0];
  selectedDesign = this.designOptions[0];

  sections = [
    {
      title: 'Tech Selection',
      description: 'Select a technology stack using icon pill UI.',
      showCode: false
    },
    {
      title: 'Design Library Selection',
      description: 'Choose a design system. Custom themes will prompt for input.',
      showCode: false
    }
  ];

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  onTechSelected(option: IconOption): void {
    console.log('Selected tech:', option);
    this.selectedTech = option;
    alert(`Selected technology: ${option.name}`);
  }

  onDesignSelected(option: IconOption): void {
    console.log('Selected design library:', option);
    this.selectedDesign = option;
    if (option.value === 'custom') {
      const customTheme = prompt('Enter your custom theme name:');
      if (customTheme) {
        alert(`Custom theme "${customTheme}" will be applied.`);
      }
    } else {
      alert(`Selected design library: ${option.name}`);
    }
  }


  // Get Example Code for a Section
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'tech selection': `
import { Component } from '@angular/core';
import { IconPillComponent, IconOption } from '@awe/@aava/play-core';

@Component({
  selector: 'app-icon-pill-tech',
  standalone: true,
  imports: [IconPillComponent],
  template: \`
    <awe-icon-pill
      [options]="techOptions"
      [selectedOption]="selectedTech"
      (selectionChange)="onTechSelected($event)">
    </awe-icon-pill>
  \`
})
export class IconPillTechComponent {
  techOptions: IconOption[] = [
    { name: 'Angular', icon: '/assets/icons/awe_angular.svg', value: 'angular', isLocalSvg: true },
    { name: 'React', icon: '/assets/icons/awe_react.svg', value: 'react', isLocalSvg: true },
    { name: 'Vue', icon: '/assets/icons/awe_vue.svg', value: 'vue', isLocalSvg: true }
  ];

  selectedTech = this.techOptions[0];

  onTechSelected(option: IconOption): void {
    console.log('Selected tech:', option);
  }
}`,

      'design library selection': `
import { Component } from '@angular/core';
import { IconPillComponent, IconOption } from '@awe/@aava/play-core';

@Component({
  selector: 'app-icon-pill-design',
  standalone: true,
  imports: [IconPillComponent],
  template: \`
    <awe-icon-pill
      [options]="designOptions"
      [selectedOption]="selectedDesign"
      (selectionChange)="onDesignSelected($event)">
    </awe-icon-pill>
  \`
})
export class IconPillDesignComponent {
  designOptions: IconOption[] = [
    { name: 'Material UI', icon: '/assets/icons/awe_material.svg', value: 'material', isLocalSvg: true },
    { name: 'Tailwind', icon: '/assets/icons/awe_tailwind.svg', value: 'tailwind', isLocalSvg: true },
    { name: 'Bootstrap', icon: '/assets/icons/awe_bootstrap.svg', value: 'bootstrap', isLocalSvg: true },
    { name: 'Custom', icon: '/assets/icons/awe_custom.svg', value: 'custom', isLocalSvg: true }
  ];

  selectedDesign = this.designOptions[0];

  onDesignSelected(option: IconOption): void {
    console.log('Selected design library:', option);
    if (option.value === 'custom') {
      const customTheme = prompt('Enter your custom theme name:');
      if (customTheme) {
        console.log('Custom theme:', customTheme);
      }
    }
  }
}`
    };

    return examples[section.toLowerCase()] || '';
  }

  // Copy Code to Clipboard
  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  }


}
