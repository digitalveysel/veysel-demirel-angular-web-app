import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { VDComponent } from './app.component';

describe('VDComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VDComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(VDComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
