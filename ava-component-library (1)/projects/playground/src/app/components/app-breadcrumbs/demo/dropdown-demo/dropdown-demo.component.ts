import { Component } from '@angular/core';
import { AavaBreadcrumbsComponent } from '@aava/play-core';
import { agent, workflow, guardrail, model, tool, knowledge } from '../../../../shared/breadcrumb-cons/b'
interface DropdownItem {
  label: string;
  url: string;
  icon?: string;
  iconType?: string;
}

interface BreadcrumbItem {
  label?: string;
  icon?: string;
  url: string;
  active: boolean;
  dropdownItems?: DropdownItem[];
  dropdownWidth?: number
}

@Component({
  selector: 'ava-breadcrumbs-dropdown-demo',
  imports: [AavaBreadcrumbsComponent],
  templateUrl: './dropdown-demo.component.html',
  styleUrl: './dropdown-demo.component.scss',
})
export class DropdownDemoComponent {
  // Main breadcrumb navigation (Console > Build > Agent)

  breadcrumbList: BreadcrumbItem[] = [
    {
      label: 'Console',
      url: '/console',
      active: true,
      dropdownWidth: 150,
      dropdownItems: [
        {
          label: 'Create Agent',
          url: '/console/build/agent/create',
          icon: agent,
        },
        {
          label: 'Create Workflow', url: '/console/build/workflow/create',
          icon: workflow,
        },
        {
          label: 'Create Prompt', url: '/console/build/prompt/create',
          icon: guardrail,
        },
        {
          label: 'Create Tools', url: '/console/build/tools/create',
          icon: model
        },
        {
          label: 'Create Guardrails', url: '/console/build/guardrails/create',
          icon: tool
        },
        {
          label: 'Create Knowledge base',
          url: '/console/build/knowledge/create',
          icon: knowledge
        },
      ],
    },

    { label: 'Build', url: '/console/build', active: false },
    { label: 'Agent', url: '/console/build/agent', active: false },
    { label: 'Workflow', url: '/console/build/workflow', active: false },
    { label: 'Prompt', url: '/console/build/prompt', active: false },
    { label: 'Tools', url: '/console/build/tools', active: false },
    { label: 'Guardrails', url: '/console/build/guardrails', active: false },
    { label: 'Knowledge base', url: '/console/build/knowledge', active: true },
  ];

  // Alternative breadcrumb examples for demonstration
  alternativeBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Dashboard',
      url: '/dashboard',
      active: true,
      dropdownItems: [
        { label: 'New Project', url: '/dashboard/projects/new' },
        { label: 'Import Project', url: '/dashboard/projects/import' },
        { label: 'Templates', url: '/dashboard/projects/templates' },
      ],
    },
    {
      label: 'Projects',
      url: '/dashboard/projects',
      active: false,
      dropdownItems: [
        { label: 'New Project', url: '/projects/new' },
        { label: 'Import Project', url: '/projects/import' },
      ],
    },
    { label: 'Settings', url: '/dashboard/projects/settings', active: false },
  ];

  onDropdownItemSelected(item: DropdownItem): void {
    console.log('Selected:', item);
    // Handle navigation or action here
  }
}
