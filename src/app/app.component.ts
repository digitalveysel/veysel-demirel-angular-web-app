import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursorComponent } from './components/features/custom-cursor/custom-cursor.component';
import { TextureComponent } from './components/features/texture/texture.component';
import { LoaderColsComponent } from './components/features/loader-cols/loader-cols.component';
import { RainComponent } from './components/features/rain/rain.component';

@Component({
  selector: 'vd-root',
  imports: [
    RouterOutlet,
    CustomCursorComponent,
    TextureComponent,
    LoaderColsComponent,
    RainComponent,
  ],
  template: '<vd-texture /> <vd-custom-cursor /> <vd-rain /> <vd-loader-cols /> <router-outlet />',
})
export class VDComponent {}
