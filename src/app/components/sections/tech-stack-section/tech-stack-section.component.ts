import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon.component';
import { NgClass } from '@angular/common';
import { CursorLabelDirective } from '../../../directives/cursor-label/cursor-label.directive';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';

interface ITechIcon {
  id: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'vd-tech-stack-section',
  imports: [IconComponent, CursorLabelDirective, NgClass, ScrollSpyDirective],
  template: `<section
    id="techStack"
    aria-label="Tech Stack Content"
    class="space-y-4 py-12 lg:py-16"
    vdScrollSpy
  >
    <h2 class="font-montserrat-alternates text-24px font-semibold xl:pl-4">Tech stack</h2>
    <ul
      class="grid grid-cols-2 divide-x divide-y border border-neutral-600 bg-neutral-800 md:grid-cols-4"
    >
      @for (techIcon of techIcons; track techIcon.id; let index = $index) {
        <li
          [id]="techIcon.id"
          [vdCursorLabel]="techIcon.name"
          [ngClass]="{ 'border-b-0': index === 6, 'md:border-b-0': index === 4 || index === 5 }"
          class="group flex aspect-square items-center justify-center border-neutral-600"
        >
          <vd-icon
            name="{{ techIcon.icon }}"
            vdClass="text-neutral-100 opacity-50 group-hover:opacity-100 pointer-events-none"
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
