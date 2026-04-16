import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaRailNavigationSidebarComponent } from './aava-rail-navigation-sidebar.component';

describe('AavaRailNavigationSidebarComponent', () => {
  let component: AavaRailNavigationSidebarComponent;
  let fixture: ComponentFixture<AavaRailNavigationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaRailNavigationSidebarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaRailNavigationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
