import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaUserTableComponent,
  ColumnConfig,
  ExpandableRow,
} from '../../../../../play-core/src/lib/components/user-table/aava-user-table.component';
import { AavaSkeletonComponent } from '@aava/play-core';

export interface FieldWithIcon {
  value: any;
  subValue?: string;
  iconName?: string;
  clickable?: boolean;
  customStyle?: Record<string, string>;
}
export interface AccountRow {
  accountId: string;
  accountName: string;
  category: string;
  openingBalance: number;
  debit: number;
  credit: number;
  balance: number;
  isExpanded: boolean;
  transactions?: TransactionRow[];
}

export interface TransactionRow {
  reference: string;
  date: string;
  transactionType: string;
  credit: number;
  debit: number;
  amount: number;
}

@Component({
  selector: 'app-nested-table-demo',
  standalone: true,
  imports: [CommonModule, AavaUserTableComponent, AavaSkeletonComponent],
  templateUrl: './nested-table-demo.component.html',
  styleUrls: ['./nested-table-demo.component.scss'],
})
export class NestedTableDemoComponent implements OnInit {
  isLoading = true;
  loadingError = false;
  expandableRows: ExpandableRow[] = [];

  // Main table columns for accounts using aava-user-table
  mainTableColumns: ColumnConfig[] = [
    {
      field: 'select',
      label: '',
      sortable: false,
      filterable: false,
      visible: true,
      resizable: false,
    },
    {
      field: 'name',
      label: 'Account Name',
      sortable: true,
      filterable: true,
      sortingOrder: 1,
      visible: true,
    },
    {
      field: 'email',
      label: 'Account ID',
      sortable: true,
      filterable: true,
      sortingOrder: 2,
      visible: true,
    },
    {
      field: 'access',
      label: 'Category',
      sortable: true,
      filterable: true,
      sortingOrder: 3,
      visible: true,
    },
    {
      field: 'addedOn',
      label: 'Opening Balance',
      sortable: true,
      filterable: false,
      sortingOrder: 4,
      visible: true,
    },
    {
      field: 'validtill',
      label: 'Debit',
      sortable: true,
      filterable: false,
      sortingOrder: 5,
      visible: true,
    },
    {
      field: 'lastLogin',
      label: 'Credit',
      sortable: true,
      filterable: false,
      sortingOrder: 6,
      visible: true,
    },
    {
      field: 'authorized',
      label: 'Balance',
      sortable: true,
      filterable: false,
      sortingOrder: 7,
      visible: true,
    },
    {
      field: 'actions',
      label: 'Actions',
      sortable: false,
      filterable: false,
      sortingOrder: 8,
      visible: true,
    },
  ];

  // Nested table columns for transactions - using custom field mapping
  transactionColumns: ColumnConfig[] = [
    {
      field: 'name',
      label: 'Reference',
      sortable: true,
      filterable: true,
      visible: true,
    },
    {
      field: 'email',
      label: 'Date',
      sortable: true,
      filterable: true,
      visible: true,
    },
    {
      field: 'access',
      label: 'Transaction Type',
      sortable: true,
      filterable: true,
      visible: true,
    },
    {
      field: 'addedOn',
      label: 'Credit',
      sortable: true,
      filterable: false,
      visible: true,
    },
    {
      field: 'validtill',
      label: 'Debit',
      sortable: true,
      filterable: false,
      visible: true,
    },
    {
      field: 'lastLogin',
      label: 'Amount',
      sortable: true,
      filterable: false,
      visible: true,
    },
  ];

