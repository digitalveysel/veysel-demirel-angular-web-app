import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/article.model';
import { Routes } from '../../../../server/models/routes.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly URL = `${Routes.BASE}${Routes.ARTICLES}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this.URL);
  }

  getAllSummary(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(`${this.URL}${Routes.ARTICLES_SUMMARY}`);
  }

  getBySlug(slug: string): Observable<IArticle> {
    return this.http.get<IArticle>(`${this.URL}/${slug}`);
  }
}
