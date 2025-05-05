import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IconService {
  private cache = new Map<string, Observable<SafeHtml>>();

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  getSvg(name: string): Observable<SafeHtml> {
    if (!this.cache.has(name)) {
      const svg$ = this.http.get(`/icons/${name}.svg`, { responseType: 'text' }).pipe(
        map((svg) => this.sanitizer.bypassSecurityTrustHtml(svg)),
        shareReplay(1),
      );
      this.cache.set(name, svg$);
    }
    return this.cache.get(name)!;
  }
}
