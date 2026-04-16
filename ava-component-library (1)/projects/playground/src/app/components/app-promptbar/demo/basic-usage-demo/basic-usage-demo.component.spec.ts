import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicUsageDemoComponent } from './basic-usage-demo.component';

describe('BasicUsageDemoComponent', () => {
  let component: BasicUsageDemoComponent;
  let fixture: ComponentFixture<BasicUsageDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicUsageDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicUsageDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
