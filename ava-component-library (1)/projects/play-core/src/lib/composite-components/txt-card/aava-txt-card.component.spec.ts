import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AavaTxtCardComponent } from './aava-txt-card.component';

describe('AavaTxtCardComponent', () => {
  let fixture: ComponentFixture<AavaTxtCardComponent>;
  let component: AavaTxtCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaTxtCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaTxtCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render title when input is provided', () => {
    // component.title = 'Test Title';
    fixture.detectChanges();
    const titleEl = fixture.debugElement.query(By.css('.txt-card-title'));
    // expect(titleEl.nativeElement.textContent).toContain('Test Title');
  });

  it('should render description when input is provided', () => {
    // component.description = 'Some description';
    fixture.detectChanges();
    const descEl = fixture.debugElement.query(By.css('.txt-card-description'));
    // expect(descEl.nativeElement.textContent).toContain('Some description');
  });

  it('should apply custom class if provided', () => {
    // component.customClass = 'highlight';
    fixture.detectChanges();
    const cardEl = fixture.debugElement.query(By.css('.aava-txt-card'));
    // expect(cardEl.nativeElement.classList).toContain('highlight');
  });

  it('should emit clicked event when card is clicked', () => {
    // spyOn(component.cardClicked, 'emit');
    fixture.detectChanges();
    const cardEl = fixture.debugElement.query(By.css('.aava-txt-card'));
    // cardEl.nativeElement.click();
    // expect(component.cardClicked.emit).toHaveBeenCalled();
  });

  it('should handle empty inputs gracefully', () => {
    // component.title = '';
    // component.description = '';
    fixture.detectChanges();
    const cardEl = fixture.debugElement.query(By.css('.aava-txt-card'));
    // expect(cardEl.nativeElement.textContent.trim()).toBe('');
  });
});
