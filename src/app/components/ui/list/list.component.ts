import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IListItem } from '../../../core/models/list.model';

@Component({
  selector: 'vd-list',
  imports: [IconComponent],
  template: `<ul [class]="vdListClass">
    @for (item of vdList; track item.id) {
      <li [class]="vdListItemClass">
        <vd-icon [vdName]="vdListIcon" vdSize="24" [vdClass]="vdListIconClass" />
        <p class="font-medium">{{ item.text }}</p>
      </li>
    }
  </ul>`,
})
export class ListComponent {
  @Input({ required: true }) vdList: IListItem[] = [];
  @Input() vdListClass = 'grid grid-cols-1 gap-4 md:grid-cols-3';
  @Input() vdListIcon = 'check';
  @Input() vdListIconClass = 'text-orange-500';
  @Input() vdListItemClass = 'flex gap-x-3';
}
