import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderColsComponent } from './loader-cols.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('LoaderColsComponent', () => {
  let component: LoaderColsComponent;
  let fixture: ComponentFixture<LoaderColsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderColsComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
