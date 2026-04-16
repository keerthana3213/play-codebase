import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaCustomDataGridComponent } from './aava-custom-data-grid.component';
import { GLAccount } from './aava-custom-data-grid.component';

describe('CustomDataGridComponent', () => {
  let component: AavaCustomDataGridComponent;
  let fixture: ComponentFixture<AavaCustomDataGridComponent>;

  const mockAccounts: GLAccount[] = [
    {
      id: '1',
      accountNumber: '5001 - 125',
      accountName: 'Rent Expense',
      debits: 400,
      credits: null
    },
    {
      id: '2',
      accountNumber: '1001 - 001',
      accountName: 'Cash',
      debits: null,
      credits: 600
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaCustomDataGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AavaCustomDataGridComponent);
    component = fixture.componentInstance;
    component.accounts = mockAccounts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display accounts data', () => {
    expect(component.accounts.length).toBe(2);
    expect(component.accounts[0].accountNumber).toBe('5001 - 125');
    expect(component.accounts[0].accountName).toBe('Rent Expense');
  });

  it('should format currency correctly', () => {
    expect(component.formatCurrency(400)).toBe('$400');
    expect(component.formatCurrency(null)).toBe('-');
    expect(component.formatCurrency(0)).toBe('-');
    expect(component.formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('should emit delete event when delete icon is clicked', () => {
    spyOn(component.deleteAccount, 'emit');
    
    component.onDeleteAccount(mockAccounts[0]);
    
    expect(component.deleteAccount.emit).toHaveBeenCalledWith(mockAccounts[0]);
  });

  it('should emit account click event when account is clicked', () => {
    spyOn(component.accountClick, 'emit');
    
    component.onAccountClick(mockAccounts[0]);
    
    expect(component.accountClick.emit).toHaveBeenCalledWith(mockAccounts[0]);
  });

  it('should track accounts by id', () => {
    const result = component.trackByAccount(0, mockAccounts[0]);
    expect(result).toBe('1');
  });

  it('should use default config when none provided', () => {
    const newComponent = new AavaCustomDataGridComponent();
    expect(newComponent.config.showDeleteAction).toBe(true);
    expect(newComponent.config.currencySymbol).toBe('$');
    expect(newComponent.config.emptyMessage).toBe('No GL accounts available');
    expect(newComponent.config.deleteIconName).toBe('trash-2');
  });
});
