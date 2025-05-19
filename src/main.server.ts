import { bootstrapApplication } from '@angular/platform-browser';
import { VDComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(VDComponent, config);

export default bootstrap;
