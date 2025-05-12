import { Component } from '@angular/core';
import { ScrollSpyDirective } from '../../../directives/scroll-spy/scroll-spy.directive';
import { SpecialityCardComponent } from '../../ui/speciality-card/speciality-card.component';
import { ISpeciality } from '../../../core/models/speciality.model';

@Component({
  selector: 'vd-core-specialities-section',
  imports: [ScrollSpyDirective, SpecialityCardComponent],
  template: `<section
    id="coreSpecialities"
    aria-label="Core Specialities Content"
    class="space-y-4 py-12 lg:pb-16"
    vdScrollSpy
  >
    <h2 class="font-montserrat-alternates text-24px font-semibold xl:pl-4">Core specialities</h2>
    <div class="grid grid-cols-1 gap-9 md:grid-cols-2">
      @for (speciality of specialities; track speciality.id) {
        <vd-speciality-card [vdSpeciality]="speciality" />
      }
    </div>
  </section>`,
})
export class CoreSpecialitiesSectionComponent {
  specialities: ISpeciality[] = [
    {
      id: 'modularUI',
      icon: 'widgets',
      title: 'Modular UI',
      description: 'Break your interface into self-contained modules for effortless scaling.',
    },
    {
      id: 'universalAccess',
      icon: 'accessibility',
      title: 'Universal Access',
      description: 'Build interfaces that welcome every ability, device and context.',
    },
    {
      id: 'seamlessJourneys',
      icon: 'flight-takeoff',
      title: 'Seamless Journeys',
      description: 'Map and optimise user flows for effortless discovery and action.',
    },
    {
      id: 'velocityEngineering',
      icon: 'rocket-launch',
      title: 'Velocity Engineering',
      description: 'Optimise performance and load times for lightning-fast experiences.',
    },
  ];
}
