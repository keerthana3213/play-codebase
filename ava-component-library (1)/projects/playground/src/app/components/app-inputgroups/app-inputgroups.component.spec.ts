import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputgroupsComponent } from './app-inputgroups.component';

describe('AppInputgroupsComponent', () => {
  let component: AppInputgroupsComponent;
  let fixture: ComponentFixture<AppInputgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInputgroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInputgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
