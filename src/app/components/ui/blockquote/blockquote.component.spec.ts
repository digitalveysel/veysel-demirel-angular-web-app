import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockquoteComponent } from './blockquote.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('BlockquoteComponent', () => {
  let component: BlockquoteComponent;
  let fixture: ComponentFixture<BlockquoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockquoteComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
