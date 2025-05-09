import { Component, Input } from '@angular/core';
import { IArticle } from '../../../../core/models/article.model';

@Component({
  selector: 'vd-article-card',
  imports: [],
  template: `<article
    id="{{ article.id }}"
    class="flex flex-col gap-4 border border-neutral-600 bg-neutral-800 p-6"
  >
    <span
      class="text-2 w-fit border border-orange-100 bg-orange-800 px-2 py-1 font-bold text-orange-100"
    >
      {{ article.category }}
    </span>
    <div class="space-y-2">
      <h3 class="font-medium">{{ article.title }}</h3>
      <p class="text-3">{{ article.description }}</p>
      <a href="{{ article.link }}" class="text-3 font-bold"> Read more </a>
    </div>
  </article>`,
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: IArticle;
}
