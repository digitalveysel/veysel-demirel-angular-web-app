import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Veysel Demirel',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      {
        path: '**',
        component: NotFoundPageComponent,
      },
    ],
  },
];
