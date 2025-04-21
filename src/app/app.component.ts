import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'vd-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class VDComponent {}
