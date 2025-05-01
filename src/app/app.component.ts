import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursorComponent } from './shared/components/features/custom-cursor/custom-cursor.component';
import { TextureComponent } from './shared/components/features/texture/texture.component';

@Component({
  selector: 'vd-root',
  imports: [RouterOutlet, CustomCursorComponent, TextureComponent],
  template: '<vd-texture /> <vd-custom-cursor /> <router-outlet />',
})
export class VDComponent {}
