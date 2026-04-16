import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDrawerComponent } from './test-drawer.component';

describe('TestDrawerComponent', () => {
  let component: TestDrawerComponent;
  let fixture: ComponentFixture<TestDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open agent details drawer', () => {
    component.openAgentDetailsDrawer();
    expect(component.isAgentDetailsDrawerOpen).toBe(true);
  });

  it('should close agent details drawer', () => {
    component.isAgentDetailsDrawerOpen = true;
    component.closeAgentDetailsDrawer();
    expect(component.isAgentDetailsDrawerOpen).toBe(false);
  });

  it('should handle tag click', () => {
    spyOn(console, 'log');
    component.onTagClick('test-tag');
    expect(console.log).toHaveBeenCalledWith('Tag clicked:', 'test-tag');
  });

  it('should handle add to list click', () => {
    spyOn(console, 'log');
    component.onAddToList();
    expect(console.log).toHaveBeenCalledWith('Add to list clicked');
  });

  it('should handle go to playground click', () => {
    spyOn(console, 'log');
    component.onGoToPlayground();
    expect(console.log).toHaveBeenCalledWith('Go to Playground clicked');
  });

  it('should have correct agent data structure', () => {
    expect(component.agentData.title).toBe('Create Angular Component');
    expect(component.agentData.tags.length).toBe(5);
    expect(component.agentData.stats.rating).toBe('4.5');
  });
});
