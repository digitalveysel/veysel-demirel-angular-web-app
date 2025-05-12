import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { IArticle } from '../../../core/models/article.model';

@Component({
  selector: 'vd-article-card',
  imports: [BadgeComponent],
  template: `<article
    id="{{ article.id }}"
    class="flex flex-col gap-4 border border-neutral-600 bg-neutral-800 p-6"
  >
    <vd-badge [text]="article.category" />
    <div class="space-y-2">
      <h3 class="font-semibold">{{ article.title }}</h3>
      <p class="text-14px">{{ article.description }}</p>
      <a href="{{ article.link }}" class="text-14px font-bold"> Read more </a>
    </div>
  </article>`,
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: IArticle;
}
