import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { MainLayoutComponent } from './layout/main/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomePageComponent }],
  },
];
