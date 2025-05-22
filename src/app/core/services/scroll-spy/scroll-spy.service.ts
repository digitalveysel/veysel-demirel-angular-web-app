import { afterNextRender, ApplicationRef, Inject, Injectable } from '@angular/core';
import { AppStore } from '../../store/app.store';
import { DOCUMENT, Location } from '@angular/common';
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
    @Inject(DOCUMENT) private document: Document,
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

  private calculateDynamicThreshold(): number {
    const vh = this.document.defaultView?.innerHeight;
    const sectionHeights = Array.from(this.sections.values()).map((el) => el.offsetHeight);
    const desiredVisibleRatio = 0.8;
    const thresholds = sectionHeights.map((height) => {
      const ratio = (vh! * desiredVisibleRatio) / height;
      return Math.min(1, Math.max(0.1, ratio));
    });

    return Math.min(...thresholds);
  }

  private startObserving(): void {
    const threshold = this.calculateDynamicThreshold();

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setActiveSection(entry?.target?.id);
          }
        });
      },
      { threshold },
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
