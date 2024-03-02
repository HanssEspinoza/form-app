import { Routes } from '@angular/router';
import {
  BasicPageComponent,
  DynamicPageComponent,
  SwitchesPageComponent,
} from './pages';

export const ReactiveRoutes: Routes = [
  {
    path: '',
    component: BasicPageComponent,
  },
  {
    path: 'dynamic',
    component: DynamicPageComponent,
  },
  {
    path: 'switches',
    component: SwitchesPageComponent,
  },
];
