import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaCubicalLoadingComponent } from './aava-cubical-loading.component';

describe('CubicalLoadingComponent', () => {
  let component: AavaCubicalLoadingComponent;
  let fixture: ComponentFixture<AavaCubicalLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaCubicalLoadingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaCubicalLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
