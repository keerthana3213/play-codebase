import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-app-typography',
  imports: [CommonModule],
  templateUrl: './app-typography.component.html',
  styleUrl: './app-typography.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppTypographyComponent {
  sections = [
    {
      title: 'Heading',
      description: 'Different heading levels (h1 to h6) with bold and regular styles.',
      showCode: false,
    },
    {
      title: 'Display',
      description: 'Display headings with bold and regular styles. Ideal for large-scale headings.',
      showCode: false,
    },
    {
      title: 'Subtitle',
      description: 'Subtitle styles for secondary headings with distinct font styles.',
      showCode: false,
    },
    {
      title: 'Body',
      description: 'Body text for paragraphs and standard content elements.',
      showCode: false,
    },
    {
      title: 'Inline Text Elements',
      description: 'Various inline text elements such as links, bold, italic, underlined text, and more.',
      showCode: false,
    },
    {
      title: 'Caption',
      description: 'Small text captions used for images, charts, and other media descriptions.',
      showCode: false,
    },
    {
      title: 'Labels',
      description: 'Labels used for form fields, buttons, and UI elements.',
      showCode: false,
    },
    {
      title: 'Button',
      description: 'Typography used within buttons and interactive elements.',
      showCode: false,
    },
    {
      title: 'List',
      description: 'Typography used for unordered and ordered lists.',
      showCode: false,
    }
  ];


  apiProps = [
    { name: 'variant', type: 'string', default: '"body"', description: 'Defines the type of typography (e.g., display, heading, body, caption, etc.).' },
    { name: 'type', type: 'string', default: '"regular"', description: 'Defines the font weight (e.g., bold, regular, medium, light).' },
    { name: 'label', type: 'string', default: '""', description: 'The text content to be displayed within the typography component.' },
    { name: 'inputId', type: 'string', default: '""', description: 'A unique ID assigned to the typography component for accessibility or interaction.' },
    { name: 'ariaLabel', type: 'string', default: '""', description: 'An ARIA label for screen readers to improve accessibility.' },
    { name: 'color', type: 'string', default: '"inherit"', description: 'Custom color for the typography text. Accepts any valid CSS color value.' },
    { name: 'customClass', type: 'string', default: '""', description: 'Additional CSS classes that can be applied to the component for further styling.' },
    { name: 'size', type: 'string', default: '"md"', description: 'Defines the font size using predefined typography sizes (e.g., sm, md, lg, xl, 2xl, 3xl).' },
    { name: 'lineHeight', type: 'string', default: '"normal"', description: 'Defines the line height for the text. Accepts CSS values like normal, 1.5, or specific px values.' },
    { name: 'textTransform', type: 'string', default: '"none"', description: 'Controls text transformation (e.g., uppercase, lowercase, capitalize).' },
    { name: 'letterSpacing', type: 'string', default: '"normal"', description: 'Defines the spacing between characters. Accepts normal or custom values like px/em/rem.' }
  ];



  events = [
    { name: 'click', type: 'EventEmitter<void>', description: 'Emitted when the component is clicked.' }
  ];

  @ViewChild('codeBlock') codeBlock!: ElementRef;

  toggleSection(index: number): void {
    this.sections.forEach((section, i) => {
      section.showCode = (i === index) ? !section.showCode : false;
    });
  }

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from bubbling up to the section header
    this.sections[index].showCode = !this.sections[index].showCode;
  }


  getExampleCode(sectionTitle: string): string {
    const examples: Record<string, string> = {
      'display': `
import { Component } from '@angular/core';
import { HeadingComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-display-heading',
  standalone: true,
  imports: [HeadingComponent],
  template: \`
    <div class="heading-group">
                 <awe-heading variant="display" type="bold">Display Bold</awe-heading>
                <awe-heading variant="display" type="regular">Display Regular</awe-heading>
    </div>
  \`
})
export class DisplayHeadingComponent {}`,
      'heading': `
import { Component } from '@angular/core';
import { HeadingComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [HeadingComponent],
  template: \`
    <div class="heading-group">
                <awe-heading variant="h1" type="bold">Heading 1 Bold</awe-heading>
                <awe-heading variant="h1" type="regular">Heading 1 Regular</awe-heading>
                <awe-heading variant="h2" type="bold">Heading 2 Bold</awe-heading>
                <awe-heading variant="h2" type="regular">Heading 2 Regular</awe-heading>
                <awe-heading variant="h3" type="bold">Heading 3 Bold</awe-heading>
                <awe-heading variant="h3" type="regular">Heading 3 Regular</awe-heading>
                <awe-heading variant="h4" type="bold">Heading 4 Bold</awe-heading>
                <awe-heading variant="h4" type="regular">Heading 4 Regular</awe-heading>
                <awe-heading variant="h5" type="bold">Heading 5 Bold</awe-heading>
                <awe-heading variant="h5" type="regular">Heading 5 Regular</awe-heading>
                <awe-heading variant="h6" type="bold">Heading 6 Bold</awe-heading>
                <awe-heading variant="h6" type="regular">Heading 6 Regular</awe-heading>
    </div>
  \`
})
export class HeadingComponent {}`,
      'subtitle': `
import { Component } from '@angular/core';
import { HeadingComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-subtitle',
  standalone: true,
  imports: [HeadingComponent],
  template: \`
    <div class="subtitle-group">
                <awe-heading variant="s1" type="regular">Subtitle 1</awe-heading>
                <awe-heading variant="s2" type="regular">Subtitle 2</awe-heading>
    </div>
  \`
})
export class SubtitleComponent {}`,
      'body': `
import { Component } from '@angular/core';
import { BodyTextComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-body-text',
  standalone: true,
  imports: [BodyTextComponent],
  template: \`
    <div class="body-text-group">
      <awe-body-text type="body-test">This is Body Text.</awe-body-text>
    </div>
  \`
})
export class BodyTextComponent {}`,
      'inline text elements': `
import { Component } from '@angular/core';
import { InlineElementComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-inline-elements',
  standalone: true,
  imports: [InlineElementComponent],
  template: \`
    <div class="inline-elements-group">
  <p>This is Inline text elements</p>
                <p>
                  Here is a <awe-inline-element label="Hyperlink" inputId="link">
                    <a href="https://google.co.in" class="link">useful link</a>
                  </awe-inline-element> to explore more details.
                </p>
                <p>
                  You can style text like this:
                  <awe-inline-element label="Styled Text" inputId="styled-text">
                    <span class="styled-span">important styled text</span>
                  </awe-inline-element> for better emphasis.
                </p>
    </div>
  \`
})
export class InlineElementsComponent {}`,
      'caption': `
import { Component } from '@angular/core';
import { CaptionComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-caption',
  standalone: true,
  imports: [CaptionComponent],
  template: \`
    <div class="caption-group">
     <awe-caption label="Captions Text" inputId="caption" ariaLabel="caption"></awe-caption>
    </div>
  \`
})
export class CaptionComponent {}`,
      'labels': `
import { Component } from '@angular/core';
import { LabelsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-labels',
  standalone: true,
  imports: [LabelsComponent],
  template: \`
    <div class="labels-group">
       <awe-labels type="label">Label: Name</awe-labels>
                <awe-labels type="label">Label: Age</awe-labels>
                <awe-labels type="label">Label: DOB</awe-labels>
    </div>
  \`
})
export class LabelsComponent {}`,
      'button': `
import { Component } from '@angular/core';
import { BodyTextComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-body-text',
  standalone: true,
  imports: [BodyTextComponent],
  template: \`
    <div class="body-text-group">
     <awe-body-text type="body-test">Add Button text</awe-body-text>
    </div>
  \`
})
export class BodyTextComponent {}`,
      'list': `
import { Component } from '@angular/core';
import { BodyTextComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-body-text',
  standalone: true,
  imports: [BodyTextComponent],
  template: \`
    <div class="body-text-group">
     <awe-body-text type="body-test">Add list</awe-body-text>
    </div>
  \`
})
export class BodyTextComponent {}`
    };

    return examples[sectionTitle] || '';
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.codeBlock?.nativeElement) return;
    const clickedElement = event.target as HTMLElement;
    const isClickOnSectionHeader = clickedElement.closest('.section-header');
    const clickedInside = this.codeBlock.nativeElement.contains(clickedElement) || isClickOnSectionHeader;
    if (!clickedInside) {
      this.sections.forEach(section => section.showCode = false);
    }
  }

  // Copy Code to Clipboard (for the code example)
  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  }

}
