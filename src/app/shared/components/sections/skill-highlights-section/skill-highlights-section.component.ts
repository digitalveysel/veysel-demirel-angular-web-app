import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon.component';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';

@Component({
  selector: 'vd-skill-highlights-section',
  imports: [IconComponent, ScrollSpyDirective],
  template: `<section
    id="skillHighlights"
    aria-label="Skill Highlights Content"
    class="space-y-4 py-12 lg:py-16"
    vdScrollSpy
  >
    <h2 class="font-montserrat-alternates text-6 font-semibold xl:pl-4">Skill highlights</h2>
    <div class="border border-neutral-600 bg-neutral-800 p-4">
      <ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
        @for (item of skillHighlights; track item) {
          <li class="flex gap-x-3">
            <vd-icon name="check" size="24" className="text-orange-500" />
            <p>{{ item }}</p>
          </li>
        }
      </ul>
    </div>
  </section>`,
})
export class SkillHighlightsSectionComponent {
  skillHighlights: string[] = [
    'State management',
    'Prototyping',
    'Server-side rendering',
    'Component-based architecture',
    'Responsive layouts & mobile-first design',
    'Accessibility best practices',
    'Establishing reusable component libraries',
    'Performance optimisation',
    'Defining cohesive style guides and brand rules',
  ];
}
