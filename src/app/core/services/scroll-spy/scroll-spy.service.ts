import { afterNextRender, ApplicationRef, Injectable } from '@angular/core';
import { AppStore } from '../../store/app.store';
import { Location } from '@angular/common';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollSpyService {
  private sections = new Map<string, HTMLElement>();
  private observer!: IntersectionObserver;

  constructor(
    private store: AppStore,
    private location: Location,
    private appRef: ApplicationRef,
  ) {
    afterNextRender(() => {
      this.checkApp();
    });
  }

  private checkApp(): void {
    this.appRef.isStable.pipe(first((stable) => stable)).subscribe(() => {
      this.startObserving();
    });
  }

  private startObserving(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setActiveSection(entry?.target?.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    this.sections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  private setActiveSection(id: string): void {
    const baseURL = this.location.path(true).split('#')[0];

    this.location.go(`${baseURL}#${id}`);
    this.store.setActiveSection(id);
  }

  register(id: string, element: HTMLElement): void {
    this.sections.set(id, element);
  }
}
