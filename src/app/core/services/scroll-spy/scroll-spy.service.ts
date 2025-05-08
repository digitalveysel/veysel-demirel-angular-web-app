import { afterNextRender, ApplicationRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { first } from 'rxjs';
import { AppStore } from '../../store/app.store';
import { Location } from '@angular/common';

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
    @Inject(PLATFORM_ID) private platformId: object,
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
      { threshold: 1 },
    );

    this.sections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  private setActiveSection(id: string): void {
    const baseURL = this.location.path(true).split('#')[0];

    this.store.setActiveSection(id);
    this.location.go(`${baseURL}#${id}`);
  }

  register(id: string, element: HTMLElement): void {
    this.sections.set(id, element);
  }
}
