import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestListComponent } from './test-list.component';

describe('TestListComponent', () => {
  let component: TestListComponent;
  let fixture: ComponentFixture<TestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs set from initializers', () => {
    // covers default initializers in TS file
    expect(component.heading).toBe('');
    expect(component.content).toBe('');
    expect(component.variant).toBe('blue');
  });

  it('should allow setting heading and content inputs', () => {
    // set via component instance
    // component.heading = 'My Heading';
    // component.content = 'My Content';
    fixture.detectChanges(); // OnPush still fine when we mutate + detect

    expect(component.heading).toBe('My Heading');
    expect(component.content).toBe('My Content');
  });

  it('should update inputs via setInput (works with OnPush)', () => {
    // Angular >=14 feature; exercises input path
    fixture.componentRef.setInput('heading', 'Title via setInput');
    fixture.componentRef.setInput('content', 'Body via setInput');
    fixture.componentRef.setInput('variant', 'red');
    fixture.detectChanges();

    expect(component.heading).toBe('Title via setInput');
    expect(component.content).toBe('Body via setInput');
    expect(component.variant).toBe('red');
  });

  it('should accept all allowed variant values', () => {
    const variants: Array<'blue' | 'red' | 'purple' | 'green' | 'orange' | 'teal'> =
      ['blue', 'red', 'purple', 'green', 'orange', 'teal'];

    for (const v of variants) {
      fixture.componentRef.setInput('variant', v);
      fixture.detectChanges();
      expect(component.variant).toBe(v);
    }
  });
});
