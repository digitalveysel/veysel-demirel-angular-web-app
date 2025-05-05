import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon.component';

interface ISpeciality {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'vd-core-specialities-section',
  imports: [IconComponent],
  template: `<section
    id="coreSpecialities"
    aria-label="Core Specialities Content"
    class="space-y-4 py-16"
  >
    <h2 class="font-montserrat-alternates text-6 font-semibold xl:pl-4">Core specialities</h2>
    <div class="grid grid-cols-1 gap-9 md:grid-cols-2">
      @for (speciality of specialities; track speciality.icon) {
        <div class="flex flex-col gap-y-3 border border-neutral-600 bg-neutral-800 p-8">
          <vd-icon name="{{ speciality.icon }}" className="text-orange-500" size="48" />
          <div class="space-y-2">
            <h3>{{ speciality.title }}</h3>
            <p class="text-3">{{ speciality.description }}</p>
          </div>
        </div>
      }
    </div>
  </section>`,
})
export class CoreSpecialitiesSectionComponent {
  specialities: ISpeciality[] = [
    {
      icon: 'widgets',
      title: 'Modular UI',
      description: 'Break your interface into self-contained modules for effortless scaling.',
    },
    {
      icon: 'accessibility',
      title: 'Universal Access',
      description: 'Build interfaces that welcome every ability, device and context.',
    },
    {
      icon: 'flight-takeoff',
      title: 'Seamless Journeys',
      description: 'Map and optimise user flows for effortless discovery and action.',
    },
    {
      icon: 'rocket-launch',
      title: 'Velocity Engineering',
      description: 'Optimise performance and load times for lightning-fast experiences.',
    },
  ];
}
