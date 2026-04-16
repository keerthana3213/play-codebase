
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AavaTableComponent,
  AavaSkeletonComponent,
  AavaButtonComponent,
  AavaColumnDefDirective,
  AavaHeaderCellDefDirective,
  AavaCellDefDirective,
  AavaHeaderRowDefDirective,
  AavaRowDefDirective,
  AavaNoDataRowDirective,
} from '@aava/play-core';
import {
  ColumnConfig as UserTableColumnConfig,
  ActionConfig,
} from '../../../../../play-core/src/lib/components/user-table/aava-user-table.component';
import { AavaUserTableComponent } from '@aava/play-core';
interface TableDocSection {
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

export interface FieldWithIcon {
  value: any;
  subValue?: string;
  iconName?: string;
  iconColor?: string,
  iconSize?: string,
  clickable?: boolean;
  customStyle?: Record<string, string>;
  subStyle?: Record<string, string>;
  valueStyle?: Record<string, string>;
  tooltip?: Record<string, string>;
}
export interface CheckboxState {
  isSelected?: boolean;
  disable?: boolean;

}

export interface User {
  id?: string;
  parentId?: string | null;
  name?: FieldWithIcon | FieldWithIcon[];
  realm?: FieldWithIcon | FieldWithIcon[];
  email?: FieldWithIcon | FieldWithIcon[];
  access?: FieldWithIcon | FieldWithIcon[];
  addedOn?: FieldWithIcon | FieldWithIcon[];
  validtill?: FieldWithIcon | FieldWithIcon[];
  lastLogin?: FieldWithIcon | FieldWithIcon[];
  authorized?: FieldWithIcon | FieldWithIcon[];
  status?: FieldWithIcon | FieldWithIcon[];
  action?: Record<string, ActionConfig>;
  sortOrder?: number;
  isSelected?: boolean;
  checkbox?: CheckboxState;
  expanded?: boolean;
  children?: User[];
  depth?: number;
}

// Used for defining column display settings - now using the enhanced interface
export type ColumnConfig = UserTableColumnConfig;

@Component({
  selector: 'app-table-documentation',
  imports: [
    CommonModule,
    FormsModule,
    AavaUserTableComponent,
    AavaSkeletonComponent,
    AavaButtonComponent,
    AavaTableComponent,
    AavaColumnDefDirective,
    AavaHeaderCellDefDirective,
    AavaCellDefDirective,
    AavaHeaderRowDefDirective,
    AavaRowDefDirective,
    AavaRowDefDirective,
    AavaNoDataRowDirective,
  ],
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppTableComponent {
  tableStyle = {
    table: {

    },
    thead: {},
    headtr: {},
    tbody: {},
    bodytr: {},

    th: {},
    td: {},
  };

  rowImgStyle = {
    borderRadius: '50%',
    'margin-right': '8px',
    objectFit: 'cover',
    display: 'inline-block',
    'vertical-align': 'middle',
  };

  isLoading = true;
  pageSize = 6;
  page = 0;
  rowData: User[] = [];
  ngOnInit() {
    setTimeout(() => {
      this.rowtableData();
      this.isLoading = false;
    }, 2000);
  }
  sections: TableDocSection[] = [
    {
      title: 'Basic Table',
      description: 'A simple table with text columns.',
      showCode: false,
    },
    {
      title: 'Bank Account Table (API Handling)',
      description: 'A table with sorting and infinite scroll handling via API (mocked).',
      showCode: false,
    },
  ];

  apiProps: ApiProperty[] = [
    {
      name: 'columns',
      type: 'TableColumn[]',
      default: '[]',
      description: 'Defines the columns of the table.',
    },
    {
      name: 'data',
      type: 'any[]',
      default: '[]',
      description: 'The data to display in the table.',
    },
    {
      name: 'rowActions',
      type: 'string[]',
      default: '[]',
      description: 'Actions available for each row.',
    },
    {
      name: 'statusTags',
      type: 'any[]',
      default: '[]',
      description: 'Tags to display status in a column.',
    },
  ];


  columnData: ColumnConfig[] = [
    {
      field: 'select',
      label: '',
      sortable: false,
      filterable: false,
      visible: true,
      resizable: false,
      cellClick: false,
    },
    {
      field: 'name',
      label: 'Name',
      sortable: true,
      filterable: true,
      sortingOrder: 1,
      visible: true,
      cellClick: false,
      width: '300px',
      showAvatar: true,
      avatarOptions: {
        size: 'md',
        shape: 'pill',
        initialsColor: 'var(--color-text-on-brand)',
        initialsBackground: 'var(--color-brand-primary)',
      },
    },
    {
      field: 'email',
      label: 'Email',
      sortable: true,
      filterable: true,
      sortingOrder: 2,
      visible: true,
      cellClick: false,
      width: '200px',
      customStyle: {
        'text-align': 'right',
        'color': 'blue'
      }
    },
    {
      field: 'access',
      label: 'Access',
      sortable: true,
      filterable: true,
      sortingOrder: 3,
      visible: true,
      cellClick: true,
    },
    {
      field: 'realm',
      label: 'Realm',
      sortable: true,
      filterable: true,
      sortingOrder: 4,
      visible: true,
      cellClick: false,
      customFilter: true,
      multiple: true,
      width: '150px',
      filterOptions: [
        { value: 'Hp', label: 'HP' },
        { value: 'ascendion', label: 'Ascendion' },
      ],
    },
    {
      field: 'lastLogin',
      label: 'Last Login',
      sortable: true,
      filterable: false,
      sortingOrder: 6,
      visible: true,
    },
    {
      field: 'authorized',
      label: 'Authorized by',
      sortable: true,
      filterable: true,
      sortingOrder: 7,
      visible: true,
      activeFilterIconColor: '#a31616ff',
      filterIconColor: '#9ca3af'
    },
    {
      field: 'status',
      label: 'Status',
      sortable: false,
      filterable: true,
      sortingOrder: 8,
      customFilter: true,
      visible: true,
      multiple: true,
      width: '200px',
    },
    {
      field: 'actions',
      label: 'Actions',
      sortable: false,
      filterable: false,
      sortingOrder: 9,
      visible: true,
    },
  ];

  onLoadMore(event: { page: number; pageSize: number }) {
    this.page++;
    this.rowtableData();
  }

  rowtableData() {
    this.rowData = [
      {
        id: '1',
        parentId: '1',
        name: {
          value: 'Elias        Montgomery',
          subValue: 'Elias@ascendion.com',
          iconName: 'assets/avatar.jpg',// avatar is false use this format ->iconName: 'url:assets/avatar.jpg',
        },
        email: { value: 'user@asc.com', clickable: true, customStyle: { background: 'red', 'text-align': 'right', width: '100%' } },
        access: { value: 'Admin', iconName: 'home', iconSize: '20', iconColor: 'red' },
        realm: {
          value: ['Ascendion', 'ascendionCore'],
          subValue: '+24',
          customStyle: {
            background: 'var(--global-color-gray-100)',
            border: '1px solid var(--table-border)',
            color: 'var(--color-text-primary);',
            'border-radius': '20px',
          },
        },
        lastLogin: { value: '10/02/2023' },
        status: {
          value: ['Ascendion', 'ascendionCore',],
          customStyle: {
            background: '#e6f5f0',
            color: '#36ab87',
            'font-weight': '600',
            'border-radius': '2px',
          },
        },

        authorized: {
          value: 'user@ascendion.com',
        },
        action: {
          edit: {
            enabled: true,
            label: 'Edit',
            icon: 'SquarePen',
            inline: true,
          },
          delete: {
            enabled: true,
            label: 'Delete',
            icon: 'trash',
            inline: true,
          },
        },
        sortOrder: 1,
        checkbox: {
          isSelected: false,
          disable: false,
        },
        isSelected: false,
        expanded: false,
        children: [
          {
            parentId: '1.1',
            name: { value: 'Elias child 1' },
            email: { value: 'user@ascendion.com', clickable: true },
            access: { value: 'Admin' },
            lastLogin: { value: '15/02/2023' },

            authorized: {
              value: 'user@ascendion.com',
            },
            expanded: true,
            isSelected: false,
            children: [
              {
                parentId: '1.2',
                name: { value: 'Elias child 2' },
                email: { value: 'user@ascendion.com', clickable: true },
                access: { value: 'Admin' },

                lastLogin: { value: '09/02/2023' },
                authorized: {
                  value: 'user@ascendion.com',
                },
                expanded: true,
                isSelected: false,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: '2',
        parentId: '2',
        name: {
          value: 'Clara Montgomery',
          subValue: 'Clara@ascendion.com',
          iconName: 'x'
        },
        realm: {
          value: 'Hp',
          subValue: '+24',
          customStyle: {
            background: 'var(--global-color-gray-100)',
            border: '1px solid var(--table-border)',
            color: 'var(--color-text-primary);',
            'border-radius': '20px',
          },
        },
        email: { value: 'Admin@ascendion.com', clickable: true },
        access: { value: 'lead' },
        addedOn: { value: '12/02/2023' },
        validtill: { value: '12/02/2023' },
        lastLogin: { value: '12/02/2023' },
        authorized: {
          value: 'admin@ascendion.com',
        },

        status: [{
          value: 'Deepak tag',
          customStyle: {
            background: '#ea8d0c',
            color: '#000',
            'font-weight': '600',
            'padding': '2px',
            'margin': '5px',
            'border-radius': '2px',
          },
        },
        {
          value: 'Dee RtestEnt2',
          customStyle: {
            background: '#78b5fa',
            color: '#000',
            'font-weight': '600',
            'padding': '2px',
            'margin': '5px',
            'border-radius': '2px',
          },
        },
        {
          value: 'RtestEnt2',
          subValue: '+4',
          customStyle: {
            background: '#fbecec',
            color: '#000',
            'font-weight': '600',
            'padding': '2px',
            'margin': '5px',
            'border-radius': '2px',
          },
        }],

        action: {
          edit: {
            enabled: true,
            label: 'Edit',
            icon: 'SquarePen',
            inline: false,
          },
          delete: {
            enabled: true,
            label: 'Delete',
            icon: 'trash',
            inline: false,
          },
        },
        sortOrder: 2,
        isSelected: false,
      },
      {
        id: '3',
        parentId: '3',
        name: {
          value: 'Alias Max Montgomery clary',
          subValue: 'Alias@ascendion.com',
          customStyle: { background: 'yellow', },
          subStyle: { background: 'blue' },
          tooltip: {
            position: 'top',
            count: '10'
          }
        },
        realm: {
          value: 'volvo',
          subValue: '+24',
          customStyle: {
            background: 'var(--global-color-gray-100)',
            border: '1px solid var(--table-border)',
            color: 'var(--color-text-primary);',
            'border-radius': '20px',
          },
        },
        email: { value: 'user@ascendion.com', clickable: true },
        access: { value: 'Admin' },
        addedOn: { value: '11/02/2023' },
        validtill: { value: '12/02/2023' },
        lastLogin: { value: '10/02/2023' },
        authorized: {
          value: 'user@ascendion.com',
        },
        status: {
          value: 'Templete',
          customStyle: {
            background: '#fbf1e6',
            color: '#d08530',
            'font-weight': '600',
            'padding-bottom': '2px',
            'border-radius': '2px',
          },
        },

        action: {
          edit: {
            enabled: true,
            label: 'Edit',
            icon: 'SquarePen',
            inline: true,
          },
          delete: {
            enabled: true,
            label: 'Delete',
            icon: 'trash',
            inline: true,
          },
        },
        sortOrder: 3,
        isSelected: false,
      },
      {
        id: '4',
        parentId: '4',
        name: { value: 'Max Montgomery', subValue: 'Max@ascendion.com' },
        realm: {
          value: 'Dell',
          subValue: '+24',
          customStyle: {
            background: 'var(--global-color-gray-100)',
            border: '1px solid var(--table-border)',
            color: 'var(--color-text-primary);',
            'border-radius': '20px',
          },
        },
        email: { value: 'user@ascendion.com', clickable: true },
        access: { value: 'Admin' },
        addedOn: { value: '11/02/2023' },
        validtill: { value: '12/02/2023' },
        lastLogin: { value: '10/02/2023' },
        authorized: {
          value: 'user@ascendion.com',
        },
        status: {
          value: 'Ready to Approve',
          customStyle: {
            background: '#e6f4f7',
            color: '#3ba8c2',
            'font-weight': '600',
            'padding-bottom': '2px',
            'border-radius': '2px',
          },
        },

        action: {
          edit: {
            enabled: true,
            label: 'Edit',
            icon: 'SquarePen',
            inline: true,
          },
          delete: {
            enabled: true,
            label: 'Delete',
            icon: 'trash',
            inline: true,
          },
        },
        sortOrder: 4,
        isSelected: false,
      },
      {
        id: '5',
        parentId: '5',
        name: { value: 'lias Montgomer', subValue: 'lias@ascendion.com', },
        realm: {
          value: 'ascendion',
          subValue: '+24',
          customStyle: {
            background: 'var(--global-color-gray-100)',
            border: '1px solid var(--table-border)',
            color: 'var(--color-text-primary);',
            'border-radius': '20px',
          },
        },
        email: { value: 'user@ascendion.com', clickable: true },
        access: { value: 'Admin1' },
        addedOn: { value: '11/02/2023' },
        validtill: { value: '12/02/2023' },
        lastLogin: { value: '10/02/2023' },
        authorized: {
          value: 'user@ascendion.com',
        },
        status: {
          value: 'Posted',
          customStyle: {
            background: '#e6f5f0',
            color: '#36ab87',
            'font-weight': '600',
            'padding-bottom': '2px',
            'border-radius': '2px',
          },
        },

        action: {
          edit: {
            enabled: true,
            label: 'Edit',
            icon: 'SquarePen',
            inline: true,
          },
          delete: {
            enabled: true,
            label: 'Delete',
            icon: 'trash',
            inline: true,
          },
        },
        sortOrder: 5,
        isSelected: false,
        checkbox: {
          isSelected: false,
        }

      },
    ];
  }


  onSortChanged(event: { column: string; direction: 'asc' | 'desc' }) {
    console.log('Sorting:', event);
  }
  onTableCellClick(event: { row: User; field: string }) {
    console.log('Clicked cell data:', event);
  }

  onCellClicked(event: { row: any; field: string; value: any }) {
    console.log('Cell clicked:', event);
  }
  onActionFromTable(event: {
    row: User;
    actionKey: string;
    config: ActionConfig;
  }): void {
    console.log('Action clicked:', event.actionKey);
    console.log('Label:', event.config.label);
    console.log('Row:', event.row);

    if (event.actionKey === 'edit') {
      // handle edit
    } else if (event.actionKey === 'delete') {
      // handle delete
    }
  }

  handleRowClick(row: any) {
    console.log('Clicked row:', row);
  }
  handleColumnOrderChange(updatedColumns: ColumnConfig[]) {
    console.log('Updated column order:', updatedColumns);
  }

  handleRowOrderChange(updatedData: User[]) {
    console.log('Updated row order:', updatedData);
  }

  onSelectedRowsChanged(selectedRows: any[]): void {
    console.log('Selected rows:', selectedRows);
  }

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  getTableCode(sectionTitle: string): string {
    const examples: Record<string, string> = {
      'basic table': `
<ava-table [columns]="table2Columns" [data]="table2Data"></ava-table>
`,
      'table with status': `
<ava-table [columns]="orderColumns" [data]="orderData"></ava-table>
`,
      'table with actions': `
<ava-table [columns]
`,
    };
    return examples[sectionTitle.toLowerCase()] || '';
  }

  copyCode(sectionTitle: string): void {
    const code = this.getTableCode(sectionTitle);
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('Code copied to clipboard');
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
    document.body.removeChild(textarea);
  }

  onApiFilterChange(filters: (
    | { type: 'default'; field: string; condition: string; value: any }
    | { type: 'custom'; field: string; values: string[] }
  )[]) {
    console.log('API filter:', filters);
  }

  delete() {
    this.rowData = this.rowData.filter((x) => !x.isSelected)
  }
}
