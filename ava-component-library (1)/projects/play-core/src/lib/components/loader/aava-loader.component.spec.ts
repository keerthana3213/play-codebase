import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaLoaderComponent } from './aava-loader.component';

describe('LoaderComponent', () => {
  let component: AavaLoaderComponent;
  let fixture: ComponentFixture<AavaLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaLoaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
