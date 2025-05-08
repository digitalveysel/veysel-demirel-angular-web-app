import { afterNextRender, Directive, ElementRef } from '@angular/core';
import { ScrollSpyService } from '../../../core/services/scroll-spy/scroll-spy.service';

@Directive({
  selector: '[vdScrollSpy]',
})
export class ScrollSpyDirective {
  constructor(
    private el: ElementRef<HTMLElement>,
    private scrollSpyService: ScrollSpyService,
  ) {
    afterNextRender(() => {
      const el = this.el.nativeElement;
      this.scrollSpyService.register(el.id, el);
    });
  }
}