  // Transform account data for aava-user-table
  getMainTableData(): any[] {
    return this.accountData.map((account) => ({
      id: account.accountId,
      parentId: account.accountId,
      name: { value: account.accountName,  clickable: false },
      email: { value: account.accountId,  clickable: false },
      access: { value: account.category,  clickable: false },
      addedOn: {
        value: this.formatCurrency(account.openingBalance),
        iconName: '',
        clickable: false,
      },
      validtill: {
        value: this.formatCurrency(account.debit),
        iconName: '',
        clickable: false,
      },
      lastLogin: {
        value: this.formatCurrency(account.credit),
        iconName: '',
        clickable: false,
      },
      authorized: {
        value: this.formatCurrency(account.balance),
        iconName: '',
        clickable: false,
      },
      status:
      {
        value: account.category,
        customStyle: {
          background: this.getCategoryBackground(account.category),
          color: this.getCategoryTextColor(account.category),
          'font-weight': '600',
          'border-radius': '2px',
        },
      },

      action: {
        view: {
          enabled: true,
          label: 'View Details',
          icon: 'eye',
          inline: true,
        },
        edit: {
          enabled: true,
          label: 'Edit',
          icon: 'SquarePen',
          inline: true,
        },
      },
      sortOrder: parseInt(account.accountId.split('-')[1]) || 0,
      isSelected: false,
    }));
  }

  // Transform transaction data for nested aava-user-table
  getTransactionData(accountId: string): any[] {
    const account = this.accountData.find((acc) => acc.accountId === accountId);
    if (!account || !account.transactions) return [];

    return account.transactions.map((transaction, index) => ({
      id: `${accountId}-tx-${index}`,
      parentId: accountId,
      name: { value: transaction.reference, iconName: '', clickable: false },
      email: { value: transaction.date, iconName: '', clickable: false },
      access: {
        value: transaction.transactionType,
        iconName: '',
        clickable: false,
      },
      addedOn: {
        value: this.formatCurrency(transaction.credit),
        iconName: '',
        clickable: false,
      },
      validtill: {
        value: this.formatCurrency(transaction.debit),
        iconName: '',
        clickable: false,
      },
      lastLogin: {
        value: this.formatCurrency(transaction.amount),
        iconName: '',
        clickable: false,
      },
      authorized: { value: '', iconName: '', clickable: false },
      status: { value: '' },
      action: {},
      sortOrder: index,
      isSelected: false,
    }));
  }

  // Get category color for status badges
  getCategoryColor(
    category: string
  ):
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'custom' {
    switch (category.toLowerCase()) {
      case 'assets':
        return 'success';
      case 'liabilities':
        return 'warning';
      case 'revenue':
        return 'info';
      case 'expenses':
        return 'error';
      default:
        return 'default';
    }
  }

  getCategoryBackground(category: string): string {
    switch (category.toLowerCase()) {
      case 'assets':
        return '#e6f5f0';
      case 'liabilities':
        return '#fbf1e6';
      case 'revenue':
        return '#e6f4f7';
      case 'expenses':
        return '#fbecec';
      default:
        return '#f0f0f0';
    }
  }

  getCategoryTextColor(category: string): string {
    switch (category.toLowerCase()) {
      case 'assets':
        return '#36ab87';
      case 'liabilities':
        return '#d08530';
      case 'revenue':
        return '#3ba8c2';
      case 'expenses':
        return '#e14444';
      default:
        return '#666666';
    }
  }

  // Initialize expandable rows
  initializeExpandableRows() {
    this.expandableRows = this.accountData.map((account) => ({
      data: this.getMainTableData().find(
        (user) => user.id === account.accountId
      )!,
      isExpanded: account.isExpanded,
      nestedContent: account.transactions || [],
    }));
    console.log('Initialized expandableRows:', this.expandableRows);
  }

  // Handle row expansion from aava-user-table
  onRowExpand(event: { row: any; isExpanded: boolean }) {
    console.log('onRowExpand called:', event);
    const account = this.accountData.find(
      (acc) => acc.accountId === event.row.id
    );
    if (account) {
      account.isExpanded = event.isExpanded;
      // Update the expandableRows array to sync the state
      const expandableRow = this.expandableRows.find(
        (er) => er.data.id === account.accountId
      );
      if (expandableRow) {
        expandableRow.isExpanded = event.isExpanded;
        console.log('Updated expandableRow state:', expandableRow);
      }
    }
  }

