import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDialogService, AavaButtonComponent } from '@aava/play-core';
import { AavaTableComponent, AavaHeaderRowDefDirective, AavaHeaderRowDirective } from '../../../../../play-core/src/public-api';
import { AavaColumnDefDirective } from '../../../../../play-core/src/lib/components/table/directives/aava-column-def.directive';
import { AavaHeaderCellDefDirective } from '../../../../../play-core/src/lib/components/table/directives/aava-header-cell-def.directive';
import { AavaCellDefDirective } from '../../../../../play-core/src/lib/components/table/directives/aava-cell-def.directive';
import { AavaRowDefDirective } from '../../../../../play-core/src/lib/components/table/directives/aava-row-def.directive';
import { AavaRowDirective } from '../../../../../play-core/src/lib/components/table/directives/aava-row.directive';
import { AavaTooltipDirective } from '../../../../../play-core/src/lib/directives/aava-tooltip.directive';

@Component({
  selector: 'app-table-tooltip-dialog',
  standalone: true,
  imports: [
    CommonModule,
    AavaTableComponent,
    AavaColumnDefDirective,
    AavaHeaderCellDefDirective,
    AavaCellDefDirective,
    AavaRowDefDirective,
    AavaRowDirective,
    AavaHeaderRowDefDirective,
    AavaHeaderRowDirective,
    AavaButtonComponent,
    AavaTooltipDirective
  ],
  templateUrl: './table-tooltip-dialog.component.html',
  styleUrl: './table-tooltip-dialog.component.scss'
})
export class TableTooltipDialogComponent {
  @Input() variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  displayedColumns = ['id', 'name', 'description', 'status', 'actions'];

  dataSource = [
    {
      id: 1,
      name: 'Project Alpha',
      shortDesc: 'UI Redesign...',
      description: 'Complete UI redesign project including new color scheme, typography updates, and responsive layouts for all screen sizes.',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Project Beta',
      shortDesc: 'API Integration...',
      description: 'Integration with third-party APIs for payment processing, user authentication, and data synchronization.',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Project Gamma',
      shortDesc: 'Database Migration...',
      description: 'Migrating from legacy database to new cloud-based solution with improved performance and scalability.',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Project Delta',
      shortDesc: 'Security Audit...',
      description: 'Comprehensive security audit and implementation of enhanced security measures across all services.',
      status: 'Inactive'
    },
    {
      id: 5,
      name: 'Project Epsilon',
      shortDesc: 'Performance...',
      description: 'Performance optimization initiative targeting 50% reduction in page load times and improved user experience.',
      status: 'Pending'
    }
  ];

  constructor(private dialogService: AavaDialogService) { }

  close() {
    this.dialogService.close();
  }
}
