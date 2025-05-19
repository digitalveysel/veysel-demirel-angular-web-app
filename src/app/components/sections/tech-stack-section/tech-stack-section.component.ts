import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon.component';
import { CursorLabelDirective } from '../../../directives/cursor-label/cursor-label.directive';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';

interface ITechIcon {
  id: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'vd-tech-stack-section',
  imports: [IconComponent, CursorLabelDirective, ScrollSpyDirective],
  template: `<section
    id="techStack"
    aria-label="Tech Stack Content"
    class="space-y-4 py-12 lg:py-16"
    vdScrollSpy
  >
    <h2 class="font-montserrat-alternates text-24px inline-block font-semibold xl:pl-4">
      Tech stack
    </h2>
    <ul class="grid grid-cols-2 border border-neutral-600 bg-neutral-600 md:grid-cols-4 md:gap-px">
      @for (techIcon of techIcons; track techIcon.id; let index = $index) {
        <li
          [id]="techIcon.id"
          [vdCursorLabel]="techIcon.name"
          class="group flex aspect-square items-center justify-center border-neutral-600 bg-neutral-800 select-none odd:border-r nth-[-n+6]:border-b md:border-transparent md:odd:border-r-0 md:nth-[-n+6]:border-b-0"
        >
          <vd-icon
            vdName="{{ techIcon.icon }}"
            vdClass="text-neutral-100 opacity-50 group-hover:opacity-100 pointer-events-none group-active:opacity-100"
          />
        </li>
      }
    </ul>
  </section>`,
})
export class TechStackSectionComponent {
  techIcons: ITechIcon[] = [
    { id: 'tailwind', icon: 'tailwind', name: 'Tailwind CSS' },
    { id: 'typescript', icon: 'typescript', name: 'TypeScript' },
    { id: 'angular', icon: 'angular', name: 'Angular' },
    { id: 'react', icon: 'react', name: 'React' },
    { id: 'nextJs', icon: 'next-js', name: 'Next.js' },
    { id: 'nodeJs', icon: 'node-js', name: 'Node.js' },
    { id: 'mongoDb', icon: 'mongo-db', name: 'MongoDB' },
    { id: 'figma', icon: 'figma', name: 'Figma' },
  ];
}
