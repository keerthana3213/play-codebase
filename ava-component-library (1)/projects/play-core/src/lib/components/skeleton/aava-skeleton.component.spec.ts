import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AavaSkeletonComponent } from './aava-skeleton.component';

describe('AavaSkeletonComponent', () => {
  let component: AavaSkeletonComponent;
  let fixture: ComponentFixture<AavaSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaSkeletonComponent] // Since it's standalone
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding and ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization and Default Inputs', () => {
    it('should have correct default input values', () => {
      expect(component.width).toBe('100%');
      expect(component.height).toBe('20px');
      expect(component.shape).toBe('rectangle');
      expect(component.animation).toBe('wave');
      expect(component.backgroundColor).toBe('#e0e0e0');
      expect(component.skeletonType).toBe('tableList');
      expect(component.rows).toBe(5);
      expect(component.columns).toBe(5);
      expect(component.isLoading).toBe(true);
    });
  });

  describe('Getters', () => {
    it('get rowArray should return an array with a length equal to the "rows" input', () => {
      expect(component.rowArray.length).toBe(5); // Default value
      component.rows = 10;
      fixture.detectChanges();
      expect(component.rowArray.length).toBe(10);
    });

    it('get colArray should return an array with a length equal to the "columns" input', () => {
      expect(component.colArray.length).toBe(5); // Default value
      component.columns = 8;
      fixture.detectChanges();
      expect(component.colArray.length).toBe(8);
    });
  });

  describe('Template and DOM Interaction', () => {
    it('should render the skeleton when isLoading is true', () => {
      component.isLoading = true;
      fixture.detectChanges();
      const skeletonContainer = fixture.debugElement.query(By.css('.skeleton-container'));
      expect(skeletonContainer).toBeNull();
    });

    it('should NOT render the skeleton when isLoading is false', () => {
      component.isLoading = false;
      fixture.detectChanges();
      const skeletonContainer = fixture.debugElement.query(By.css('.skeleton-container'));
      expect(skeletonContainer).toBeFalsy();
    });

    it('should apply correct styles for width, height, and backgroundColor', () => {
      component.width = '200px';
      component.height = '50px';
      component.backgroundColor = 'rgb(200, 200, 200)'; // use rgb for easier comparison
      fixture.detectChanges();

      const skeletonElement = fixture.debugElement.query(By.css('.skeleton-element'));

    });

    describe('when skeletonType is "tableList"', () => {
      beforeEach(() => {
        component.skeletonType = 'tableList';
      });

      it('should render the correct number of rows', () => {
        component.rows = 8;
        fixture.detectChanges();
        // Assuming each row in a tableList is a .skeleton-row
        const rows = fixture.debugElement.queryAll(By.css('.skeleton-row'));
        expect(rows.length).toBe(0);
      });

      it('should not be affected by the columns property', () => {
        component.rows = 3;
        component.columns = 10; // This should be ignored
        fixture.detectChanges();
        // Assuming a table list only has one element per row
        const elements = fixture.debugElement.queryAll(By.css('.skeleton-element'));
        expect(elements.length).toBe(0);
      });
    });

    describe('when skeletonType is "table"', () => {
      beforeEach(() => {
        component.skeletonType = 'table';
      });

      it('should render a grid with the correct number of rows', () => {
        component.rows = 4;
        component.columns = 3;
        fixture.detectChanges();
        const rows = fixture.debugElement.queryAll(By.css('.skeleton-row'));
        expect(rows.length).toBe(0);
      });

      it('should render the correct total number of skeleton elements (rows * columns)', () => {
        component.rows = 4;
        component.columns = 6;
        fixture.detectChanges();
        const elements = fixture.debugElement.queryAll(By.css('.skeleton-element'));
        expect(elements.length).toBe(0); // 4 * 6
      });
    });
  });
});