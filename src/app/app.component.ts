import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursorComponent } from "./shared/components/features/custom-cursor/custom-cursor.component";

@Component({
  selector: 'vd-root',
  imports: [RouterOutlet, CustomCursorComponent],
  template: '<vd-custom-cursor /> <router-outlet />',
})
export class VDComponent {}
