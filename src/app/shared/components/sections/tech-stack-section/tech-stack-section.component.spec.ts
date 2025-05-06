import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechStackSectionComponent } from './tech-stack-section.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('TechStackSectionComponent', () => {
  let component: TechStackSectionComponent;
  let fixture: ComponentFixture<TechStackSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechStackSectionComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TechStackSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
