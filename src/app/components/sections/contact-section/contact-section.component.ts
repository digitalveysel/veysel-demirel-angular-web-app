import { Component } from '@angular/core';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';

@Component({
  selector: 'vd-contact-section',
  imports: [ScrollSpyDirective],
  template: `<section id="contact" aria-label="Contact Content" class="py-12 lg:py-16" vdScrollSpy>
    <h2 class="font-montserrat-alternates text-24px font-semibold xl:pl-4">Contact</h2>
  </section>`,
})
export class ContactSectionComponent {}
