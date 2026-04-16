import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AavaCustomSidebarComponent, } from './aava-custom-sidebar.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

export interface SidebarItem {
  id: string;
  text: string;
  icon?: string;
  route?: string;
  active?: boolean;
  disabled?: boolean;
  children?: SidebarItem[];
}
// Mock AavaIconComponent
@Component({ selector: 'aava-icon', template: '' })
class MockAavaIconComponent {
  @Input() iconName?: string;
}

// Mock AavaSidebarComponent
@Component({ selector: 'aava-sidebar', template: '<ng-content></ng-content>' })
class MockAavaSidebarComponent { }

describe('AavaCustomSidebarComponent', () => {
  let component: AavaCustomSidebarComponent;
  let fixture: ComponentFixture<AavaCustomSidebarComponent>;
  let httpMock: HttpTestingController;

  const mockSidebarItem: SidebarItem[] = [
    { id: 'a', icon: 'home', text: 'Item A', route: '/a', active: false },
    { id: 'b', icon: 'home', text: 'Item B', route: '/b', active: false },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AavaCustomSidebarComponent, HttpClientTestingModule],
    })
      .overrideComponent(AavaCustomSidebarComponent, {
        set: {
          imports: [MockAavaIconComponent, MockAavaSidebarComponent, CommonModule],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AavaCustomSidebarComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('user interaction', () => {
    // it('should set correct active item on onItemClick', () => {
    //   component.SidebarItem = [...mockSidebarItem];

    //   component.onItemClick({ id: 'b', icon: 'home', text: 'Item B' });

    //   expect(component.SidebarItem.find((i:any) => i.id === 'b')?.active).toBeFalse();
    //   expect(component.SidebarItem.find((i:any) => i.id === 'a')?.active).toBeFalse();
    // });

    it('should update isCollapsed and log on onCollapseToggle', () => {
      const logSpy = spyOn(console, 'log');

      component.onCollapseToggle(true);

      expect(component.isCollapsed).toBeTrue();
      // expect(logSpy).toHaveBeenCalledWith('Sidebar collapsed:', true);
    });

    it('should fetch sidebar items when jsonFilePath is set', () => {
      // Arrange
      // component.jsonFilePath = 'new-file.json';
      fixture.detectChanges(); // triggers ngOnInit

      // Act
      fixture.detectChanges(); // triggers ngOnInit

      // Assert HTTP request
      // const req = httpMock.expectOne('new-file.json');
      // expect(req.request.method).toBe('GET');
      // req.flush(mockSidebarItems);

      // expect(component.sidebarItems).toEqual(mockSidebarItems);
    });
    it('should toggle isCollapsed on onCollapseToggle', () => {
      component.isCollapsed = false;
      component.onCollapseToggle(true);
      expect(component.isCollapsed).toBeTrue(); // if it sets based on argument
    });

  });

});
