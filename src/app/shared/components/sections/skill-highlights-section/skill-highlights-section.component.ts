import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon.component';

@Component({
  selector: 'vd-skill-highlights-section',
  imports: [IconComponent],
  template: `<section
    id="skillHighlights"
    aria-label="Skill Highlights Content"
    class="space-y-4 py-16"
  >
    <h2 class="font-montserrat-alternates text-6 font-semibold xl:pl-4">Skill highlights</h2>
    <div class="border border-neutral-600 bg-neutral-800 p-4">
      <ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
        @for (item of skillHighlights; track item) {
          <li class="flex gap-x-3">
            <vd-icon name="check" size="24" className="text-orange-500" />
            <span>{{ item }}</span>
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
