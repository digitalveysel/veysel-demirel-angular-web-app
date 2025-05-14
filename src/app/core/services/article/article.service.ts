import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly URL = '/api/articles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this.URL);
  }

  getById(id: string): Observable<IArticle> {
    return this.http.get<IArticle>(`${this.URL}/${id}`);
  }
}
