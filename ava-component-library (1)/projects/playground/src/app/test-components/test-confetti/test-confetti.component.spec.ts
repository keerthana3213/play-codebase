import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConfettiComponent } from './test-confetti.component';

describe('TestConfettiComponent', () => {
  let component: TestConfettiComponent;
  let fixture: ComponentFixture<TestConfettiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestConfettiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestConfettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
