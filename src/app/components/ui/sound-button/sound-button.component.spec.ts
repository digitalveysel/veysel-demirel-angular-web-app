import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundButtonComponent } from './sound-button.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SoundButtonComponent', () => {
  let component: SoundButtonComponent;
  let fixture: ComponentFixture<SoundButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoundButtonComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SoundButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
