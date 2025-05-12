import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IListItem } from '../../../core/models/list.model';

@Component({
  selector: 'vd-list',
  imports: [IconComponent],
  template: `<ul [class]="listClass">
    @for (item of list; track item.id) {
      <li [class]="listItemClass">
        <vd-icon [name]="listIcon" size="24" [vdClass]="listIconClass" />
        <p class="font-medium">{{ item.text }}</p>
      </li>
    }
  </ul>`,
})
export class ListComponent {
  @Input({ required: true }) list: IListItem[] = [];
  @Input() listIcon = 'check';
  @Input() listIconClass = 'text-orange-500';
  @Input() listClass = 'grid grid-cols-1 gap-4 md:grid-cols-3';
  @Input() listItemClass = 'flex gap-x-3';
}
