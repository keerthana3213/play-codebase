import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevTestCompComponent } from './dev-test-comp.component';

describe('DevTestCompComponent', () => {
  let component: DevTestCompComponent;
  let fixture: ComponentFixture<DevTestCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevTestCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevTestCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
