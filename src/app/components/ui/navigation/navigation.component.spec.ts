import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMenuComponent } from './navigation.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('MobileMenuComponent', () => {
  let component: MobileMenuComponent;
  let fixture: ComponentFixture<MobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMenuComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
