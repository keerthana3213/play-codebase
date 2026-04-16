import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaDividersComponent } from '@aava/play-core';

interface DividerDocSection {
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
  selector: 'ava-app-dividers',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaDividersComponent],
  templateUrl: './app-dividers.component.html',
  styleUrls: ['./app-dividers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDividersComponent {
  // Documentation sections
  sections: DividerDocSection[] = [
    {
      title: 'Basic Usage',
      description:
        'Simple divider implementation with default horizontal solid styling. Perfect for creating clean visual separation between content sections.',
      showCode: false,
    },
    {
      title: 'Divider Variants',
      description:
        'Four distinct visual styles for different design requirements: solid for clear separation, dashed for subtle breaks, dotted for delicate divisions, and gradient for modern aesthetics.',
      showCode: false,
    },
    {
      title: 'Orientation Options',
      description:
        'Flexible layout options supporting both horizontal and vertical orientations for different content flow and layout requirements.',
      showCode: false,
    },
    {
      title: 'Color Customization',
      description:
        'Comprehensive color customization with support for custom hex, RGB, HSL colors, and CSS custom properties for consistent theming.',
      showCode: false,
    },
    {
      title: 'Practical Examples',
      description:
        'Real-world usage scenarios showing how dividers enhance content structure, readability, and visual hierarchy in different layouts.',
      showCode: false,
    },
    {
      title: 'Responsive Design',
      description:
        'Dividers that adapt to different screen sizes and container widths, maintaining visual consistency across all devices.',
      showCode: false,
    },
  ];

  // Comprehensive API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'variant',
      type: "'solid' | 'dashed' | 'dotted' | 'gradient'",
      default: "'solid'",
      description:
        'Visual style variant of the divider. Solid for clear separation, dashed for subtle breaks, dotted for delicate divisions, gradient for modern aesthetics.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description:
        'Layout orientation of the divider. Horizontal spans full width for content sections, vertical spans full height for sidebar separations.',
    },
    {
      name: 'color',
      type: 'string',
      default: "'#000000'",
      description:
        'Custom color for solid, dashed, and dotted variants. Accepts hex, RGB, HSL values, or CSS custom properties.',
    },
  ];

  // CSS Custom Properties Documentation
  cssProps: ApiProperty[] = [
    {
      name: '--divider-color',
      type: 'string',
      default: 'inherited from color input',
      description: 'Color for solid, dashed, and dotted variants',
    },
    {
      name: '--divider-background-gradient',
      type: 'string',
      default: 'linear-gradient(90deg, transparent, #000, transparent)',
      description: 'Gradient background for gradient variant',
    },
    {
      name: '--divider-opacity',
      type: 'number',
      default: '1',
      description: 'Opacity for all divider variants',
    },
    {
      name: '--divider-thickness',
      type: 'string',
      default: '1px',
      description: 'Thickness of the divider line',
    },
    {
      name: '--divider-spacing',
      type: 'string',
      default: '10px',
      description: 'Padding around divider element',
    },
  ];

  toggleCodeVisibility(index: number, event: Event): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
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

  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
import { Component } from '@angular/core';
import { DividersComponent } from '@ava/@aava/play-core';

