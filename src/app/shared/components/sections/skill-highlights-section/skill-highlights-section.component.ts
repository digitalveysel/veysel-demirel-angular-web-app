import { Component } from '@angular/core';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';
import { ListComponent } from '../../ui/list/list.component';

@Component({
  selector: 'vd-skill-highlights-section',
  imports: [ScrollSpyDirective, ListComponent],
  template: `<section
    id="skillHighlights"
    aria-label="Skill Highlights Content"
    class="space-y-4 py-12 lg:py-16"
    vdScrollSpy
  >
    <h2 class="font-montserrat-alternates text-6 font-semibold xl:pl-4">Skill highlights</h2>
    <div class="border border-neutral-600 bg-neutral-800 p-4">
      <vd-list />
    </div>
  </section>`,
})
export class SkillHighlightsSectionComponent {}
