import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTagsComponent } from './app-tags.component';

describe('AppTagsComponent', () => {
  let component: AppTagsComponent;
  let fixture: ComponentFixture<AppTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
