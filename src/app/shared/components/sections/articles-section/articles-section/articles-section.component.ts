import { Component } from '@angular/core';

interface ICategory {
  id: string;
  name: string;
  isActive?: boolean;
}

interface IArticle {
  id: string;
  category: string;
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'vd-articles-section',
  imports: [],
  template: `<section
    id="articles"
    aria-label="Articles Content"
    class="space-y-6 pb-8 lg:space-y-12 lg:pb-16"
  >
    <nav
      id="categories"
      aria-label="Article Categories"
      class="relative border border-neutral-600 bg-neutral-800"
    >
      <span
        class="pointer-events-none absolute top-0 left-0 h-full w-5 bg-linear-to-r from-neutral-800 to-transparent select-none"
      ></span>
      <ul
        role="tablist"
        aria-orientation="horizontal"
        class="flex w-full snap-x scroll-pl-4 gap-4 overflow-x-auto py-4 md:gap-6"
      >
        @for (category of categories; track category.id) {
          <li
            [id]="category.id"
            role="presentation"
            class="shrink-0 snap-start first:pl-4 last:pr-4"
          >
            <button
              role="tab"
              aria-selected="true"
              class="font-semibold {{ category?.isActive && 'text-orange-500' }}"
            >
              {{ category.name }}
            </button>
          </li>
        }
      </ul>
      <span
        class="pointer-events-none absolute top-0 right-0 h-full w-10 bg-linear-to-r from-transparent to-neutral-800 select-none"
      ></span>
    </nav>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
      @for (article of articles; track article.id) {
        <article
          id="{{ article.id }}"
          class="flex flex-col gap-4 border border-neutral-600 bg-neutral-800 p-6"
        >
          <span
            class="text-2 w-fit border border-orange-100 bg-orange-800 px-2 py-1 font-bold text-orange-100"
            >{{ article.category }}</span
          >
          <div class="space-y-2">
            <h2 class="font-medium">{{ article.title }}</h2>
            <p class="text-3">{{ article.description }}</p>
            <a href="{{ article.link }}" class="text-3 font-bold">Read more</a>
          </div>
        </article>
      }
    </div>
  </section>`,
})
export class ArticlesSectionComponent {
  categories: ICategory[] = [
    { id: 'all', name: 'All', isActive: true },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
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
