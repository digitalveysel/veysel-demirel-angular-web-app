import { Component, computed, signal } from '@angular/core';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';
import { CategoriesComponent } from '../../ui/categories/categories.component';
import { ArticleCardComponent } from '../../ui/article-card/article-card.component';
import { ICategories, ICategory } from '../../../core/models/category.model';
import { IArticle } from '../../../core/models/article.model';
import { AnimationDirective } from '../../../directives/animation/animation.directive';

@Component({
  selector: 'vd-articles-section',
  imports: [ScrollSpyDirective, CategoriesComponent, ArticleCardComponent, AnimationDirective],
  template: `<section
    id="articles"
    aria-label="Articles Content"
    class="flex flex-col gap-y-6 pb-12 lg:gap-y-9 lg:pb-16"
    vdScrollSpy
  >
    <vd-categories [vdCategories]="categories" (vdChange)="onCategoryChange($event)" />
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-9">
      @for (article of fArticles(); track article.id) {
        <vd-article-card
          [vdArticle]="article"
          [vdAnimation]="{
            keyframes: { scale: [0, 1] },
            options: { duration: 0.5 },
          }"
        />
      }
    </div>
  </section>`,
})
export class ArticlesSectionComponent {
  categories: ICategory[] = [
    { id: ICategories.ALL, name: 'All', isActive: true },
    { id: 'tailwindCSS', name: 'Tailwind CSS' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'angular', name: 'Angular' },
    { id: 'react', name: 'React' },
    { id: 'nextjs', name: 'Next.js' },
  ];
  articles = signal<IArticle[]>([
    {
      id: 'tailwindJITForInstantStyling',
      category: { id: 'tailwindCSS', name: 'Tailwind CSS' },
      title: 'Tailwind JIT for Instant Styling',
      description: 'Use Tailwind’s JIT compiler for instant, custom utility classes.',
      link: '#',
    },
    {
      id: 'whatsNewInTypeScript5.1',
      category: { id: 'typescript', name: 'TypeScript' },
      title: 'What’s New in TypeScript 5.1',
      description:
        'Check out TypeScript 5.1’s tuple updates, export checks, and better type inference.',
      link: '#',
    },
    {
      id: 'zonelessSSRInAngular19',
      category: { id: 'angular', name: 'Angular' },
      title: 'Zoneless SSR in Angular 19',
      description: 'Angular 19’s zone-free SSR boosts performance and simplifies server setup.',
      link: '#',
    },
    {
      id: 'reactServerComponentsToday',
      category: { id: 'react', name: 'React' },
      title: 'React Server Components Today',
      description:
        'React Server Components enable efficient data fetching and lightweight rendering.',
      link: '#',
    },
  ]);

  sCategory = signal<string>(ICategories.ALL);
  fArticles = computed(() =>
    this.sCategory() === ICategories.ALL
      ? this.articles()
      : this.articles().filter((a) => a.category.id === this.sCategory()),
  );

  onCategoryChange($event: string): void {
    this.sCategory.set($event);
  }
}
