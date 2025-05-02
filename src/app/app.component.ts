import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursorComponent } from './shared/components/features/custom-cursor/custom-cursor.component';
import { TextureComponent } from './shared/components/features/texture/texture.component';
import { LoaderColsComponent } from './shared/components/features/loader-cols/loader-cols.component';

@Component({
  selector: 'vd-root',
  imports: [RouterOutlet, CustomCursorComponent, TextureComponent, LoaderColsComponent],
  template: '<vd-texture /> <vd-custom-cursor /> <vd-loader-cols /> <router-outlet />',
})
export class VDComponent {}
