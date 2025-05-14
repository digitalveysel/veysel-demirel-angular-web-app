import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { IArticleSummary } from '../../../core/models/article.model';

@Component({
  selector: 'vd-article-card',
  imports: [BadgeComponent],
  template: `<article
    id="{{ vdArticle.id }}"
    class="flex flex-col gap-4 border border-neutral-600 bg-neutral-800 p-6 {{ vdClass }}"
  >
    <vd-badge [vdText]="vdArticle.category.name" />
    <div class="space-y-2">
      <h3 class="font-semibold">{{ vdArticle.title }}</h3>
      <p class="text-14px">{{ vdArticle.description }}</p>
      <a href="{{ vdArticle.href }}" class="text-14px font-bold"> Read more </a>
    </div>
  </article>`,
})
export class ArticleCardComponent {
  @Input({ required: true }) vdArticle!: IArticleSummary;
  @Input() vdClass = '';
}
