import { Routes } from '@angular/router';

export const docCompositeRoutes: Routes = [
  {
    path: 'carousel',
    loadChildren: () =>
      import(
        './components/composite-components/app-carousel/carousel.module'
      ).then((m) => m.CarouselModule),
  },
  {
    path: 'cubical-loading',
    loadChildren: () =>
      import(
        './components/composite-components/app-cubical-loading/cubical.module'
      ).then((m) => m.CubicalModule),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import(
        './components/composite-components/app-reset-password/reset-password.module'
      ).then((m) => m.ResetPasswordModule),
  },
];
