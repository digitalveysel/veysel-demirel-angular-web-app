import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ISpeciality } from '../../../core/models/speciality.model';

@Component({
  selector: 'vd-speciality-card',
  imports: [IconComponent],
  template: ` <div
    [id]="vdSpeciality.id"
    class="flex flex-col gap-y-3 border border-neutral-600 bg-neutral-800 p-8"
  >
    <vd-icon [vdName]="vdSpeciality.icon" vdClass="text-orange-500" vdSize="48" />
    <div class="space-y-2">
      <h3 class="font-semibold">{{ vdSpeciality.title }}</h3>
      <p class="text-14px">{{ vdSpeciality.description }}</p>
    </div>
  </div>`,
})
export class SpecialityCardComponent {
  @Input({ required: true }) vdSpeciality!: ISpeciality;
}
