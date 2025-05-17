import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSectionComponent } from './contact-section.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('ContactSectionComponent', () => {
  let component: ContactSectionComponent;
  let fixture: ComponentFixture<ContactSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
