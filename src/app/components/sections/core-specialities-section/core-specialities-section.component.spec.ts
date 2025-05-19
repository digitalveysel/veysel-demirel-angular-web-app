import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreSpecialitiesSectionComponent } from './core-specialities-section.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('CoreSpecialitiesSectionComponent', () => {
  let component: CoreSpecialitiesSectionComponent;
  let fixture: ComponentFixture<CoreSpecialitiesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreSpecialitiesSectionComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CoreSpecialitiesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
