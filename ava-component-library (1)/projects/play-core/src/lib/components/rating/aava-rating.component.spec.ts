import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaRatingComponent } from './aava-rating.component';

describe('AavaRatingComponent', () => {
  let component: AavaRatingComponent;
  let fixture: ComponentFixture<AavaRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaRatingComponent] // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(AavaRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate full star correctly', () => {
    component.value = 3;
    expect(component.isFullStar(0)).toBeTrue();
    expect(component.isFullStar(2)).toBeTrue();
    expect(component.isFullStar(3)).toBeFalse();
  });

  it('should calculate half star correctly', () => {
    component.value = 2.5;
    expect(component.isHalfStar(2)).toBeTrue();
    expect(component.isHalfStar(1)).toBeFalse();
  });

  it('should emit value on full star click', () => {
    spyOn(component.rated, 'emit');

    const mockEvent = {
      offsetX: 20,
      target: { clientWidth: 20 } as HTMLElement
    } as unknown as MouseEvent;

    component.onStarClick(mockEvent, 1);
    expect(component.value).toBe(2);
    expect(component.rated.emit).toHaveBeenCalledWith(2);
  });

  it('should emit half value on half star click', () => {
    spyOn(component.rated, 'emit');



    const mockEvent = {
      offsetX: 5,
      target: { clientWidth: 20 } as HTMLElement
    } as unknown as MouseEvent;

    component.onStarClick(mockEvent, 1);
    expect(component.value).toBe(1.5);
    expect(component.rated.emit).toHaveBeenCalledWith(1.5);
  });

  it('should update hoveredValue on hover', () => {
    const mockEvent = {
      offsetX: 20,
      target: { clientWidth: 20 } as HTMLElement
    } as unknown as MouseEvent;

    component.onHoverStar(mockEvent, 2);
    expect(component.hoveredValue).toBe(3);
  });

  it('should reset hoveredValue on leave', () => {
    component.hoveredValue = 3;
    component.onLeave();
    expect(component.hoveredValue).toBe(0);
  });

  it('should handle keyboard ArrowRight to increase value', () => {
    spyOn(component.rated, 'emit');

    const keyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    component.value = 2;
    component.onKeyDown(keyboardEvent, 2);
    expect(component.value).toBe(3);
    expect(component.rated.emit).toHaveBeenCalledWith(3);
  });

  it('should handle keyboard ArrowLeft to decrease value', () => {
    spyOn(component.rated, 'emit');

    const keyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    component.value = 2;
    component.onKeyDown(keyboardEvent, 2);
    expect(component.value).toBe(1);
    expect(component.rated.emit).toHaveBeenCalledWith(1);
  });

  it('should handle Enter to select star', () => {
    spyOn(component.rated, 'emit');

    const keyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(keyboardEvent, 2);
    expect(component.value).toBe(3);
    expect(component.rated.emit).toHaveBeenCalledWith(3);
  });

  it('should handle Space to select star', () => {
    spyOn(component.rated, 'emit');

    const keyboardEvent = new KeyboardEvent('keydown', { key: ' ' });
    component.onKeyDown(keyboardEvent, 1);
    expect(component.value).toBe(2);
    expect(component.rated.emit).toHaveBeenCalledWith(2);
  });

  it('should respect readonly mode for click', () => {
    spyOn(component.rated, 'emit');

    component.readonly = true;
    const mockEvent = {
      offsetX: 20,
      target: { clientWidth: 20 } as HTMLElement
    } as unknown as MouseEvent;

    component.onStarClick(mockEvent, 1);
    expect(component.value).toBe(0);
    expect(component.rated.emit).not.toHaveBeenCalled();
  });

  it('should respect readonly mode for keyboard', () => {
    spyOn(component.rated, 'emit');

    component.readonly = true;
    const keyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    component.onKeyDown(keyboardEvent, 1);
    expect(component.rated.emit).not.toHaveBeenCalled();
  });
});
