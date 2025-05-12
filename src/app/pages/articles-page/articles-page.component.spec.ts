import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesPageComponent } from './articles-page.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('ArticlesPageComponent', () => {
  let component: ArticlesPageComponent;
  let fixture: ComponentFixture<ArticlesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesPageComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
