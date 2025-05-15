import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IArticle } from '../../core/models/article.model';
import { ICategories } from '../../core/models/category.model';

@Pipe({
  name: 'vdFilterArticlesByCategory',
})
export class FilterArticlesByCategoryPipe implements PipeTransform {
  transform(articles$: Observable<IArticle[]>, cSlug: string): Observable<IArticle[]> {
    if (cSlug === ICategories.ALL) return articles$;

    return articles$.pipe(
      map((articles) => articles.filter((article) => article.category.slug === cSlug)),
    );
  }
}
