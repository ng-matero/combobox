import { Routes } from '@angular/router';
import { RouteViewer } from './shared/route-viewer/route-viewer';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/data-sources',
    pathMatch: 'full',
  },
  {
    path: 'data-sources',
    component: RouteViewer,
    data: { title: 'Data sources', examples: 'data-source' },
  },
  {
    path: 'forms',
    component: RouteViewer,
    data: { title: 'Reactive forms', examples: 'forms' },
  },
  {
    path: 'bindings',
    component: RouteViewer,
    data: { title: 'Data bindings', examples: 'bindings' },
  },
  {
    path: 'search',
    component: RouteViewer,
    data: { title: 'Search and autocomplete', examples: 'search' },
  },
  {
    path: 'tags',
    component: RouteViewer,
    data: { title: 'Tags', examples: 'tags' },
  },
  {
    path: 'templates',
    component: RouteViewer,
    data: { title: 'Templates', examples: 'template' },
  },
  {
    path: 'multiselect',
    component: RouteViewer,
    data: { title: 'Multiselect', examples: 'multi-select' },
  },
  {
    path: 'multiselect-checkbox',
    component: RouteViewer,
    data: { title: 'Multiselect checkbox', examples: 'multi-checkbox' },
  },
  {
    path: 'events',
    component: RouteViewer,
    data: { title: 'Output events', examples: 'output-events' },
  },
  {
    path: 'virtual-scroll',
    component: RouteViewer,
    data: { title: 'Virtual scroll', examples: 'virtual-scroll' },
  },
  {
    path: 'dropdown-position',
    component: RouteViewer,
    data: { title: 'Dropdown position', examples: 'dropdown-position' },
  },
  {
    path: 'append-to-element',
    component: RouteViewer,
    data: { title: 'Append to element', examples: 'append-to' },
  },
  {
    path: 'grouping',
    component: RouteViewer,
    data: { title: 'Grouping', examples: 'group' },
  },
];
