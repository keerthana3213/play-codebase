import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaListItemsComponent } from './aava-list-items.component';

describe('ListItemsComponent', () => {
  let component: AavaListItemsComponent;
  let fixture: ComponentFixture<AavaListItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaListItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AavaListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