@Component({
  selector: 'app-basic-divider',
  standalone: true,
  imports: [DividersComponent],
  template: \`
    <div class="content-section">
      <h2>Section 1</h2>
      <p>Content above divider...</p>
      
      <!-- Basic horizontal divider -->
      <aava-dividers></aava-dividers>
      
      <h2>Section 2</h2>
      <p>Content below divider...</p>
    </div>
  \`
})
export class BasicDividerComponent {}`,

      'divider variants': `
import { Component } from '@angular/core';
import { DividersComponent } from '@ava/@aava/play-core';

@Component({
  selector: 'app-divider-variants',
  standalone: true,
  imports: [DividersComponent],
  template: \`
    <div class="variants-container">
      <!-- Solid divider for clear separation -->
      <section>
        <h3>Main Content Section</h3>
        <p>Important content that needs clear separation...</p>
        <aava-dividers variant="solid" color="#333"></aava-dividers>
      </section>

      <!-- Dashed divider for subtle separation -->
      <section>
        <h3>Secondary Content</h3>
        <p>Secondary content with subtle separation...</p>
        <aava-dividers variant="dashed" color="#666"></aava-dividers>
      </section>

      <!-- Dotted divider for delicate separation -->
      <section>
        <h3>Fine Details</h3>
        <p>Fine content with delicate visual breaks...</p>
        <aava-dividers variant="dotted" color="#999"></aava-dividers>
      </section>

      <!-- Gradient divider for modern aesthetics -->
      <section>
        <h3>Premium Section</h3>
        <p>Modern content with gradient transitions...</p>
        <aava-dividers variant="gradient"></aava-dividers>
      </section>
    </div>
  \`
})
export class DividerVariantsComponent {}`,

      'orientation options': `
import { Component } from '@angular/core';
import { DividersComponent } from '@ava/@aava/play-core';

@Component({
  selector: 'app-divider-orientations',
  standalone: true,
  imports: [DividersComponent],
  template: \`
    <div class="orientation-examples">
      <!-- Horizontal dividers for content sections -->
      <div class="horizontal-example">
        <h3>Article Content</h3>
        <p>First paragraph of article content...</p>
        <aava-dividers variant="solid" orientation="horizontal"></aava-dividers>
        <p>Second paragraph continues...</p>
        <aava-dividers variant="dashed" orientation="horizontal"></aava-dividers>
        <p>Final paragraph concludes...</p>
      </div>

      <!-- Vertical dividers for layout separation -->
      <div class="vertical-example" style="display: flex; gap: 20px; height: 300px;">
        <div class="sidebar">
          <h4>Sidebar Content</h4>
          <ul>
            <li>Navigation item 1</li>
            <li>Navigation item 2</li>
            <li>Navigation item 3</li>
          </ul>
        </div>
        
        <aava-dividers variant="solid" orientation="vertical"></aava-dividers>
        
        <div class="main-content">
          <h4>Main Content Area</h4>
          <p>Primary content area...</p>
        </div>
        
        <aava-dividers variant="dotted" orientation="vertical"></aava-dividers>
        
        <div class="secondary-content">
          <h4>Secondary Panel</h4>
          <p>Additional information...</p>
        </div>
      </div>
    </div>
  \`
})
export class DividerOrientationsComponent {}`,

      'color customization': `
import { Component } from '@angular/core';
import { DividersComponent } from '@ava/@aava/play-core';

@Component({
  selector: 'app-divider-colors',
  standalone: true,
  imports: [DividersComponent],
  template: \`
    <div class="color-examples">
      <!-- Hex colors -->
      <section>
        <h3>Brand Colors</h3>
        <aava-dividers variant="solid" color="#007bff"></aava-dividers>
        <aava-dividers variant="dashed" color="#28a745"></aava-dividers>
        <aava-dividers variant="dotted" color="#dc3545"></aava-dividers>
      </section>

      <!-- RGB colors -->
      <section>
        <h3>RGB Colors</h3>
        <aava-dividers variant="solid" color="rgb(255, 193, 7)"></aava-dividers>
        <aava-dividers variant="dashed" color="rgba(108, 117, 125, 0.5)"></aava-dividers>
      </section>

      <!-- CSS custom properties -->
      <section>
        <h3>Theme Integration</h3>
        <aava-dividers variant="solid" color="var(--primary-color)"></aava-dividers>
        <aava-dividers variant="dotted" color="var(--secondary-color)"></aava-dividers>
      </section>

      <!-- Gradient variants -->
      <section>
        <h3>Gradient Effects</h3>
        <aava-dividers variant="gradient"></aava-dividers>
        <div style="--divider-background-gradient: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);">
          <aava-dividers variant="gradient"></aava-dividers>
        </div>
      </section>
    </div>
  \`,
  styles: [\`
    :root {
      --primary-color: #6f42c1;
      --secondary-color: #fd7e14;
    }
  \`]
})
export class DividerColorsComponent {}`,

      'practical examples': `
import { Component } from '@angular/core';
import { DividersComponent } from '@ava/@aava/play-core';

@Component({
  selector: 'app-practical-dividers',
  standalone: true,
  imports: [DividersComponent],
  template: \`
    <div class="practical-examples">
      <!-- Card content separation -->
      <div class="card">
        <div class="card-header">
          <h3>User Profile</h3>
        </div>
        <aava-dividers variant="solid" color="#e9ecef"></aava-dividers>
        <div class="card-body">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
        </div>
        <aava-dividers variant="dashed" color="#dee2e6"></aava-dividers>
        <div class="card-footer">
          <button>Edit Profile</button>
        </div>
      </div>

      <!-- Form field groups -->
      <form class="form-example">
        <fieldset>
          <legend>Personal Information</legend>
          <input type="text" placeholder="First Name">
          <input type="text" placeholder="Last Name">
        </fieldset>
        
        <aava-dividers variant="dotted" color="#6c757d"></aava-dividers>
        
        <fieldset>
          <legend>Contact Details</legend>
          <input type="email" placeholder="Email">
          <input type="tel" placeholder="Phone">
        </fieldset>
        
        <aava-dividers variant="gradient"></aava-dividers>
        
        <div class="form-actions">
          <button type="submit">Save</button>
          <button type="reset">Reset</button>
        </div>
      </form>

      <!-- Navigation menu separation -->
      <nav class="navigation">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <aava-dividers variant="solid" color="#495057"></aava-dividers>
        <ul>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
        </ul>
        <aava-dividers variant="dashed" color="#6c757d"></aava-dividers>
        <ul>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <!-- List item separation -->
      <div class="comment-list">
        <div class="comment">
          <h4>User Comment 1</h4>
          <p>This is a great article...</p>
        </div>
        <aava-dividers variant="dotted" color="#adb5bd"></aava-dividers>
        <div class="comment">
          <h4>User Comment 2</h4>
          <p>I found this very helpful...</p>
        </div>
        <aava-dividers variant="dotted" color="#adb5bd"></aava-dividers>
        <div class="comment">
          <h4>User Comment 3</h4>
          <p>Thanks for sharing this...</p>
        </div>
      </div>
    </div>
  \`,
  styles: [\`
    .card, .form-example, .navigation, .comment-list {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #dee2e6;
      border-radius: 8px;
    }
    .comment { margin: 10px 0; }
    input { margin: 5px; padding: 8px; }
    button { margin: 5px; padding: 8px 16px; }
  \`]
})
export class PracticalDividersComponent {}`,

      'responsive design': `
import { Component } from '@angular/core';
import { DividersComponent } from '@ava/@aava/play-core';

@Component({
  selector: 'app-responsive-dividers',
  standalone: true,
  imports: [DividersComponent],
  template: \`
    <div class="responsive-examples">
      <!-- Responsive article layout -->
      <article class="responsive-article">
        <header>
          <h1>Responsive Article Title</h1>
          <p class="meta">Published on January 1, 2024</p>
        </header>
        
        <aava-dividers variant="gradient"></aava-dividers>
        
        <section class="content">
          <p>Article content that adapts to different screen sizes...</p>
          
          <div class="responsive-layout">
            <div class="main-column">
              <h2>Main Content</h2>
              <p>Primary article content goes here...</p>
            </div>
            
            <!-- Vertical divider hidden on mobile -->
            <div class="divider-vertical">
              <aava-dividers variant="solid" orientation="vertical" color="#dee2e6"></aava-dividers>
            </div>
            
            <aside class="sidebar-column">
              <h3>Related Articles</h3>
              <ul>
                <li>Article 1</li>
                <li>Article 2</li>
              </ul>
            </aside>
          </div>
        </section>
        
        <aava-dividers variant="dashed" color="#6c757d"></aava-dividers>
        
        <footer>
          <p>Article footer content...</p>
        </footer>
      </article>

      <!-- Responsive card grid -->
      <div class="card-grid">
        <div class="card-item">
          <h3>Card 1</h3>
          <p>Content...</p>
        </div>
        
        <div class="divider-responsive">
          <aava-dividers variant="dotted" orientation="vertical" color="#adb5bd"></aava-dividers>
        </div>
        
        <div class="card-item">
          <h3>Card 2</h3>
          <p>Content...</p>
        </div>
        
        <div class="divider-responsive">
          <aava-dividers variant="dotted" orientation="vertical" color="#adb5bd"></aava-dividers>
        </div>
        
        <div class="card-item">
          <h3>Card 3</h3>
          <p>Content...</p>
        </div>
      </div>
    </div>
  \`,
  styles: [\`
    .responsive-layout {
      display: flex;
      gap: 20px;
      margin: 20px 0;
    }
    
    .main-column {
      flex: 2;
    }
    
    .sidebar-column {
      flex: 1;
    }
    
    .card-grid {
      display: flex;
      gap: 20px;
      margin: 20px 0;
    }
    
    .card-item {
      flex: 1;
      padding: 20px;
      border: 1px solid #dee2e6;
      border-radius: 8px;
    }
    
    /* Mobile responsiveness */
    @media (max-width: 768px) {
      .responsive-layout {
        flex-direction: column;
      }
      
      .divider-vertical {
        display: none;
      }
      
      .card-grid {
        flex-direction: column;
      }
      
      .divider-responsive {
        display: none;
      }
      
      /* Add horizontal dividers for mobile */
      .card-item:not(:last-child)::after {
        content: '';
        display: block;
        margin: 20px 0;
        height: 1px;
        background: #dee2e6;
      }
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      .responsive-layout {
        gap: 15px;
      }
      
      .card-grid {
        gap: 15px;
      }
    }
  \`]
})
export class ResponsiveDividersComponent {}`,
    };

    return examples[section.toLowerCase()] || '';
  }
}
