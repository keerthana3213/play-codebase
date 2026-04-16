import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAvatarsComponent } from './test-avatars.component';

describe('TestAvatarsComponent', () => {
  let component: TestAvatarsComponent;
  let fixture: ComponentFixture<TestAvatarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAvatarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
