import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IconService {
  private cache = new Map<string, Observable<string>>();

  constructor(private http: HttpClient) {}

  getSvg(name: string): Observable<string> {
    if (!this.cache.has(name)) {
      const svg$ = this.http.get(`/icons/${name}.svg`, { responseType: 'text' }).pipe(
        shareReplay(1),
        catchError((error) => {
          console.error(`IconService: Error fetching icon ${name}`, error);
          return of('');
        }),
      );
      this.cache.set(name, svg$);
    }
    return this.cache.get(name)!;
  }
}
