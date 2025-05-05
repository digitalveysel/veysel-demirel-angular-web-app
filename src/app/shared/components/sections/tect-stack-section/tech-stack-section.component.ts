import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'vd-tech-stack-section',
  imports: [IconComponent, NgClass],
  template: `<section id="techStack" aria-label="Tech Stack Content" class="space-y-4 py-16">
    <h2 class="font-montserrat-alternates text-6 font-semibold xl:pl-4">Tech stack</h2>
    <ul
      class="grid grid-cols-2 divide-x divide-y border border-neutral-600 bg-neutral-800 md:grid-cols-4"
    >
      @for (name of techIcons; track name; let idx = $index) {
        <li
          class="group flex aspect-square items-center justify-center border-neutral-600"
          [ngClass]="{ 'border-b-0': idx === 6, 'md:border-b-0': idx === 4 || idx === 5 }"
        >
          <vd-icon
            name="{{ name }}"
            className="text-neutral-100 opacity-50 group-hover:opacity-100"
          />
        </li>
      }
    </ul>
  </section>`,
})
export class TechStackSectionComponent {
  techIcons: string[] = [
    'tailwind',
    'typescript',
    'angular',
    'react',
    'next-js',
    'node-js',
    'mongo-db',
    'figma',
  ];
}
