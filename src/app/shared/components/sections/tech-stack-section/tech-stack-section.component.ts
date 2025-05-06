import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon.component';
import { NgClass } from '@angular/common';
import { CursorLabelDirective } from '../../../directives/cursor-label/cursor-label.directive';

interface ITechIcon {
  icon: string;
  name: string;
}

@Component({
  selector: 'vd-tech-stack-section',
  imports: [IconComponent, CursorLabelDirective, NgClass],
  template: `<section id="techStack" aria-label="Tech Stack Content" class="space-y-4 py-16">
    <h2 class="font-montserrat-alternates text-6 font-semibold xl:pl-4">Tech stack</h2>
    <ul
      class="grid grid-cols-2 divide-x divide-y border border-neutral-600 bg-neutral-800 md:grid-cols-4"
    >
      @for (techIcon of techIcons; track techIcon.icon; let idx = $index) {
        <li
          vdCursorLabel="{{ techIcon.name }}"
          class="group flex aspect-square items-center justify-center border-neutral-600"
          [ngClass]="{ 'border-b-0': idx === 6, 'md:border-b-0': idx === 4 || idx === 5 }"
        >
          <vd-icon
            name="{{ techIcon.icon }}"
            className="text-neutral-100 opacity-50 group-hover:opacity-100 pointer-events-none"
          />
        </li>
      }
    </ul>
  </section>`,
})
export class TechStackSectionComponent {
  techIcons: ITechIcon[] = [
    { icon: 'tailwind', name: 'Tailwind CSS' },
    { icon: 'typescript', name: 'TypeScript' },
    { icon: 'angular', name: 'Angular' },
    { icon: 'react', name: 'React' },
    { icon: 'next-js', name: 'Next.js' },
    { icon: 'node-js', name: 'Node.js' },
    { icon: 'mongo-db', name: 'MongoDB' },
    { icon: 'figma', name: 'Figma' },
  ];
}
