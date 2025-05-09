import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardComponent } from './article-card.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCardComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
