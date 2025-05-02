import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'vd-main-layout',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class MainLayoutComponent {}
