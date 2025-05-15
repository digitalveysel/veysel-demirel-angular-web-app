import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPlayerSectionComponent } from './music-player-section.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('MusicPlayerSectionComponent', () => {
  let component: MusicPlayerSectionComponent;
  let fixture: ComponentFixture<MusicPlayerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicPlayerSectionComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicPlayerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
