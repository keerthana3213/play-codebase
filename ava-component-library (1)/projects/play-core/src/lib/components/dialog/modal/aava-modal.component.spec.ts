// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ModalComponent } from './modal.component';

// describe('ModalComponent', () => {
//   let component: ModalComponent;
//   let fixture: ComponentFixture<ModalComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ModalComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ModalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should emit closed event when onClose is called', () => {
//     spyOn(component.closed, 'emit');
//     component.onClose();
//     expect(component.closed.emit).toHaveBeenCalledWith({ action: 'close' });
//   });

//   it('should apply modal styles correctly', () => {
//     component.width = '500px';
//     component.height = '300px';
//     component.maxWidth = '90vw';
//     component.maxHeight = '90vh';

//     const styles = component.modalStyles;
//     expect(styles.width).toBe('500px');
//     expect(styles.height).toBe('300px');
//     expect(styles['max-width']).toBe('90vw');
//     expect(styles['max-height']).toBe('90vh');
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaModalComponent } from './aava-modal.component';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

// --- Test Host Components for Content Projection ---
// This is a common pattern for testing components that use <ng-content> or @ContentChildren.
// We create a wrapper component in our test to simulate how a developer would use the component in a real application.

// 1. A host component that projects content into ALL slots.
@Component({
  standalone: true,
  imports: [AavaModalComponent],
  template: `
    <ava-modal>
      <h1 dialog-header>Test Header</h1>
      <div dialog-body>Test Body Content</div>
      <footer dialog-footer>Test Footer</footer>
    </ava-modal>
  `
})
class TestHostWithAllContentComponent {
  // We can get a reference to the ModalComponent instance if needed
  @ViewChild(AavaModalComponent) modalComponent!: AavaModalComponent;
}

// 2. A host component that projects content into SOME slots (header and footer only).
@Component({
  standalone: true,
  imports: [AavaModalComponent],
  template: `
    <ava-modal>
      <h1 dialog-header>Test Header</h1>
      <footer dialog-footer>Test Footer</footer>
    </ava-modal>
  `
})
class TestHostWithPartialContentComponent {
  @ViewChild(AavaModalComponent) modalComponent!: AavaModalComponent;
}

// 3. A host component that projects NO content.
@Component({
  standalone: true,
  imports: [AavaModalComponent],
  template: `<ava-modal></ava-modal>`
})
class TestHostWithNoContentComponent {
  @ViewChild(AavaModalComponent) modalComponent!: AavaModalComponent;
}


// --- Main Test Suite ---

describe('ModalComponent', () => {
  let component: AavaModalComponent;
  let fixture: ComponentFixture<AavaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.showCloseButton).toBe(true);
    expect(component.width).toBe('400px');
    expect(component.height).toBeUndefined();
    expect(component.maxWidth).toBeUndefined();
    expect(component.maxHeight).toBeUndefined();
  });

  it('should emit closed event with { action: "close" } when onClose is called', () => {
    spyOn(component.closed, 'emit');
    component.onClose();
    expect(component.closed.emit).toHaveBeenCalledWith({ action: 'close' });
  });

  it('should return correct default styles from modalStyles getter', () => {
    const styles = component.modalStyles;
    expect(styles.width).toBe('400px');
    expect(styles.height).toBeUndefined();
    expect(styles['max-width']).toBeUndefined();
    expect(styles['max-height']).toBeUndefined();
  });

  it('should apply custom modal styles correctly', () => {
    component.width = '500px';
    component.height = '300px';
    component.maxWidth = '90vw';
    component.maxHeight = '90vh';

    const styles = component.modalStyles;
    expect(styles.width).toBe('500px');
    expect(styles.height).toBe('300px');
    expect(styles['max-width']).toBe('90vw');
    expect(styles['max-height']).toBe('90vh');
  });


  it('should hide the close button in the template when showCloseButton is false', () => {
    component.showCloseButton = false;
    fixture.detectChanges(); // Trigger change detection to update the view
    const closeButton = fixture.debugElement.query(By.css('.modal-close-button'));
    expect(closeButton).toBeNull();
  });
});

// This describe block handles tests involving content projection using the test hosts.
describe('Content Projection and ngAfterContentInit', () => {

  it('should correctly detect when no content is projected', () => {
    const fixture = TestBed.createComponent(TestHostWithNoContentComponent);
    fixture.detectChanges(); // This triggers ngAfterContentInit
    const component = fixture.componentInstance.modalComponent;


  });

});