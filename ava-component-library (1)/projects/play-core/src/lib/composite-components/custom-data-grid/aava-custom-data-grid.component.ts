import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDataGridComponent } from '../../components/data-grid/aava-data-grid.component';
import { AvaColumnDefDirective } from '../../components/data-grid/directive/ava-column-def.directive';
import { AvaHeaderCellDefDirective } from '../../components/data-grid/directive/ava-header-cell-def.directive';
import { AvaCellDefDirective } from '../../components/data-grid/directive/ava-cell-def.directive';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';

export interface GLAccount {
  id: string;
  accountNumber: string;
  accountName: string;
  debits: number | null;
  credits: number | null;
}

export interface CustomDataGridConfig {
  showDeleteAction?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  currencySymbol?: string;
  deleteIconName?: string;
}

@Component({
  selector: 'aava-custom-data-grid',
  standalone: true,
  imports: [
    CommonModule,
    AavaDataGridComponent,
    AvaColumnDefDirective,
    AvaHeaderCellDefDirective,
    AvaCellDefDirective,
    AavaIconComponent,
  ],
  templateUrl: './aava-custom-data-grid.component.html',
  styleUrl: './aava-custom-data-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaCustomDataGridComponent {
  @Input() accounts: GLAccount[] = [];
  @Input() config: CustomDataGridConfig = {
    showDeleteAction: true,
    isLoading: false,
    emptyMessage: 'No GL accounts available',
    currencySymbol: '$',
    deleteIconName: 'trash-2',
  };

  @Output() deleteAccount = new EventEmitter<GLAccount>();
  @Output() accountClick = new EventEmitter<GLAccount>();

  displayedColumns = [
    'accountNumber',
    'accountName',
    'debits',
    'credits',
    'actions',
  ];

  onDeleteAccount(account: GLAccount): void {
    this.deleteAccount.emit(account);
  }

  onAccountClick(account: GLAccount): void {
    this.accountClick.emit(account);
  }

  formatCurrency(amount: number | null): string {
    if (amount === null || amount === 0) {
      return '-';
    }
    return `${this.config.currencySymbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }

  trackByAccount(index: number, account: GLAccount): string {
    return account.id;
  }

  handleRowDrop(updatedRows: GLAccount[]) {
    this.accounts = [...updatedRows];
  }
}
