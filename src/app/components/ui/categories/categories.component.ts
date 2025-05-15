import { Component, Input, output, signal } from '@angular/core';
import { ICategory } from '../../../core/models/category.model';

@Component({
  selector: 'vd-categories',
  template: ` <nav
    id="categories"
    aria-label="Article Categories"
    class="relative border border-neutral-600 bg-neutral-800"
  >
    <ul
      role="tablist"
      aria-orientation="horizontal"
      class="scroll-hide flex w-full touch-pan-x snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto mask-x-from-94% mask-x-to-100% py-4 md:scroll-pl-8 md:gap-6 md:py-8"
    >
      @for (category of $categories(); track category.id) {
        <li
          [id]="category.id"
          role="presentation"
          class="shrink-0 snap-start first:pl-4 last:pr-4 md:first:pl-8 md:last:pr-8"
        >
          <button
            role="tab"
            aria-selected="true"
            class="font-semibold  {{ category?.isActive && 'text-orange-500' }}"
            (click)="onClick(category.slug)"
          >
            {{ category.name }}
          </button>
        </li>
      }
    </ul>
  </nav>`,
})
export class CategoriesComponent {
  @Input({ required: true }) set vdCategories(value: ICategory[]) {
    this.$categories.set([...value]);
  }

  vdChange = output<string>();
  $categories = signal<ICategory[]>([]);

  onClick(slug: string): void {
    this.$categories.update((categories) => {
      return categories.map((category) => ({ ...category, isActive: slug === category.slug }));
    });
    this.vdChange.emit(slug);
  }
}
