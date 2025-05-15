import { Component, OnInit, signal } from '@angular/core';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';
import { CategoriesComponent } from '../../ui/categories/categories.component';
import { ArticleCardComponent } from '../../ui/article-card/article-card.component';
import { ICategories, ICategory } from '../../../core/models/category.model';
import { IArticle } from '../../../core/models/article.model';
import { AnimationDirective } from '../../../directives/animation/animation.directive';
import { IAnimationTypes } from '../../../core/models/animation.model';
import { Observable } from 'rxjs';
import { ArticleService } from '../../../core/services/article/article.service';
import { AsyncPipe } from '@angular/common';
import { FilterArticlesByCategoryPipe } from '../../../pipes/filter-articles-by-category/filter-articles-by-category.pipe';

@Component({
  selector: 'vd-articles-section',
  imports: [
    ScrollSpyDirective,
    CategoriesComponent,
    ArticleCardComponent,
    AnimationDirective,
    FilterArticlesByCategoryPipe,
    AsyncPipe,
  ],
  template: `
    <section
      id="articles"
      aria-label="Articles Content"
      class="flex flex-col gap-y-6 pb-12 lg:gap-y-9 lg:pb-16"
      vdScrollSpy
    >
      <vd-categories [vdCategories]="categories" (vdChange)="onCategoryChange($event)" />
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-9">
        @let articles = articles$ | vdFilterArticlesByCategory: $sCategory() | async;
        @if (articles) {
          @for (article of articles; track article.id; let index = $index) {
            <vd-article-card
              vdClass="h-full"
              [vdArticle]="article"
              [vdAnimation]="{
                type: animationTypes.PURE,
                selector: '#' + article.slug,
                keyframes: { opacity: [0, 1], y: [20, 0] },
                options: { duration: 0.5, delay: index * 0.1 },
              }"
            />
          }
        }
      </div>
    </section>
  `,
})
export class ArticlesSectionComponent implements OnInit {
  categories: ICategory[] = [
    { id: ICategories.ALL, slug: ICategories.ALL, name: 'All', isActive: true },
    { id: 'tailwindCSS', slug: 'tailwindcss', name: 'Tailwind CSS' },
    { id: 'javascript', slug: 'javascript', name: 'JavaScript' },
    { id: 'typescript', slug: 'typescript', name: 'TypeScript' },
    { id: 'angular', slug: 'angular', name: 'Angular' },
    { id: 'react', slug: 'react', name: 'React' },
    { id: 'nextjs', slug: 'nextjs', name: 'Next.js' },
  ];

  animationTypes = IAnimationTypes;
  articles$!: Observable<IArticle[]>;
  $sCategory = signal<string>(ICategories.ALL);

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getArticlesSummary();
  }

  onCategoryChange($event: string): void {
    this.$sCategory.set($event);
  }

  private getArticlesSummary(): void {
    this.articles$ = this.articleService.getAllSummary();
  }
}
