import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { IArticle } from '../../../core/models/article.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'vd-article-card',
  imports: [BadgeComponent, RouterLink],
  template: `<article
    id="{{ vdArticle.slug }}"
    class="flex flex-col gap-y-4 justify-between border border-neutral-600 bg-neutral-800 p-6 {{
      vdClass
    }}"
  >
    <div class="flex flex-col gap-y-4">
      <vd-badge [vdText]="vdArticle.category.name" />
      <div class="space-y-2">
        <h3 class="line-clamp-2 font-semibold">{{ vdArticle.title }}</h3>
        <p class="text-14px line-clamp-3">{{ vdArticle.description }}</p>
      </div>
    </div>
    <a [routerLink]="vdArticle.slug" class="text-14px font-bold"> Read more </a>
  </article>`,
})
export class ArticleCardComponent {
  @Input({ required: true }) vdArticle!: IArticle;
  @Input() vdClass = '';
}
