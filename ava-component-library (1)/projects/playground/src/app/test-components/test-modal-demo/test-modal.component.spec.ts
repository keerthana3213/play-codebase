import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestDialogComponent } from './test-dialog.component';
import { DialogService } from '@aava/play-core';

describe('TestDialogComponent', () => {
  let component: TestDialogComponent;
  let fixture: ComponentFixture<TestDialogComponent>;
  let dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(async () => {
    const dialogServiceSpy = jasmine.createSpyObj('DialogService', [
      'openModal', 'success', 'confirmation', 'custom'
    ]);

    await TestBed.configureTestingModule({
      imports: [TestDialogComponent],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestDialogComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open new style dialog when openNewStyleDialog is called', () => {
    component.openNewStyleDialog();
    expect(dialogService.openModal).toHaveBeenCalled();
  });

  it('should open success dialog when openSuccessDialog is called', () => {
    component.openSuccessDialog();
    expect(dialogService.success).toHaveBeenCalledWith({
      title: 'Success!',
      message: 'This is the existing success dialog style.'
    });
  });

  it('should open confirmation dialog when openConfirmationDialog is called', () => {
    component.openConfirmationDialog();
    expect(dialogService.confirmation).toHaveBeenCalledWith({
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed?',
      confirmButtonText: 'Yes, Continue',
      cancelButtonText: 'Cancel'
    });
  });

  it('should open custom dialog when openCustomDialog is called', () => {
    component.openCustomDialog();
    expect(dialogService.custom).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Custom Dialog',
      message: 'This is a custom dialog with buttons.',
      variant: 'info'
    }));
  });
});
