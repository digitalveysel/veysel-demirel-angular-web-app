import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Veysel Demirel',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      {
        path: '**',
        component: HomePageComponent,
      },
    ],
  },
];
