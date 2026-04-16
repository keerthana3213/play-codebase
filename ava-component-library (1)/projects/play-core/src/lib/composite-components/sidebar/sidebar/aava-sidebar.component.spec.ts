import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaSidebarComponent } from './aava-sidebar.component';

describe('AavaSidebarComponent', () => {
  let component: AavaSidebarComponent;
  let fixture: ComponentFixture<AavaSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaSidebarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
