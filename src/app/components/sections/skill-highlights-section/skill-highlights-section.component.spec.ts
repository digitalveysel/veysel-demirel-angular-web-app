import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillHighlightsSectionComponent } from './skill-highlights-section.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SkillHighlightsSectionComponent', () => {
  let component: SkillHighlightsSectionComponent;
  let fixture: ComponentFixture<SkillHighlightsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillHighlightsSectionComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillHighlightsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
