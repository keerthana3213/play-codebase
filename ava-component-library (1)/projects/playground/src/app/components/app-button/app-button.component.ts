import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaButtonComponent } from '@aava/play-core';

interface ButtonDocSection {
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
  selector: 'awe-app-button',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaButtonComponent],
  templateUrl: './app-button.component.html',
  styleUrls: [
    './app-button.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppButtonComponent {
  // Documentation sections
  sections: ButtonDocSection[] = [
    {
      title: 'Button Variants',
      description:
        'All available semantic variants with their color-tinted glass backgrounds.',
      showCode: false,
    },
    {
      title: 'Interaction States',
      description:
        'Different interaction states: default, processing, disabled, and focus handling.',
      showCode: false,
    },
    {
      title: 'Button Sizes',
      description:
        'Available button sizes with responsive scaling: small, medium, and large.',
      showCode: false,
    },
    {
      title: 'Glass Intensity Variants',
      description:
        'Glass opacity levels from subtle (glass-10) to strong (glass-100) with variant colors.',
      showCode: false,
    },
    {
      title: 'Hover Effects',
      description:
        'Interactive hover effects: torch (recommended), glow, tint, and scale.',
      showCode: false,
    },
    {
      title: 'Pressed Effects',
      description:
        'Press feedback effects: ripple (recommended), inset, and solid.',
      showCode: false,
    },

    {
      title: 'Shape Modifiers',
      description:
        'Pill-shaped buttons and icon-only buttons with various effects.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'label',
      type: 'string',
      default: 'undefined',
      description: 'The text content of the button.',
    },
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'",
      default: 'primary',
      description:
        'The semantic variant of the button (controls glass tint color).',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: 'medium',
      description: 'The size of the button with responsive scaling.',
    },
    {
      name: 'glassVariant',
      type: "'glass-10' | 'glass-25' | 'glass-50' | 'glass-75' | 'glass-100'",
      default: 'glass-25',
      description: 'The glass intensity level (surface opacity).',
    },
    {
      name: 'hoverEffect',
      type: "'torch' | 'glow' | 'tint' | 'scale' | 'none'",
      default: 'torch',
      description: 'The hover effect to apply on interaction.',
    },
    {
      name: 'pressedEffect',
      type: "'ripple' | 'inset' | 'solid' | 'none'",
      default: 'ripple',
      description: 'The pressed feedback effect.',
    },
    {
      name: 'processingEffect',
      type: "'pulse' | 'none'",
      default: 'pulse',
      description: 'The processing animation effect.',
    },
    {
      name: 'focusEffect',
      type: "'border' | 'none'",
      default: 'border',
      description: 'The focus indicator effect.',
    },
    {
      name: 'disabledEffect',
      type: "'dim' | 'none'",
      default: 'dim',
      description: 'The disabled state effect.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is disabled.',
    },
    {
      name: 'processing',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is in a processing state.',
    },
    {
      name: 'iconName',
      type: 'string',
      default: 'undefined',
      description: 'The name of the icon to display.',
    },
    {
      name: 'iconPosition',
      type: "'left' | 'right' | 'only'",
      default: 'left',
      description: 'The position of the icon relative to the label.',
    },
    {
      name: 'iconColor',
      type: 'string',
      default: 'undefined',
      description: 'Custom color for the icon.',
    },
    {
      name: 'pill',
      type: 'boolean',
      default: 'false',
      description: 'Whether to use pill-shaped border radius.',
    },
    {
      name: 'customStyles',
      type: 'Record<string, string>',
      default: '{}',
      description: 'CSS custom properties for style overrides.',
    },
    {
      name: 'width',
      type: 'string',
      default: 'undefined',
      description: 'Custom width for the button.',
    },
    {
      name: 'height',
      type: 'string',
      default: 'undefined',
      description: 'Custom height for the button.',
    },
  ];

  // Simple example handlers

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from bubbling up to the section header
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  onButtonClick(event: Event) {
    console.log('Button clicked:', event);
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
  import { ButtonComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-basic-buttons',
    standalone: true,
    imports: [ButtonComponent],
    template: \`
      <div class="button-group">
        <awe-button
          label="Primary Button"
          variant="primary"
          (userClick)="onButtonClick($event)"
        ></awe-button>
        <awe-button
          label="Secondary Button"
          variant="secondary"
          (userClick)="onButtonClick($event)"
        ></awe-button>
      </div>
    \`
  })
  export class BasicButtonsComponent {
    onButtonClick(event: Event) {
      console.log('Button clicked:', event);
    }
  }`,
      'button states': `
  import { Component } from '@angular/core';
  import { ButtonComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-button-states',
    standalone: true,
    imports: [ButtonComponent],
    template: \`
      <div class="button-group">
        <awe-button
          label="Default"
          variant="primary"
        ></awe-button>
        <awe-button
          label="Active"
          variant="primary"
          state="active"
        ></awe-button>
        <awe-button
          label="Disabled"
          variant="primary"
          state="disabled"
        ></awe-button>
        <awe-button
          label="Danger"
          variant="primary"
          state="danger"
        ></awe-button>
        <awe-button
          label="Warning"
          variant="primary"
          state="warning"
        ></awe-button>
      </div>
    \`
  })
  export class ButtonStatesComponent {}`,
      'button sizes': `
  import { Component } from '@angular/core';
  import { ButtonComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-button-sizes',
    standalone: true,
    imports: [ButtonComponent],
    template: \`
      <div class="button-group">
        <awe-button
          label="Small"
          variant="primary"
          size="small"
        ></awe-button>
        <awe-button
          label="Medium"
          variant="primary"
          size="medium"
        ></awe-button>
        <awe-button
          label="Large"
          variant="primary"
          size="large"
        ></awe-button>
      </div>
    \`
  })
  export class ButtonSizesComponent {}`,
      icons: `
  import { Component } from '@angular/core';
  import { ButtonComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-icon-buttons',
    standalone: true,
    imports: [ButtonComponent],
    template: \`
      <div class="button-group">
        <awe-button
          label="Left Icon"
          variant="primary"
          iconName="awe_arrow_rightward_filled"
          iconPosition="left"
          iconColor="whiteIcon"
        ></awe-button>
        <awe-button
          label="Right Icon"
          variant="primary"
          iconName="awe_arrow_rightward_filled"
          iconPosition="right"
          iconColor="whiteIcon"
        ></awe-button>
        <awe-button
          variant="primary"
          iconName="awe_tick_filled"
          iconPosition="only"
          iconColor="whiteIcon"
        ></awe-button>
      </div>
    \`
  })
  export class IconButtonsComponent {}`,
      pill: `
  import { Component } from '@angular/core';
  import { ButtonComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-pill-buttons',
    standalone: true,
    imports: [ButtonComponent],
    template: \`
      <div class="button-group">
        <awe-button variant="primary" size="small" state="active" iconName="awe_bell" iconPosition="only" pill="true">Label</awe-button>
        <awe-button variant="primary" size="small" state="danger" iconName="awe_tick" iconPosition="only" pill="true">Label</awe-button>
        <awe-button variant="secondary" size="small" state="warning" iconName="awe_agents" iconPosition="only" pill="true">Label</awe-button>
        <awe-button variant="secondary" size="small" state="disabled" iconName="awe_analytics" iconPosition="only" pill="true">Label</awe-button>
        <awe-button variant="secondary" size="small" state="default" iconName="awe_attach" iconPosition="only" pill="true">Label</awe-button>
      </div>
    \`
  })
  export class PillButtonsComponent {}`,
      animations: `
  import { Component } from '@angular/core';
  import { ButtonComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-animated-buttons',
    standalone: true,
    imports: [ButtonComponent],
    template: \`
      <div class="button-group">
        <awe-button
          label="Ripple Effect"
          variant="primary"
          animation="ripple"
        ></awe-button>
        <awe-button
          label="Pulse Effect"
          variant="primary"
          animation="pulse"
        ></awe-button>
      </div>
    \`
  })
  export class AnimatedButtonsComponent {}`,
      'loading states': `
  import { Component } from '@angular/core';
  import { ButtonComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-loading-buttons',
    standalone: true,
    imports: [ButtonComponent],
    template: \`
      <div class="button-group">
        <awe-button
          label="Submit"
          variant="primary"
          [loading]="loadingStates.submit"
          loadingType="spinner"
          (userClick)="onSubmitClick($event)"
        ></awe-button>
        <awe-button
          label="Save Changes"
          variant="secondary"
          [loading]="loadingStates.save"
          loadingType="spinner"
          (userClick)="onSaveClick($event)"
        ></awe-button>
        <awe-button
          label="Delete"
          variant="primary"
          state="danger"
          [loading]="loadingStates.delete"
          loadingType="spinner"
          (userClick)="onDeleteClick($event)"
        ></awe-button>
        <awe-button
          label="Skeleton 1"
          variant="primary"
          [loading]="loadingStates.skeleton1"
          loadingType="skeleton"
          skeletonWidth="120px"
          (userClick)="onSkeletonClick('skeleton1')"
        ></awe-button>
        <awe-button
          label="Skeleton 2"
          variant="secondary"
          [loading]="loadingStates.skeleton2"
          loadingType="skeleton"
          skeletonWidth="140px"
          (userClick)="onSkeletonClick('skeleton2')"
        ></awe-button>
      </div>
    \`,
  })
  export class LoadingButtonsComponent {
    loadingStates: Record<string, boolean> = {
      submit: false,
      save: false,
      delete: false,
      skeleton1: false,
      skeleton2: false
    };
  
    onSubmitClick(event: Event) {
      this.loadingStates['submit'] = true;
      setTimeout(() => {
        this.loadingStates['submit'] = false;
        console.log('Submit completed:', event);
      }, 2000);
    }
  
    onSaveClick(event: Event) {
      this.loadingStates['save'] = true;
      setTimeout(() => {
        this.loadingStates['save'] = false;
        console.log('Save completed:', event);
      }, 1500);
    }
  
    onDeleteClick(event: Event) {
      this.loadingStates['delete'] = true;
      setTimeout(() => {
        this.loadingStates['delete'] = false;
        console.log('Delete completed:', event);
      }, 1000);
    }
  
    onSkeletonClick(key: string) {
      this.loadingStates[key] = true;
      setTimeout(() => {
        this.loadingStates[key] = false;
        console.log(\`\${key} loading completed\`);
      }, 2000);
    }
  }`,
      'grid layout': `
  import { Component } from '@angular/core';
  import { ButtonComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-grid-buttons',
    standalone: true,
    imports: [ButtonComponent],
    template: \`
      <div class="container">
        <!-- Equal Width Columns -->
        <div class="grid-section">
          <h3>Equal Width Columns</h3>
          <div class="row g-3">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button label="Button 1" variant="primary" class="w-100"></awe-button>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button label="Button 2" variant="secondary" class="w-100"></awe-button>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button label="Button 3" variant="primary" class="w-100"></awe-button>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button label="Button 4" variant="secondary" class="w-100"></awe-button>
            </div>
          </div>
        </div>
  
        <!-- Buttons with gradients -->
       <div class="grid-section">
          <h3>Buttons with gradients</h3>
            <p class="example-description">Buttons with different gradients, hover effects, and animations</p>
              <div class="row g-3">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                  <awe-button label="Button 1" variant="primary" class="w-100" width="150px" height="50px" gradient="linear-gradient(45deg,#6566CD,#F96CAB)" hoverEffect="slide-bg"></awe-button>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                  <awe-button label="Button 2" variant="secondary" class="w-100" width="150px" height="50px" gradient="linear-gradient(to right, #007991 0%, #78ffd6 51%, #007991 100%)" hoverEffect="expand-border"></awe-button>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                  <awe-button label="Explore" variant="primary" class="w-100" width="150px" height="50px" gradient="linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%)" hoverEffect="glow" animation="ripple"></awe-button>
              </div>
            </div>
        </div>
  
        <!-- Auto Width Columns -->
        <div class="grid-section">
          <h3>Auto Width Columns</h3>
          <div class="row g-2">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button label="Short" variant="primary"></awe-button>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button label="Medium Length" variant="secondary"></awe-button>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button label="Longer Text" variant="primary"></awe-button>
            </div>
          </div>
        </div>
  
        <!-- Mixed Layout -->
        <div class="grid-section">
          <h3>Mixed Layout</h3>
          <div class="row g-2">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button label="Full Width" variant="primary" class="w-100"></awe-button>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button label="Half Width" variant="secondary" class="w-100"></awe-button>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button label="Half Width" variant="primary" class="w-100"></awe-button>
            </div>
          </div>
        </div>
  
        <!-- Button Group with Icons -->
        <div class="grid-section">
          <h3>Button Group with Icons</h3>
          <div class="row g-2">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button
                label="Save"
                variant="primary"
                iconName="awe_save_filled"
                class="w-100"
              ></awe-button>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button
                label="Edit"
                variant="secondary"
                iconName="awe_edit_filled"
                class="w-100"
              ></awe-button>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <awe-button
                label="Delete"
                variant="primary"
                iconName="awe_trash_filled"
                class="w-100"
              ></awe-button>
            </div>
          </div>
        </div>
  
        <!-- Icon-Only Button Group -->
        <div class="grid-section">
          <h3>Icon-Only Button Group</h3>
          <div class="row g-2">
            <div class="col-4 col-sm-auto">
              <awe-button
                iconName="awe_edit_filled"
                iconPosition="only"
                variant="primary"
              ></awe-button>
            </div>
            <div class="col-4 col-sm-auto">
              <awe-button
                iconName="awe_trash_filled"
                iconPosition="only"
                variant="secondary"
              ></awe-button>
            </div>
            <div class="col-4 col-sm-auto">
              <awe-button
                iconName="awe_share_filled"
                iconPosition="only"
                variant="primary"
              ></awe-button>
            </div>
          </div>
        </div>
      </div>
    \`,
    styleUrls: ['./app-grid-buttons.component.scss']
  })
  export class GridButtonsComponent {}`,
      'responsive design': `
  import { Component } from '@angular/core';
  import { ButtonComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-responsive-buttons',
    standalone: true,
    imports: [ButtonComponent],
    template: \`
      <div class="container">
        <div class="row g-3">
          <!-- Viewport Controls -->
          <div class="col-12">
            <div class="viewport-controls">
              <awe-button
                iconName="awe_smartphone_filled"
                iconPosition="only"
                variant="primary"
                [state]="activeViewport === 'mobile' ? 'active' : 'default'"
                (userClick)="setViewport('mobile')"
              ></awe-button>
              <awe-button
                iconName="awe_tablet_filled"
                iconPosition="only"
                variant="primary"
                [state]="activeViewport === 'tablet' ? 'active' : 'default'"
                (userClick)="setViewport('tablet')"
              ></awe-button>
              <awe-button
                iconName="awe_desktop_filled"
                iconPosition="only"
                variant="primary"
                [state]="activeViewport === 'desktop' ? 'active' : 'default'"
                (userClick)="setViewport('desktop')"
              ></awe-button>
            </div>
          </div>
  
          <!-- Responsive Button Examples -->
          <div class="col-12">
            <div class="viewport-preview" [style.width]="viewportSizes[activeViewport].width">
              <!-- Responsive Width Examples -->
              <div class="preview-section">
                <h4>Responsive Width</h4>
                <div class="row g-2">
                  <div class="col-12">
                    <awe-button
                      label="Full Width on Mobile"
                      variant="primary"
                      [fullWidthOnMobile]="true"
                      iconName="awe_resize_filled"
                      iconPosition="left"
                    ></awe-button>
                  </div>
                  <div class="col-12 col-sm-auto">
                    <awe-button
                      label="Auto Width on Desktop"
                      variant="secondary"
                      [fullWidthOnMobile]="false"
                    ></awe-button>
                  </div>
                </div>
              </div>
  
              <!-- Responsive Size Examples -->
              <div class="preview-section">
                <h4>Responsive Sizes</h4>
                <div class="row g-2">
                  <div class="col-12">
                    <div class="button-group">
                      <awe-button
                        label="Small"
                        variant="primary"
                        size="small"
                        iconName="awe_minus_filled"
                      ></awe-button>
                      <awe-button
                        label="Medium"
                        variant="primary"
                        size="medium"
                        iconName="awe_equal_filled"
                      ></awe-button>
                      <awe-button
                        label="Large"
                        variant="primary"
                        size="large"
                        iconName="awe_plus_filled"
                      ></awe-button>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Responsive Icon Examples -->
              <div class="preview-section">
                <h4>Responsive Icons</h4>
                <div class="row g-2">
                  <div class="col-12">
                    <div class="button-group">
                      <awe-button
                        iconName="awe_edit_filled"
                        iconPosition="only"
                        variant="primary"
                        size="small"
                      ></awe-button>
                      <awe-button
                        iconName="awe_edit_filled"
                        iconPosition="only"
                        variant="primary"
                        size="medium"
                      ></awe-button>
                      <awe-button
                        iconName="awe_edit_filled"
                        iconPosition="only"
                        variant="primary"
                        size="large"
                      ></awe-button>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Touch Target Examples -->
              <div class="preview-section">
                <h4>Touch Optimized</h4>
                <div class="row g-2">
                  <div class="col-12">
                    <div class="button-group">
                      <awe-button
                        label="Touch Target"
                        variant="primary"
                        iconName="awe_touch_filled"
                        size="large"
                      ></awe-button>
                      <awe-button
                        iconName="awe_touch_filled"
                        iconPosition="only"
                        variant="primary"
                        size="large"
                      ></awe-button>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Responsive Grid Examples -->
              <div class="preview-section">
                <h4>Responsive Grid</h4>
                <div class="row g-2">
                  <div class="col-12 col-sm-6 col-md-4">
                    <awe-button
                      label="1/3 Width"
                      variant="primary"
                      class="w-100"
                    ></awe-button>
                  </div>
                  <div class="col-12 col-sm-6 col-md-4">
                    <awe-button
                      label="1/3 Width"
                      variant="secondary"
                      class="w-100"
                    ></awe-button>
                  </div>
                  <div class="col-12 col-sm-12 col-md-4">
                    <awe-button
                      label="1/3 Width"
                      variant="primary"
                      class="w-100"
                    ></awe-button>
                  </div>
                </div>
              </div>
  
              <!-- Responsive Button Group -->
              <div class="preview-section">
                <h4>Responsive Button Group</h4>
                <div class="row g-2">
                  <div class="col-12">
                    <div class="button-group">
                      <awe-button
                        label="Save"
                        variant="primary"
                        iconName="awe_save_filled"
                        [fullWidthOnMobile]="true"
                      ></awe-button>
                      <awe-button
                        label="Cancel"
                        variant="secondary"
                        iconName="awe_close_filled"
                        [fullWidthOnMobile]="true"
                      ></awe-button>
                      <awe-button
                        label="Delete"
                        variant="primary"
                        state="danger"
                        iconName="awe_trash_filled"
                        [fullWidthOnMobile]="true"
                      ></awe-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`,
    styleUrls: ['./app-responsive-buttons.component.scss']
  })
  export class ResponsiveButtonsComponent {
    activeViewport: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    viewportSizes = {
      mobile: { width: '320px', height: '568px' },
      tablet: { width: '768px', height: '1024px' },
      desktop: { width: '1280px', height: '800px' }
    };
  
    setViewport(viewport: 'mobile' | 'tablet' | 'desktop') {
      this.activeViewport = viewport;
    }
  }`,
    };

    return examples[section.toLowerCase()] || '';
  }
}
