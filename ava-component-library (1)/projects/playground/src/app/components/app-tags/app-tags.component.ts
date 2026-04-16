import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaTagComponent } from '@aava/play-core';

// Define a type for tag objects matching AvaTagComponent inputs
export interface TagDemo {
  label: string;
  color?:
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'custom';
  customStyle?: Record<string, string>;
  variant?: 'filled' | 'outlined';
  removable?: boolean;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'start' | 'end';
  avatar?: string;
  pill?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  customClass?: string;
  iconColor?: string;
}

@Component({
  selector: 'ava-app-tags',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaTagComponent],
  templateUrl: './app-tags.component.html',
  styleUrl: './app-tags.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppTagsComponent {
  // Original content - retain all existing tag examples
  filledTags: TagDemo[] = [
    { label: 'Default', color: 'default', variant: 'filled' },
    {
      label: 'Primary',
      color: 'primary',
      variant: 'filled',
      icon: 'star',
      iconPosition: 'start',
      iconColor: '#f59e42',
    },
    {
      label: 'Success',
      color: 'success',
      variant: 'filled',
      icon: 'check-circle',
      iconPosition: 'start',
    },
    {
      label: 'Warning',
      color: 'warning',
      variant: 'filled',
      icon: 'alert-triangle',
      iconPosition: 'start',
    },
    {
      label: 'Error',
      color: 'error',
      variant: 'filled',
      icon: 'x-octagon',
      iconPosition: 'start',
    },
    {
      label: 'Info',
      color: 'info',
      variant: 'filled',
      icon: 'info',
      iconPosition: 'start',
    },
    {
      label: 'Custom',
      color: 'custom',
      variant: 'filled',
      icon: 'sparkles',
      iconPosition: 'start',
      iconColor: '#a21caf',
      customStyle: {
        '--tag-custom-bg': '#f3e8ff',
        '--tag-custom-color': '#7c3aed',
        '--tag-custom-border': '1px solid #7c3aed',
      },
    },
    // With avatar (image)
    {
      label: 'With Avatar',
      color: 'info',
      variant: 'filled',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    // With avatar (initials)
    // { label: 'With Initials', color: 'warning', variant: 'filled', avatar: 'AB' },
    // Disabled
    {
      label: 'Disabled',
      color: 'default',
      variant: 'filled',
      disabled: true,
      icon: 'slash',
      iconPosition: 'start',
      iconColor: '#a1a1aa',
    },
    // Pill
    {
      label: 'Pill',
      color: 'success',
      variant: 'filled',
      pill: true,
      icon: 'leaf',
      iconPosition: 'start',
    },
    // Sizes
    {
      label: 'Small',
      color: 'primary',
      variant: 'filled',
      size: 'sm',
      icon: 'feather',
      iconPosition: 'start',
      iconColor: '#f59e42',
    },
    {
      label: 'Medium',
      color: 'success',
      variant: 'filled',
      size: 'md',
      icon: 'user',
      iconPosition: 'start',
    },
    {
      label: 'Large',
      color: 'info',
      variant: 'filled',
      size: 'lg',
      icon: 'globe',
      iconPosition: 'start',
      iconColor: '#a21caf',
    },
  ];
  outlinedTags: TagDemo[] = [
    {
      label: 'Default',
      color: 'default',
      variant: 'outlined',
      icon: 'tag',
      iconColor: '#a4a7aeff',
    },
    {
      label: 'Primary',
      color: 'primary',
      variant: 'outlined',
      icon: 'star',
      iconColor: '#7c3aed',
    },
    {
      label: 'Success',
      color: 'success',
      variant: 'outlined',
      icon: 'check-circle',
      iconColor: '#22c55e',
    },
    {
      label: 'Warning',
      color: 'warning',
      variant: 'outlined',
      icon: 'alert-triangle',
      iconColor: '#eab308',
    },
    {
      label: 'Error',
      color: 'error',
      variant: 'outlined',
      icon: 'x-octagon',
      iconColor: '#ef4444',
    },
    {
      label: 'Info',
      color: 'info',
      variant: 'outlined',
      icon: 'info',
      iconColor: '#2563eb',
    },
    {
      label: 'Custom',
      color: 'custom',
      variant: 'outlined',
      icon: 'sparkles',
      iconColor: '#a21caf',
      customStyle: {
        '--tag-custom-bg': '#fff',
        '--tag-custom-color': '#7c3aed',
        '--tag-custom-border': '1.5px solid #7c3aed',
      },
    },
  ];
  removableTags: TagDemo[] = [
    { label: 'Removable', color: 'primary', removable: true },
    {
      label: 'With Avatar',
      color: 'info',
      removable: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  ];
  pillTags: TagDemo[] = [
    {
      label: 'Pill Tag Filled',
      color: 'primary',
      pill: true,
      icon: 'star',
      iconColor: '#7c3aed',
    },
    {
      label: 'Pill Tag Outlined',
      color: 'success',
      pill: true,
      variant: 'outlined',
      icon: 'check-circle',
      iconColor: '#22c55e',
    },
  ];
  disabledTags: TagDemo[] = [
    { label: 'Disabled', color: 'default', disabled: true },
    {
      label: 'Removable Disabled',
      color: 'primary',
      removable: true,
      disabled: true,
    },
  ];
  clickableTags: TagDemo[] = [
    { label: 'Clickable', color: 'primary' },
    {
      label: 'With Icon',
      color: 'success',
      icon: 'star',
      iconPosition: 'start',
      iconColor: '#ffffff',
    },
  ];
  sizeTags: TagDemo[] = [
    { label: 'Small', color: 'primary', size: 'sm' },
    { label: 'Medium', color: 'success', size: 'md' },
  ];

  onRemove(label: string) {
    alert(`Removed tag: ${label}`);
  }
  onClick(label: string) {
    alert(`Clicked tag: ${label}`);
  }
}
