import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IListItem } from '../../../../core/models/list.model';

@Component({
  selector: 'vd-list',
  imports: [IconComponent],
  template: `<ul [class]="listClass">
    @for (item of list; track item.id) {
      <li [class]="listItemClass">
        <vd-icon [name]="listIcon" size="24" [className]="listIconClass" />
        <p>{{ item.text }}</p>
      </li>
    }
  </ul>`,
})
export class ListComponent {
  @Input() list: IListItem[] = [
    { id: 'stateManagement', text: 'State management' },
    { id: 'prototyping', text: 'Prototyping' },
    { id: 'serverSideRendering', text: 'Server-side rendering' },
    { id: 'componentArchitecture', text: 'Component-based architecture' },
    { id: 'responsiveDesign', text: 'Responsive layouts & mobile-first design' },
    { id: 'accessibility', text: 'Accessibility best practices' },
    { id: 'componentLibraries', text: 'Establishing reusable component libraries' },
    { id: 'performance', text: 'Performance optimisation' },
    { id: 'styleGuides', text: 'Defining cohesive style guides and brand rules' },
  ];
  @Input() listIcon = 'check';
  @Input() listIconClass = 'text-orange-500';
  @Input() listClass = 'grid grid-cols-1 gap-4 md:grid-cols-3';
  @Input() listItemClass = 'flex gap-x-3';
}
