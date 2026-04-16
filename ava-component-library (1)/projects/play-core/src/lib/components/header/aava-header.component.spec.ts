import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaHeaderComponent } from './aava-header.component';

describe('HeaderComponent', () => {
  let component: AavaHeaderComponent;
  let fixture: ComponentFixture<AavaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
