import { Component } from '@angular/core';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';
import { CategoriesComponent } from '../../ui/categories/categories.component';
import { ICategory } from '../../../../core/models/category.model';
import { IArticle } from '../../../../core/models/article.model';
import { ArticleCardComponent } from '../../ui/article-card/article-card.component';

@Component({
  selector: 'vd-articles-section',
  imports: [ScrollSpyDirective, CategoriesComponent, ArticleCardComponent],
  template: `<section
    id="articles"
    aria-label="Articles Content"
    class="flex flex-col gap-y-6 pb-12 lg:gap-y-9 lg:pb-16"
    vdScrollSpy
  >
    <vd-categories [categories]="categories" />
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-9">
      @for (article of articles; track article.id) {
        <vd-article-card [article]="article" />
      }
    </div>
  </section>`,
})
export class ArticlesSectionComponent {
  categories: ICategory[] = [
    { id: 'all', name: 'All', isActive: true },
    { id: 'tailwindCSS', name: 'Tailwind CSS' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'angular', name: 'Angular' },
    { id: 'react', name: 'React' },
    { id: 'nextjs', name: 'Next.js' },
  ];
  articles: IArticle[] = [
    {
      id: 'tailwindJITForInstantStyling',
      category: 'Tailwind CSS',
      title: 'Tailwind JIT for Instant Styling',
      description:
        'See how Tailwind’s just-in-time compiler delivers bespoke utility classes on the fly for lightning-fast development.',
      link: '#',
    },
    {
      id: 'whatsNewInTypeScript5.1',
      category: 'TypeScript',
      title: 'What’s New in TypeScript 5.1',
      description:
        'Explore TypeScript 5.1’s variadic tuple improvements, package exports checks and refined inference for safer code.',
      link: '#',
    },
    {
      id: 'zonelessSSRInAngular19',
      category: 'Angular',
      title: 'Zoneless SSR in Angular 19',
      description:
        'Discover how Angular 19’s zone-free server-side rendering model boosts performance and simplifies your server setup.',
      link: '#',
    },
    {
      id: 'reactServerComponentsToday',
      category: 'React',
      title: 'React Server Components Today',
      description:
        'Learn how React Server Components efficiently handle data fetching and UI rendering without inflating bundle size.',
      link: '#',
    },
  ];
}
