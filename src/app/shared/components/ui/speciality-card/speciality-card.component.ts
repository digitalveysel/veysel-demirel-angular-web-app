import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ISpeciality } from '../../../../core/models/speciality.model';

@Component({
  selector: 'vd-speciality-card',
  imports: [IconComponent],
  template: ` <div class="flex flex-col gap-y-3 border border-neutral-600 bg-neutral-800 p-8">
    <vd-icon name="{{ speciality.icon }}" className="text-orange-500" size="48" />
    <div class="space-y-2">
      <h3>{{ speciality.title }}</h3>
      <p class="text-3">{{ speciality.description }}</p>
    </div>
  </div>`,
})
export class SpecialityCardComponent {
  @Input() speciality: ISpeciality = {
    icon: 'widgets',
    title: 'Modular UI',
    description: 'Break your interface into self-contained modules for effortless scaling.',
  };
}
