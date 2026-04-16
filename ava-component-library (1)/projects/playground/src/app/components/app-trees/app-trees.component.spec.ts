import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTreesComponent } from './app-trees.component';

describe('AppTreesComponent', () => {
  let component: AppTreesComponent;
  let fixture: ComponentFixture<AppTreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTreesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