  // Sample data
  accountData: AccountRow[] = [
    {
      accountId: '1000-1001',
      accountName: 'Cash',
      category: 'Assets',
      openingBalance: 56050.0,
      debit: 56050.0,
      credit: 0,
      balance: 56050.0,
      isExpanded: true,
      transactions: [
        {
          reference: '1000',
          date: '01 April 2025',
          transactionType: 'Payment',
          credit: 555.0,
          debit: 0,
          amount: 555.0,
        },
        {
          reference: '1500',
          date: '04 April 2025',
          transactionType: 'Payment',
          credit: 0,
          debit: 10000.0,
          amount: -10000.0,
        },
        {
          reference: '1250',
          date: '08 April 2025',
          transactionType: 'Payment',
          credit: 12800.0,
          debit: 0,
          amount: 12800.0,
        },
        {
          reference: '150',
          date: '21 April 2025',
          transactionType: 'Payment',
          credit: 10500.0,
          debit: 0,
          amount: 10500.0,
        },
        {
          reference: '150',
          date: '30 April 2025',
          transactionType: 'Payment',
          credit: 32195.0,
          debit: 0,
          amount: 32195.0,
        },
      ],
    },
    {
      accountId: '1000-1010',
      accountName: 'Accounts Payable',
      category: 'Liabilities',
      openingBalance: -18000.0,
      debit: 18000.0,
      credit: 0,
      balance: -18000.0,
      isExpanded: false,
      transactions: [],
    },
    {
      accountId: '1000-1110',
      accountName: 'Subscription Revenue',
      category: 'Revenue',
      openingBalance: -60610.0,
      debit: 0,
      credit: -60610.0,
      balance: -60610.0,
      isExpanded: false,
      transactions: [],
    },
    {
      accountId: '1000-1112',
      accountName: 'Advertising Revenue',
      category: 'Revenue',
      openingBalance: -225300.0,
      debit: 0,
      credit: -225300.0,
      balance: -225300.0,
      isExpanded: false,
      transactions: [],
    },
  ];

  toggleExpansion(account: AccountRow): void {
    account.isExpanded = !account.isExpanded;
  }

  formatCurrency(value: number): string {
    if (value === 0) return '-';
    const formatted = Math.abs(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return value < 0 ? `($${formatted})` : `$${formatted}`;
  }

  getTotalCredits(transactions: any[]): number {
    return transactions.reduce((sum, t) => {
      return sum + this.getFieldNumericValue(t.addedOn);
    }, 0);
  }

  getTotalDebits(transactions: any[]): number {
    return transactions.reduce((sum, t) => {
      return sum + this.getFieldNumericValue(t.validtill);
    }, 0);
  }

  getNetAmount(transactions: any[]): number {
    return transactions.reduce((sum, t) => {
      return sum + this.getFieldNumericValue(t.lastLogin);
    }, 0);
  }

  getFieldNumericValue(field: FieldWithIcon | FieldWithIcon[] | undefined): number {
    if (!field) return 0;
    // if it's an array, take the first one (or sum if you prefer)
    const value = Array.isArray(field)
      ? field[0]?.value
      : field.value;
    const cleaned = String(value ?? '0').replace(/[$,()]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }

  ngOnInit() {
    // Initialize expandable rows immediately
    this.initializeExpandableRows();
    // Simulate API call with loading state
    this.simulateApiCall();
  }

  simulateApiCall() {
    this.isLoading = true;
    this.loadingError = false;

    // Simulate network delay
    setTimeout(() => {
      try {
        // Simulate successful data fetch
        this.isLoading = false;
        // Re-initialize expandable rows after data is loaded to ensure sync
        this.initializeExpandableRows();
      } catch (error) {
        this.loadingError = true;
        this.isLoading = false;
      }
    }, 2000); // 2 second delay to show skeleton
  }

  retryLoading() {
    this.simulateApiCall();
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}
