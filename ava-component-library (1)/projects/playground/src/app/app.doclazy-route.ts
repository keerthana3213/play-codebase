import { Routes } from '@angular/router';
export const docRoutes: Routes = [
  {
    path: 'tooltip',
    loadChildren: () =>
      import('./components/app-tooltip/tooltip.module').then(
        (m) => m.TooltipModule
      ),
  },
  {
    path: 'select',
    loadChildren: () =>
      import('./components/app-select/select.module').then(
        (m) => m.SelectModule
      ),
  },
   {
    path: 'avatars',
    loadChildren: () =>
      import('./components/app-avatars/avatar.module').then(
        (m) => m.AvatarModule
      ),
  },
  {
    path: 'timepicker',
    loadChildren: () =>
      import('./components/app-timepicker/timepicker.module').then(
        (m) => m.TimepickerModule
      ),
  },
  {
    path: 'slider',
    loadChildren: () =>
      import('./components/app-slider/slider.module').then(
        (m) => m.SliderModule
      ),
  },
  {
    path: 'fileupload',
    loadChildren: () =>
      import('./components/app-fileupload/fileupload.module').then(
        (m) => m.FileUploadModule
      ),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./components/app-datepicker/demo/calendar.module').then(
        (m) => m.CalendarModule
      ),
  },
  {
    path: 'toggle',
    loadChildren: () =>
      import('./components/app-toggle/toggle.module').then(
        (m) => m.ToggleModule
      ),
  },
  {
    path: 'search-bar',
    loadChildren: () =>
      import('./components/app-search-bar/search-bar.module').then(
        (m) => m.SearchBarModule
      ),
  },
  {
    path: 'radio-button',
    loadChildren: () =>
      import('./components/app-radio-button/radio-button.module').then(
        (m) => m.RadiobuttonModule
      ),
  },
  {
    path: 'rating',
    loadChildren: () =>
      import('./components/app-rating/rating.module').then(
        (m) => m.RatingModule
      ),
  },
  {
    path: 'promptbar',
    loadChildren: () =>
      import('./components/app-promptbar/promptbar.module').then(
        (m) => m.PromptbarModule
      ),
  },
  {
    path: 'textbox',
    loadChildren: () =>
      import('./components/app-textbox/textbox.module').then(
        (m) => m.TextboxModule
      ),
  },
  {
    path: 'textarea',
    loadChildren: () =>
      import('./components/app-textarea/textarea.module').then(
        (m) => m.TextareaModule
      ),
  },
  {
    path: 'table',
    loadChildren: () =>
      import('./components/app-table/table.module').then((m) => m.TableModule),
  },
  {
    path: 'header',
    loadChildren: () =>
      import('./components/app-header/header.module').then(
        (m) => m.HeaderModule
      ),
  },
  {
    path: 'search-bar',
    loadChildren: () =>
      import('./components/app-search-bar/search-bar.module').then(
        (m) => m.SearchBarModule
      ),
  },
  {
    path: 'trees',
    loadChildren: () =>
      import('./components/app-trees/trees.module').then((m) => m.TreesModule),
  },
  {
    path: 'filter',
    loadChildren: () =>
      import('./components/app-filter/filter.module').then(
        (m) => m.FilterModule
      ),
  },
  {
    path: 'autocomplete',
    loadChildren: () =>
      import('./components/app-autocomplete/autocomplete.module').then(
        (m) => m.AutocompleteModule
      ),
  },
];
