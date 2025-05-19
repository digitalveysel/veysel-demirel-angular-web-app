import { Component } from '@angular/core';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';
import { ListComponent } from '../../ui/list/list.component';
import { IListItem } from '../../../core/models/list.model';

@Component({
  selector: 'vd-skill-highlights-section',
  imports: [ScrollSpyDirective, ListComponent],
  template: `<section
    id="skillHighlights"
    aria-label="Skill Highlights Content"
    class="space-y-4 py-12 lg:py-16"
    vdScrollSpy
  >
    <h2 class="font-montserrat-alternates text-24px inline-block font-semibold xl:pl-4">
      Skill highlights
    </h2>
    <div class="border border-neutral-600 bg-neutral-800 p-4 lg:p-8">
      <vd-list [vdList]="skillHighlights" />
    </div>
  </section>`,
})
export class SkillHighlightsSectionComponent {
  skillHighlights: IListItem[] = [
    { id: 'stateManagement', text: 'State management' },
    { id: 'prototyping', text: 'Prototyping' },
    { id: 'serverSideRendering', text: 'Server-side rendering' },
    { id: 'componentArchitecture', text: 'Component-based architecture' },
    { id: 'responsiveDesign', text: 'Responsive layouts & mobile-first design' },
    { id: 'accessibility', text: 'Accessibility best practices' },
    { id: 'componentLibraries', text: 'Establishing reusable component libraries' },
    { id: 'performance', text: 'Performance optimisation' },
    { id: 'styleGuides', text: 'Defining cohesive style guides and brand rules' },
  ];
}
