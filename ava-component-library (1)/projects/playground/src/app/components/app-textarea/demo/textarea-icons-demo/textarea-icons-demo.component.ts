import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextareaComponent } from '@aava/play-core';
import { AavaIconComponent } from '@aava/play-core';

interface IconExample {
  title: string;
  description: string;
  iconStart?: string;
  iconEnd?: string;
  iconStartColor?: string;
  iconEndColor?: string;
  placeholder: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rows?: number;
  disabled?: boolean;
  readonly?: boolean;
  processingGradientBorder?: boolean;
  processingGradientColors?: string[];
}

interface UseCaseExample {
  label: string;
  iconStart?: string;
  iconStartColor?: string;
  iconEnd?: string;
  iconEndColor?: string;
  placeholder: string;
  variant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
}

@Component({
  selector: 'ava-textarea-icons-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextareaComponent, AavaIconComponent],
  templateUrl: './textarea-icons-demo.component.html',
  styleUrls: ['./textarea-icons-demo.component.scss'],
})
export class TextareaIconsDemoComponent {
  // Demo values
  messageValue = '';
  commentValue = '';
  feedbackValue = '';
  noteValue = '';
  descriptionValue = '';
  bioValue = '';
  chatValue = '';
  emailValue = '';

  iconExamples: IconExample[] = [
    {
      title: 'Message with Attachments',
      description: 'Textarea with paperclip icon for file attachments',
      iconStart: 'paperclip',
      iconStartColor: '#7c3aed',
      placeholder: 'Type your message...',
      variant: 'primary',
      rows: 4,
    },
    {
      title: 'Comment with Edit',
      description: 'Textarea with edit icon for inline editing',
      iconStart: 'message-circle',
      iconStartColor: '#059669',
      iconEnd: 'edit',
      iconEndColor: '#2563eb',
      placeholder: 'Add a comment...',
      variant: 'success',
      rows: 3,
    },
    {
      title: 'Feedback with Send',
      description: 'Textarea with send icon for submitting feedback',
      iconStart: 'heart',
      iconStartColor: '#dc2626',
      iconEnd: 'send',
      iconEndColor: '#059669',
      placeholder: 'Share your feedback...',
      variant: 'warning',
      rows: 4,
    },
    {
      title: 'Note with Clear',
      description: 'Textarea with clear icon for easy content removal',
      iconStart: 'file-text',
      iconStartColor: '#7c3aed',
      iconEnd: 'x',
      iconEndColor: '#dc2626',
      placeholder: 'Write your notes...',
      variant: 'info',
      rows: 3,
    },
    {
      title: 'Description with Processing',
      description: 'Textarea with processing gradient border and icons',
      iconStart: 'edit-3',
      iconStartColor: '#2563eb',
      iconEnd: 'check',
      iconEndColor: '#059669',
      placeholder: 'Enter description...',
      variant: 'primary',
      rows: 4,
      processingGradientBorder: true,
      processingGradientColors: ['#fa709a', '#e5cb3a'],
    },
    {
      title: 'Bio with User Icon',
      description: 'Textarea with user icon for profile information',
      iconStart: 'user',
      iconStartColor: '#7c3aed',
      placeholder: 'Tell us about yourself...',
      variant: 'default',
      rows: 5,
    },
    {
      title: 'Chat with Multiple Icons',
      description: 'Textarea with multiple end icons for different actions',
      iconStart: 'message-square',
      iconStartColor: '#2563eb',
      iconEnd: 'smile',
      iconEndColor: '#f59e0b',
      placeholder: 'Type your message...',
      variant: 'success',
      rows: 3,
    },
    {
      title: 'Email with Validation',
      description: 'Textarea with validation icon and error state',
      iconStart: 'mail',
      iconStartColor: '#dc2626',
      iconEnd: 'alert-circle',
      iconEndColor: '#dc2626',
      placeholder: 'Enter email content...',
      variant: 'error',
      rows: 4,
    },
  ];

  useCaseExamples = [
    {
      title: 'Form Inputs',
      description: 'Common form scenarios with appropriate icons',
      examples: [
        {
          label: 'Contact Form',
          iconStart: 'user',
          iconStartColor: '#2563eb',
          placeholder: 'Your message...',
          variant: 'primary',
        },
        {
          label: 'Support Ticket',
          iconStart: 'help-circle',
          iconStartColor: '#f59e0b',
          iconEnd: 'send',
          iconEndColor: '#059669',
          placeholder: 'Describe your issue...',
          variant: 'warning',
        },
        {
          label: 'Review',
          iconStart: 'star',
          iconStartColor: '#f59e0b',
          iconEnd: 'thumbs-up',
          iconEndColor: '#059669',
          placeholder: 'Write your review...',
          variant: 'success',
        },
      ] as UseCaseExample[],
    },
    {
      title: 'Content Creation',
      description: 'Icons for different content types',
      examples: [
        {
          label: 'Blog Post',
          iconStart: 'file-text',
          iconStartColor: '#7c3aed',
          iconEnd: 'save',
          iconEndColor: '#2563eb',
          placeholder: 'Write your blog post...',
          variant: 'info',
        },
        {
          label: 'Code Comment',
          iconStart: 'code',
          iconStartColor: '#059669',
          iconEnd: 'check',
          iconEndColor: '#059669',
          placeholder: 'Add code documentation...',
          variant: 'success',
        },
        {
          label: 'Meeting Notes',
          iconStart: 'calendar',
          iconStartColor: '#dc2626',
          iconEnd: 'clock',
          iconEndColor: '#f59e0b',
          placeholder: 'Meeting notes...',
          variant: 'warning',
        },
      ] as UseCaseExample[],
    },
  ];

  iconGuidelines = [
    {
      title: 'Icon Selection',
      items: [
        'Choose icons that clearly represent the action or content type',
        'Use consistent icon style across your application',
        'Ensure icons are recognizable at small sizes',
        'Consider cultural differences in icon interpretation',
      ],
    },
    {
      title: 'Icon Positioning',
      items: [
        'Use start icons for content type identification',
        'Use end icons for actions and interactions',
        'Limit to 2-3 icons per textarea to avoid clutter',
        'Ensure sufficient spacing between multiple end icons',
      ],
    },
    {
      title: 'Icon Colors',
      items: [
        'Use semantic colors that match the textarea variant',
        'Ensure sufficient contrast for accessibility',
        'Custom colors can enhance brand identity',
        'Test color combinations with colorblind users',
      ],
    },
  ];

  onIconClick(iconName: string, action: string) {
    console.log(`${action} icon clicked: ${iconName}`);
    alert(`Demo: ${action} icon "${iconName}" was clicked!`);
  }

  onTextareaChange(value: string, example: IconExample) {
    console.log(`Textarea changed for ${example.title}:`, value);
  }

  onTextareaFocus(example: IconExample) {
    console.log(`Textarea focused: ${example.title}`);
  }

  onTextareaBlur(example: IconExample) {
    console.log(`Textarea blurred: ${example.title}`);
  }

  getIconDescription(iconName: string): string {
    const descriptions: Record<string, string> = {
      paperclip: 'Attach files or documents',
      edit: 'Edit or modify content',
      send: 'Submit or send content',
      x: 'Clear or remove content',
      user: 'User-related information',
      message: 'Communication or messaging',
      heart: 'Feedback or appreciation',
      file: 'Document or file content',
      check: 'Validation or confirmation',
      alert: 'Warning or error state',
    };
    return descriptions[iconName] || 'Action or content indicator';
  }
}
