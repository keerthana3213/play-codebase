import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaFilterComponent, AavaFilterGroup, AavaFilterOption } from './aava-filter.component';
import { LucideAngularModule, ListFilter } from 'lucide-angular';

describe('AavaFilterComponent', () => {
  let component: AavaFilterComponent;
  let fixture: ComponentFixture<AavaFilterComponent>;

  const mockOptions: AavaFilterOption[] = [
    { id: 1, label: 'Red', value: 'red', selected: false },
    { id: 2, label: 'Blue', value: 'blue', selected: false }
  ];

  const mockFilterGroups: AavaFilterGroup[] = [
    {
      title: 'Colors',
      selectionType: 'checkbox',
      options: [
        { id: 1, label: 'Red', value: 'red', selected: false },
        { id: 2, label: 'Blue', value: 'blue', selected: false }
      ]
    },
    {
      title: 'Sizes',
      selectionType: 'radio',
      options: [
        { id: 's', label: 'Small', value: 'S', selected: false },
        { id: 'm', label: 'Medium', value: 'M', selected: false }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AavaFilterComponent,
        LucideAngularModule.pick({ ListFilter })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AavaFilterComponent);
    component = fixture.componentInstance;
    component.options = JSON.parse(JSON.stringify(mockOptions));
    component.filterGroups = JSON.parse(JSON.stringify(mockFilterGroups));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should have default size as md', () => {
      expect(component.size).toBe('md');
    });

    it('should detect multi-group mode correctly', () => {
      expect(component.isMultiGroupMode()).toBe(true);

      component.filterGroups = [];
      expect(component.isMultiGroupMode()).toBe(false);
    });

    it('should get all options correctly', () => {
      const allOptions = component.getAllOptions();
      expect(allOptions.length).toBe(4); // 2 colors + 2 sizes
    });
  });

  describe('Selection Handling', () => {
    it('should handle checkbox changes correctly', () => {
      spyOn(component.selectionChange, 'emit');
      const option = component.filterGroups[0].options[0]; // Red

      component.onCheckboxChange(option, true);
      expect(option.selected).toBeTrue();
      expect(component.selectionChange.emit).toHaveBeenCalled();

      component.onCheckboxChange(option, false);
      expect(option.selected).toBeFalse();
    });

    it('should handle radio option changes correctly', () => {
      spyOn(component.selectionChange, 'emit');
      const option = component.filterGroups[1].options[0]; // Small
      const groupOptions = component.filterGroups[1].options;

      component.onRadioOptionChange(option, 1);
      expect(option.selected).toBeTrue();
      expect(groupOptions[1].selected).toBeFalse(); // Other option should be deselected
      expect(component.selectionChange.emit).toHaveBeenCalled();
    });

    it('should handle label clicks correctly', () => {
      spyOn(component.selectionChange, 'emit');
      const option = component.filterGroups[0].options[0]; // Red

      component.allowMultipleSelection = true;
      component.onLabelClick(option);
      expect(option.selected).toBeTrue();
      expect(component.selectionChange.emit).toHaveBeenCalled();
    });
  });

  describe('Action Methods', () => {
    it('should clear all selections', () => {
      spyOn(component.clearAll, 'emit');
      spyOn(component.selectionChange, 'emit');

      // Set some selections first
      component.filterGroups[0].options[0].selected = true;
      component.filterGroups[1].options[0].selected = true;

      component.onClearAll();

      expect(component.getAllOptions().every(opt => !opt.selected)).toBeTrue();
      expect(component.clearAll.emit).toHaveBeenCalled();
      expect(component.selectionChange.emit).toHaveBeenCalled();
    });

    it('should apply current selections', () => {
      spyOn(component.apply, 'emit');

      component.onApply();
      expect(component.apply.emit).toHaveBeenCalledWith(jasmine.any(Array));
    });
  });

  describe('Utility Methods', () => {
    it('should return selected count correctly', () => {
      expect(component.getSelectedCount()).toBe(0);

      component.filterGroups[0].options[0].selected = true;
      expect(component.getSelectedCount()).toBe(1);
    });

    it('should return correct button size', () => {
      component.size = 'lg';
      expect(component.getButtonSize()).toBe('lg');
    });

    it('should return correct selection control size', () => {
      component.size = 'xl';
      expect(component.getSelectionControlSize()).toBe('lg');

      component.size = 'xs';
      expect(component.getSelectionControlSize()).toBe('sm');
    });

    it('should return correct action button size', () => {
      component.size = 'lg';
      expect(component.getActionButtonSize()).toBe('md');

      component.size = 'sm';
      expect(component.getActionButtonSize()).toBe('xs');
    });

    it('should return correct icon size', () => {
      component.size = 'sm';
      expect(component.getOptionIconSize()).toBe(16);

      component.size = 'xl';
      expect(component.getOptionIconSize()).toBe(24);
    });

    it('should generate correct button label', () => {
      component.label = 'Test Filter';
      component.showSelectionCount = false;
      expect(component.getButtonLabel()).toBe('Test Filter');

      component.showSelectionCount = true;
      component.filterGroups[0].options[0].selected = true;
      expect(component.getButtonLabel()).toBe('Test Filter (1)');
    });

    it('should generate correct radio group name', () => {
      component.label = 'Test';
      expect(component.getRadioGroupName()).toBe('filter-radio-Test');
      expect(component.getRadioGroupName(0)).toBe('filter-radio-group-0');
    });
  });
});
