import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, Search, SendHorizontal } from 'lucide-angular';
// import { AavaSearchBarComponent } from '@aava/play-core';

import { AavaSearchBarComponent } from './aava-search-bar.component';

describe('SearchBarComponent', () => {
  let component: AavaSearchBarComponent;
  let fixture: ComponentFixture<AavaSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AavaSearchBarComponent,
        LucideAngularModule.pick({ Search, SendHorizontal }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
