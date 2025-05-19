import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { VDComponent } from './app/app.component';

bootstrapApplication(VDComponent, appConfig)
  .catch((err) => console.error(err));
